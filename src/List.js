import React, {useEffect} from "react";
// import { Card , Text ,BarList } from "@tremor/react";
// import { CCard , CCardImage , CCardBody ,CCardText , CCardTitle , CButton ,CProgress,CProgressBar} from "@coreui/react";
//import { useLocation } from "react-router-dom";
import './excerList.css';
// import { signOut } from "firebase/auth";
import { Link, useNavigate ,Navigate } from "react-router-dom";
//import { app, auth } from "./firebase";
import { getAuth, signOut ,onAuthStateChanged } from "firebase/auth";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
//import Navbar from "./components/Navbar/navbar";
import { GrYoga } from "react-icons/gr";

// import { Link } from "react-router-dom";

function List(props){
    //const {state} = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    //const { username } = state;
    //Display User name 
    const user = auth.currentUser;
  //   const logout = async() => {
  //     await Logout();
  //     window.location.href="/";
  // }
  // 
  useEffect(()=>{
    onAuthStateChanged(auth,(user) => {
        if(!user) {
            window.location.href="/";
        }  
    });
},[]);
  const handleLogout =() => {
    // app.auth().signOut();
    signOut(auth).then(() => {
      console.log("logged out");
    }).catch((error) => {
      // An error happened.
      console.log("error");
    });

    navigate("/login");
    }

    const navigateBK= () => {
      navigate("/BK");

    }
    //dialogbox
    const [open, setOpen] = React.useState(false);
    const [plank, setPlank] = React.useState(false);
    const [tree, settree] = React.useState(false);
    const [downdog, setdowndog] = React.useState(false);

  const handleClickToPlank=() => {
    setPlank(true);
  };
  const handleToPlank=() =>{
    setPlank(false);
  }

  const handleClickTotree=() => {
    settree(true);
  };
  const handleTotree=() =>{
    settree(false);
  }

  const handleClickTodown=() => {
    setdowndog(true);
  };
  const handleTodown=() =>{
    setdowndog(false);
  }

  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);}

    return(
//        
<div className="bg">
<div className="menu">
      <a><Link to="/"><GrYoga/>PerfectPose</Link></a>
      <div class="menu-right">
        <a><Link to="/Aboutafterlogin">About Us</Link></a>
        <a><Link to ="/BK">Start Exercise</Link></a>
        <button className="cta-btn"  onClick={handleLogout}>Logout</button>
      </div>
</div>
<div className="exercise-list-container">

<h2 style={{textAlign: 'center', marginTop: "7%"}}>Available Exercises</h2>
<h3 style={{textAlign:'center', marginLeft:"auto"}}>Hello, {user.displayName} !</h3>
<button className="practice-button" onClick={navigateBK}>Practice a Pose</button>
{/* <button className="button-42" style={{ marginLeft:"35px"}} onClick={handleLogout}>Logout</button> */}
{/* <h2>{state.name ? `Welcome - ${state.name}` : "Login please"}</h2> */}
{/* <div className="exercise-card-container">
  {exercises.map((exercise) => (
    <div key={exercise.id} className="exercise-card">
      <h3>{exercise.name}</h3>
      <img src={exercise.url} />
      <p>{exercise.description}</p>
      <p className="difficulty-level">Difficulty: {exercise.difficulty}</p>
      {/* <CProgress className="mb-3">
      <CProgressBar color="warning" value={25}>25%</CProgressBar>
      </CProgress> */}
      {/* <button className="practice-button"><a href="practice">Practice</a></button> */}
      {/* <button className="practice-button" onClick={navigateBK}>Practice</button>
     
    </div>
  ))}
</div>  */}
<div className="card-list">
<div className="exercise-card-container">
    <div className="exercise-card">
      <h3 style={{textAlign: 'center'}}>Plank</h3>
      <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKwfG2SCqesAd4VaMOdxeXr3X3DHAjOLArHQ&usqp=CAU" />
      <p>Hold a push-up position for as long as possible</p>
      <p className="difficulty-level">Difficulty: Intermediate </p>
      <button className="readmore-button" onClick={handleClickToPlank}>Know More..</button>
    </div>
</div>
<Dialog open={plank} onClose={handleToPlank}>
        <DialogTitle style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Plank</DialogTitle>
        <DialogContent style={{color:"black", margin:"10px"}}>
          <DialogContentText>
          <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKwfG2SCqesAd4VaMOdxeXr3X3DHAjOLArHQ&usqp=CAU" />
          <h3 style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Description:</h3>
          
        <p>
        The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time .
        </p>
        <p>
        The plank is a classic exercise that strengthens your body from head to toe. In particular, the plank helps strengthen your core muscles, including your abdominals and lower back.
        </p>
        <h3>Instructions:</h3>
        <ol>
          <li>Assume a push-up position but bend your arms at your elbows so your weight rests on your forearms.</li>
          <li>
          Tighten your abs, clench your glutes and keep your body straight from head to heels. 
          </li>
          <li> Hold as long as you can. </li>
          
          </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToPlank} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
<div className="exercise-card-container">
    <div className="exercise-card">
      <h3 style={{textAlign: 'center'}}>Downward Dog</h3>
      <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUEVHOG4urw00RTyn_apEtnvAlecxL-izRQ&usqp=CAU" />
      <p>A standing pose that stretches the hamstrings and back</p>
      <p className="difficulty-level">Difficulty: Advanced </p>
      <button className="readmore-button" onClick={handleClickTodown}>Know More..</button>
    </div>
</div>
<Dialog open={downdog} onClose={handleTodown}>
        <DialogTitle style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Downward Dog</DialogTitle>
        <DialogContent style={{color:"black",margin:"10px"}}>
          <DialogContentText>
          <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUEVHOG4urw00RTyn_apEtnvAlecxL-izRQ&usqp=CAU" />
          <h3 style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Description:</h3>
        <p>
        Downward dog (Adho Mukha Svanasana), sometimes referred to as a downward-facing dog or down dog, is a standing yoga pose where the yogi stretches their whole body on all fours, similar to the way a dog stretches. This yoga pose is often performed during Vinyasa and Ashtanga styles of yoga, either as a transitional or a resting pose.
        </p>
        <p>
        Downward dog is a weight-bearing exercise, so it’s effective at building strength in your shoulders and arms. This yoga pose also engages your midsection to help build strong abdominal muscles.
        </p>
        <h3>Instructions:</h3>
        <ol>
          <li>Start on the floor with your hands shoulder-width apart, with your shoulders above your wrists. Align your inner shoulders with your index fingers. Your hips should be above or slightly before your knees.</li>
          <li>
          Next, tuck your toes against the mat or ground, using that leverage to extend your legs and lift both knees into the air. Your body should now resemble an upside-down “V” shape.
          </li>
          <li>Extend and lengthen your spine, simultaneously pressing through the palms of your hands and balls of your feet. Pull your pelvis up toward the ceiling, using the triceps in your upper arms to help stabilize your form. Some yoga teachers suggest drawing your shoulder blades down your back, while others prefer externally rotating the joints to support the body instead.</li>
          <li>
          Hold your body in position, making sure to breathe properly. Slowly bring your knees back to the floor to release this asana, or use it to transition into another pose.
          </li>
         </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTodown} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
<div className="exercise-card-container">
    <div className="exercise-card">
      <h3 style={{textAlign: 'center'}}>Tree Pose</h3>
      <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-M5rzHpS0ijA_3iRJvE3f_DBSTb7sS_gQyw&usqp=CAU" />
      <p>A balancing pose that strengthens the legs and core</p>
      <p className="difficulty-level">Difficulty: Beginner  </p>
      <button className="readmore-button"onClick={handleClickTotree}>Know More..</button>
    </div>
</div>
<Dialog open={tree} onClose={handleTotree}>
        <DialogTitle style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Tree Pose</DialogTitle>
        <DialogContent style={{color:"black",margin:"10px"}}>
          <DialogContentText>
          <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-M5rzHpS0ijA_3iRJvE3f_DBSTb7sS_gQyw&usqp=CAU" />
          <h3 style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Description:</h3>
        <p>
        Tree pose, also known as Vrikshasana, is a standing balance pose that improves focus, concentration, and balance.
        </p>
        <p>
        In this pose, you find a sense of groundedness through the strength of your standing leg. Bringing the sole of your opposite foot to your shin or thigh challenges your balance. Continuously engage your ankles, legs, and core and notice what tiny movements your body might make to help you stay balanced.
        </p>
        <h3>Instructions:</h3>
        <ol class ="list-group">
            <li>Stand with your feet hip-width apart and your arms at your sides.</li>
            <li>Shift your weight onto your left foot and lift your right foot off the ground.</li>
            <li>Place the sole of your right foot on the inside of your left thigh, as high up as possible.</li>
            <li>Press your foot and thigh together, and bring your hands together in front of your heart in prayer position.</li>
            <li>Fix your gaze on a point in front of you to help with balance.</li>
            <li>Hold for 30 seconds to 1 minute, then release and repeat on the other side.</li>
          </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTotree} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
<div className="exercise-card-container">
    <div className="exercise-card">
      <h3 style={{textAlign: 'center'}}>Warrior 2 Pose</h3>
      <img className="card-img" src="data:image/jpeg;base64,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" />
      <p>A balancing pose that strengthens the legs and core</p>
      <p className="difficulty-level">Difficulty: Beginner  </p>
      <button className="readmore-button" onClick={handleClickToOpen}>Know More..</button>
    </div></div>
</div>
</div>
<Dialog open={open} onClose={handleToClose}>
        <DialogTitle style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Warrior 2 Pose</DialogTitle>
        <DialogContent style={{color:"black",margin:"10px"}}>
          <DialogContentText>
            <img className="card-img" src="data:image/jpeg;base64,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" />
          <h3 style={{textAlign:"center", backgroundColor:"red", color:"whitesmoke"}}>Description:</h3>
        <p>
          Warrior 2 Pose (Virabhadrasana II) is a standing pose that helps
          improve strength, stability, and concentration. In this pose, you
          stand with your feet wide apart, one foot facing forward and the
          other foot turned out to the side, while extending your arms
          parallel to the ground.
        </p>
        <p>
          Warrior 2 Pose strengthens the legs, hips, and core muscles while
          opening up the chest and shoulders. It also stretches the inner
          thighs and improves balance and flexibility.
        </p>
        <h3>Instructions:</h3>
        <ol>
          <li>Stand with your feet about 3-4 feet apart.</li>
          <li>
            Turn your right foot out to the right side, keeping your left foot
            slightly turned in.
          </li>
          <li>Extend your arms parallel to the ground, palms facing down.</li>
          <li>
            Bend your right knee, aligning it with your right ankle. Keep your
            left leg straight and engaged.
          </li>
          <li>
            Turn your head to look over your right fingertips, keeping your
            gaze focused and steady.
          </li>
          <li>
            Hold the pose for 30 seconds to 1 minute, breathing deeply.
          </li>
          <li>
            Repeat on the other side by switching the position of your feet and
            arms.
          </li>
          </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
</div>

    );
}

export default List;