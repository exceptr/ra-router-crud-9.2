import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { calculateTimeAgo } from '../Posts/Posts';
import { baseUrl } from '../Main';
import { Context, ContextProps } from '../context/Context';

export interface DataPost {
    id: number
    content: string
    created: number
}

interface PostDetailProps {
    onSubmit: (id: string) => void
}

export default function PostDetail({onSubmit}: PostDetailProps) {
    const { postId } = useParams();
    const { post, setPost } = useContext<ContextProps>(Context);

    const { updatePost } = useContext(Context);

    async function fetchPost(baseUrl: string, postId: string) {
      try {
          const response = await fetch(`${baseUrl}posts/${postId}`)
          const data = await response.json()

          if (data) {
              updatePost(data.post)
          }
      }
       catch (error) {
          console.log(error)
      }
}

function handleDeletePostClick() {
    if (postId) {
        onSubmit(postId);
    }
}

  useEffect(() => {
    if (postId) {
        fetchPost(baseUrl, postId);
      }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

return (
    <div className='post'>
      {post && (
        <div className='post-head'>
          <img className='post-head-avatar' src="https://i.pravatar.cc/40" alt="" />
          <div className='post-head-other'>
            <span className='post-head-other-username'>Jack Daniels</span>
            <span className='post-head-other-date'>{calculateTimeAgo(post.created)}</span>
          </div>
          <Link to="/" className="post-cancel">X</Link>
        </div>
      )}
      {post && <div className='post-content'>{post.content}</div>}
      <div className='post-footer'>
        <Link 
            className='post-footer-edit' 
            type='button' 
            to={{
                pathname: `/posts/${post.id}/edit`,
                state: { post: post }
            } as { pathname: string; state: { post: DataPost } }}
        >
            Изменить
        </Link>
        <Link 
            onClick={handleDeletePostClick} 
            className='post-footer-delete' 
            type='button' 
            to={`/`}
            >
            Удалить
        </Link>
      </div>
    </div>
  );
}