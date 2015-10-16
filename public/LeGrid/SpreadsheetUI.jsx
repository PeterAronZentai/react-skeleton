import React from 'react'
import DataRow from './DataRow.jsx'
import Selection from '../Services/Selection'
import RecordStore from '../Services/RecordStore'
import Scroller from './Scroller.js'

var ToolBarUI = require('./ToolbarUI.jsx')

export default function() {
  var tick = (new Date).getTime();
  var lastTick = this.lt || (this.lt = tick)
  var dtick = lastTick-tick;
  this.lt = tick;

  //console.log(`${dtick} render${Math.random()} ${this.state.firstIndex}`)
  var self = this;

  var visibleColumns = this.getVisibleColumns();
  visibleColumns.map(col=>console.log(col.fieldName))

  var result = (
    <div ref="spreadsheet" className="flex-parent" data-name="sp-ui">
      <div className="flex-header">
          {ToolBarUI.bind(this)()}
      </div>
        <Scroller ref="scroller" viewPort={this.props.viewPort} spreadSheet={this.state} handleScroll={this.handleScroll}>
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
        </Scroller>
    </div>)
  return result
}
