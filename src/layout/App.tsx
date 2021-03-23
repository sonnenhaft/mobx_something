import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle, default as styled } from 'styled-components';

import { CardsListPage } from 'pages/CardsListPage';
import { EditCardPage } from 'pages/EditCardPage';
import { Menu } from './Menu';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }
`;

const Centered = styled.div`
    display: flex;
    justify-content: center;
`;

const links = [
    { path: '/', name: 'Home', component: CardsListPage, exact: true },
    { path: '/create', name: 'Create', component: EditCardPage },
    { path: '/edit/:id', component: EditCardPage }
];

export const App = () => (
    <Router>
        <React.Fragment>
            <GlobalStyle />
            <Menu links={links} />

            <Centered>
                {links.map(item => (
                    <Route
                        exact={item.exact}
                        key={item.path + item.name}
                        path={item.path}
                        component={item.component}
                    />
                ))}
            </Centered>
        </React.Fragment>
    </Router>
);
