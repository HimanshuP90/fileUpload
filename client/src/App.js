import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Posts from '../src/components/Posts';
import Pagination from '../src/components/Pagination';

// import FileUpload from './components/FileUpload';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    // <div className='container mt-4'>
    //     <h3 className='display-5 text-center mb-4'>
    //         <i className='fa fa-upload'/> File Upload
    //     </h3>
    //     <FileUpload />
    // </div>
    console.log(posts)
    return (
        <div className="container mt-5">
            <h1 className="text-primary mb-3"> My Blog</h1>
            <Posts posts={currentPosts} loading={loading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
};

export default App;
