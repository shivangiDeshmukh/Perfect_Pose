import { useState } from 'react';
// import { resetPwd } from './Auth';
import styles from './Login.module.css'
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import InputControl from "../InputControl/InputControl";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Forgot = () => {

    const [email,setEmail] = useState('');
    const [msg,setMsg] = useState('');
    const [error,setError] = useState('');

    // const forgotPwd = async(email) => {
    //     try {
    //         setMsg('Check Your Inbox for further instructions');
    //         setError("");
    //         await sendPasswordResetEmail(auth,email);
    //     } catch{
    //         setMsg('');
    //         setError("Failed to send Email");
    //     }
    // };
    const triggerResetEmail = async () => {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent")
        alert('Check your inbox to reset the password and Login !');
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.innerBox}>
                {/* <div className='card-body'> */}
                    <h2 className={styles.heading}>Password Reset</h2>

                    { error && <div className='alert alert-danger'>{error}</div>}
                    { msg && <div className='alert alert-success'>{msg}</div> }

                    {/* <form className='form row' onSubmit={triggerResetEmail}> */}
                        {/* <div className='input-group mb-3'>
                            <label className='input-group-text' style={{margin:"10px" , fontWeight:"bold"}}>Email</label>
                            <input className='form-control' type="email" style={{margin:"10px",height: "100%",
  width: "70%"}}placeholder="Enter Registered Email" onChange={(event) => {
                                setEmail(event.target.value);
                            }}/>
                        </div> */}
                        <div>
                        <InputControl
          label="Email"
          type="email"
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Enter email address"
        />
                        </div>
                          <div className={styles.footer}>
                        <button className='btn btn-primary' onClick={triggerResetEmail}>Send Email</button>
                        
                <p><a href='/login' style={{fontWeight:"bold",color:"rgb(212, 93, 93)"}}>Click Here to Login</a></p>
            </div>
                    {/* </form> */}
                {/* </div> */}
            </div>

            {/* <div className={styles.footer}>
                <p><a href='/' className='link-primary'>Click Here to Login</a></p>
            </div> */}
        </div> 
    );
}
 
export default Forgot;