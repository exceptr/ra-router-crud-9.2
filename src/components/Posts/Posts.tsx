import './Posts.css'
import { dataPost } from '../Post/Post'
import { Link } from 'react-router-dom'

interface PostsProps {
    posts: dataPost[]
}

const calculateTimeAgo = (timestamp: number): string => {
    const now = new Date().getTime();
    const difference = now - timestamp;
  
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (minutes < 1) {
      return 'только что';
    } else if (minutes < 60) {
      return `${minutes} мин.`;
    } else if (hours < 24) {
      return `${hours} ч.`;
    } else {
      return `${days} дней назад`;
    }
  };

export default function Posts({posts}: PostsProps) {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Link className='post' to={`/posts/${post.id}`} key={post.id}>
                    <div className='post-head'>
                        <img className='post-head-avatar' src="https://i.pravatar.cc/40" alt="" />
                        <div className='post-head-other'>
                          <span className='post-head-other-username'>Jack Daniels</span>
                          <span className='post-head-other-date'>{calculateTimeAgo(post.created)}</span>
                        </div>
                    </div>
                    <div className='post-content'>{post.content}</div>
                </Link>
            ))}
        </div>
    )
}

export {calculateTimeAgo}