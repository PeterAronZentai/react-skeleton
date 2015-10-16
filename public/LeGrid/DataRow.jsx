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

     getCellClass(property) {
        return classnames({
            focused:this.context.selection.isInFocus(property),
            selected: this.context.selection.isInSelection(property)
        });
    },

    getPropertyDescriptor(dataObject, fieldName, rowIndex) {
        var pd =  {
            fieldName,
            dataObject,
            key: dataObject.id + "_" + fieldName,
            equals: function(property) {
              return property.key === pd.key
            },
            get value() {
                return pd.dataObject[pd.fieldName]
            },
            set value(value) {
                pd.dataObject[pd.fieldName] = value
            }
        }
        return pd;
    },

    handleCellMouseDown(pd, evt) {
        //console.log("cell click", )
        var nevt = evt.nativeEvent;
        this.context.selection.setFocus(pd, nevt.ctrlKey)
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
    },

    getRowStyle() {
        var c = this.props.dataObject.color || (this.props.dataObject.color = "rgba(" + Math.round(Math.random() * 255) +"," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ",0.3)")
        return {}
    },
    render() {

        //this.logger("row render" + this.props.columns.length)
        //console.log(this.propCache)
        var propCache
        propCache = this.propCache = {};
        this.objectId = this.props.dataObject.id

        return <tr style={this.getRowStyle()}>
                    <td className="row-header">{this.props.rowIndex+1}</td>
                    {this.props.columns.map( (column, index) => {
                       var pd = this.getPropertyDescriptor(this.props.dataObject, column.fieldName)
                       this.propCache[pd.key] = pd;
                       return <DataCell propertyDescriptor={pd}
                                  onMouseDown={this.handleCellMouseDown}
                                  className={this.getCellClass(pd)}
                                  dataObject={this.props.dataObject}
                                  focused={this.context.selection.isInFocus(pd)}
                                  selected={this.context.selection.isInSelection(pd)}
                                  column={column}
                                  key={index}
                                  rowIndex={this.props.rowIndex}
                                  columnIndex={index} />
                    })}
                  <td style={{width:'100%'}}></td>
               </tr>
    }
})
