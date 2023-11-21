import { createContext } from 'react';

export interface DataPost {
    id: number
    content: string
    created: number
}

export interface ContextProps {
    post: DataPost | null;
    setPost: (post: DataPost | null) => void;
    updatePost: (post: DataPost) => void;
}

export interface DataPosts {
    posts: DataPost[] | null;
    setPosts: React.Dispatch<React.SetStateAction<DataPost[] | null>>;
  }

export interface ContextPostsProps {
    posts: {
        posts: DataPost[] | null;
        setPosts: React.Dispatch<React.SetStateAction<DataPost[] | null>>;
        updatePosts: (posts: DataPost[]) => void;
    };
}

export const ContextPosts: React.Context<any> = createContext({
    posts: null,
    setPosts: () => {},
    updatePosts: (posts: DataPost[]) => {},
  });

export const Context = createContext<ContextProps>({
    post: null,
    setPost: () => {},
    updatePost: () => {},
});