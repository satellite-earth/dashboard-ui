import { FormEventHandler, useEffect, useState } from 'react';
import { NostrEvent, nip42 } from 'nostr-tools';
import styled from '@emotion/styled';

import Input from '../Common/Input';
import TextButton from '../../components/TextButton';
import Panel from '../Common/Panel';
import NodeInterface from '../../interfaces/Node';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Layout = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledPanel = styled(Panel)`
	min-width: 4in;
	gap: 1em;
`;

export default function LoginView() {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const [authStr, setAuthStr] = useState(search.get('auth') ?? '');

	const authenticate = async (auth: string | NostrEvent) => {
		setLoading(true);
		try {
			// @ts-expect-error
			const node: NodeInterface = window.node;
			await node.authenticate(auth);

			if (node.authenticated) navigate('/', { replace: true });
		} catch (error) {
			if (error instanceof Error) alert(error.message);
		}
		setLoading(false);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		await authenticate(authStr);
	};

	const [loading, setLoading] = useState(false);
	const loginWithNip07 = async () => {
		setLoading(true);
		try {
			if (!window.nostr) throw new Error('Missing NIP-07 extension');

			// NOTE: find a better way to get the node
			// @ts-expect-error
			const node: NodeInterface = window.node;
			if (!node.ws) throw new Error('Node not connected');

			const draft = nip42.makeAuthEvent(node.ws.url, node.challenge);
			const authEvent = await window.nostr.signEvent(draft);

			await authenticate(authEvent);
		} catch (error) {
			if (error instanceof Error) alert(error.message);
		}
		setLoading(false);
	};

	// automatically send the auth if its set on mount
	useEffect(() => {
		if (authStr) authenticate(authStr);
	}, []);

	return (
		<Layout onSubmit={handleSubmit}>
			<StyledPanel label="Login">
				{loading ? (
					<p style={{ marginInline: 'auto', marginBlock: 0 }}>Loading...</p>
				) : (
					<>
						<label htmlFor="auth">Auth Code</label>
						<Input id="auth" name="auth" value={authStr} onChange={(e) => setAuthStr(e.target.value)} />
						<TextButton type="submit" style={{ marginLeft: 'auto' }}>
							[Login]
						</TextButton>
						{window.nostr && (
							<>
								<p style={{ marginInline: 'auto', marginBlock: 0 }}>--OR--</p>
								<TextButton type="button" onClick={loginWithNip07}>
									[Login with NIP-07]
								</TextButton>
							</>
						)}
					</>
				)}
			</StyledPanel>
		</Layout>
	);
}
