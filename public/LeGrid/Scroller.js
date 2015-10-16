import React from 'react'
import DataRow from './DataRow.jsx'

export default React.createClass({
  getInitialState(){
    return null
  },
  componentDidMount(){
    this.scroller = this.refs.scroller.getDOMNode()
  },
  getLineOnScreen(){
    return (this.scroller.offsetHeight - this.props.viewPort.headerHeight)/ this.props.viewPort.rowHeight
  },
  getVScrollerSize(){
    var visiblePortion = (this.getLineOnScreen() / this.props.spreadSheet.rows.length)
    var scrollerPortion =  Math.max(0.15, visiblePortion)
    return  this.scroller.offsetHeight * scrollerPortion
  },
  getVScrollerStyle() {
      var height = 100, top = 0;

      if (this.scroller) {
          var scrollHeight = this.scroller.offsetHeight
          var scrollerSize = this.getVScrollerSize();

          var topPortion = this.props.spreadSheet.firstIndex / this.props.spreadSheet.rows.length;
          var threshold = scrollHeight - scrollerSize;
          top = threshold * topPortion;
          height = scrollerSize;
      }
      return { height, top };
  },
  getHScrollerStyle() {
      var width = 100, left = 0;

      if (this.scroller) {
          var scrollWidth = this.refs.hscrollbar.getDOMNode().offsetWidth
          var scrollerWidth = 100

          var topPortion = this.props.spreadSheet.firstColumn / this.props.viewPort.view.columns.length;
          var threshold = scrollWidth - scrollerWidth;
          left = threshold * topPortion;
          width = scrollerWidth;
      }
      return { width, left };
  },
  hmu(e) {
      delete this.trackMouseY;
      delete this.trackMouseX;
      this.trackingMove = false
      //console.log(e)
  },
  hmd(e) {
      this.trackMouseY = e.nativeEvent.screenY;
      this.trackingIndex = this.props.spreadSheet.firstIndex || 0;
      ///console.log(e)
  },
  vmd(e){
    this.trackMouseX = e.nativeEvent.screenX;
    this.trackingIndex = this.props.spreadSheet.firstColumn || 0;
  },
  hmm(e) {
      if (this.trackMouseY) {
          console.log(e.nativeEvent)
          var delta = this.trackMouseY - e.nativeEvent.screenY;
          var scrollHeight = this.scroller.offsetHeight
          var scrollerSize = this.getVScrollerSize();
          var threshold = scrollHeight - scrollerSize;
          var move = delta / threshold
          var firstIndex = this.trackingIndex - Math.round(this.props.spreadSheet.rows.length * move)
          this.props.handleScroll('v', firstIndex - this.props.spreadSheet.firstIndex)
      }else if(this.trackMouseX){
        console.log('horizontal scroll')
        var delta = this.trackMouseX - e.nativeEvent.screenX;
        var scrollWidth = this.scroller.offsetWidth
        var scrollerSize = 100; //this.getHScrollerSize();
        var threshold = scrollWidth - scrollerSize;
        var move = delta / threshold
        var firstIndex = this.trackingIndex - Math.round(this.props.viewPort.view.columns.length * move)
        this.props.handleScroll('h', firstIndex - this.props.spreadSheet.firstColumn)
      }
  },
  hmout() {
    this.hmu()
    console.log("mout!")
  },
  handleWheel(e) {
    var firstIndexDelta = 0;
    var firstColumnDelta = 0;

    if (e.nativeEvent.deltaY) {
        firstIndexDelta = Math.round(e.nativeEvent.deltaY / 40);
    }
    if (e.nativeEvent.deltaX) {
       this.xCounter = this.xCounter || 0;
       this.xCounter += 1;
       if (this.xCounter > 0) {
         firstColumnDelta = (e.nativeEvent.deltaX > 0  ? 1 : -1);
         this.xCounter = 0;
       }
    }
    if(firstIndexDelta !== 0){
      this.props.handleScroll("v",firstIndexDelta, this.getLineOnScreen())
    }else{
      this.props.handleScroll("h",firstColumnDelta, 4)
    }
  },

  render(){
    return (
      <div onWheel={this.handleWheel}  className="flex-content">
        <div className="main-table" ref="scroller">
            {this.props.children}
            <div ref="vscrollbar" className="vscrollbar" onMouseLeave={this.hmout} onMouseDown={this.hmd} onMouseMove={this.hmm} onMouseUp={this.hmu}>
                <div className="vscroller" style={this.getVScrollerStyle()}>
                </div>
            </div>
            <div ref="hscrollbar" className="hscrollbar" onMouseLeave={this.hmout} onMouseDown={this.vmd} onMouseMove={this.hmm} onMouseUp={this.hmu}>
                <div className="hscroller" style={this.getHScrollerStyle()}>
                </div>
            </div>
        </div>
      </div>
    )
  }
})
