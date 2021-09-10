function makeNode(value) {
    return {
        value: value,
        next: null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    // prints the whole list
    print() {
        let current = this.head
        while(current) {
            console.log(current.value)
            current = current.next
        }
    }
    
    // .push for a linked list
    append(value) {
        let node = makeNode(value)

        // Is the list empty?
        if(!this.tail) {
            this.head = this.tail = node
            this.length++
            return node
        }
        
        // If list is not empty, add node to the end and set the tail as the new node
        this.tail.next = node
        this.tail = node
        
        this.length++
        return node
    }
    
    // .unshift for a linked list
    prepend(value) {
        let node = makeNode(value)
        
        // Is the list empty?
        if(!this.head) {
            this.head = this.tail = node
            this.length++
            return node
        }
        
        // If list is not empty, point the new node's next to head and then set new node as head
        node.next = this.head
        this.head = node

        this.length++
        return node
    }
    
    // .shift for a linked list
    removeFirst() {
        // If list is empty, there's nothing to remove
        if (!this.head) {
            return null
        }

        // Save a reference to the head and then set the head as the head's next
        let nodeToRemove = this.head
        this.head = nodeToRemove.next

        // Remove the previous head's link to the list
        nodeToRemove.next = null

        // If the list only has one item, we need to update the tail as well
        if (nodeToRemove === this.tail) {
            this.tail = null
        }

        // To be more like .shift, we'll return the removed node
        this.length--
        return nodeToRemove
    }

    // helper function to aid in removing the last item of a list
    findNodeBefore(node) {
        // Exit early if node is null
        if (!node) {
            return null
        }

        // There is nothing before the head
        if (node === this.head) {
            return null
        }

        // start at the beginning and walk through the list until the pointer's next is the node passed in as an arg
        let current = this.head
        while (current) {
            if (current.next === node) {
                break
            }
            current = current.next
        }

        return current
    }
    
    // .pop for linked list
    removeLast() {
        // Empty list?
        if (!this.tail) {
            return null
        }

        // Save a reference to the tail, then find the node before the tail and set it as the tail. then set the new tail's next to null to detach the old tail
        let nodeToRemove = this.tail
        this.tail = this.findNodeBefore(this.tail)
        this.tail.next = null 

        // If there was only one item in the list
        if (nodeToRemove === this.head) {
            this.head = null
        }

        // keeping with .pop functionality, return the removed node
        this.length--
        return nodeToRemove
    }

    getLength() {
        let current = this.head
        let count = 0
        while (current) {
            count++
            current = current.next
        }
        return count
    }

    insert(value, index) {
        let previous = null
        let current = this.head
        let currentIndex = 0

        // If index is 0, negative or falsy, we'll insert the node at the beginning
        if (index <= 0 || !index) {
            this.length++
            return this.prepend(value)
        }

        // If index is at or past the end, insert node at the end
        if (index >= this.length) {
            this.length++
            return this.append(value)
        }

        let node = makeNode(value)

        // walk through list until we find the place to insert the new node
        // keep track of previous and current - new node will be place between these when we find the right spot
        while (current && currentIndex !== index) {
            previous = current
            current = current.next
            currentIndex++
        }

        // now that we've found the correct spot, previous's next points to the new node and the new node points to current
        previous.next = node
        node.next = current

        this.length++
        return node
    }

    remove(index) {
        // if index is out of range
        if (index < 0 || index >= this.length) {
            return null
        }

        if (index === 0) {
            this.length--
            return this.removeFirst()
        }

        let current = this.head
        let previous = null
        let currentIndex = 0

        // walk through list until we find the place to remove the node
        // we keep track of previous and current
        while (current && currentIndex !== index) {
            previous = current
            current = current.next
            currentIndex++
        }

        // now that we have the node we're removing (current), we set previous's next to current's next and set current's next to null (removing it from the list)
        previous.next = current.next
        current.next = null

        this.length--
        return current
    }
}