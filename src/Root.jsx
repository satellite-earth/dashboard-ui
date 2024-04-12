import { Provider } from 'react-redux';
import './Root.css';

import Model from './model';
import App from './views';

export default function Root() {
	return (
		<Provider store={Model}>
			<App />
		</Provider>
	);
}
