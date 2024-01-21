import React from 'react';
import ReactDOM from 'react-dom/client';
import WebRoutes from './WebRoutes/WebRoutes';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import {
	RouterProvider
} from "react-router-dom";
import ReduxStore from './redux-service/ReduxStore';
import { Provider } from 'react-redux';

const apolloClient = new ApolloClient({
	uri: 'http://localhost:48256/graphql',
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