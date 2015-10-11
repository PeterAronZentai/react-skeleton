import React from 'react'

export default function() {

return <div>
                <table className="row-table" style={{position:'absolute', top:'-200px',tableLayout:'fixed', width:'100%'}}>
                    <tbody>
                        <tr  ref="rowTemplate"><td>aa</td></tr>
                    </tbody>
                </table>
                    
                <div className="ui inverted menu" style={{marginTop:0}}>
                    <div className="item active">
                        <i className="upload icon"></i> Import data
                    </div>
                    <div className="item">
                        <div className="ui left labeled inverted button" tabIndex="0">
                            <a className="ui right pointing basic label">
                                270K records
                            </a>
                            <div className="ui inverted button">
                                <i className="download icon"></i> Export
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="ui right pointing basic label large">
                             Selection
                        </div>
                        <button className="ui left attached inverted green button">Good</button>
                        <button className="ui attached red inverted button">Bad</button>
                        <button className="ui attached yellow inverted button">Attention</button>
                        
                        <button className="right attached inverted grey ui button">Neutral</button>
                    </div>  
                    <div className="right menu">
                        <div className="item">
                                                <div className="ui right pointing basic label large">
                                View
                            </div>
                            <select style={{color:'black'}}
                            
                                    className="ui inverted dropdown" id="view" value={this.state.viewName} onChange={this.handleViewSelected}>
                                <option value="">Select a view</option>
                                <option value="view1">Main dispatcher view</option>
                                <option value="view2">Model shooters view</option>                            
                            </select>
                        </div>
                        <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..." />
                            <i className="search link icon"></i>
                        </div>
                        </div>
                        <a className="ui item">
                        Logout
                        </a>
                    </div>
                </div>  
                
     </div>                  
}