import React from 'react'



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
        return ( <td>{this.props.row[this.props.field]}</td> )
    }

});