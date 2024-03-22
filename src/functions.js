import { nip19 } from 'nostr-tools';

export const formatDataSize = (n, options = {}) => {
	if (options.kBMin && n < 1000) {
		return '0 KB';
	}

	if (n < 1000) {
		return `${n} B`;
	} else if (n < 1000000) {
		return `${Math.round(n / 1000)} KB`;
	} else if (n < 1000000000) {
		return `${(n / 1000000).toFixed(n > 100000000 ? 0 : 1)} MB`;
	} else {
		return `${(n / 1000000000).toFixed(1)} GB`;
	}
};

export const normalizeId = (input) => {
	let npub, pubkey;

	try {
		if (input.indexOf('npub1') === 0) {
			const decoded = nip19.decode(input);

			if (decoded.type === 'npub') {
				pubkey = decoded.data;
				npub = input;
			}
		} else {
			npub = nip19.npubEncode(input);
			pubkey = input;
		}
	} catch (err) {
		console.log(err);
	}

	return { npub, pubkey };
};

// Deduplicate array while preserving order
export const uniqueArray = (values) => {
	const unique = [];

	for (let value of values) {
		if (unique.indexOf(value) === -1) {
			unique.push(value);
		}
	}

	return unique;

	// const set = new Set(values);

	// return Array.from(set);
};
