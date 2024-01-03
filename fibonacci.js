//Iterative solution
const fib = function fibonacci(input){
    n = Number(input);

    if(n<0) throw new Error("This function only calculates fibonacci numbers for positive number, 'n'");
    if(n==0) return 0;
    if(n==1) return 1;

    let fn_minus2 = 0;
    let fn_minus1 = 1;
    let fn;

    for(let i=2; i<=n; i++){
        //Calculate current value of fn
        fn = fn_minus1 + fn_minus2;

        //Setup fn for the next run
        fn_minus2 = fn_minus1;
        fn_minus1 = fn;
    }
    
    return fn;
}

const arr = []
for(let i = 0; i<10; i++){
   arr.push(fib(i));
}
console.log(arr);

//Recursive solution
const fibRec = function recursiveFibonacci(input){
    if(input<0) throw new Error("This function only calculates fibonacci numbers for positive number, 'n'");
    if(input==0) return 0;
    if(input==1) return 1;

    return fibRec(input-2) + fibRec(input-1);
}

const arr2 = []
for(let i = 0; i<10; i++){
   arr.push(fibRec(i));
}
console.log(arr2);