import { useState } from 'react';
import { registerEmployee } from '../services/employeeService';

export const RegisterEmployeeForm = ({ manager_id }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegisterEmployee = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await registerEmployee(name, email, password, manager_id);
            setSuccess('Empleado registrado')
        } catch (err) {
            setError('Error en el registro. Inténtalo de nuevo.');
        }
    };

    return (
        <form onSubmit={handleRegisterEmployee}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button type="submit">Registrar Empleado</button>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </form>
    );
};
