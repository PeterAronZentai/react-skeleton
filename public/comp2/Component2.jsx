import React from 'react'



export default React.createClass({ 


    
    componentDidMount() {
        //id = this.props.productId
        console.log("c2 component did mount")
    },
    
    
    componentWillReceiveProps() {
        console.log("cwrp", arguments);
    },
    
    render() {
        console.log("render c2")
        console.log(this.state)
        return ( <div>{this.props.data.toString()}
                    {this.props.children}
                 </div>
                 )

    }

});