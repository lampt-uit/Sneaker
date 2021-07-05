import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainPages from './components/mainpages/Pages';
import ButtonToTop from './components/mainpages/utils/ButtonToTop/ButtonToTop';
import { DataProvider } from './GlobalState';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<DataProvider>
			<Router>
				<div className='App'>
					<Header />
					<MainPages />
					<ButtonToTop />
					<Footer />
				</div>
			</Router>
		</DataProvider>
	);
}

export default App;
