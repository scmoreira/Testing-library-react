import React, { Fragment, useState, useEffect } from 'react';

import Form from './Form';
import Appointment from './Appointment';

function App() {

  // Local Storage
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  if (!initialAppointments) {
    initialAppointments = [];
  }

  // Create state
  const [appointments, setAppointments] = useState(initialAppointments);

  // Manage state changes 
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Add new appointments
  const addAppointment = appointment => {
    setAppointments([...appointments, appointment]);
  };

  // Delete appointment
  const deleteAppointment = id => {
    const newAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(newAppointments);
  };

  // Conditional Messagge
  const title = appointments.length === 0 ? 'No appointments' : 'Manage your appointments';

  return (
    <Fragment>
      <h1 data-testid='app-name'>Patient Manager</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Form addAppointment={ addAppointment } />
          </div>
          <div className='one-half column'>
            <h2 data-testid='conditional-title'>{ title }</h2>
            { appointments.map(appointment =>
              <Appointment
                key={ appointment.id }
                appointment={ appointment }
                deleteAppointment={ deleteAppointment }
              />) }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;