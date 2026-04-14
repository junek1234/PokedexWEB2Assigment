import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonTable from "../components/PokemonTable";
import TableBtn from "../components/TableBtn";

function toTitleCase(value) {
  if (!value) {
    return "";
  }

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const TYPE_COLORS = {
  normal: "#b7b7aa",
  fire: "#ff9d55",
  water: "#63b3ff",
  electric: "#ffd84a",
  grass: "#7ecf7a",
  ice: "#98e7ff",
  fighting: "#e18a6b",
  poison: "#bb8fdf",
  ground: "#d9bf6c",
  flying: "#9fbfff",
  psychic: "#ff8fb1",
  bug: "#a8c85b",
  rock: "#c6b889",
  ghost: "#8c7ac9",
  dragon: "#8d8df0",
  dark: "#8a7a6f",
  steel: "#b8b8d0",
  fairy: "#f7b6e6",
};

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pageNr, setPageNr] = useState(0);
  const pageNumUp = () => setPageNr(pageNr + 1);
  const pageNumDown = () =>
    setPageNr(Math.max(pageNr - 1, 0));
  const limit=12;
  const offset=limit*pageNr;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      );
      const data = await response.json();
      const detailPromises = data.results.map((p) =>
        fetch(p.url).then((res) => res.json()),
      );
      const detailedList = await Promise.all(detailPromises);

      const formattedData = detailedList.map((p) => {
        const primaryType =
          p.types.find((typeInfo) => typeInfo.slot === 1)?.type.name ||
          p.types[0]?.type.name ||
          "normal";

        const displayImage =
          p.sprites.other?.["official-artwork"]?.front_default ||
          p.sprites.front_default;

        const types = p.types
          .sort((a, b) => a.slot - b.slot)
          .map((typeInfo) => toTitleCase(typeInfo.type.name));

        const abilities = p.abilities.map((abilityInfo) => {
          const label = toTitleCase(abilityInfo.ability.name);
          return abilityInfo.is_hidden ? `${label} (Hidden)` : label;
        });

        const stats = p.stats.map((statInfo) => ({
          name: toTitleCase(statInfo.stat.name),
          value: statInfo.base_stat,
        }));

        return {
          number: p.id,
          name: p.name,
          imgUrl: p.sprites.front_default,
          mainColor: TYPE_COLORS[primaryType] || "gray",
          displayName: toTitleCase(p.name),
          displayNumber: p.id,
          displayImage,
          displayColor: TYPE_COLORS[primaryType] || "#87b97d",
          types,
          abilities,
          stats,
          heightMeters: (p.height / 10).toFixed(1),
          weightKg: (p.weight / 10).toFixed(1),
        };
      });

      setPokemonList(formattedData);
    };

    fetchData();
  }, [offset]);

  return (
    <>
      <NavBar />
      <h1>Pokedex</h1>
      <PokemonTable pokemonList={pokemonList} />
      <div className="table-btn-row" aria-label="Pagination controls">
        <TableBtn direction="left" onClick={pageNumDown} />
        <TableBtn direction="right" onClick={pageNumUp} />
      </div>
    </>
  );
}
