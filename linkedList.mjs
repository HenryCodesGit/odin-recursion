export default class LinkedList{
    #size = 0;
    get size(){return this.#size};
    set size(_){throw 'This value cannot be set publicly!';}
    #tail;
    get tail(){return this.#tail};
    set tail(_){throw 'This value cannot be set publicly!';}
    #head;
    get head(){return this.#head};
    set head(_){throw 'This value cannot be set publicly!';}

    append(value){
        let node = new Node(value);

        //Edge case, new linked list
        if (!this.#tail || !this.#head){
            this.#tail = node;
            this.#head = node;
            this.#size += 1;
            return;
        }

        //Otherwise, append
        this.#tail.setNext(node);
        this.#tail = node;
        this.#size += 1;
    }
    enqueue(value){
        //in case I want to use queue syntax
        this.append(value); 
    }

    prepend(value){
        let node = new Node(value,this.#head);
        this.#head = node;
        this.#size += 1;
    }

    at(index){
        let iteration = index;
        console.log(this.#size);
        if(this.#size == 0) throw 'This LinkedList has no entries.'
        let curr = this.#head;
        while(iteration > 0){
            curr = curr.getNext();
            iteration -= 1;
        }

        return curr;
    }

    
    insertAt(index, value){
        //Edge cases for append and prepend
        if(index == 0) {return this.prepend(value);}
        if(index == this.#size-1) {return this.append(value);}
        if(index < 0 || index > this.#size) throw 'Invalid indices specified'

        //Otherwise..
        let oldLeft = this.at(index-1);
        let newNode = new Node(value,oldLeft.getNext());
        oldLeft.setNext(newNode);
    }

    removeAt(index){
        if(index < 0 || index > this.#size-1) throw 'Invalid indices specified'

        //Removing at 0 just means re-specifying the head
        if(index == 0) this.#head = this.#head.getNext();

        //Removing at the end just means setting to null the 2nd last entry
        if(index == this.#size-1) this.at(this.#size-1).setNext(null);

        //Removing at any other means redefining the get next chain
        let rightIndex = this.at(index).getNext();
        //Clear the current one just in case
        this.at(index) == undefined;
        this.at(index-1).setNext(rightIndex);
    }

    pop(){
        if(this.#size == 0) return null;
        this.#tail = this.at(this.#size-2);
        let output = this.#tail.getNext();
        this.#tail.setNext(undefined);
        return output;
    }

    //Removes the head
    dequeue(){
        if(size === 0 ) return null;

        let output = this.#head;
        this.#head = this.#head.getNext();
        return output;
    }

    contains(value){
        let nextNode = this.#head;
        while(nextNode){
            if (nextNode.getValue() == value) return true;
            nextNode = nextNode.getNext();
        }

        return false;
    }

    find(value){
        let index = 0;
        let nextNode = this.#head;
        while(nextNode){
            if (nextNode.getValue() == value) return index;
            nextNode = nextNode.getNext();
            index += 1;
        }

        return null;
    }

    toString(){
        if(this.#size == 0) return 'Empty LinkedList';

        let output = '';
        let nextNode = this.#head;

        while(nextNode){
            output = `${output} ( ${nextNode.getValue()} ) -> `
            nextNode = nextNode.getNext();
        }

        return `${output} null`
    }

    toArray(){
        if(this.#size == 0) return 'Empty LinkedList';

        let output = [];
        let nextNode = this.#head;
        
        while(nextNode){
            output.push(nextNode);
            nextNode = nextNode.getNext();
        }

        return output;
    }
}

class Node {
    #nextNode;
    #value;

    constructor(value = undefined, nextNode = undefined){
        this.#value = value;
        this.#nextNode = nextNode;
    }

    setValue(val){this.#value = val};
    getValue(){return this.#value};
    setNext(node){this.#nextNode = node};
    getNext(){ return this.#nextNode};
}

function test(){
    let a = new LinkedList();
    console.log(`Size: ${a.size}`);
    console.log(`Current head: ${a.head?.getValue()}`);
    console.log(`Current tail: ${a.tail?.getValue()}`);
    a.append(6);
    console.log(`After Appending`);
    console.log(`Size: ${a.size}`);
    console.log(a.head);
    console.log(`Current head: ${a.head.getValue()}`);
    console.log(`Current tail: ${a.tail.getValue()}`);
    a.append(3);
    console.log(a.head);
    a.append(1);
    a.append(4);
    console.log(a.size);
    console.log(a.head);
    a.prepend(7);
    console.log(a.head);
    console.log(a.toString());
    a.insertAt(3,99);
    console.log(a.toString());
    a.removeAt(3);
    console.log(a.toString());
    console.log(a.contains(3))
    console.log(a.find(3))
    console.log(a.toString());
    console.log(a.pop().getValue());
    console.log(a.toString());

    let b = new Node(parseInt(Math.random()*30));
}