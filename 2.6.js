const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function maxQualityDifference(nums) {
    if (nums.length < 4) {
        console.log("Нужно минимум 4 числа!");
        return 0;
    }

    nums.sort((a, b) => a - b);
    const maxProduct = nums[nums.length - 1] * nums[nums.length - 2];
    const minProduct = nums[0] * nums[1];
    return maxProduct - minProduct;
}

readline.question(
    'Введите числа через пробел (например, "5 6 2 7 4"): ',
    input => {
        const numbers = input.split(' ').map(Number);
        
        if (numbers.length < 4 || numbers.some(isNaN)) {
            console.log("Ошибка: введите минимум 4 числа!");
        } else {
            console.log("Максимальная качественная разница:", maxQualityDifference(numbers));
        }
        
        readline.close();
    }
);