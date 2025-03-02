import React, { useState } from 'react';
import { deleteEvent } from '../services/eventService';

export const DeleteEventPopup = ({ onClose, fetchEvents, selectedEventId }) => {
    const handleDelete = async () => {
        if (!selectedEventId) return;

        await deleteEvent(selectedEventId);
        fetchEvents(); // Refrescar eventos tras eliminar
        onClose(); // Cerrar popup
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h1>¿Estás seguro de eliminar este evento?</h1>
                <button onClick={handleDelete}>Eliminar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};
