import React from 'react';

const ManualEntry = props => {
        return (
            <div className="grid">
                <form className="form-input-area">
                    <div className="input-container">
                        <label htmlFor="doctorName">&nbsp;<span>*</span>Doctor's Name:</label>
                        <input
                        name="name"
                        placeholder="Dr. John Smith"
                        type="text"
                        value={props.doctorName}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container">
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
                    <div className="input-container">
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
                    <div className="input-container">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;Address:</label>
                        <input
                        name="address"
                        placeholder="123 W Main St"
                        type="adress"
                        value={props.address}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;City:</label>
                        <input
                        name="city"
                        placeholder="123 W Main St"
                        type="adress"
                        value={props.city}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;State:</label>
                        <input
                        name="state"
                        placeholder="123 W Main St"
                        type="adress"
                        value={props.state}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="doctorName">&nbsp;&nbsp;&nbsp;ZIP:</label>
                        <input
                        name="zip"
                        placeholder="123 W Main St"
                        type="adress"
                        value={props.zip}
                        onChange={props.handleInput}
                        required
                        />
                    </div>
                    <div className="input-container">
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