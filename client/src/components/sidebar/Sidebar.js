import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import sidebarImage from './Wallmax-14598.jpg'
import { Context } from "../../context/Context";

export default function Sidebar() {
  const [cats,setCats] = useState([])
  const {user} = useContext(Context)
  // console.log(user)
  useEffect(() => {
    const getCats = async() =>{
      const res = await axios.get('/categories')
      setCats(res.data)
    }
    getCats()
   
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={sidebarImage}
          alt=""
        />
        <h3>{user?.username}</h3>
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c,id)=>{
            return (
            <li className="sidebarListItem" key={id}>
            <Link className="link" to={`/posts?cat=${c.name}`}>
              {c.name}
            </Link>
          </li>
          )})}  
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
