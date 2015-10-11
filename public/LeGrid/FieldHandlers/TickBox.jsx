import React from 'react'
var classnames = require('classnames')

export default React.createClass({
    displayName: 'TickBox',
    handleChange(e) {
        this.props.field.value = e.target.checked;
        this.forceUpdate()
    },
    render() {
        return (
                <input type="checkbox" className="ui checkbox" checked={this.props.field.value} onChange={this.handleChange} />
                )
    }
})