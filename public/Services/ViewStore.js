var Promise = require('es6-promise').Promise;

export default {
    getView(id) {
        return new Promise((resolve, reject) => {
            $.getJSON(`/data/${id}.json`).then(function(view) {
                console.log(view)
                resolve(view);
            })
        })
    }
    
}