//The best data structure here we can use is map(cause it has key value pair and key is unique number, also in our case key is date which is unique)

//Algorithm
//Make a intermidate map of size 7(having keys 0-6 representing mon to sun)
//Iterate over input map. forEach element in input find the corresponding day from date(key). (The day is key to intermidate map)
//Add the inputValue to intermidateValue.
//Iterate over intermidate if a day or group of days or multiple group of days has NaN value or not
//If have NaN value fill them such that each filled value is mean of its previous and next value.
//Replicate the values in output.

let input = new Map()

input['2020-01-01'] =  4
input['2020-01-02'] =  4
input['2020-01-03'] =  6
input['2020-01-04'] =  8
input['2020-01-05'] =  2
input['2020-01-06'] =  -6
input['2020-01-07'] =  2
input['2020-01-08'] =  -2

// input['2020-01-01'] =  6
// input['2020-01-04'] =  12
// input['2020-01-05'] =  14
// input['2020-01-06'] =  2
// input['2020-01-07'] =  4




//creating intermediate map
let intermediate = new Map();

intermediate[0]
intermediate[1]
intermediate[2]
intermediate[3]
intermediate[4]
intermediate[5]
intermediate[6]

//for finding the day from date.
//Then adding value to that day from that particular date.
//Javascript assumes Sunday as 0 but we need Monday as 0. this is also corrected by this loop
for(const i in input){
    var d = new Date(i);

    var n = d.getDay();
    if(n==0){
        n=6;
    }
    else{
        n--;
    }
    if(isNaN(intermediate[n])){
        intermediate[n] = input[i]
    }
    else{
        intermediate[n]+= input[i];
    }
}

//If we have a group of NaN values in intermediate map then we have can say that the missing values are equidistance to each other
//This function only generates an array which contains the steps number of equidistant numbers including and between given(upper, lower) 2 numbers
function getRange(upper, lower, steps) {
    const difference = upper - lower
    const increment = difference / (steps - 1)
    return [lower, ...Array(steps - 2).fill('').map((_, index) => 
      lower + (increment * (index + 1))
    ), upper]
}

//To find the next iterator which doesn't have NaN value in intermediate map
function findIndex(n1) {
    for(const k in intermediate){
        if(k>n1){
            return k;
        }
    }
}

//finding NaN values in intermediate and assigning mean values to them
let i1 =0;
while(i1<7){
    
    if(isNaN(intermediate[i1])){
        let j = findIndex(i1);
        let arr;
        if(intermediate[i1-1]>=intermediate[j]){
            arr = getRange(intermediate[i1-1], intermediate[j], j-i1+2)
        }
        else{
            arr = getRange(intermediate[j], intermediate[i1-1], j-i1+2)
        }


        let i2 = i1;
        while(i2<j){
            intermediate[i2] = arr[i2-i1+1]
            i2++
        }
    }
    i1++;
}

//storing the values with desired keys
let output = new Map();

output["Mon"] = intermediate[0];
output["Tue"] = intermediate[1];
output["Wed"] = intermediate[2];
output["Thu"] = intermediate[3];
output["Fri"] = intermediate[4];
output["Sat"] = intermediate[5];
output["Sun"] = intermediate[6];

for(const i in output){
    console.log(i+" : "+output[i]);
}