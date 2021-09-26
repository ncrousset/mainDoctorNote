import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSessionPatient } from '../../actions/patients'

export class NavActionPatient extends Component {
    
    onClickSession = (session) => {
        this.props.setSessionPatient(session)
    }
    
    render() {
        return (
            <div className="flex items-center py-1 px-5 justify-between">
                <div className="flex items-center w-full">
                    <div className="w-full bg-green-400 rounded-lg ">
                        <div className="md:flex justify-between text-white">
                            <div onClick={() => this.onClickSession('background')} className={`font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer ${(this.props.session == 'background') && 'active'}`}>Background</div>
                            <div onClick={() => this.onClickSession('mediacal_histories')} className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer">Mediacal Histories</div>
                            <div onClick={() => this.onClickSession('medical_studies')} className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer">Medical Studies</div>
                            <div onClick={() => this.onClickSession('treatments')} className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer">Treatments</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const className = {

}

const mapStateToProps = state => ({
    session: state.patient.session
});

export default connect(mapStateToProps, {setSessionPatient})(NavActionPatient)
