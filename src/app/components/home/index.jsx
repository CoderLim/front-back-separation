import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class extends Component {
  render = () => <div>
    <h1>This is a Home Page.</h1>
    <Link to="/about">about</Link>
  </div>;
}
