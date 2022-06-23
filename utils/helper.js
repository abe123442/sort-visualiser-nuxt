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


async function pause(speed) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, parseInt(speed));
    });
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

    append(data) {
        let nextNode = new LinkedNode(data);
        this.lastNode.next = nextNode;
        nextNode.prev = this.lastNode;
        this.lastNode = nextNode;
    }

    traverseBack() {
        if (this.currentNode.prev) { this.currentNode = this.currentNode.prev; }
    }

    traverseForward() {
        if (this.currentNode.next) { this.currentNode = this.currentNode.next; }
    }

    deleteList() {
        this.head = null;
    }
}

export { LinkedNode, LinkedList, pause, shuffle};