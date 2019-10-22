import React, { Component } from 'react';
import Search from './Search';
export default class ProviderForm extends Component {
    state = {
        searchActive: true
    }
    toggleOption = (e) => {
        e.persist();

        const active = e.target.className.includes('search') ? true : false

        this.setState({
            searchActive: active,
        })

    }
	render() {
		return (
			<div className="provider-form-container">
				<div className="provider-form-options">
					<button type="button" className="provider-form-options-search" onClick={this.toggleOption}>
						Search By Specialty
					</button>
					<button type="button" className="provider-form-options-manual" onClick={this.toggleOption}>
						Enter Info Manually
					</button>
				</div>
                {
                    this.state.searchActive ? <Search />
                    : (
                        <span>
                            Hello Manual
                        </span>
                    )
                }
			</div>
		);
	}
}
