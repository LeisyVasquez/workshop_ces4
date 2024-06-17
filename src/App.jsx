import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import UserProvider from './context/UserProvider';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Play from './pages/Play';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<UserProvider>
					<Navbar />
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/play' element={<Play />} />
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</UserProvider>
			</BrowserRouter>
		</>
	);
};

export default App;
