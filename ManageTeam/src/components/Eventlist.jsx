import React, { useState } from 'react';

const EventList = ({ events, onAssign, onUpdate, onDelete }) => {
    const [view, setView] = useState('pending'); // 'pending', 'today', 'finished'
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Separar eventos en finalizados, pendientes y de hoy
    const pendingEvents = events.filter(event => new Date(event.date) > currentDate);
    const finishedEvents = events.filter(event => new Date(event.date) < currentDate);
    const todayEvents = events.filter(event => new Date(event.date).toLocaleDateString() === currentDate.toLocaleDateString());

    const sortedPendingEvents = [...pendingEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedFinishedEvents = [...finishedEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedTodayEvents = [...todayEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

    const renderEvents = () => {
        switch (view) {
            case 'today':
                return sortedTodayEvents.map((event) => renderEventCard(event));
            case 'finished':
                return sortedFinishedEvents.map((event) => renderEventCard(event));
            case 'pending':
            default:
                return sortedPendingEvents.map((event) => renderEventCard(event));
        }
    };

    const renderEventCard = (event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        let bgColor = '#7f7f7d';
        if (eventDate < currentDate) {
            bgColor = 'red';
        } else if (eventDate.getTime() === currentDate.getTime()) {
            bgColor = 'green';
        }

        return (
            <div key={event.id} className='card-event' style={{ backgroundColor: bgColor }}>
                <p>{event.type}</p>
                <h1>{event.title}</h1>
                <p>{event.description}</p>
                <p>{eventDate.toLocaleDateString('en-CA')}</p>
                <button onClick={() => onAssign(event.id)}>Asignar</button>
                <button onClick={() => onUpdate(event.id)}>Editar</button>
                <button onClick={() => onDelete(event.id)}>Borrar</button>
            </div>
        );
    };

    return (
        <>
            <div>
                <button onClick={() => setView('pending')}>Fechas Pendientes</button>
                <button onClick={() => setView('today')}>Fechas de Hoy</button>
                <button onClick={() => setView('finished')}>Fechas Finalizados</button>
            </div>
            <section className='section-events'>

                {/* Render events based on selected view */}
                {renderEvents()}
            </section>
        </>
    );
};

export default EventList;
