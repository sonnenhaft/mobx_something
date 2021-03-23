import React from 'react';
import { EditCardPage } from './EditCardPage';
import { render, screen } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('should render "Edit" state', async () => {
    render(warpWithRouter(<EditCardPage />, 'route/:id', 'route/1'));
    expect((await screen.findAllByText('Edit')).length).toEqual(1);
});

it('should render "Add" state', async () => {
    render(warpWithRouter(<EditCardPage />, 'route', 'route'));
    expect((await screen.findAllByText('Add')).length).toEqual(1);
});

export const warpWithRouter = (
    children: any,
    path: string,
    initialPath: string
) => (
    <MemoryRouter initialEntries={[initialPath]}>
        <Route path={path}>{children}</Route>
    </MemoryRouter>
);
