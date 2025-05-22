// файл script.js
window.onload = function(){

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null

// окно вывода результата
outputElement = document.getElementById("result")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if (a.length >= 12) return;
        if (digit === '0' && a === '0') {
            return;
        }
        if (digit !== '.' && a === '0') {
            a = '';
        }
        if (digit === '.' && a.includes('.')) {
            return;
        }
        a += digit;
        outputElement.innerHTML = a;
    } else {
        if (b.length >= 12) return;
        if (digit === '0' && b === '0') {
            return;
        }
        if (digit !== '.' && b === '0') {
            b = '';
        }
        if (digit === '.' && b.includes('.')) {
            return;
        }
        b += digit;
        outputElement.innerHTML = b;
    }
}

// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
  button.onclick = function() {
  const digitValue = button.innerHTML;
  onDigitButtonClicked(digitValue);
  changeEqualButtonBrightness(digitValue); // Изменяем яркость кнопки "="
  }
});

document.getElementById("btn_digit_000").onclick = function() {
    if (outputElement.innerHTML === "" || outputElement.innerHTML === "0") {
        return;
    }

    if (!selectedOperation) {
        a += "000";
        outputElement.innerHTML = a;
    } else {
        b += "000";
        outputElement.innerHTML = b;
    }
};

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return
    selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return
    selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return
    selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return
    selectedOperation = '/'
}

document.getElementById("btn_op_percent").onclick = function() {
    if (a === '') return
    selectedOperation = '%'
}

document.getElementById("btn_op_sign").onclick = function() {
    if (selectedOperation) {
        b = (-b).toString();
        outputElement.innerHTML = b;
    } else {
        a = (-a).toString();
        outputElement.innerHTML = a;
    }
};


document.getElementById("btn_op_backspace").onclick = function() {
    if (selectedOperation) {
        if (b.length > 0) {
            b = b.slice(0, -1);
            outputElement.innerHTML = b;
        }
    } else {
        if (a.length > 0) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a;
        }
    }

    if (a === '' && b === '') {
        outputElement.innerHTML = 0;
    }
};

document.getElementById("btn_op_sqrt").onclick = function() {
    if (a === '') return
    expressionResult = Math.sqrt(+a)
    a = expressionResult.toString()
    outputElement.innerHTML = a
}

document.getElementById("btn_op_square").onclick = function() {
    if (a === '') return
    expressionResult = (+a) * (+a)
    a = expressionResult.toString()
    outputElement.innerHTML = a
}
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    if (n < 0) return NaN;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

document.getElementById("btn_op_factorial").onclick = function() {
    if (a === '') return
    expressionResult = factorial(a)
    a = expressionResult.toString()
    outputElement.innerHTML = a
}

document.getElementById("btn_op_sin").onclick = function() {
    if (a === '') return;
    expressionResult = Math.sin(+a * (Math.PI / 180));
    a = expressionResult.toString();
    outputElement.innerHTML = a;
};

// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() {
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
}

let isBlueBackground = false;
document.getElementById("btn_change_bg").onclick = function() {
    const body = document.body;
    if (isBlueBackground) {
        body.style.background = 'radial-gradient(circle, #f0f0f0, #d3d3d3)';
    } else {
        body.style.background = 'radial-gradient(circle, #ADD8E6, #87CEEB)';
    }
    isBlueBackground = !isBlueBackground;
};


// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
        return

    switch(selectedOperation) {
        case 'x':
            expressionResult = (+a) * (+b)
            break;
        case '+':
            expressionResult = (+a) + (+b)
            break;
        case '-':
            expressionResult = (+a) - (+b)
            break;
        case '/':
            expressionResult = (+a) / (+b)
            break;
        case '%':
            expressionResult = (+a) * (+b) / 100
            break;
    }

    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    outputElement.innerHTML = a
}

const equalButton = document.getElementById("btn_op_equal");

function changeEqualButtonBrightness(digit) {
  if (digit === '.') {
    return;
  }
  equalButton.classList.remove(
    'brightness-0', 'brightness-1', 'brightness-2', 'brightness-3',
    'brightness-4', 'brightness-5', 'brightness-6', 'brightness-7',
    'brightness-8', 'brightness-9'
  );

  equalButton.classList.add(`brightness-${digit}`);
}


// Обработчик для кнопки "000"
document.getElementById("btn_digit_000").onclick = function() {
  if (outputElement.innerHTML === "" || outputElement.innerHTML === "0") {
    return;
  }

  if (!selectedOperation) {
    a += "000";
    outputElement.innerHTML = a;
  } else {
    b += "000";
    outputElement.innerHTML = b;
  }

  changeEqualButtonBrightness(0); // Устанавливаем яркость для кнопки "="
};
};