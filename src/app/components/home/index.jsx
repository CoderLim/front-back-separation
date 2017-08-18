import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import reqwest from 'reqwest';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //
    // Http request should not be placed in `constructor` method,
    // Otherwise, you will encounter something wrong.
    //
    reqwest({
      url: 'api/cmdb/server/search',
      type: 'json'
    }).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }

  render = () => <div>
    <h1>This is a Home Page.</h1>
    <Link to="/about">about</Link>
  </div>;
}
