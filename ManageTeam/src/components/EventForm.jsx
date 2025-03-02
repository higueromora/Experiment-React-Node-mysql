import React, { useState } from 'react';
import { registerEvent } from '../services/eventService';

const EventForm = ({ fetchEvents, managerId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('task');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerEvent(title, description, date, type, managerId);
        setTitle(''); setDescription(''); setDate(''); setType('task');
        fetchEvents();
    };

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="input-field"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="input-field"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="select-field"
            >
                <option value="task">Tarea</option>
                <option value="meeting">Reunión</option>
            </select>
            <button type="submit" className="submit-btn">Guardar evento</button>
        </form>

    );
};

export default EventForm;
