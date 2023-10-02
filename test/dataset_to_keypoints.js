// Website reference link: https://dev.to/0xkoji/run-posenet-with-nodejs-12be

const image_folder = "./Warrior2/";
const fs = require('fs');
let tree = []; // array that stores all names of images inside Tree folder so that the posenet model can estimate the keypoints
const posenet = require("@tensorflow-models/posenet");
const {
    createCanvas, Image
} = require('canvas')
const tf = require("@tensorflow/tfjs");
// const os = require("os");
let json = {};

// Characteristics of image
const imageScaleFactor = 0.5;
const outputStride = 16;
const flipHorizontal = false;
fs.readdirSync(image_folder).forEach(file => {
    tree.push(file); // contains 196 images
    //console.log(file); // displaying each image line by line
});
// Posenet on 1 image 
const runPosenet = async() => {
    const tree_keypoints = [];
    //tree_keypoints.push("Tree");
    console.log('start');
    const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
    });
    const img = new Image();
    img.src = './downdog.jpg'
    const canvas = createCanvas(640, 480);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
    //console.log(pose);
    for(const keypoint of pose.keypoints) {
        console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
        tree_keypoints.push(keypoint.position.x);
        tree_keypoints.push(keypoint.position.y);
    }
    let w = 0;
    let label = w.toString();
    json[label] = tree_keypoints;
    w=w+1; 
    fs.writeFile('downdog_test.json',JSON.stringify(tree_keypoints,null,2),'utf-8',function(err) {
        if(err){
            console.log(err)
        }
        console.log("The file is saved");
    });
}
// Writing all the keypoints of each image in a JSON file
const tryModel = async() => {
    console.log('start');
    // creating a posenet model with all the necessary details
    const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
    });
    const img = new Image();
    let w=589;
    tree.forEach(async(i) => {
        let tree_keypoints = [];
        tree_keypoints.push("Warrior2");
        img.src = image_folder + i;
        // const canvas = createCanvas(img.width, img.height);
        const canvas = createCanvas(640,480);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const input = tf.browser.fromPixels(canvas);
        // extracting all the details of the pose in the image i.e. score,keypoints
        const pose = await net.estimateSinglePose(input, imageScaleFactor, flipHorizontal, outputStride);
        //console.log(pose.keypoints);
        for(const keypoint of pose.keypoints) {
           // console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);
           tree_keypoints.push(keypoint.position.x);
           tree_keypoints.push(keypoint.position.y);
        }
        //saving the array in a json file along with labels
        let label = w.toString();
        json[label] = tree_keypoints;
        w=w+1; 
        fs.writeFile('warrior2.json',JSON.stringify(json,null,2),'utf-8',function(err) {
            if(err){
                console.log(err)
            }
            console.log("The file is saved");
        });
    })
}
//tryModel();
runPosenet();
