import { useState, useEffect } from "react";

const useScroll = () => {
	const [scroll, setScroll] = useState<boolean>(false);
    const [scrollToTop, setScrollToTop] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 50);
            setScrollToTop(window.scrollY > 550);
		});
	}, []);

	return {scroll,scrollToTop};
};

export default useScroll;
