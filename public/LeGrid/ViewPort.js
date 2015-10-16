import React from 'react'
import Spreadsheet from './Spreadsheet.js'
import ViewStore from '../Services/ViewStore.js'
import RecordStore from '../Services/RecordStore.js'
import _ from 'lodash'

export default React.createClass({
  getInitialState: function() {
    return {
        rowHeight: 25,
        headerHeight:25,
        viewName:'view1',
        view:{columns:[]}
    }
  },
  componentDidMount() {
    console.log('ViewPort refs: ', this.refs)
      this.rowTemplate = React.findDOMNode(this.refs.rowTemplate)
      this.headerTemplate = React.findDOMNode(this.refs.headerTemplate)
      let rowHeight = this.rowTemplate.getBoundingClientRect().height
      let headerHeight = this.headerTemplate.getBoundingClientRect().height
      this.changeView({target:{value:'view1'}}, {rowHeight, headerHeight})
  },
  changeView(e, extraData){
    let viewName = e.target.value;
    extraData = extraData || {}
    ViewStore.getView(viewName).then( view => {
      extraData.viewName = viewName
      extraData.view = view
      this.setState(extraData)
    }).catch(console.log.bind(console))
  },
  render() {
    return (
      <div className="flex-parent viewPort">
        <div className="felx-parent" style={{position:'absolute', top:'-200px'}} data-test={this.props.p1}>
          <table className="row-table" >
            <thead className="caption-row">
              <tr ref="headerTemplate"><th className="corner-cell sorted">header</th></tr>
            </thead>
            <tbody>
              <tr ref="rowTemplate"><td>aa</td></tr>
            </tbody>
          </table>
        </div>
        <Spreadsheet ref="spreadsheet" changeView={this.changeView} viewPort={this.state} />
      </div>)
    }
})
//style={{position:'absolute', top:'-200px',tableLayout:'fixed', width:'100%'}}
