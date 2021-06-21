import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../components/App';

test('<App /> First app load', () => {
    render(<App />);

    const appName = screen.getByTestId('app-name');
    expect(appName.tagName).toBe('H1');
    expect(appName.textContent).toBe('Patient Manager');

    expect(screen.getByText('Patient Manager')).toBeInTheDocument();
    expect(screen.getByText('No appointments')).toBeInTheDocument();
    expect(screen.getByText('Make Appointment')).toBeInTheDocument();

});

test('<App /> Add appointment and check conditional title', () => {
    render(<App />);
    const btnSubmit = screen.getByTestId('btn-submit');

    userEvent.type(screen.getByTestId('pet'), 'ThePet');
    userEvent.type(screen.getByTestId('owner'), 'TheOwner');
    userEvent.type(screen.getByTestId('date'), '2021-06-10');
    //userEvent.type(screen.getByTestId('hour'), '10:30');
    fireEvent.change(screen.getByTestId('hour'), { target: { value: '10:30' } });
    userEvent.type(screen.getByTestId('symptoms'), 'TheSymptom');

    userEvent.click(btnSubmit);

    const alert = screen.queryByTestId('alert');
    expect(alert).not.toBeInTheDocument();

    expect(screen.getByTestId('conditional-title').textContent).toBe('Manage your appointments');
    expect(screen.getByTestId('conditional-title').textContent).not.toBe('No appointments');

});

test('<App /> Check appointments on DOM', async () => {
    render(<App />);

    const appointments = await screen.findAllByTestId('appointment');
    // Snapshot creates a folder to check the content
    //expect(appointments).toMatchSnapshot();

    const deleteButton = screen.getByTestId('btn-delete');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.tagName).toBe('BUTTON');

    expect(screen.getByText('ThePet')).toBeInTheDocument();

});

test('<App /> Delete appointment', () => {
    render(<App />);

    const deleteButton = screen.getByTestId('btn-delete');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.tagName).toBe('BUTTON');

    userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
    expect(screen.queryByText('ThePet')).not.toBeInTheDocument();

});