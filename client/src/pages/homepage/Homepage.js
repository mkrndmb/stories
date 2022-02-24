import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from '../../components/header/Header.js';
import Posts from "../../components/posts/Posts.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import "./homepage.css";
import axios from 'axios'
import Contact from "../../components/zcontact/Contact.js";

export default function Homepage() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation();
  // console.log(location.search);
  useEffect(() => {
    const fetchPost = async () =>{
      const res = await axios.get('/posts'+ search)
      setPosts(res.data)
    }
    fetchPost()

  }, [search])
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <Contact/>
    </>
  );
}
