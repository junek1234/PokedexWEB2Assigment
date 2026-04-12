import PokemonNode from "./PokemonNode";

export default function PokemonTable({pokemonList}) {
	return (
		<section className="pokemon-table" aria-label="Pokemon list">
			{pokemonList.map((pokemon) => (
				<PokemonNode
					key={pokemon.number}
					pokemon={pokemon}
				/>
			))}
		</section>
	);
}

