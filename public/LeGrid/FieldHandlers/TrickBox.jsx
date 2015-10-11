import React from 'react'
var classnames = require('classnames')

export default React.createClass({
    displayName: 'TrickBox',
    handleChange(e) {
        this.props.field.value = e.target.checked;
        this.forceUpdate()
    },
    render() {
        var num = this.props.field.dataObject.num || (this.props.field.dataObject.num = Math.round(Math.random() * 100))
        if (num % 5 == 0) {
                return <input type="checkbox" className="ui checkbox" checked={this.props.field.value} onChange={this.handleChange} />
        }
        return <div />
    }
})