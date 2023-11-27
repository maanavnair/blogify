import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('http://localhost:8080/home', {
        credentials: 'include',
      });
      try{
        if(res.ok){
          const data = await res.json()
          setBlogs(data.blogs);
        }
        else{
          console.log('Internal Server Error');
        }
      }
      catch(err){
        console.log('Error Fetching Blogs');
      }
    }
    fetchBlogs();
  }, [])

  const list = blogs && blogs.map((blog) => (
    <div key={blog._id} className='blog-list-item'>
      <Link to={`/blog/${blog._id}`}>
        <h1>{blog.title}</h1>
      </Link>
      <p>Author: {blog.username}</p>
      <p>{blog.desc}</p>
    </div>
  ))

  return (
    <div className='home-page'>
      <h1>Home</h1>
      {blogs && list}
    </div>
  )
}

export default Home