import React, { useState } from 'react';
import { updateEvent } from '../services/eventService';



export const UpdateEventPopup = ({ onClose, fetchEvents, selectedEventId }) => {  // Accept onClose as a prop
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('task');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateEvent(title, description, date, type, selectedEventId);
        setTitle(''); setDescription(''); setDate(''); setType('task');
        fetchEvents();
    };
    return (
        <div className="popup">
            <div className="popup-content">
                <button onClick={onClose}>Cerrar</button>
                <h1>Actualizar evento</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="task">Tarea</option>
                        <option value="meeting">Reunión</option>
                    </select>
                    <button type="submit">Guardar evento</button>
                </form>
            </div>
        </div>
    );
};
