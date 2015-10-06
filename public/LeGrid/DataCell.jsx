import React from 'react'
var counter = 0;
var classnames = require('classnames')

export default React.createClass({
    
    getInitialState() {
        return {
            selected: false,
            debugMode: false
        }
    },
    createDefaultCell() {
        return <div>{this.props.rowIndex}:{this.props.columnIndex}</div>
    },
    
    contextTypes: {
            selection: React.PropTypes.object
    },
    
    componentDidMount() {
    },
    
    
    componentWillUnmount() {
        console.log("@@@will")
    },
    

    
    handleClick(e) {
        console.log(this.context)
        this.context.selection.setFocus(this.getProperty())
    },
    
    getModelValue() {
        return this.props.propertyDescriptor.value
    },
    

    
    XshouldComponentUpdate() {
        return false;
    },
    
    handleChange(e) {
        console.log("handle state")
        this.props.dataObject[this.props.column.fieldName] = e.target.value
    },
    
    getControl() {
        if (this.props.dataObject.editMode) {
            return <input ///> 
                    value={this.getModelValue()} onChange={this.handleChange} />
        }
        if (this.state.debugMode) {
            return <div><span>{this.props.rowIndex}:{this.props.columnIndex}</span></div>
        }
        return <div className="text-ellipsis">{this.getModelValue()}</div>
    },
    
    render() {
        return <td className={this.props.className} onClick={this.props.onClick}>
                {this.getControl()}
               </td>
    }
})