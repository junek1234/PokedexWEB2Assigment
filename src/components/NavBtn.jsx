import { NavLink } from 'react-router-dom';

export default function NavBtn({ route, label }) {
    return (
        <NavLink
            to={route}
            className={({ isActive }) => `nav-button${isActive ? ' active' : ''}`}
        >
            {label}
        </NavLink>
    );
}