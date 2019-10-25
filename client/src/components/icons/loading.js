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
        const UTWtoken = sessionStorage.getItem('_underweather') || localStorage.getItem('_underweather');
		if (!this.props.isLoggedIn && UTWtoken) {
			return axios
				.post('/token', { token: UTWtoken })
				.then((user) => {console.log(user)
					if (!user.data) {
            return  this.props.setUser();
                    }
					window.history.pushState(null, '', '/dashboard')
                    this.props.setUser(user.data, {userId: user.data.userId})
				})
				.catch(err=>console.log(err));
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