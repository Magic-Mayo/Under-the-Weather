import React from 'react';

const ManualEntry = props => {
        return (
            <div className="provider-manual-entry">
                <form className="provider-manual-entry-grid">
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-name">
                        <label htmlFor="doctorName">&nbsp;<span>*</span>Doctor's Name:</label>
                        <input
                        name="name"
                        placeholder="Dr. John Smith"
                        type="text"
                        value={props.name}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-specialty">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;Specialty:</label>
                        <input
                        name="type"
                        placeholder="Pediatrician"
                        type="text"
                        value={props.type}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-insurance">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;Accepted Insurance:</label>
                        <input
                        name="insurance"
                        placeholder="Cigna"
                        type="text"
                        value={props.insurance}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-address">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;Address:</label>
                        <input
                        name="address"
                        placeholder="123 W Main St"
                        type="text"
                        value={props.address}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-city">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;City:</label>
                        <input
                        name="city"
                        placeholder="Phoenix"
                        type="text"
                        value={props.city}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-state">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;State:</label>
                        <input
                        name="state"
                        placeholder="AZ"
                        minLength="2"
                        maxLength="2"
                        type="text"
                        value={props.state}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-zip">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;ZIP:</label>
                        <input
                        name="zip"
                        placeholder="85008"
                        type="number"
                        min="00000"
                        max="99999"
                        value={props.zip}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container provider-manual-entry-grid-item provider-manual-entry-grid-item-phone">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;Phone Number:</label>
                        <input
                        name="phone"
                        placeholder="Dr. John Smith"
                        type="number"
                        value={props.phone}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="provider-form-submit-container">
                        <button type="button" className="provider-form-submit" onClick={props.submitProvider}>
                            Add Provider
                        </button>
                    </div>
                </form>
            </div>
        )
}

export default ManualEntry;