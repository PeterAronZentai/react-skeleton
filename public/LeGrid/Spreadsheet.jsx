import React from 'react'
import DataRow from './DataRow.jsx'


var c = 0;

export default React.createClass({
    propTypes: {
        
    },
    
    getInitialState() {
        return {
            columns: [],
            rows: []
        }
    },

    removeRows() {
        console.log("removing rows")
        this.setState({rows: this.removeHalf(this.state.rows)});
    },
    
    removeHalf(array) {
        var res = [];
        for(var i = 0; i < array.length; i += 2) {
            res.push(array[i])
        }
        return res
    },
    
    removeCols() {
        this.setState({columns: this.removeHalf(this.state.columns)});
    },
    
    loadRows() {
       setTimeout(() => {
        var rows = [];
        var count = 0;
        while(count++ < 300) {
            var chars = 0;
            rows.push({ id:c++ })
        }
        this.setState({rows});
       }, 100);
    },
    
    componentDidMount() {
       console.log("@#@#@# did mount", this.refs)
       var chars = 0;
       var columns = [];
       while(chars++ < 40) {
        columns.push({ fieldName: String.fromCharCode(64 + chars) })
       }
       this.setState({columns})
       this.loadRows();
       var self = this;
       console.log(document)
       
       var elm = React.findDOMNode(this.refs.refScroll)
       var trzoomed = React.findDOMNode(this.refs.refZoom)
       
       elm.onscroll = function() {
            self.setState({top: Math.random() });
       };
       //console.log(document.body.onscroll)
    },
    
    componentDidUpdate() {
        console.log("@#@# did update", this.refs)
       var elm = React.findDOMNode(this.refs.refScroll)
       var trzoomed = React.findDOMNode(this.refs.refZoom)
       this.bufferPre = React.findDOMNode(this.refs.bufferPre);
       this.bufferPost = React.findDOMNode(this.refs.bufferPost);
       this.rowSize = () => trzoomed.getBoundingClientRect().height;
       this.clientHeight = () => elm.getBoundingClientRect().height;
       this.scrollCanvas = elm
    },
    
    
    render() {
        console.log(`render${Math.random()}`)
        var self = this;

         
         function getBufferSize(pos) {
            console.log("getBuff", pos, self.state.rows.length)
            if (self.state.rows.length == 0) {
                return '0px';
            }
            
            if (!self.scrollCanvas) {
                return '0px'
            }
            console.log("@#@#actual", self.state.rows.length)
            if (pos == 'post') {
                return (self.state.rows.length * self.rowSize()) - self.scrollCanvas.scrollTop;
            }
         }
         
         
         function getVisibleItems() {
            if (!self.state.rows.length) {
                return []
            } 
            var sTop = self.scrollCanvas.scrollTop;
            var rowSize = self.rowSize();
            var clientHeight = self.clientHeight();
                
            var invisibleTop = parseInt(sTop / rowSize)
            var visibleCount = parseInt(clientHeight / rowSize)
            var invisibleBottom = (self.state.rows.length - (invisibleTop + visibleCount))
            var result = []
            console.log("getvisibleitems", invisibleTop, visibleCount)
            for(var i = 0; i < visibleCount + 1; i++) {
            
                var item = self.state.rows[invisibleTop + i]
                if (item) {
                    item.idx = invisibleTop + i
                    result.push(item)
                }
            }       
            console.log("returning ", result.length, "items")
            return result;
            //return self.state.rows;
         }
        
        function getTopBufferHeight() {
            if (!self.rowSize) return 0;
            var elm = self.scrollCanvas;
            var invisibleTopCount = Math.floor(elm.scrollTop / self.rowSize())
            return invisibleTopCount * self.rowSize();
        }
        
        function getBottomBufferHeight() {
            if (!self.rowSize) return 0;
            var elm = self.scrollCanvas;
            var invisibleTopCount = Math.floor(elm.scrollTop / self.rowSize())
            var visibleCount = parseInt(self.clientHeight() / self.rowSize())
            var invisibleBottomCount = self.state.rows.length - (invisibleTopCount + visibleCount)
            console.log("bottombuffer...", invisibleBottomCount, self.rowSize())
            return invisibleBottomCount * self.rowSize();
        }
        
        var result = (<div className="flex-parent">
                <div className="flex-header">
                    <table className="row-table" 
                            style={{tableLayout:'fixed', width:'100%'}}>
                        <tbody>
                            <tr  ref="refZoom"></tr>
                        </tbody>
                    </table>
                    <table style={{width:'100%'}}>
                        <tr>
                            <td>###</td>
                            {this.state.columns.map( (column, index) => <td key={index}>{column.fieldName.toString()}</td> )}
                        </tr>
                    </table>
                </div>
                <div ref="refScroll" className="flex-content">
                    <table className="row-table" style={{tableLayout:'fixed', width:'100%'}}>
                        <colgroup>
                            {this.state.columns.map(col => <col style={{width:'80px'}} />)}
                        </colgroup>
                        <tbody>
                            <tr className="before-buffer buffer" style={{height:getTopBufferHeight() + 'px'}}></tr>
                        </tbody>
                        <tbody>
                            {getVisibleItems().map( (row, index) => 
                                <DataRow key={row.id} rowIndex={row.idx} dataObject={row} columns={this.state.columns} /> )}
                        </tbody>
                        <tbody>
                            <tr className="after-buffer buffer" style={{height:getBottomBufferHeight() + 'px'}}></tr>
                        </tbody>
                    </table>
                </div>
              </div>)
              
        var origRender = result.render
        return result
    }
})