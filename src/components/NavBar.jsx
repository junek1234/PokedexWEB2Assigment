import NavBtn from './NavBtn';

export default function NavBar() {
    return (
        <nav className="navbar" aria-label="Main navigation">
            <NavBtn route="/" label="Pokedex" />
            <NavBtn route="/about" label="About" />
        </nav>
    );
}