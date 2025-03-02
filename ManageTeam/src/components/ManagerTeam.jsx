import React, { useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvent } from '../services/eventService';
import { getIdNameEmployee } from '../services/employeeService';
import { getEmployeeID_Assignments } from '../services/assignmentsService';
import EventForm from './EventForm';
import EventList from './EventList';
import AssignEventPopup from './AssignEventPopup';
import { DeleteEventPopup } from './DeleteEventPopup';
import { UpdateEventPopup } from './UpdateEventPopup';
import { RegisterEmployeeForm } from './RegisterEmployeeForm';
import { popupReducer, initialState } from '../reducers/popupReducer';  // Import the reducer

const ManagerTeam = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(localStorage.getItem('name'));
    const [managerId, setManagerId] = useState(localStorage.getItem('managerId'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [error, setError] = useState('');
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('events');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Use the reducer from the imported file
    const [state, dispatch] = useReducer(popupReducer, initialState);

    useEffect(() => {
        if (!managerId || !name) navigate('/login');
    }, [managerId, navigate]);

    useEffect(() => {
        if (!managerId) {
            setError("No se encontró un managerId.");
            return;
        }
        const fetchEmployees = async () => {
            try {
                const { data } = await getIdNameEmployee(managerId);
                setEmployees(data);
            } catch (err) {
                console.error(err);
                setError("Error al obtener empleados.");
            }
        };
        fetchEmployees();
    }, [managerId]);

    const fetchEvents = async () => {
        if (!managerId) return;
        try {
            const { data } = await getEvent(managerId);
            setEvents(data);
        } catch (err) {
            console.error(err);
            setError("Error al obtener eventos.");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [managerId]);

    const handleAssignEvent = async (eventId) => {
        dispatch({ type: 'SHOW_ASSIGN_POPUP', eventId });
        try {
            const { data } = await getEmployeeID_Assignments(eventId);
            setSelectedEmployees(data.map(emp => emp.employee_id));
        } catch (err) {
            console.error("Error al obtener empleados asignados:", err);
            setError("No se pudieron cargar los empleados asignados.");
        }
    };

    const handleUpdateEvent = async (eventId) => {
        dispatch({ type: 'SHOW_UPDATE_POPUP', eventId });
        try {
            const { data } = await getEmployeeID_Assignments(eventId);
            setSelectedEmployees(data.map(emp => emp.employee_id));
        } catch (err) {
            console.error("Error al obtener empleados asignados:", err);
            setError("No se pudieron cargar los empleados asignados.");
        }
    };

    const handleDeleteEvent = async (eventId) => {
        dispatch({ type: 'SHOW_DELETE_POPUP', eventId });
        try {
            const { data } = await getEmployeeID_Assignments(eventId);
            setSelectedEmployees(data.map(emp => emp.employee_id));
        } catch (err) {
            console.error("Error al obtener empleados asignados:", err);
            setError("No se pudieron cargar los empleados asignados.");
        }
    };

    const closePopup = () => {
        dispatch({ type: 'CLOSE_POPUP' });
    };


    return (
        <>
            <button onClick={() => navigate('/login')}>Cerrar Sesión</button>
            <h1>Hola {name}</h1>

            <div>
                <button onClick={() => setView('events')}>Ver Eventos</button>
                <button onClick={() => setView('register')}>Registrar Empleado</button>
            </div>
            {view === 'events' && (
                <>
                    <EventForm fetchEvents={fetchEvents} managerId={managerId} />
                    <EventList
                        events={events}
                        onAssign={handleAssignEvent}
                        onUpdate={handleUpdateEvent}
                        onDelete={handleDeleteEvent}
                    />
                </>
            )}

            {state.showPopupEvent && (
                <AssignEventPopup
                    selectedEventId={state.selectedEventId}
                    employees={employees}
                    selectedEmployees={selectedEmployees}
                    setSelectedEmployees={setSelectedEmployees}
                    onClose={closePopup}
                />
            )}
            {state.showPopupEventDelete && (
                <DeleteEventPopup
                    selectedEventId={state.selectedEventId}
                    onClose={closePopup}
                    fetchEvents={fetchEvents}
                    managerId={managerId}
                />
            )}
            {state.showPopupEventUpdate && (
                <UpdateEventPopup
                    selectedEventId={state.selectedEventId}
                    onClose={closePopup}
                    fetchEvents={fetchEvents}
                    managerId={managerId}
                />
            )}



            {view === 'register' &&
                <RegisterEmployeeForm manager_id={managerId} />
            }
        </>
    );
};

export default ManagerTeam;
