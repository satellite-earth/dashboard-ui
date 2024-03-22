import { COLORS } from '../../constants';

export default ({ onClick, selected }) => {
	return (
		<div
			onClick={onClick}
			style={{
				height: 15,
				width: 15,
				borderRadius: 12,
				cursor: 'pointer',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: selected ? COLORS.green : COLORS.secondaryBright,
				border: `1px solid ${selected ? COLORS.secondaryBright : COLORS.secondary}`,
			}}
		>
			<div
				style={{
					height: 7,
					width: 7,
					borderRadius: 12,
					background: selected ? '#fff' : COLORS.secondary,
				}}
			/>
		</div>
	);
};
