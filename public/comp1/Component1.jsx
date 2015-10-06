import React from 'react'
import C2 from '../comp2/Component2.jsx'


class Witcher {

    static observe(entity, fields) {
        if (!entity._witcher) {
            //Object.defineProperty
        }
    }
}


export default React.createClass({ 


    getInitialState() {
        return {
            value: 1,
            items: []
        }
    },
    
    alma(): boolean {
        debugger;
    },
    componentDidMount() {
        //id = this.props.productId
        console.log("!!!")
        var a = this.alma()
        
        var items = [{id:1, a:1,b:2, c:3}, {id:2, a:1, b:2, c:3}];
        for(var i = 3; i < 15; i++) {
            var item = {}
            for(var j = 0; j < 15; j++) {
                item['F' + j.toString()] = Math.random()
            }
            item.id = i;
            items.push(item)
        }
        console.log(items)

        this.setState( { items:items });

    },
    getSomeText() {
        return "hello world" + Math.random()
    },
    
    handleClick(evt) {
        console.log("handle click");
        //this.forceUpdate();
        var items = this.state.items.slice()
        items.unshift({a:1, id:Math.random()});
        this.setState({items:items });
    },

    handleChange(e) {
        console.log(e)
    },
    
    render() {
        console.log("render")
        console.log(this.state)
        return ( 
            <div>
            <table className="ui celled unstackable table" a={this.b} >{this.getSomeText()}
                <button onClick={this.handleClick}>!!!</button>
                {this.state.items.map( item => <C2 key={item.id} data={item}></C2> )}
            </table>
            </div>
        )  
    }

});