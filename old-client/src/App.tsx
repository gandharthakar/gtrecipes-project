import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './components/website/SiteHeader';
import SiteFooter from './components/website/SiteFooter';
import { useEffect } from 'react';

function App() {

	const { pathname } = useLocation();

	useEffect(() => {
		// "document.documentElement.scrollTo" is the magic for React Router Dom v6
		document.documentElement.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant", // Optional if you want to skip the scrolling animation
		});
	}, [pathname]);

	return (
		<>
			<SiteHeader />
			<Outlet />
			<SiteFooter />
		</>
	)
}

export default App;