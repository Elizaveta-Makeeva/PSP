const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function canObtainArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const countElements = (arr) => {
        const count = {};
        arr.forEach(num => count[num] = (count[num] || 0) + 1);
        return count;
    };

    const count1 = countElements(arr1);
    const count2 = countElements(arr2);

    return Object.keys(count1).every(num => 
        count2[num] === count1[num]
    );
}

rl.question('Первый массив (числа через пробел): ', input1 => {
    rl.question('Второй массив (числа через пробел): ', input2 => {
        const arr1 = input1.split(' ').map(Number);
        const arr2 = input2.split(' ').map(Number);

        console.log(canObtainArrays(arr1, arr2));
        rl.close();
    });
});