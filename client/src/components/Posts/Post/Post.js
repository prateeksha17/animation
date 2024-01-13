import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';  // Fix the import for MoreHorizIcon
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';  // Fix the import for ThumbUpAltOutlinedIcon
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import './style.css';

const Post = ({ post, setCurrentId, user }) => {  // Add user as a parameter

  const dispatch = useDispatch();

  const handleEditClick = () => {
    // Set the current ID to allow editing
    setCurrentId(post._id);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp; {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp; Like</>;
  }

  return (
    <Card className='card'>
      <>
        <CardMedia className='card-media' component='img' height='160' image={post.selectedFile} title={post.title} />
      </>
      <div className='card-top'>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className='card-tags'>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <div className='card-bottom'>
        <Typography variant='h5' gutterBottom>
          {post.title}
        </Typography>
      </div>
      <CardContent className='card-bottom'>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message.substring(0, 100)}
        </Typography>
      </CardContent>
      <CardActions className='card-action'>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize='small' /> Likes &nbsp; {post.likeCount}
        </Button>
        {(user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
        <div>
          {(user?.result?._id === post?.creator) && (
            <Button style={{ color: 'black' }} size='small' onClick={handleEditClick}>
              <MoreHorizIcon className='card-button' fontSize='default' />
            </Button>
          )}
        </div>
      </CardActions>
    </Card>
  );
}

export default Post;
