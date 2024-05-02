import { MouseEventHandler, PropsWithChildren } from 'react';

import PanelItem from './PanelItem';
import Toggle from './Toggle';

export default function PanelItemToggle({
	children,
	label,
	value,
	onClick,
}: PropsWithChildren<{ label?: string; value: boolean; onClick: MouseEventHandler }>) {
	return (
		<PanelItem>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: 18,
				}}
			>
				{label}
				<Toggle value={value} onClick={onClick} />
			</div>
		</PanelItem>
	);
}
