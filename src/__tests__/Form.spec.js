import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';

const addAppointment = jest.fn();

test('<Form /> Loading form and check everything works', () => {
    // const wrapper = render(<Form />);
    // wrapper.debug();

    render(<Form addAppointment={ addAppointment } />);

    // Heading
    const title = screen.getByTestId('title');
    expect(title.tagName).toBe('H2');
    expect(title.tagName).not.toBe('H1');
    expect(title.textContent).toBe('Make Appointment');
    expect(screen.getByText('Make Appointment')).toBeInTheDocument();

    // Button
    const btnSubmit = screen.getByTestId('btn-submit');
    expect(btnSubmit.tagName).toBe('BUTTON');
    expect(btnSubmit.textContent).toBe('Confirm');

});

test('<Form /> Form validation', () => {
   
    render(<Form addAppointment={ addAppointment } />);

    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    const alert = screen.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe('All fields required');
    expect(alert.tagName).toBe('P');

});

test('<Form /> Set appointment', () => {

    render(<Form addAppointment={ addAppointment } />);

    userEvent.type(screen.getByTestId('pet'), 'ThePet');
    userEvent.type(screen.getByTestId('owner'), 'TheOwner');
    userEvent.type(screen.getByTestId('date'), '2021-06-10');
    //userEvent.type(screen.getByTestId('hour'), '10:30');
    fireEvent.change(screen.getByTestId('hour'), {
        target: { value: '10:30' }
    }) 
    userEvent.type(screen.getByTestId('symptoms'), 'TheSymptom');

    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    const alert = screen.queryByTestId('alert');
    expect(alert).not.toBeInTheDocument();

    expect(addAppointment).toHaveBeenCalled();
    expect(addAppointment).toHaveBeenCalledTimes(1);
    
});
