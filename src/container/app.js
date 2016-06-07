import React, { Component } from 'react';
import Button from '../components/Button/Button';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render(){
        return (
            <div className="text-center">
                <Button />
                <span className="glyphicon glyphicon-asterisk"></span>
            </div>
        );
    }
}

export default App;