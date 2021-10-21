import React, { Component } from 'react';
import MainSimple from '../layout/MainSimple';
import DecoratorsCard from '../layout/DecoratorsCard';
import ChangerPassword from './forms/ChangerPassword';
import Label from './Label';
import SuccessResetPassword from './SuccessResetPassword';

export class ResetPasswordPage extends Component {

    state = {
        succes: false 
    }

    onSucces = () => {
        this.setState({succes: true})
    }

    render() { 
        const {token} = this.props.match.params
        const {succes} = this.state

        return (
            <MainSimple>
                <div className="relative sm:max-w-sm w-full ">
                    <DecoratorsCard bgColor="bg-green-400" rotate="-rotate-6" />
                    <DecoratorsCard bgColor="bg-yellow-200" rotate="rotate-6" />

                    <div className="relative w-full rounded-3xl px-6 py-4 shadow-md bg-white">
                        <Label>
                            { succes
                             ? "Changer Password"
                             : "Changer Password"
                            }
                            </Label>

                        { succes
                            ?  <SuccessResetPassword  text="The password has been changed successfully"/>
                            : <ChangerPassword token={token} onSucces= {() => this.onSucces()} />
                        }
                    </div>
                </div>
            </MainSimple>
        )
    }
}

export default ResetPasswordPage
