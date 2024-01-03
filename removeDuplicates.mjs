//Function to remove duplicates from a sorted array
export default function removeDuplicatesFromSortedArray(arr){
    let output = [];

    for(let i = 0; i<arr.length; i++){
        if(i == 0){
            output.push(arr[i]);
            continue;
        }

        if(arr[i] == arr [i-1]) continue;
        output.push(arr[i]);
    }

    return output;
}