import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

describe('List component:', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<List cards={[]}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

})