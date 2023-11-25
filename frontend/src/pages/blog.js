import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/userContext';

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({
        title: '',
        username: '',
        body: '',
        email: ''
    });

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    function handleEdit(){
        navigate(`/edit/${id}`);
    }

    async function handleDelete(){
        const res = await fetch(`http://localhost:8080/deleteblog/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        try{
            if(res.ok){
                console.log('Blog Deleted Successfully');
                navigate('/home');
            }
            else{
                console.log('Internal Server Error');
            }
        }
        catch(err){
            console.log('Fetch Error');
        }
    }

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch(`http://localhost:8080/blog/${id}`, {
                credentials: 'include',
            });
            try{
                if(res.ok){
                    const data = await res.json();
                    setBlog(data.blog);
                }
                else{
                    console.log('Internal Server Error');
                }
            }
            catch(err){
                console.log('Fetch Error');
            }
        }
        fetchBlog();
    }, []);

    const buttons = user && blog && user.email === blog.email && (<div>
        <button onClick={handleEdit}>Edit Blog</button>
        <button onClick={handleDelete}>Delete Blog</button>
    </div>)

  return (
    <div>
        <h1>{blog.title}</h1>
        <p>By {blog.username}</p>
        <p>{blog.body}</p>
        {user && blog && user.email === blog.email && buttons}
    </div>
  )
}

export default Blog