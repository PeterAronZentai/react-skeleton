import React from 'react'
import Cell from './Cell.jsx'


export default React.createClass({ 


    
    componentDidMount() {
        //id = this.props.productId
    },
    
    
    componentWillReceiveProps() {

    },
        shouldComponentUpdate() {
        return false
    },
    render() {
        
        
        return ( 
                <tr>
                    {Object.keys(this.props.data).map(key => <Cell row={this.props.data} field={key} key={key} /> )}
                 </tr>
                 )

    }

});