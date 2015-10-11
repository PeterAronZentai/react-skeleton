import React from 'react'
import DataRow from './DataRow.jsx'
import Selection from '../Services/Selection'
import RecordStore from '../Services/RecordStore'

var ToolBarUI = require('./ToolbarUI.jsx')

export default function() {

        var tick = (new Date).getTime();
        var lastTick = this.lt || (this.lt = tick)
        var dtick = lastTick-tick;
        this.lt = tick;
        
        //console.log(`${dtick} render${Math.random()} ${this.state.firstIndex}`)
        var self = this;
        
        var visibleColumns = this.getVisibleColumns();
        
        var result = (<div className="flex-parent">
                <div className="flex-header">
                        {ToolBarUI.bind(this)()}
                </div>
                <div onWheel={this.handleWheel}  className="flex-content">
                    <div className="main-table" ref="scroller">
                        <table className="row-table">
                            <thead className="caption-row">
                                <tr>
                                    <th className="corner-cell sorted"><i class="icon checkmark"></i></th>
                                        {visibleColumns.map(col => <th key={col.fieldName} className="column-header" style={col.style}>{col.fieldName} 
                                                <i className="grey inverted filter icon"></i>
                                         </th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.getVisibleItems().map( (row, index) => 
                                    <DataRow key={index} rowIndex={row.$rowIndex} dataObject={row} columns={visibleColumns} /> )
                                }
                            </tbody>
                        </table>
                        <div className="vscrollbar" onMouseLeave={this.hmout} onMouseDown={this.hmd} onMouseMove={this.hmm} onMouseUp={this.hmu}>
                            <div className="vscroller" style={this.getVScrollerStyle()}>
                            </div>
                        </div>
                        <div className="hscrollbar">
                            <div className="hscroller">
                            </div>
                        </div>
                    </div>
                </div>
              </div>)
              
        return result


}