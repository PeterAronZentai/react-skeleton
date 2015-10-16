var Promise = require('es6-promise').Promise;

export default {
    getRecords() {
        return new Promise((resolve, reject) => {
            var result = [];
            $.getJSON("/shootlist.json").then(function(shootList) {
                var item = shootList[0];
                function ctor(id) {
                    this.id = id;
                    Object.keys(item).forEach( key => this[key] = key)
                }
                var i = new ctor(-1);

                for(var i = 0; i < 1; i++) {
                    shootList.forEach(item => result.push($.extend(new ctor(i + item['Item No.']), item)));
                }
                resolve(result);
            })
        })
    }

}
