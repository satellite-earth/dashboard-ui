import { PropsWithChildren, useState } from 'react';

import PanelItem from './PanelItem';
import TextButton from '../../components/TextButton';
import CopyButton from './CopyButton';
import QrCodeSvg from '../../components/QrCodeSvg';

export default function PanelItemString({
	children,
	label,
	value,
	qr,
	onConfigClicked,
}: PropsWithChildren<{
	onConfigClicked?: () => void;
	label: string;
	value: string;
	qr?: boolean;
}>) {
	const [showQR, setShowQR] = useState(false);

	return (
		<PanelItem>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<div>{label}</div>
					<input
						value={value}
						readOnly
						style={{
							width: '100%',
							marginLeft: 12,
							paddingRight: 12,
							color: '#FFF',
							background: 'transparent',
							border: 'none',
							outline: 'none',
							fontFamily: 'monospace',
						}}
					/>
					<CopyButton value={value} />
					{qr && <TextButton onClick={() => setShowQR((v) => !v)}>[qr]</TextButton>}
				</div>
				{onConfigClicked ? <div onClick={onConfigClicked}>[config]</div> : null}
			</div>
			{showQR && <QrCodeSvg content={value} style={{ maxWidth: '3in', marginTop: '1em' }} />}
			{children}
		</PanelItem>
	);
}
