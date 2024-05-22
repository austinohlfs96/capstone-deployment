import MenuExampleTabularOnLeft from './NavBar'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {setCurrentCoach, addError} from "./coachSlice"
import { useEffect, useCallback } from 'react'
import Head from "../../components/Header"
import { Image, Sticky, Card, Container } from 'semantic-ui-react'
import { useToasts } from 'react-toast-notifications';

const UserHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const coach = useSelector((state) => state.coach.data)
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    if (!coach) {
      fetch("/auth/me",{
        headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            }
      })
      .then(res => {
        if (res.ok) {
          res.json().then(coach => dispatch(setCurrentCoach(coach)))
        } else if (res.status === 422) {
          fetch("/auth/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
            }
          })
          .then(res => {
            if (res.ok) {
              res.json().then(resObj => {
                dispatch(setCurrentCoach(resObj.coach))
                localStorage.setItem("jwt_token", resObj.jwt_token)
              })
            } else {
              
              res.json().then(errorObj => {
                navigate('/')
                dispatch(addError(errorObj.message));
                handleNewError("You have been signed out please sign in to use account services");
              });
            }
          })
        } else {
          res.json().then(errorObj => handleNewError(errorObj.message || errorObj.msg))
          navigate('/')
        }
      })
      .catch(error => {
        dispatch(addError(error));
        navigate('/')
        handleNewError(error);
      });
    }
  }, [handleNewError, coach])

console.log(coach)
  const title = 'USER HOME'
  return (
    // <div className='container'>
    //   <Head coach={coach}/>
     
      
      
    //   {coach && (
  // <div style={{display: 'flex', flexDirection: 'column'}}>

  // <Image src={coach.profile_picture} size ='small' style={{margin: '15px'}}/>
  // <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
  // <h1 style={{ color: 'white' }}>{coach.name}</h1>
  // <h2 style={{ color: 'white' }}>Team: {coach.team}</h2>
  // </div>
 
  

  // </div>
  <Container className='container'>
  <Head coach={coach} />
  
  {coach && (
    <Card style={{display: 'flex', flexDirection: 'row', fontFamily: 'Anta'}}>
      <Image src={coach.profile_picture} wrapped ui={false} style={{width: '200px'}}/>
      <Card.Content>
        <Card.Header style={{fontFamaily: 'Anta'}}>{coach.name}</Card.Header>
        <Card.Meta>
          <span>Team: {coach.team}</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  )}
  
  <MenuExampleTabularOnLeft style={{fontFamaily: 'Anta'}}/>
</Container>
)}
//       <MenuExampleTabularOnLeft/>
      
//     </div>
//   )
// }

export default UserHome;