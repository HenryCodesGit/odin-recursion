import mergeSort from './mergeSort.mjs'
import removeDuplicates from './removeDuplicates.mjs'
import LinkedList from './linkedList.mjs';

class Tree {
    #root;
    get root() {
        return this.#root;
    }


    //Builds a tree from a sorted array with no duplicates
    static buildTree(array) {
        //Edge case, empty array
        if(array.length == 0) return null;

        //Output of the array will be the root node
        //Root node defined as the midpoint
        let mid = parseInt(array.length/2);
        let leftArray = array.slice(0,mid);
        let rightArray = array.slice(mid+1);

        let output = new Node(array[mid]);
        output.left = Tree.buildTree(leftArray);
        output.right = Tree.buildTree(rightArray);

        return output;
    }

    constructor(array) {
        //Array verifier
        if (!(Array.isArray(array) && array.reduce((allNumeric,currentIndex) => { return allNumeric && (typeof currentIndex === 'number')},true))) 
            throw 'Tree must be initialized with an array of numbers only!';

        this.#root = Tree.buildTree(removeDuplicates(mergeSort(array)));
    }


    insert(val, root = this.#root){
        //Take in a 'number'
        if(typeof val != 'number') throw 'This function only takes single values as input!';

        //Find where the node belongs recursively
        if(val < root.value) {
            if(!root.left){
                root.left = new Node(val);
                return;
            }
            this.insert(val, root.left);
        }
        if(val >= root.value){
            if(!root.right){
                root.right = new Node(val);
                return;
            }
            this.insert(val, root.right)
        };
    } 

    delete(node) {
        //Case 1: Leaf node
        if(!(node.left) && !(node.right)){
            node = null;
            return
        }

        //Case 2 Single child - Left
        if(node.left && !(node.right)){
            let newNode = node.left;
            newNode.copyTo(node);
            return;
        }
        //Case 2 Single child - Right
        if(!(node.left) && node.right){
            let newNode = node.right;
            newNode.copyTo(node);
            return;
        }

        //Final Case - Has both children
        //Finds the inorder successor and its parent, copies the value, then deletes
        let inOrderSuccessor = node.right.getMinimum(); 
        let inOrderParent = this.findParent(inOrderSuccessor.value);
        node.value = inOrderSuccessor.value; 
        inOrderParent.left = null;
    }

    find(value, root = this.#root) {
        //Case 0: Null root is provided
        if(!root) return null;

        //Case 1: Value is equal to the root value
        if(value === root.value) return root;

        //Case 2: Value is less than the root value
        if(value < root.value) return this.find(value,root.left);

        //Case 3: Value is greater than the root value
        if(value > root.value) return this.find(value,root.right);
    }

    findParent(value, root = this.#root) {
        //Case 0: Null root is provided
        if(!root) return null;

        //Case 1: Value is equal to the root value.
        //This should onyl happen if the root of the tree happens to be the value we are trying to find the parent of.
        if(value === root.value) return null;

        //Case 2: Value is less than the root value
        if(value < root.value){
            if(root.left.value == value) { return root }
            return this.findParent(value,root.left);
        }

        //Case 3: Value is greater than the root value
        //Case 2: Value is less than the root value
        if(value > root.value){
            if(root.right.value == value) { return root }
            return this.findParent(value,root.right);
        }
    }

    levelOrder(callback) {
        //let nodeList = recursive.call(this,callback);
        let nodeList = iterative.call(this,callback);
        
        if(callback)return true;

        let output = [];
        nodeList.forEach((item) => {output.push(item.value);})
        return output;

        function recursive(callback, queue = [this.#root], index = 0){
            //Add details of the node to the queue
            let currentNode = queue[index];
            if(callback){callback(currentNode);}
            if(currentNode.left) queue.push(currentNode.left);
            if(currentNode.right) queue.push(currentNode.right);

            //Increment the index
            index += 1

            //Keep checking until there are no more items in the queue, then run callback on all the items
            if(index < queue.length) recursive.call(this,callback,queue,index);
            return queue;
        }

        function iterative(callback){
            let queue = [this.#root];
            let index = 0;

            while(index < queue.length){
                let currentNode = queue[index];
                if(callback){callback(currentNode);}
                if(currentNode.left) queue.push(currentNode.left);
                if(currentNode.right) queue.push(currentNode.right);

                index += 1;
            }

            return queue;
        }
    }

    inOrder(callback) {
        let nodeList = recursive(callback,this.#root);

        if(callback) return true;

        let output = [];
        nodeList.forEach((item) => {output.push(item.value);})
        return output;

        function recursive(callback, currentNode, result = []){
            if(!currentNode) return;

            //Add details of the nodes to the queue
            recursive(callback,currentNode.left,result);
            result.push(currentNode);
            if(callback) callback(currentNode);
            recursive(callback,currentNode.right,result);

            return result;
        }
    }

    preOrder(callback) {
        let nodeList = recursive(callback,this.#root);

        if(callback) return true;

        let output = [];
        nodeList.forEach((item) => {output.push(item.value);})
        return output;

        function recursive(callback, currentNode, result = []){
            if(!currentNode) return;

            //Add details of the nodes to the queue
            result.push(currentNode);
            if(callback) callback(currentNode);
            recursive(callback,currentNode.left,result);
            recursive(callback,currentNode.right,result);

            return result;
        }
    }

    postOrder(callback) {
        let nodeList = recursive(callback,this.#root);

        if(callback) return true;

        let output = [];
        nodeList.forEach((item) => {output.push(item.value);})
        return output;

        function recursive(callback, currentNode, result = []){
            if(!currentNode) return;

            //Add details of the nodes to the queue
            recursive(callback,currentNode.left,result);
            recursive(callback,currentNode.right,result);
            result.push(currentNode);
            if(callback) callback(currentNode);

            return result;
        }
    }

    //Modified find function that increments height as it traverses the tree
    depth(node, root = this.#root, currHeight = 0) {
        //Case 0: Null root is provided
        if(!root) return null;

        //Case 1: Value is equal to the root value
        if(node.value === root.value) return currHeight;

        currHeight += 1
        //Case 2: Value is less than the root value
        if(node.value < root.value){return this.depth(node,root.left,currHeight);}

        //Case 3: Value is greater than the root value
        if(node.value > root.value) return this.depth(node,root.right,currHeight);
    }

    height(node) {
        //Case 0: Leaf node or null
        if(!node || !(node.left) && !(node.right)) return 0;

        //Case 1: Has more nodes.
        return 1 + Math.max(this.height(node.left),this.height(node.right));
    }

    isBalanced() {return Math.abs(this.height(this.root.right) - this.height(this.root.left)) <= 1}

    rebalance(){
        let arr = this.inOrder();
        this.#root = Tree.buildTree(removeDuplicates(mergeSort(arr)));
    }
}

class Node {
    left;
    right;
    value;

    constructor(value = undefined, leftChild = undefined, rightChild = undefined){
        this.value = value;
        this.left = leftChild;
        this.right = rightChild;
    }

    copyTo(node) {
        node.left = this.left;
        node.right = this.right;
        node.value = this.value;
    }

    getMinimum() { return (this.left == null) ? this : this.left.getMinimum() }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (!node) {
      return;
    }
    if (node.right) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
console.log(removeDuplicates(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])));
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root)
console.log('--------------')
prettyPrint(tree.root)
console.log('--------------')
prettyPrint(tree.root);
console.log('--------------')
console.log('--------------')
console.log('--------------')

let node = tree.root.right.right;
console.log(node);
tree.delete(node);
prettyPrint(tree.root);
console.log('--------------')
console.log('--------------')

tree.delete(tree.root);
prettyPrint(tree.root);

console.log(tree.findParent(23))
console.log(tree.find(67));
console.log(tree.find(68));
console.log(tree.find(6));
console.log(tree.find(-1));
console.log('--------------')
console.log('--------------')

tree.insert(2);
tree.insert(99);
tree.insert(10);
prettyPrint(tree.root);

console.log(tree.levelOrder((item) => {
    console.log(item.value);
}));
console.log(tree.levelOrder());

console.log('--------------')
console.log('--------------')

console.log(tree.inOrder((item) => {
    console.log(item.value);
}));
console.log(tree.inOrder());


console.log('--------------')
console.log('--------------')

console.log(tree.preOrder((item) => {
    console.log(item.value);
}));
console.log(tree.preOrder());

console.log('--------------')
console.log('--------------')

console.log(tree.postOrder((item) => {
    console.log(item.value);
}));
console.log(tree.postOrder());


console.log('--------------')
console.log('--------------')
let arr = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324];
let arr2 = mergeSort(arr);
let arr3 = removeDuplicates(arr2);
let tree4 = new Tree(arr3);
prettyPrint(tree4.root);
console.log(tree4.inOrder())
console.log(tree4.preOrder())
console.log(tree4.postOrder())

prettyPrint(tree.root);
console.log(tree.height(tree.root.right));
console.log(tree.height(tree.root.left));
console.log(tree.isBalanced())
tree.insert(100);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
console.log(tree.isBalanced())
prettyPrint(tree.root);
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced())
