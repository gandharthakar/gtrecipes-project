import { Outlet } from 'react-router-dom';
import SiteHeader from './components/website/SiteHeader';
import SiteFooter from './components/website/SiteFooter';

function App() {
	return (
		<>
			<SiteHeader />
			<Outlet />
			<SiteFooter />
		</>
	)
}

export default App;