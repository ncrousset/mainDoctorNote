import React, { Component } from 'react';
import MainSimple from '../layout/MainSimple';
import DecoratorsCard from '../layout/DecoratorsCard';
import Label from './Label';
import ResetPassword from './forms/ResetPassword';
import SuccessResetPassword from './SuccessResetPassword';

export class ResetPasswordPage extends Component {

    state = {
        succes: false 
    }

    onSucces = () => {
        this.setState({succes: true})
    }

    render() {
        const succes = this.state.succes
        return (
            <MainSimple>
                <div className="relative sm:max-w-sm w-full ">
                    <DecoratorsCard bgColor="bg-green-400" rotate="-rotate-6" />
                    <DecoratorsCard bgColor="bg-yellow-200" rotate="rotate-6" />

                    <div className="relative w-full rounded-3xl px-6 py-4 shadow-md bg-white">
                        <Label>
                            { succes
                              ? "Success Password"
                              : "Reset Password"
                            }
                            
                        </Label>

                        {succes
                            ? <SuccessResetPassword />
                            : <ResetPassword onSucces= {() => this.onSucces()} />
                        }
                    </div>

                </div>
            </MainSimple>
        )
    }
}

export default ResetPasswordPage
