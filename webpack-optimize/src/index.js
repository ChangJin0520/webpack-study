// import jquery from 'jquery';
// import moment from 'moment';

// console.log(moment().endOf('day').fromNow());

// import React from 'react'
// import { render } from 'react-dom'

// render(<h1>jsx</h1>, window.root)

import jin from './str.js'

console.log(jin)


if (module.hot) {
    module.hot.accept('./str.js', () => {
        let jin = require('./str.js')
        console.log(jin)
    })
}
