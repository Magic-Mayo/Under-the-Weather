import React, {Component} from 'react';
import {css} from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';
import axios from 'axios';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: fixed;
    top: 30%;
    left: 40%;
    transform: translateX(-50%);
`;

class Loading extends Component {
    componentDidMount = () => {
        const UTWtoken = sessionStorage.getItem('_underweather') || localStorage.getItem('_underweather');
		if (!this.props.isLoggedIn && UTWtoken) {
			return axios
				.post('/token', { token: UTWtoken })
				.then((user) => {
					if (!user.data) {
						return this.props.setUser();
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
            <div className='loading'>
              <PacmanLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#FF8D7B'}
                loading={this.props.loading}
              />
            </div> 
          )
    }
}

export default Loading;