"use strict";

function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

// waits for "speed" time until resuming previous activity
async function pause(speed) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, parseInt(speed));
    });
}

// function that swaps array[i] and array[j]
function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]]
}


/**
 * @classdesc Object that links to previous and next nodes
*/
class LinkedNode {
    constructor(data) {
        this.data = data; // The data contained by this node
        this.prev = null; // The previous node linked to this node
        this.next = null; // The next node linked to this node
    }
}

/**
 * @classdesc A list that has elements of type "LinkedNode" and can ONLY be traversed linearly (first to last element). 
 */
class LinkedList {
    constructor(headData) {
        this.head = new LinkedNode(headData); // The starting node of the list
        this.currentNode = this.head; // The node used for traversing the list
        this.lastNode = this.head; // The last element of the linked list
    }

    // appends new data - adds a new node to the linked list
    append(data) {
        let nextNode = new LinkedNode(data);
        this.lastNode.next = nextNode;
        nextNode.prev = this.lastNode;
        this.lastNode = nextNode;
    }

    // sets the current node to its previous node
    traverseBack() {
        if (this.currentNode.prev) { this.currentNode = this.currentNode.prev; }
    }

    // sets the current node to its next node
    traverseForward() {
        if (this.currentNode.next) { this.currentNode = this.currentNode.next; }
    }


    // deletes the reference to the beginning of the linked list
    deleteList() {
        this.head = null;
    }
}

export { LinkedNode, LinkedList, pause, shuffle, swap};