import React from 'react';
import { EditCardPage } from './EditCardPage';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { warpWithRouter } from './EditCardPage.testting-library.test';
import { pause } from '../utils';

Enzyme.configure({ adapter: new Adapter() });

// it('pause check', async () => {
//     await pause(0.1);
// }, 101);

describe('<EditCardPage />', () => {
    it('initially to have loading', async () => {
        // I kill here delay form my Cards resource
        // alternatively I can override all its methods during test
        // after this step I will start applying mobx
        pause.disabled = true;
        const component = mount(
            warpWithRouter(<EditCardPage />, 'route/:id', 'route/1')
        );
        expect(component.text()).toContain('Loading...');
        expect(component.text()).not.toContain('Create');
        await pause(0);
        expect(component.text()).toContain('Edit');
    });

    it('initially to show "Create" button if no id presented in router', () => {
        const component = mount(
            warpWithRouter(<EditCardPage />, 'route', 'route')
        );
        expect(component.text()).not.toContain('Loading...');
        expect(component.text()).toContain('Create');
    });
});
