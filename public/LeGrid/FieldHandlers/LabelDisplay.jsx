import React from 'react'
var classnames = require('classnames')

export default React.createClass({
    displayName: 'LabelDisplay',
    render() {
        return <div className="text-ellipsis">{this.props.field.value}</div>
    }
})