import React, {Component} from 'react';
import {css} from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import Axios from 'axios';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Loading extends Component {

    componentDidMount(){
        this.props.onLoad();
        this.props.onClick(this.props.path)
    }

    render(){
        return (
            <div className='sweet-loading'>
              <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.props.loading}
              />
            </div> 
          )
    }
}

export default Loading;