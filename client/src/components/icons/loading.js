import React, {Component} from 'react';
import {css} from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Loading extends Component {
    componentDidMount = () => {
        console.log("MOUNTED")
        const UTWtoken = localStorage.getItem('_underweather');
		if (!this.props.isLoggedIn && UTWtoken) {
            console.log(UTWtoken)
			return axios
				.post('/token', { token: UTWtoken })
				.then((user) => {
					if (!user.data) {
						return;
                    }
					window.history.pushState(null, '', '/dashboard')
                    this.props.setUser(user.data, {userId: user.data.userId})
				})
				.catch((err) => console.log(err));
        }
        this.props.setUser();
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