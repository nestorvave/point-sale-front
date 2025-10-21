import { useEffect } from 'react';

export const useClickOutside = (
	setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
	selectRef: React.RefObject<HTMLDivElement>
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (selectRef.current && !selectRef.current.contains(event.target as any)) {
				setOpenMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
};
