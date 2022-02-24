import "./header.css";
import headerImage from './Wallmax-56481.jpg'

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Create & Live</span>
        <span className="headerTitleLg">STORIES</span>
      </div>
      <img
        className="headerImg"
        src={headerImage}
        alt=""
      />
    </div>
  );
}
