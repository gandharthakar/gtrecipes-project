import React from 'react';
import ReactDOM from 'react-dom/client';
import WebRoutes from './WebRoutes/WebRoutes';
import './index.css';
import './jodit.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import {
	RouterProvider
} from "react-router-dom";
import ReduxStore from './redux-service/ReduxStore';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

if (import.meta.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

const apolloClient = new ApolloClient({
	uri: `${import.meta.env.VITE_BACKEND_URI_BASE}/graphql`,
	cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<Provider store={ReduxStore}>
				<RouterProvider router={WebRoutes} />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
)