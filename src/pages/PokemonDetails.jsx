import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function PokemonDetails() {
  const location = useLocation();
  const pokemon = location.state?.pokemon;
  if (pokemon == null) {
    return (
      <>
        <NavBar />
        <div className="pokemon-details">
          <h1>{"Error"}</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <div className="pokemon-details">
        <h1>{pokemon.name}</h1>
          <>
            <section
              className="pokemon-details-hero"
              style={{ backgroundColor: pokemon.displayColor }}
            >
              <p className="pokemon-details-number">
                {pokemon.displayNumber ? `#${pokemon.displayNumber}` : ""}
              </p>
              {pokemon.displayImage ? (
                <img
                  className="pokemon-details-image"
                  src={pokemon.displayImage}
                  alt={pokemon.displayName ? `${pokemon.displayName} sprite` : "Pokemon sprite"}
                />
              ) : null}
            </section>

            <section className="pokemon-details-grid">
              <div className="pokemon-details-card">
                <h2>Type(s)</h2>
                <p>{pokemon.types.join(", ") || "-"}</p>
              </div>

              <div className="pokemon-details-card">
                <h2>Abilities</h2>
                <ul>
                  {pokemon.abilities.map((ability) => (
                    <li key={ability}>{ability}</li>
                  ))}
                </ul>
              </div>

              <div className="pokemon-details-card">
                <h2>Stats</h2>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.name}>
                      <span>{stat.name}</span>
                      <strong>{stat.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pokemon-details-card">
                <h2>Measurements</h2>
                <p>Height: {pokemon.heightMeters ? `${pokemon.heightMeters} m` : "-"}</p>
                <p>Weight: {pokemon.weightKg ? `${pokemon.weightKg} kg` : "-"}</p>
              </div>
            </section>
          </>
      </div>
    </>
  );
}
