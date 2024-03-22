import { COLORS } from '../../constants';

export default ({ onClick, value }) => {
	return (
		<div
			onClick={onClick}
			style={{
				height: 18,
				width: 32,
				borderRadius: 12,
				background: value ? COLORS.green : `rgb(41, 42, 43)`,
				padding: 1,
				cursor: 'pointer',
				transition: 'background 0.1s ease',
			}}
		>
			<div
				style={{
					height: 18,
					width: 18,
					background: 'rgb(230, 230, 230)',
					borderRadius: 12,
					transform: `translate(${value ? 14 : 0}px)`,
					transition: 'transform 0.1s ease',
				}}
			/>
		</div>
	);
};
