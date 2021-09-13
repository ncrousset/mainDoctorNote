import React, { Component } from 'react';
import MainSimple from '../layout/MainSimple';
import DecoratorsCard from '../layout/DecoratorsCard';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<MainSimple>
            <div className="relative sm:max-w-sm w-full">
                <DecoratorsCard bgColor="bg-blue-400" rotate="-rotate-6" />
                <DecoratorsCard bgColor="bg-red-400" rotate="rotate-6" />
                page login
            </div>
        </MainSimple>
        )
    }
}