import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../Main";
import { DataPost } from "../PostDetail/PostDetail";
import "./PostDetailEdit.css";
import { Context } from "../context/Context";


export default function PostDetailEdit() {
    const { postId } = useParams();
    const [post, setPost] = useState<DataPost | null>(null);
    const [editedContent, setEditedContent] = useState('');

    const { updatePost } = useContext(Context);

    const navigate = useNavigate();

    async function fetchPost(baseUrl: string, postId: string) {
        try {
            const response = await fetch(`${baseUrl}posts/${postId}`)
            const data = await response.json()
  
            if (data) {
                setPost(data.post)
                setEditedContent(data.post.content);
                return data.post
            }
        }
         catch (error) {
            console.log(error)
        }
  }

  async function fetchEditPost(postId: string, editedContent: string) {
    try {
        const response = await fetch(`${baseUrl}posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: editedContent
            })
        })
    } catch (error) {
        console.log(error)
    }

}

  useEffect(() => {
    if (postId) {
        fetchPost(baseUrl, postId);
      }
  }, []);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(event.target.value);
  };

  async function handleSave() {
    if (postId && post) {
        await fetchEditPost(postId, editedContent)
        const updatedPost = await fetchPost(baseUrl, postId)
        updatePost(updatedPost);
        navigate(`/posts/${postId}`); 
    }
  }

  function handleCancel() {
    navigate(`/posts/${postId}`);
  }

    return (
        <div className="post-detail-edit">
            <div className="post-detail-header">
                <div className="post-detail-title">Редактировать публикацию</div>
                <button onClick={handleCancel} className="post-detail-cancel">X</button>
            </div>
            <div className="post-detail-body">
                <img className='post-detail-avatar' src="https://i.pravatar.cc/40" alt="" />
                <textarea
                className="post-detail-content"
                value={editedContent} 
                onChange={handleContentChange} 
                placeholder="Введите текст..."
                >
                </textarea>
            </div>
            <Link onClick={handleSave} className="post-detail-save" to={`/posts/${postId}`} >Сохранить</Link>
        </div>
    );
}