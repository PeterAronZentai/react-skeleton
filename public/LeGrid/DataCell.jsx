import React from 'react'
var counter = 0;
var classnames = require('classnames')
var FieldHandlers = require('./FieldHandlers')

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
        //console.log("@@@will")
    },
    
    componentWillReceiveProps() {
        //console.log("cell props", arguments)
    },
    
    handleMouseDown(e) {
        //console.log(this.context)
        //this.context.selection.setFocus(this.getProperty())
        this.props.onMouseDown(this.props.propertyDescriptor, e)
    },
    
    getModelValue() {
        return this.props.propertyDescriptor.value
    },
    

    
    XshouldComponentUpdate() {
        return false;
    },
    
    handleChange(e) {
        //console.log("handle state")
        this.props.dataObject[this.props.column.fieldName] = e.target.value
    },
    
    getControl() {
        var FieldHandler;
        if (this.props.column) {
            if (this.props.column.editor && this.props.focused) {
                //console.log("selecting editor")
                FieldHandler = FieldHandlers[this.props.column.editor];
            }
            else if (this.props.column.display) {
                FieldHandler = FieldHandlers[this.props.column.display]
            }
            var result = <FieldHandler field={this.props.propertyDescriptor} />
            return result;
        }
        //console.log("getControl defauling")
        return <div className="text-ellipsis">{this.getModelValue()}</div>
    },
    
    render() {
        //console.log("cell render", this.props.focused, this.props.column.fieldName)
        return <td className={this.props.className} onMouseDown={this.handleMouseDown} onClick={this.handleClick}>
                {this.getControl()}
               </td>
    }
})