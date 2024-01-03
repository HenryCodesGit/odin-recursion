export default function mergeSort(arr){
    //Note: will have problems if the numbers in the array equal to or exceed Number.MAX_SAFE_INTEGER
    // console.log('Current arr is');
    // console.log(arr);

    //If the array is zero or size of 1 then return the array (it is already sorted)
    if(arr.length <= 1) return arr;

    //Otherwise the array needs to be broken down into two sorted subarrays first
    const sorted1 = mergeSort(arr.slice(0,arr.length / 2));
    const sorted2 = mergeSort(arr.slice(arr.length / 2));

    //Once the two sorted subarrays return, merge together
    let p1 = 0;
    let p2 = 0;
    let currS1;
    let currS2;

    //Sort the array
    const output = [];
    for(let i = 0; i<arr.length; i++){
        //Too lazy to do more conditions for when the pointers exceed array length, 
        //so just set value to maximum safe integer and assume arr entries wont be larger than that
        currS1 = (p1 < sorted1.length) ? sorted1[p1] : Number.MAX_SAFE_INTEGER;
        currS2 = (p2 < sorted2.length) ? sorted2[p2] : Number.MAX_SAFE_INTEGER;

        if (currS1 < currS2){
            p1 += 1;
            output.push(currS1);
            continue;
        }

        p2 += 1;
        output.push(currS2);
    }

    //Return the array;
    return output;
}

function test(){
    const outputArr = [];
    const arrMax = parseInt(Math.random()*200);
    for(let i = 0; i<arrMax;i++){
        outputArr.push(parseInt(Math.random()*200));
    }
    
    console.log(outputArr);
    console.log(mergeSort(outputArr));    
}


