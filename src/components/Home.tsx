import { useContext } from "react";
import Header from "./Header/Header";
import Posts from "./Posts/Posts";
import { ContextPosts } from "./context/Context";


export default function Home() {
    const { posts } = useContext(ContextPosts);
    return (
        <div className="home">
            <Header/>
            <Posts posts={posts}/>
        </div>
    )
}