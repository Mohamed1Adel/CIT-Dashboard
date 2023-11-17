import React ,{useState}from 'react'
import './Login.scss'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { MONGODB_URL } from '../../envData'
import { useNavigate } from 'react-router-dom'

function Login({userLogin}) {
    const history = useNavigate()

    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")

    async function submit(e){
        e.preventDefault()

        try{
            await axios.post(`${MONGODB_URL}/login`,{
                userName,password
            }).then(res=>{
                console.log(res.data);
               if( res.data === "exist"){
                userLogin(true)
                history("/all",{state:{id:userName}})
                
               }else if( res.data === "notexist"){
                userLogin(false)
                alert("User have not sign up")
               }
            }).catch(e=>{
                alert("wrong details");
                console.log(e);
            })
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div className="login d-flex flex-column align-items-center justify-content-center" >
       <h1>Login</h1> 

       {/* <Form>
        <input type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder='User name'/>
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>

        <input type="submit" onClick={submit}/>
        </Form> */}

        {/* <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" onChange={(e)=>{setUserName(e.target.value)}} class="form-control" id="exampleInputUser1" aria-describedby="userHelp" placeholder="Enter Username">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" onClick={submit} class="btn btn-primary">Submit</button>
</form> */}

<Form style={{width:"500px",padding:"40px",border:"1px solid #000",borderRadius:"5px",backgroundColor:"#c1c1c1"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={(e)=>{setUserName(e.target.value)}} placeholder="Enter USername" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" onClick={submit} type="submit">
        Submit
      </Button>
    </Form>


        </div>
  )
}

export default Login