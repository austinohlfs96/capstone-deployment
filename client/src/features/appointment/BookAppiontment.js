import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Modal, Card, Segment, Header } from 'semantic-ui-react';
import { addAppointmentsToCoach, addError, patchAthlete, patchAppointment, fetchCurrentUser } from '../coach/coachSlice';
import AddAthleteServiceForm from './AddAthleteServiceForm';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';
import * as Yup from 'yup';
import ConfirmAppt from './AppointmentConfirm';
import { DateInput } from 'semantic-ui-calendar-react';


const BookAppointment = ({handleItemClick}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const coachId = useSelector((state) => state.coach.data.id)
  const coach = useSelector((state) => state.coach.data);
  const [appointment, setAppointment] = useState({});
  const [athlete, setAthlete] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const coachAthletes = coach.athletes;
  const { addToast } = useToasts();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  const handleNewMessage = useCallback((message) => {
    addToast(message, { appearance: 'success', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    pickup_location: Yup.string().required('Pick-up location is required'),
    dropoff_location: Yup.string().required('Drop-off location is required'),
    booking_time: Yup.string().required('Booking time is required'),
  });

  const sendRequest = (values) => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }
    fetch('/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(res => {
      if (res.ok) {
          res.json().then(createdAppointment => {
            dispatch(addAppointmentsToCoach(createdAppointment));
            setAppointment(createdAppointment);
            handleNewMessage('Appointment created book sevices and confirm appointment to schedule your appointment.')
            setFormSubmitted(true);
          })
      } else {
          res.json().then(errorObj => {
          dispatch(addError(errorObj.message));
          handleNewError(errorObj.message);
        });
      }
      })
    }


  const formik = useFormik({
    initialValues: {
      coaches_id: coachId,
      pickup_location: '',
      dropoff_location: '',
      booking_time: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendRequest(values);
    },
  });
  

  const handleAddAthleteService = () => {
    setShowModal(true); 
  };

  const handleModalClose = () => {
    setShowModal(false); 
  };

  const handlePrePayClick = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
  };

  const calculateTotal = () => {
    if (appointment.athlete_services && Array.isArray(appointment.athlete_services)) {
      return appointment.athlete_services.reduce((total, service) => total + (service.services.price || 0), 0);
    } else {
      return 0;
    }
  };

  const handleDeleteService = (services) => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }

    const selectedAthlete = coachAthletes.find((athlete) => athlete.id === services.athletes.id)
    console.log("selectedAthlete",selectedAthlete)
    setAthlete(selectedAthlete)
    fetch(`/athlete-service/${services.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          const updatedService = appointment.athlete_services.filter((service) => service.id !== services.id);
          const updatedAthleteService = selectedAthlete.athlete_services.filter((service) => service.id !== services.id);
          setAppointment({
            ...appointment,
            athlete_services: updatedService,
          });
          dispatch(patchAppointment({
            ...appointment,
            athlete_services: updatedService,
          }));
          dispatch(patchAthlete({
            ...selectedAthlete,
            athlete_services: updatedAthleteService,
          }));
          console.log( "athlete", athlete)
        } else {
          res.json().then(errorObj => {
            dispatch(addError(errorObj.message));
            handleNewError(errorObj.message);
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting service:', error.message);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        // Logic to close the calendar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarRef]);

  const isValidDate = (date) => {
    // Disable past dates and weekends
    const currentDate = new Date();
    const selectedDate = new Date(date);
    
    // Check if date is not in the past
    if (selectedDate < currentDate) {
      return false;
    }
    
    // Check if date is not a weekend (Saturday or Sunday)
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false;
    }

    return true;
  };

  return (
    <>
     <Header>
      <h1 style={{fontFamily: 'Anta'}}>Book Appointment</h1>
      </Header>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Pick-up Location</label>
          <Input
            name="pickup_location"
            value={formik.values.pickup_location}
            placeholder="Enter your pick-up location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pickup_location && formik.errors.pickup_location ? (
            <div style={{ color: 'red' }}>{formik.errors.pickup_location}</div>
          ) : null}
        </Form.Field>
        <Form.Field>
          <label>Drop-off Location</label>
          <Input
            name="dropoff_location"
            value={formik.values.dropoff_location}
            placeholder="Enter your drop-off location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dropoff_location && formik.errors.dropoff_location ? (
            <div style={{ color: 'red' }}>{formik.errors.dropoff_location}</div>
          ) : null}
        </Form.Field>
        <Form.Field>
          <label>Schedule Pick-up Time</label>
          <div ref={calendarRef}>
      <DateInput
        name="booking_time"
        placeholder="Enter your pickup time"
        value={formik.values.booking_time}
        iconPosition="left"
        onChange={(event, { name, value }) => formik.setFieldValue(name, value)}
        onBlur={formik.handleBlur}
        isValidDate={isValidDate}
        minDate={new Date()} // Disable dates before today
      />
    </div>
          {formik.touched.booking_time && formik.errors.booking_time ? (
            <div style={{ color: 'red' }}>{formik.errors.booking_time}</div>
          ) : null}
        </Form.Field>
        <p>Estimated Total: ${calculateTotal()}</p>
        <Button type="submit" disabled={!!appointment.booking_time}>Submit</Button>
      </Form>
      {formSubmitted && (
        <Button onClick={handleAddAthleteService} style={{ marginTop: '10px' }}>
          Add Athlete Service
        </Button>
      )}
      
      <Modal open={showModal} onClose={handleModalClose}>
        <Modal.Header>Add Athlete Service</Modal.Header>
        <Modal.Content>
          <AddAthleteServiceForm appointment={appointment} handleModalClose={handleModalClose} setAppointment={setAppointment} />
        </Modal.Content>
      </Modal>
      {appointment.athlete_services && (
        <Segment>
          <h3>Athlete Services: {appointment.athlete_services.length}</h3>
          <Card.Group>
            {appointment.athlete_services.map((service) => (
              <Card key={service.id}>
                <Card.Content>
                <Button color="red" style={{ position: 'absolute', top: '5px', right: '5px' }} onClick={() => handleDeleteService(service)}>
                    X
                  </Button>
                  <Card.Header>{service.services.name}: ${service.services.price}</Card.Header>
                  <Card.Meta>Athlete: {service.athletes.name}</Card.Meta>
                  <Card.Meta>Discipline: {service.discipline}</Card.Meta>
                  <Card.Description>{service.notes}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      )}
      {appointment.athlete_services && appointment.athlete_services.length > 0 && (
        <Button style={{ marginTop: '10px' }} onClick={handlePrePayClick}>
        Confirm
      </Button>
      )}
       {appointment.athlete_services && appointment.athlete_services.length > 0 && (
       <ConfirmAppt showPaymentModal={showPaymentModal} handlePaymentModalClose={handlePaymentModalClose} calculateTotal={calculateTotal} appointment={appointment} handleItemClick={handleItemClick}/>
      )}
    
    </>
  );
};

export default BookAppointment;
