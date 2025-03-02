import React from 'react';
import { deleteAssignments, registerAssignments } from '../services/assignmentsService';

const AssignEventPopup = ({ selectedEventId, employees, selectedEmployees, setSelectedEmployees, onClose }) => {

    const handleCheckboxChange = async (e) => {
        const employeeId = parseInt(e.target.value, 10);
        const isChecked = e.target.checked;

        setSelectedEmployees(prev =>
            isChecked ? [...prev, employeeId] : prev.filter(id => id !== employeeId)
        );

        if (!isChecked) {
            try {
                await deleteAssignments(selectedEventId, employeeId);
            } catch (err) {
                console.error("Error al eliminar asignación:", err);
            }
        } else {
            try {
                await registerAssignments(selectedEventId, employeeId);
            } catch (err) {
                console.error("Error al eliminar asignación:", err);
            }
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <button onClick={onClose}>Cerrar</button>
                <h2>Asignar empleados</h2>
                {employees.map(employee => (
                    <label key={employee.id}>
                        <input
                            type="checkbox"
                            value={employee.id}
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={handleCheckboxChange}
                        />
                        {employee.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default AssignEventPopup;
