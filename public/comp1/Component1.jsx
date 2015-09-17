import React from 'react'
import C2 from '../comp2/Component2.jsx'


export default React.createClass({ 


    getInitialState() {
        return {
            items: []
        }
    },
    componentDidMount() {
        //id = this.props.productId
        console.log("!!!")
        var items = [1,2,3];
        this.setState( { items:items });
        setTimeout( () => { 
                var items  = this.state.items;
                items.push(4)
                this.setState({items:items})
        }, 100)
    },
    getSomeText() {
        return "hello world"
    },
    
    handleClick(evt) {
        console.log("handle click");
        this.state.items[2] = 100;
        this.forceUpdate();
        //this.setState({items:this.state.items});
    },
    
    render() {
        console.log("render")
        console.log(this.state)
        return ( 
            <div a={this.b} >{this.getSomeText()}
                <button onClick={this.handleClick}>!!!</button>
                {this.state.items.map( item =>  
                    <C2 key={item} 
                            data={item}><div>@@@</div></C2>
                )}
            </div>   //React.c  reateElement('div', {  a: 'b'}, ["asdasdasd", React  ]
        )  
    }

});