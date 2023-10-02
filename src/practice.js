import React, { useRef } from "react";
import "./PracticeExercise.css";

function PracticeExercise() {
  const videoRef = useRef(null);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log("Error accessing camera:", error);
      });
  };

  return (
    <div className="practice-exercise-container">
      <h2>Tree Pose</h2>
      <div className="practice-exercise-details">
        <div className="practice-exercise-info">
          <h3>Details</h3>
          <p>Tree pose, also known as Vrikshasana, is a standing balance pose that improves focus, concentration, and balance.<br></br> To practice tree pose:</p>
          <img class="description" src="https://fitsri.com/wp-content/uploads/2020/02/tree-pose-vriksasana.jpg" />
          <ol class ="list-group">
            <li>Stand with your feet hip-width apart and your arms at your sides.</li>
            <li>Shift your weight onto your left foot and lift your right foot off the ground.</li>
            <li>Place the sole of your right foot on the inside of your left thigh, as high up as possible.</li>
            <li>Press your foot and thigh together, and bring your hands together in front of your heart in prayer position.</li>
            <li>Fix your gaze on a point in front of you to help with balance.</li>
            <li>Hold for 30 seconds to 1 minute, then release and repeat on the other side.</li>
          </ol>
          <h3>Pose Analysis : </h3>
        </div>
        <div className="practice-exercise-camera">
          <h3>Camera</h3>
          <video ref={videoRef} autoPlay playsInline></video>
          <button onClick={startVideo}>Start Camera</button>
        </div>
      </div>
    </div>
  );
}

export default PracticeExercise;
