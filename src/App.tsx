import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { DataPost } from './components/PostDetail/PostDetail';
import { Context, ContextPosts, DataPosts } from './components/context/Context';




function App() {
        
  const [post, setPost] = useState<DataPost | null>(null);

  const updatePost = (updatedPost: DataPost) => {
    setPost(updatedPost);
};
return (
    <Context.Provider value={{ post, setPost, updatePost }}>
      <Main />
    </Context.Provider>
);
}

export default App;
