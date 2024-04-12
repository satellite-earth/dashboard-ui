import { useState } from 'react';

import { COLORS } from '../../constants';
import styled from '@emotion/styled';
import TextButton from '../../components/TextButton';

const StyledPanel = styled.div`
	padding: 18px;
	border-radius: 12px;
	margin-bottom: 12px;
	background: ${COLORS.primary};
	display: flex;
	flex-direction: column;

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18px;
	}

	.title {
		font-size: 1rem;
	}
`;

function Panel({ label, children, className = '' }) {
	const [open, setOpen] = useState(true);

	return (
		<StyledPanel className={className}>
			<div className="header">
				<div className="title">{label}</div>
				<TextButton onClick={() => setOpen(!open)} type="button">
					[-]
				</TextButton>
			</div>
			{open && children}
		</StyledPanel>
	);
}

export default Panel;
