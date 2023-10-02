/* eslint-disable react-hooks/rules-of-hooks */
import "./App.css";
import * as posenet from "@tensorflow-models/posenet";
import React from "react";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { useRef, useEffect, useState } from "react";
import { auth } from "./firebase";
import "./PracticeExercise.css";
import Navbar from "./components/Navbar/navbar";
import TextToSpeech from "./TextToSpeech";

function BK() {
  // Web Camera and canvas references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [camera, setCamera] = useState(false);
  // Characteristics of posenet
  const imageScaleFactor = 0.5;
  // The output stride determines how much we’re scaling down the output relative to the input image size. A higher output stride is faster but results in lower accuracy.
  // Stride is a parameter of the neural network's filter that modifies the amount of movement over the image or video.
  const outputStride = 16;
  const flipHorizontal = false;
  const user = auth.currentUser;

  // Pose detection
  const [output, setOutput] = useState("Pose not detected");
  // Timer variable
  const [time, setTime] = useState(0);

  let iterationCounter_tree = 0,
    iterationCounter_w2 = 0,
    iterationCounter_dD = 0,
    iterationCounter_plank = 0; /*, iterationCounter = 0*/

  let treecount = 0,
    w2count = 0,
    ddCount = 0,
    plankCount = 0;

  const [tree_count, setCount_tree] = useState(0);
  const [w2_count, setCount_w2] = useState(0);
  const [dd_count, setCount_dd] = useState(0);
  const [plank_count, setCount_plank] = useState(0);
  //button toggle
  const [btn, setBtn] = useState("Start Camera");
  const [btnStyle, setBtnStyle] = useState("button-33");

  useEffect(() => {
    // We are loading our posenet in this with Input Resolution matching our Canvas
    const runPosenet = async () => {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      });

      setInterval(() => {
        detect(net);
      }, 1000);
    };

    const detect = async (net) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = 640;
        const videoHeight = 480;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Make Detections
        //const poses = await net.estimateMultiplePoses(video,imageScaleFactor,flipHorizontal,outputStride);
        const pose = await net.estimateSinglePose(
          video,
          imageScaleFactor,
          flipHorizontal,
          outputStride
        );

        drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        //setInterval(() => {
        detectPose(pose);
        //},10000);
      }
    };
    runPosenet();
  }, []);

  // Drawing keypoints and skeleton on the user
  const drawCanvas = (
    poses,
    video,
    videoWidth,
    videoHeight,
    canvas,
    people
  ) => {
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    //returns a drawing context on the canvas
    const ctx = canvas.current.getContext("2d");

    drawKeypoints(poses["keypoints"], 0.6, ctx);
    drawSkeleton(poses["keypoints"], 0.7, ctx);
  };
  // Detect Pose
  const detectPose = async (pose) => {
    var form_data = new FormData();
    if (pose) {
      let count_score = 0;
      for (const keypoint of pose.keypoints) {
        if (keypoint.score > 0.1) {
          count_score = count_score + 1;
        }
      }
      if (count_score >= 11) {
        //setOutput("Start Exercise");
        // mapping the keypoints detected of one person into an array
        const features = [];
        var x, y;
        let j = 0;
        for (const keypoint of pose.keypoints) {
          x = keypoint.position.x;
          y = keypoint.position.y;
          features.push(x);
          features.push(y);
          form_data.append("json_x" + j, x);
          form_data.append("json_y" + j, y);
          j = j + 1;
        }
        // console.log(features);
        // Calling our flask backend which predicts the pose
        await fetch("/detect", {
          method: "POST",
          body: form_data,
        })
          .then((response) => response.text())
          .then((result) => {
            //setOutput(result);
            if (result === "Tree") {
              setOutput("Tree done properly");
              iterationCounter_tree = iterationCounter_tree + 1;
              setTime(iterationCounter_tree);
              if (iterationCounter_tree === 10) {
                treecount = treecount + 1;
                setCount_tree(treecount);
                iterationCounter_tree = 0;
              }
            }
            if (result === "Warrior2") {
              setTime(0);
              setOutput("warrior 2 done properly");
              iterationCounter_w2 = iterationCounter_w2 + 1;
              setTime(iterationCounter_w2);
              if (iterationCounter_w2 === 10) {
                w2count = w2count + 1;
                setCount_w2(w2count);
                iterationCounter_w2 = 0;
              }
            }
            if (result === "Downdog") {
              setOutput("Downdog done properly");
              iterationCounter_dD = iterationCounter_dD + 1;
              setTime(iterationCounter_dD);
              if (iterationCounter_dD === 10) {
                ddCount = ddCount + 1;
                setCount_dd(ddCount);
                iterationCounter_dD = 0;
              }
            }
            if (result === "Plank") {
              setOutput("Plank done properly");
              iterationCounter_dD = iterationCounter_dD + 1;
              setTime(iterationCounter_plank);
              if (iterationCounter_plank === 10) {
                plankCount = plankCount + 1;
                setCount_plank(plankCount);
                iterationCounter_plank = 0;
              }
            }
          })
          .catch((err) => {
            console.log("Error", err);
            setOutput("Sorry facing an issue");
          });
      } else {
        setOutput("Sorry pose not detected");
        setTime(0);
      }
    }
  };

  // changing the message of our button and starting camera
  const handleStop = () => {
    setBtn("Start Camera");
    setBtnStyle("button-33");
    setCamera(!camera);
    setTime(0);
    setOutput("Pose not detected");
  };
  const handleStart = () => {
    setBtn("Stop Camera");
    setBtnStyle("button-44");
    setCamera(!camera);
    setOutput("Pose not detected");
    setTime(0);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          {user.displayName}, start performing your "Perfect-Pose" by starting
          the camera!
        </h2>

        {/* Button that starts the camera and toggles to Stop Camera */}
        <div
          style={{
            marginLeft: "40%",
            marginRight: "auto",
            display: "flex",
            textAlign: "center",
          }}
        >
          <button
            type="button"
            className={btnStyle}
            style={{ width: "50%" }}
            onClick={camera ? handleStop : handleStart}
          >
            {btn}
          </button>
        </div>

        {/* Timer */}
        <div
          style={{
            marginLeft: "40%",
            textAlign: "center",
            display: "flex",
          }}
        ></div>

        <div
          style={{
            marginLeft: "40%",
            textAlign: "center",
            display: "flex",
          }}
        >
          <h1>Timer: </h1>
          <h1 style={{ marginRight: "10px", marginLeft: "2px", color: "red" }}>
            00:0{time}
          </h1>
        </div>

        <div>
          {camera && (
            <Webcam
              ref={webcamRef}
              style={{
                position: "absolute",
                marginLeft: "840px",
                marginRight: "auto",
                left: 0,
                right: 0,
                // textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            />
          )}
          {camera && (
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "840px",
                marginRight: "auto",
                left: 0,
                right: 0,
                // textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            />
          )}
        </div>

        <div
          className="practice-exercise-details"
          style={{ marginLeft: "20px" }}
        >
          <div className="practice-exercise-info">
            <h3>Pose Analysis : </h3>
            <div>{<TextToSpeech text={output}></TextToSpeech>}</div>
          </div>
        </div>

        <table id="pose-table">
          <tr>
            <th>Pose</th>
            <th>Count</th>
          </tr>
          <tr>
            <td>Tree</td>
            <td>{tree_count}</td>
          </tr>
          <tr>
            <td>Warrior 2</td>
            <td>{w2_count}</td>
          </tr>
          <tr>
            <td>Downdog</td>
            <td>{dd_count}</td>
          </tr>
          <tr>
            <td>Plank</td>
            <td>{plank_count}</td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default BK;
