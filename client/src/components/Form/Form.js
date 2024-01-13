
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import './style.css';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const dispatch = useDispatch();
  const postToUpdate = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (postToUpdate) {
      setPostData(postToUpdate);
    }
  }, [postToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({...postData, name: user?.result?.name}));
    }
    // Clear the form after submission
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    setCurrentId(null); // Reset currentId to null after submission
  };

 if(!user?.result?.name){
  return(
    <Paper >
      <Typography variant="h6" align="center">Please sign in to submit a post. </Typography>
    </Paper>
  )
 }

  return (
    <Paper>
      <form className="form-body" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography className="form-heading" variant="h6">
          {currentId ? 'Editing a Post' : 'Creating a Post'}
        </Typography>

        <TextField
        className='form-textfield'
          name='creator'
          variant='outlined'
          label='creator'
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />

        <TextField
        className='form-textfield'
          name='title'
          variant='outlined'
          label='title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
        className='form-textfield'
          name='message'
          variant='outlined'
          label='message'
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <TextField
        className='form-textfield'
          name='tags'
          variant='outlined'
          label='tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className='filebase'>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
       

        {/* ... */}

        <div className="buttons">
          <Button
            className="form-button"
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            {currentId ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;

        

