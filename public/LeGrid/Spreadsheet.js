import React from 'react'
import DataRow from './DataRow.jsx'
import Selection from '../Services/Selection'
import RecordStore from '../Services/RecordStore'
import ViewStore from '../Services/ViewStore'
import UI from './SpreadsheetUI.jsx'
//import ViewPort from './ViewPort.js'
var Promise = require('es6-promise').Promise

var c = 0;

export default React.createClass({
    propTypes: {
      changeView:React.PropTypes.func.isRequire
    },
    getDefaultProps(){
      return {
        changeView:this.handleViewSelected
      }
    },
    componentWillReceiveProps(next){
      console.log('!!!!!!!!!!!!!!!!!!!!', next)
      this.setState({firstIndex: 0, firstColumn:0})
      this.loadData()
    },
    getInitialState() {
        return {
            rows: [],
            firstIndex: 0,
            firstColumn:0
        }
    },

    childContextTypes: {
            selection: React.PropTypes.object
    },

    getChildContext() {
        //console.log("get child cont")
        return {
            selection: this.selection || (this.selection = new Selection())
        }
    },

    handleViewSelected(e) {
        this.setView(e.target.value)
    },

    loadData(){
      console.log('############## load data')
      let firstIndex = 0, firstColumn = 0
      RecordStore.getRecords().then( rows => {
          this.setState({firstIndex, firstColumn, rows})
      }).catch(console.log.bind(console))
    },
    componentDidMount() {
        this.scroller = React.findDOMNode(this.refs.scroller)
        //this.loadData()
    },
    handleScroll(direction, amount, itemOnScreen) {
      itemOnScreen = itemOnScreen || 0
      if(direction == 'h'){
        let firstColumn = this.state.firstColumn + amount
        if (firstColumn<0) { firstColumn = 0 }
        if (firstColumn>Math.ceil(this.props.viewPort.view.columns.length - itemOnScreen)){
          firstColumn=Math.ceil(this.props.viewPort.view.columns.length - itemOnScreen)
        }
        this.setState({firstColumn})
      } else{
        let firstIndex = this.state.firstIndex + amount
        if (firstIndex<0) { firstIndex = 0 }
        if (firstIndex > Math.ceil(this.state.rows.length-itemOnScreen))
        {
          firstIndex = Math.ceil(this.state.rows.length-itemOnScreen)
        }
        this.setState({firstIndex})
      }
    },

    getVisibleItems() {
            var firstIndex = this.state.firstIndex;
            var clientHeight = this.scroller && this.scroller.clientHeight || 900;
            var lineHeight =  this.props.viewPort.rowHeight;
            var lineHeaderHeight = this.props.viewPort.headerHeight;
            var result = [];
            var totalHeight = 0;
            while((totalHeight < clientHeight - lineHeaderHeight) && (firstIndex < this.state.rows.length)) {
                var item = this.state.rows[firstIndex++];
                if (item) {
                    result.push(item);
                    item.$rowIndex = firstIndex - 1;
                    totalHeight += lineHeight;
                }
            }
            console.log("@#@#", totalHeight, result.length);
            return result;
    },
    getVisibleColumns() {

        var result = [];

        if (this.scroller) {
            var firstColumn = this.state.firstColumn;
            var clientWidth = this.scroller.clientWidth || 900;
            console.log("@@", clientWidth)
            console.log('max columns in view: ', this.props.viewPort.view.columns.length)
            var colWidth = 180;
            var totalWidth = 0
            while( (totalWidth < clientWidth)) {
                var col = this.props.viewPort.view.columns[firstColumn++]
                if (!col) {
                    totalWidth += 100;
                    return result
                }
                var w = col.style && col.style.width || colWidth;
                console.log("@@@", w)
                totalWidth += w;
                if (col) {
                    result.push(col)
                }
            }
            console.log("!!!@@@", clientWidth, result.length)

        }

        return result;
    },

    hsd(e) {
        //e.preventDefault()
        console.log("hds")
        e.nativeEvent.dataTransfer.effectAllowed = "all";
        e.nativeEvent.dataTransfer.dropEffect = "copy";
        console.log(e.nativeEvent.dataTransfer)
        e.nativeEvent.dataTransfer.setDragImage(e.nativeEvent.target, 0, 0);
        //e.preventDefault()
    },
    hde(e) {
        console.log(e)
    },
    hd(e) {
        //e.nativeEvent.dataTranser.setDrawImage(e.nativeEvent.target, 0, 0);
        e.nativeEvent.dataTransfer.setDragImage(e.nativeEvent.target, 0, 0);
        e.nativeEvent.dataTransfer.effectAllowed = "copy";
        console.log(e.nativeEvent)
    },

    render() {
        return (<div className="flex-parent">
                  {UI.bind(this)()}
                </div>);
    }
})
