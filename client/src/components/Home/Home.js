import React, {useState, useEffect} from 'react'
import Posts from '../../components/Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Form from '../../components/Form/Form';
import { Container, Grow } from '@mui/material';
import styles from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
        <Container >
          <div
            className='container'
            container="true"
            direction={'column-reverse'}
            justify='space-between'
            alignitems='stretch'
            spacing={4}
          >
            <div item="true" xs={12} sm={7} >
              <Posts setCurrentId={setCurrentId} />
            </div>
            <div item="true" xs={12} sm={4} >
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div>
          </div>
        </Container>
      </Grow>
  )
}
