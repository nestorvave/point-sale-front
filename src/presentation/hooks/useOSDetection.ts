import { useEffect, useState } from 'react';

export const useOSDetection = () => {
	const [os, setOS] = useState<null | 'MacOS' | 'Windows'>(null);

	useEffect(() => {
		const userAgent = window.navigator.userAgent;

		if (userAgent.match(/Macintosh|Mac OS X/i)) {
			return setOS('MacOS');
		}
		return setOS('Windows');
	}, []);

	return os;
};
