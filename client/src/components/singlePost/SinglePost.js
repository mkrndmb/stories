import { useContext, useEffect ,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from 'axios'
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation()
  const post_id = location.pathname.split('/')[2]
  const [post,setPost] = useState({})
  const PF = 'http://localhost:5000/images/'
  const {user} = useContext(Context)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateKaro, setUpdateKaro] = useState(false)

  useEffect(() => {
    const getPost = async () =>{
      const res = await axios.get(`/posts/${post_id}`)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [post_id])

  const handleDelete=async()=>{
    try {
      await axios.delete(`/posts/${post_id}`,{data:{username:user.username}}) 
      window.location.replace('/')
    } catch (error) {
    }
  }
  const handleEdit=async()=>{
    try {
      await axios.put(`/posts/${post_id}`,{username:user.username,title,desc}) 
      // window.location.reload()
      setUpdateKaro(false)
    } catch (error) {
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={post.photo ? PF + post.photo :"https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
          alt=""
        />
        {updateKaro ? <input autoFocus type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className="singlePostTitleInput" /> : (
        <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && 
          <div className="singlePostEdit">
          <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateKaro(true)}></i>
          <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
        </div>}
        </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateKaro ? <textarea type='textA' value={desc} onChange={(e)=>setDesc(e.target.value)} className="singlePostDescInput"/> : (
        <p className="singlePostDesc">
          {desc}
        </p>
        )}
        {updateKaro && 
        <button className='singlePostButton' onClick={handleEdit}>Update</button>
      }
      </div>
    </div>
  );
}
