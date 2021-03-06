import React from 'react';
import PropTypes from 'prop-types';

const Appointment = ({ appointment, deleteAppointment }) => {
    return (
        <div
            data-testid='appointment'
            className='appointment'
        >
            <p>Pet: <span>{ appointment.pet }</span></p>
            <p>Owner: <span>{ appointment.owner }</span></p>
            <p>Date: <span>{ appointment.date }</span> | Time: <span>{ appointment.hour }</span></p>
            <p>Symptoms: <span>{ appointment.symptoms }</span></p>

            <button
                data-testid='btn-delete'
                className='button delete u-full-width'
                onClick={ () => deleteAppointment(appointment.id) }
            >
                Delete
            </button>
        </div>
    );
};

// Documentation
Appointment.propTypes = {
    appointment: PropTypes.object.isRequired,
    deleteAppointment: PropTypes.func.isRequired
};

export default Appointment;