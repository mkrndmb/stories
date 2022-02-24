import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PF = 'http://localhost:5000/images/'
  
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.photo ? PF + post.photo : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c,id)=>(
            <span className="postCat" key={id}>
            <Link className="link" to="/posts?cat=Music">
              {c.name}
            </Link>
          </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
