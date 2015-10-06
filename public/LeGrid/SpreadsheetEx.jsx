import React from 'react'
import DataRow from './DataRow.jsx'
import Selection from '../Services/Selection'

var c = 0;

export default React.createClass({
    propTypes: {
        
    },
    
    getInitialState() {
        return {
            columns: [],
            rows: [],
            firstIndex: 0,
            colCount: 50
        }
    },

    childContextTypes: {
            selection: React.PropTypes.object
    },
    
    getChildContext() {
        console.log("get child cont")
        return {
            selection: this.selection || (this.selection = new Selection())
        }
    },
    
    loadRows() {
       setTimeout(() => {
       var chars = 0;
       var columns = [];
       while(chars++ < this.state.colCount) {
        columns.push({ fieldName: String.fromCharCode(64 + chars) })
       }
       
       
        var rows = [];
        var count = 0;
        while(count++ < 1000) {
            var chars = 0;
            var row = { id:c++, idx:c };
            rows.push(row)
            var chars = 0;
            while(chars++ < this.state.colCount) {
                row[String.fromCharCode(64 + chars)] = Math.random()
            }
        }
        this.setState({rows, columns});
       }, 100);
    },


    componentDidMount() {
        console.log("ss mount")
        this.rowTemplate = React.findDOMNode(this.refs.rowTemplate)
        this.scroller = React.findDOMNode(this.refs.scroller)
        this.loadRows()
    },
    
    handleWheel(e) {
           var start = this.state.firstIndex;
           var firstIndex = this.state.firstIndex;
           firstIndex += Math.round(e.nativeEvent.deltaY / 20);
           this.setState({firstIndex}); 
           e.preventDefault()
    },
    
    render() {
        var tick = (new Date).getTime();
        var lastTick = this.lt || (this.lt = tick)
        var dtick = lastTick-tick;
        this.lt = tick;
        
        console.log(`${dtick} render${Math.random()} ${this.state.firstIndex}`)
        var self = this;
         
        
        var getVisibleItems = () => {
            var result = []
            for(var i = this.state.firstIndex; i < this.state.firstIndex + 37; i++) {
                var item = this.state.rows[i]
                if (undefined !== item) {
                    result.push(item)
                }
            }
            return result;
        }
        
        var result = (<div className="flex-parent">
                <div className="flex-header">
                    <table className="row-table" style={{tableLayout:'fixed', width:'100%'}}>
                        <tbody>
                            <tr  ref="rowTemplate"></tr>
                        </tbody>
                    </table>
                    
                    <table style={{width:'100%'}}>
                        <tr>
                            <td>###</td>
                            {this.state.columns.map( (column, index) => <td key={index}>{column.fieldName.toString()}</td> )}
                        </tr>
                    </table>
                </div>
                <div onWheel={this.handleWheel} ref="scroller" className="flex-content">
                    <table border={1} className="row-table" style={{tableLayout:'fixed', width:'100%'}}>
                        <colgroup>
                            <col style={{width:'50px',backgroundColor:'lightgray'}} />
                            {this.state.columns.map(col => <col key={col.fieldName} style={{width:'180px'}} />)}
                        </colgroup>
                        <tbody>
                            {getVisibleItems().map( (row, index) => 
                                <DataRow key={index} rowIndex={row.idx} dataObject={row} columns={this.state.columns} /> )}
                        </tbody>
                    </table>
                    <div>!!!!</div>
                </div>
              </div>)
              
        var origRender = result.render
        return result
    }
})