import { render } from '@wordpress/element';
import App from './App';

const container = document.getElementById( 'mrkwp-freemius-styling-app' );
if ( container ) {
	render( <App />, container );
}
