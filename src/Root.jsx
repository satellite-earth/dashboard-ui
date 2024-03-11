import { Provider } from 'react-redux';
import './Root.css'

import Model from './model';
import Views from './views';

export default function Root() {

	return (
		<Provider store={Model}>
			<Views />
		</Provider>
	);

};
