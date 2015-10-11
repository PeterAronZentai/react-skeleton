import React from 'react'
import DataRow from './DataRow.jsx'
import Selection from '../Services/Selection'
import RecordStore from '../Services/RecordStore'
import ViewStore from '../Services/ViewStore'
import UI from './SpreadsheetUI.jsx'
var Promise = require('es6-promise').Promise

var c = 0;

export default React.createClass({
    propTypes: {
        
    },
    
    getInitialState() {
        return {
            columns: [],
            rows: [],
            firstIndex: 0,
            colCount: 10,
            visibleRows: [],
            view: {},
            viewName: ""
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
    
    setView(viewName) {
        let firstIndex = 0, firstColumn = 0
        
        ViewStore.getView(viewName).then( view => {
            var columns = view.columns;
            RecordStore.getRecords().then( rows => {
                this.setState({viewName, firstIndex, firstColumn, view, columns, rows})
            }).catch(console.log.bind(console))
        }).catch(console.log.bind(console))
    },
    
    handleViewSelected(e) {
        this.setView(e.target.value)
    },
   

    componentDidMount() {
        this.rowTemplate = React.findDOMNode(this.refs.rowTemplate)
        this.scroller = React.findDOMNode(this.refs.scroller)
        this.setView("view1")
    },
    
    handleWheel(e) {
           console.log("!!!!!!!!",e.nativeEvent.deltaY,e.nativeEvent.deltaX)
           var firstIndex = this.state.firstIndex;
           var firstColumn = this.state.firstColumn;
           if (e.nativeEvent.deltaY) {
                firstIndex += Math.round(e.nativeEvent.deltaY / 40);
           }
           if (e.nativeEvent.deltaX) {
               this.xCounter = this.xCounter || 0;
               this.xCounter += 1;
               if (this.xCounter > 6) {
                firstColumn += (e.nativeEvent.deltaX > 0  ? -1 : 1);
                this.xCounter = 0;
               }
           }
           this.setState({firstIndex, firstColumn}); 
    },
    
    getVisibleItems() {
            var firstIndex = this.state.firstIndex;
            var clientHeight = this.scroller && this.scroller.clientHeight || 900;
            var lineHeight =  (this.rowTemplate && this.rowTemplate.getBoundingClientRect().height) || 25;
            console.log(clientHeight, lineHeight);
            var result = [];
            var totalHeight = 0;
            while((totalHeight < clientHeight - 20) && (firstIndex < this.state.rows.length)) {
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
            var colWidth = 180;
            var totalWidth = 0
            while( (totalWidth < clientWidth)) {
                var col = this.state.columns[firstColumn++]
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
    
    getVScrollerStyle() {
        var height = 100, top = 0;

        if (this.scroller) {
            var rowHeight = this.rowTemplate.getBoundingClientRect().height;
            var scrollHeight = this.scroller.offsetHeight
            
            var linesOnScreen = scrollHeight / rowHeight;
            var visiblePortion = (linesOnScreen / this.state.rows.length);
            var scrollerPortion =  Math.max(0.15, visiblePortion);
            var scrollerSize = scrollHeight * scrollerPortion;
            
            var topPortion = this.state.firstIndex / this.state.rows.length;
            var threshold = scrollHeight - scrollerSize;
            top = threshold * topPortion;
            height = scrollerSize;
        }
        
        return { height, top };
    },
    hmu(e) {
        delete this.trackMouseY 
        this.trackingMove = false;
        
        console.log(e)
    },
    hmd(e) {
        this.trackMouseY = e.nativeEvent.screenY;
        this.trackingIndex = this.state.firstIndex || 0;
        ///console.log(e)
    },
    hmm(e) {
        if (this.trackMouseY) {
            console.log(e.nativeEvent)
            var delta = this.trackMouseY - e.nativeEvent.screenY;

            var rowHeight = this.rowTemplate.getBoundingClientRect().height;
            var scrollHeight = this.scroller.offsetHeight
            
            var linesOnScreen = scrollHeight / rowHeight;
            var visiblePortion = (linesOnScreen / this.state.rows.length);
            var scrollerPortion =  Math.max(0.15, visiblePortion);
            var scrollerSize = scrollHeight * scrollerPortion;
            
            var topPortion = this.state.firstIndex / this.state.rows.length;
            var threshold = scrollHeight - scrollerSize;
            var top = threshold * topPortion;
            
            var move = delta / threshold
            var firstIndex = this.trackingIndex - Math.round(this.state.rows.length * move)
            this.setState({firstIndex});
            //console.log( newFirst)
        }
        //console.log(document.visibilityState)
        if(this.trackingMove)        console.log(e)
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
        return UI.bind(this)();
    },
    
    
    
    hmout() {
        console.log("mout!")
    }
})