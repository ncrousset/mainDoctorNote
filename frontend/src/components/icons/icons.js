import React, { Component } from 'react'

export class Settings extends Component {

    render() {
        return (<svg xmlns="http://www.w3.org/2000/svg" 
        width={this.props.size} 
        height={this.props.size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={this.props.color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={this.props.className}>
            <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>)
    }
}

Settings.defaultProps = {
    size: 24,
    color: '#000000',
    className: ''
}

export class ArrowOut extends Component {
    render() {
        return (<svg xmlns="http://www.w3.org/2000/svg" 
        width={this.props.size} 
        height={this.props.size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={this.props.color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={this.props.className}>
            <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/></svg>
        );
    }
}

ArrowOut.defaultProps = {
    size: 24,
    color: '#000000',
    className: ''
}


export class FileText extends Component {
    render() {
        return (<svg xmlns="http://www.w3.org/2000/svg" 
        width={this.props.size} 
        height={this.props.size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={this.props.color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        className={this.props.className}
        ><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>);

    }
}

FileText.defaultProps = {
    size: 24,
    color: '#000000',
    className: ''
}

export class Users extends Component {
    render() {
        return (<svg xmlns="http://www.w3.org/2000/svg" 
        width={this.props.size} 
        height={this.props.size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={this.props.color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={this.props.className}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>)
    }
}

Users.defaultProps = {
    size: 24,
    color: '#000000',
    className: ''
}

export class Calendar extends Component {
    render() {
        return (<svg xmlns="http://www.w3.org/2000/svg" 
        width={this.props.size} 
        height={this.props.size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={this.props.color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={this.props.className}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>)
    }
}


Calendar.defaultProps = {
    size: 24,
    color: '#000000',
    className: ''
}

export default  {
    Settings,
    ArrowOut,
    FileText,
    Users,
    Calendar,
}