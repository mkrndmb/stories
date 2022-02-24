import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from 'axios'

export default function Settings() {
  const [file, setFile] = useState(null)
  const {user,dispatch} = useContext(Context)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword ] = useState('')
  const [updated,setUpdated] =useState(false)
  const PF = 'http://localhost:5000/images/'
 
  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type:"UPDATEACC_START"})
    const updatedUser = {
      userId:user._id,
      username,email,password
    }
    if(file){
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name",filename)
      data.append("file",file)
      updatedUser.profilePic = filename
   try {
     console.log('data',data)
      await axios.post('/upload',data)
    } catch (error) {
      // console.log('1st',error)
      }
    }
    try {
      const res = await axios.put(`/users/${user._id}`,updatedUser)
      setUpdated(true)
      dispatch({type:"UPDATEACC_SUCCESS",payload:res.data})
      setTimeout(() => {
        window.location.replace('/')
      }, 2000);
      // console.log('res',res.data)
    } catch (error) {
      // console.log('2nd',error)
      dispatch({type:"UPDATEACC_FAILURE"})
    }
  }

  const handleDelete=async()=>{
    try {
      await axios.delete(`/users/${user._id}`,{data:{userId:user._id}})
      
      setTimeout(() => {
        dispatch({type:"LOGOUT"})
        // window.location.replace('/')
      }, 2000);
    } catch (error) {
      
    }
  }


  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic ? PF + user.profilePic : "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={e=>setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={e=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {updated && <span style={{color:"green",margin:'12px',alignSelf:'center'}}>User Account Updated Successfully !!!</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
