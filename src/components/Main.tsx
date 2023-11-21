import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewPost from "./NewPost/NewPost";
import { useEffect, useState } from "react";
import { ContextPosts } from "./context/Context";
import PostDetail from "./PostDetail/PostDetail";
import PostDetailEdit from "./PostDetailEdit/PostDetailEdit";

export interface formData {
    id: number
    content: string
}
const baseUrl = "http://localhost:7070/"
export default function Main() {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);


    async function fetchAddNewPost(formData: formData) {
        try {
            const response = await fetch(`${baseUrl}posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
        } catch (error) {
            console.log(error)
        }

    }

    async function fetchPosts(baseUrl: string) {
        try {
            const response = await fetch(`${baseUrl}posts`)
            const data = await response.json()
            
            if (data) {
                setPosts(data);
            }
        }
         catch (error) {
            console.log(error)
        }
    }

    async function fetchDeletePost(postId: string) {
        try {
            const response = await fetch(`${baseUrl}posts/${postId}`, {
                method: "DELETE"
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPost(baseUrl: string, postId: string) {
        try {
            const response = await fetch(`${baseUrl}posts/${postId}`)
            const data = await response.json()
  
            if (data) {
                setPost(data.post)
            }
        }
         catch (error) {
            console.log(error)
        }
  }

    useEffect(() => {
        fetchPosts(baseUrl)
    }, [])

    async function handleSubmitPost(formData: formData) {
        await fetchAddNewPost(formData);
        return await fetchPosts(baseUrl);
    }

    async function handleDeletePost(postId: string) {
        await fetchDeletePost(postId);
        return await fetchPosts(baseUrl);
    }

    async function handleEditPost(baseUrl: string, postId: string) {
        await fetchPost(baseUrl, postId);
    }

    return (
        <ContextPosts.Provider value={{posts}}>
        <div className="main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts/new" element={<NewPost onSubmit={handleSubmitPost}/>} />
                <Route path="/posts/:postId" element={<PostDetail onSubmit={handleDeletePost}/>} />
                <Route path="/posts/:postId/edit" element={<PostDetailEdit />} />
            </Routes>
        </div>
        </ContextPosts.Provider>
    )
}

export { baseUrl }