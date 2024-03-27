import { useState } from 'react';

import { COLORS } from '../../constants';
import styled from '@emotion/styled';
import TextButton from './TextButton.jsx';

const StyledPanel = styled.div`
	padding: 18px;
	border-radius: 12px;
	margin-bottom: 12px;
	background: ${COLORS.primary};

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18px;
	}
`;

function Panel({ label, children }) {
	const [open, setOpen] = useState(true);

	return (
		<StyledPanel>
			<div className="header">
				<div>
					{/* <div style={{ marginRight: 4 }}>[icon]</div> */}
					<div>{label}</div>
				</div>
				<TextButton onClick={() => setOpen(!open)}>[-]</TextButton>
			</div>
			{open && children}
		</StyledPanel>
	);
}

export default Panel;
