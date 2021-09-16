import React, { Component } from 'react';

import MainSimple from '../layout/MainSimple';
import DecoratorsCard from '../layout/DecoratorsCard';
import Label from './Label';
import Register from './forms/Register';

export class RegisterPage extends Component {


    render() {
        return (
            <MainSimple>
                <div className="relative sm:max-w-sm w-full ">
                    <DecoratorsCard bgColor="bg-green-400" rotate="-rotate-6" />
                    <DecoratorsCard bgColor="bg-yellow-200" rotate="rotate-6" />

                    <div className="relative w-full rounded-3xl px-6 py-4 shadow-md bg-white">
                        <Label>Register</Label>


                        <Register />
                    </div>

                </div>
            </MainSimple>
        )
    }
}

export default RegisterPage
