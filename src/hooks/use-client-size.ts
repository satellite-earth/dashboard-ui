import { useEffect, useState } from 'react';

export default function useClientSize() {
	const [width, setWidth] = useState(document.documentElement.clientWidth);
	const [height, setHeight] = useState(document.documentElement.clientHeight);

	useEffect(() => {
		const listener = () => {
			setWidth(document.documentElement.clientWidth);
			setHeight(document.documentElement.clientHeight);
		};

		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	});

	return { width, height };
}
