import { useState } from 'react';

import TextButton from '../../components/TextButton';

export default function CopyButton({ value }: { value: string }) {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 500);
		}
	};

	return <TextButton onClick={copy}>{copied ? '[copied]' : '[copy]'}</TextButton>;
}
