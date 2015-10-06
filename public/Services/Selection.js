export default class Selection {
    constructor() {
        this.clients = []
        this.focus = undefined;
        this.selection = {};
    }
    
    setFocus(property, clearSelection) {
        if (this.focus) {
            this.unsetFocus()
        }
        this.focus = property
        this.addToSelection(property)
        this.fire("focusChanged", this.focus, this.oldFocus)
    }
    
    addToSelection(property) {
        this.selection[property.key] = true
    }
    
    unsetFocus() {
        this.oldFocus = this.focus
        this.focus = undefined
    }
    
    fire(event, ...args) {
        var clients = this.clients;
        for(var i = 0, l = clients.length; i < l; i++) {
            clients[i](event, ...args)
        }
    }
    
    isInSelection(property) {
        return this.selection[property.key]
    }
    
    isInFocus(property) {
        if (!this.focus) return false;
        return property.equals(this.focus)
    }
    
    subscribe(cb) {
        this.clients.push(cb)
    }
    
    unsub(cb) {
        this.clients.splice(this.clients.indexOf(cb), 1)   
    }
}