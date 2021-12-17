module.exports.math = function math(filthyString) {

    let string = filthyString.replace(/[^\d+*-../]/g, '');
    let result = null

    if (string.includes('+')){
        let splited = string.split('+')
        let a = parseFloat(splited[0], 10)
        let b = parseFloat(splited[1], 10)
        result = Math.round(a + b)
    }
    else if (string.includes('-')){
        let splited = string.split('-')
        let a = parseFloat(splited[0], 10)
        let b = parseFloat(splited[1], 10)
        result = Math.round(a - b)
    }
    else if (string.includes('*')){
        let splited = string.split('*')
        let a = parseFloat(splited[0], 10)
        let b = parseFloat(splited[1], 10)
        result = Math.round(a * b)
    } else {
        let splited = string.split('/')
        let a = parseFloat(splited[0], 10)
        let b = parseFloat(splited[1], 10)
        result = Math.round(a / b)
    }
    console.log(result);
    return `${result}`
};

module.exports.mathArr = function mathArr(digitArray) {
    let arr = digitArray.replace(/[^\d ]/g, '').split(' ')
    let arrResult = []
    arr.sort((a, b) => a - b)
    let arrLength = arr.length
    for (let i = 0; i < arrLength; ++i) {
        if (i != arrLength) {
            for (let j = i+1; j < arrLength; ++j) {
                let a = arr[i]
                let b = arr[j]
                
                if (Math.abs(a-b) == 2) {
                    arrResult.push(`[${a}, ${b}]`)
                }
            }    
        }
    }
    result = JSON.stringify(arrResult)
    return `${result}`
}
  