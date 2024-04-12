import useClientSize from '../../hooks/use-client-size';
import { CONTENT_MAX_WIDTH, MOBILE_BREAKPOINT } from '../../constants';
import Header from '../Header';
import Dashboard from '../Dashboard';
import StatusLog from '../StatusLog';

export default function DashboardLayout() {
	const { width } = useClientSize();

	if (width < MOBILE_BREAKPOINT) {
		// mobile layout
		return (
			<div>
				<div
					style={{
						background: '#000',
						paddingTop: 12,
						height: 60,
						position: 'fixed',
						width: width - 24,
						top: 0,
						left: 12,
						zIndex: 1,
					}}
				>
					<Header />
				</div>
				<div
					style={{
						paddingTop: 72,
						paddingLeft: 12,
						paddingRight: 12,
					}}
				>
					<Dashboard />
				</div>
			</div>
		);
	}

	// desktop layout
	return (
		<div>
			<div
				style={{
					background: '#000',
					paddingTop: 12,
					height: 60,
					position: 'fixed',
					width: Math.min(width, CONTENT_MAX_WIDTH) - 24,
					top: 0,
					left: (width > CONTENT_MAX_WIDTH ? (width - CONTENT_MAX_WIDTH) / 2 : 0) + 12,
					zIndex: 1,
				}}
			>
				<Header />
			</div>
			<div>
				<div
					style={{
						width: Math.min(width, CONTENT_MAX_WIDTH) / 2 - 6,
						paddingTop: 72,
						paddingLeft: width > CONTENT_MAX_WIDTH ? (width - CONTENT_MAX_WIDTH) / 2 : 0,
					}}
				>
					<div
						style={{
							paddingLeft: 12,
						}}
					>
						<Dashboard />
					</div>
				</div>
				<div
					style={{
						width: Math.min(width, CONTENT_MAX_WIDTH) / 2 - 18,
						position: 'fixed',
						top: 72,
						right: (width > CONTENT_MAX_WIDTH ? (width - CONTENT_MAX_WIDTH) / 2 : 0) + 12,
					}}
				>
					<StatusLog />
				</div>
			</div>
		</div>
	);
}
