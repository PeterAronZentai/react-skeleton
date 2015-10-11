import React from 'react'
var classnames = require('classnames')


var TextEditor = React.createClass({
    render: function(){
    console.log("text editor render", this.props.field.fieldName)
    
        return <div id="contenteditable"
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            ref={this.handleEditorRef}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.field.value}}></div>;
    },

    handleEditorRef(component) {
        console.log("editor ref", this, component, this.props.field.fieldName)
        if (component) {
            //React.findDOMNode(component).focus()
        }
    },
    
    shouldComponentUpdate: function(nextProps){
        return nextProps.field.value !== this.getDOMNode().innerHTML;
    },

    componentDidUpdate: function() {
        if ( this.props.field.value !== this.getDOMNode().innerHTML ) {
           this.getDOMNode().innerHTML = this.props.field.value;
        }
    },

    emitChange: function(){
        var html = this.getDOMNode().innerHTML;
        this.props.field.value = html;
        /*
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;*/
    }
});

export default TextEditor
//export default React.createClass({ render() { return <div>!!!!</div> }})