import React from 'react'
import DataCell from './DataCell.jsx'
var classnames = require('classnames')

export default React.createClass({

    logger(msg, ...args) {
        console.log(msg, this.props.rowIndex, this.props.dataObject.id, ...args)
    },
    
    
    componentDidMount() {
        //this.logger("mounted")
         this.context.selection.subscribe(this.handleSelectionChange)
       
    },
    componentWillUnmount() {
            this.context.selection.unsub(this.handleSelectionChange)

       // this.logger("umount")
    },
    componentWillReceiveProps() {
       //this.logger("props rece ",arguments)
    },
    
    contextTypes: {
            selection: React.PropTypes.object
    },
    
    shouldComponentUpdate() {
        //this.logger("should", arguments);
        return true;
    },
    
    getRowStyle() {
        return this.props.dataObject['$rowStyle'];
    },
    
     getCellClass(property) {
        return classnames({
            focused:this.context.selection.isInFocus(property),
            selected: this.context.selection.isInSelection(property)
        });
        //return this.context.selection.isInFocus(this.getProperty()) ? "focused" : ""
        //return (this.state.selected ? "selected" : "")  
    },
    
    getPropertyDescriptor(dataObject, fieldName) {
        var pd =  {
            fieldName,
            dataObject,
            key: dataObject.id + "_" + fieldName,
            equals: function(property) {
              return property.key === pd.key
            },
            get value() {
                return pd.dataObject[pd.fieldName]
            }
        }
        return pd;
    },

    handleCellClick(pd) {
        this.context.selection.setFocus(pd)
    },
    
     handleSelectionChange(evt, newFocus, oldFocus) {
            var needsUpdate = false;
            switch(evt) {
                case "focusChanged":
                    if (this.propCache[newFocus.key] || (oldFocus && this.propCache[oldFocus.key])) {
                        needsUpdate = true
                    }
                    break;
            }
            if (needsUpdate) {
                this.forceUpdate()
            }
            
//        if (newFocus.equals(this.getProperty()) || (oldFocus && oldFocus.equals(this.getProperty()))) {
//
//        }
  
    },
    
    render() {
        //this.logger("row render" + this.props.columns.length)
        //console.log(this.propCache)
        var propCache
        propCache = this.propCache = {};
        this.objectId = this.props.dataObject.id
        
        return <tr> 
                    <td className="row-header">...</td>
                    <td className="row-caption">{this.props.dataObject.id}</td>
                    <td>{this.props.columns.length}</td>
                    {this.props.columns.map( (column, index) => {
                       var pd = this.getPropertyDescriptor(this.props.dataObject, column.fieldName)
                       this.propCache[pd.key] = pd;
                       return <DataCell propertyDescriptor={pd} 
                                  onClick={this.handleCellClick.bind(this, pd)}
                                  className={this.getCellClass(pd) }
                                  dataObject={this.props.dataObject} key={index} column={column} rowIndex={this.props.rowIndex} columnIndex={index} />
                    })} 
               </tr>
    }
})