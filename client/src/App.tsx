import { Outlet } from 'react-router-dom';
import Header from './components/website/Header';

function App() {
	return (
		<>
			<Header />
			<Outlet />
			<h1 className="twgtr-text-2xl twgtr-font-bold">footer</h1>
		</>
	)
}

export default App;