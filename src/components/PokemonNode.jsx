
import { useNavigate } from 'react-router-dom';

export default function PokemonNode({ pokemon }) {
	const navigate = useNavigate();
	const { number, name, imgUrl, mainColor } = pokemon || {};

	const formattedNumber =
		number === undefined || number === null || number === ''
			? '#?'
			: `#${String(number).replace('#', '')}`;

	const handleOpenDetails = () => {
		if (!name) {
			return;
		}

		navigate(`/pokemon/${name}`, { state: { pokemon } });
	};

	return (
		<div
			className="pokemon-node"
			style={{ backgroundColor: mainColor || '#87b97d' }}
			onClick={handleOpenDetails}
			onKeyDown={() => {
				handleOpenDetails();
			}}
			role="button"
			tabIndex={0}
			aria-label={name ? `Open details for ${name}` : 'Open Pokemon details'}
		>
			<div className="pokemon-node-text">
				<p className="pokemon-node-number">{formattedNumber}</p>
				<p className="pokemon-node-name">{name}</p>
			</div>

			{imgUrl ? (
				<img
					className="pokemon-node-image"
					src={imgUrl}
					alt={name ? `${name} sprite` : 'Pokemon sprite'}
				/>
			) : null}
		</div>
	);
}