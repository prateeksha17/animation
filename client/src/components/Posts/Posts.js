import React from 'react'
import './style.css';
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
export default function Posts({setCurrentId}) {


const posts = useSelector((state)=>state.posts)

console.log(posts);

  return (
 
       !posts.length ? <CircularProgress/>:
       <div className='posts-cards'>
<Grid container alignItems='stretch' spacing={3}>
        {posts.map(post =>(
          <div className='posts-card' key={post._id}>
<Grid  item xs={12} sm={16}>
            <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          </div>
          
        ))}
       </Grid>
       </div>
       

  )
}
