import './NewPost.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { formData } from '../Main';

interface NewPostProps {
    onSubmit: (formData: formData) => void
}

export default function NewPost({onSubmit}: NewPostProps) {
    const [newPost, setNewPost] = useState({
        id: 0,
        content: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost({ ...newPost, content: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handlePublishClick = () => {
        onSubmit(newPost);
    }

    return (
        <form className="new-post-container" onSubmit={handleSubmit}>
            <nav className="new-post-nav">
                <div className="new-post-post">
                    <img className="new-post-icon-pencil" src={require('./icon/pencil.png')} alt="icon" />
                    <span className="new-post-text">Публикация</span>
                </div>
                <Link to="/" className="new-post-cancel">X</Link>
            </nav>
            <textarea
                className="new-post-content"
                value={newPost.content} 
                onChange={handleChange} 
                placeholder="Введите текст..."
                >
            </textarea>
                <div className="new-post-footer">
                    <Link to="/" className="new-post-publish" type='button' onClick={handlePublishClick}>Опубликовать</Link>
                </div>
        </form>
    )
}