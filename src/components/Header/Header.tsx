import "./Header.css"
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <Link className="add-post" to="/posts/new">Создать пост</Link>
        </div>
    )
}