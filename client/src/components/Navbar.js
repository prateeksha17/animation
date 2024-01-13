import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@mui/material';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import logo from '../images/logo1.jpg';
import { Container } from '@mui/system';
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';



const Navbar = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation();
 const logout = () => {
  dispatch({type: 'LOGOUT'})
  navigate.push('/auth')
  setUser(null)
 }

  useEffect(()=>{
    const token = user?.token



    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

    return (
      <Container className={styles.container}>
        <AppBar position='static' color='inherit' className={styles.appBar}>
          <Typography component={Link} to='/' variant='h2' align='center'>
            anime
          </Typography>
          <img src={logo} alt='instaverse' className={styles.logo} />
          
        <Toolbar className={styles.toolbar}>
          {user ? (
            <div className={styles.profile}>
              <Avatar className={styles.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={styles.userName}
              variant='h6'>{user.result.name}</Typography>
              <Button variant='contained' className={styles.logout} color='secondary' onClick={logout}>Logout</Button>
            </div>
          ):(
<Button component={Link} to='/auth' variant='contained' color='primary'> SignUp</Button>
          )
          }
        </Toolbar>

        </AppBar>
      </Container>
    );
  };
export default Navbar; // Ensure that Navbar is the default export
