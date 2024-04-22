import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

const StyledButton = styled.button`
	margin: 0;
	background: none;
	border: none;
	color: inherit;
	font-family: inherit;
	cursor: pointer;
	padding: 0;
`;

export default function TextButton({
	children,
	isLoading,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
	return <StyledButton {...props}>{isLoading ? '[Loading...]' : children}</StyledButton>;
}
