const LOSSLESS_OPERATIONS_MAP = 1;
const LOSSLESS_OPERATIONS_FILTER = 2;

function lossless(arr) {
    const array = arr;
    let length = 0;
    const ops = [];
    const fns = [];
    
    return {
        map(fn) {
            ops[length] = (LOSSLESS_OPERATIONS_MAP)
            fns[length] = (fn)
            length++
            return this
        },
        filter(fn) {
            ops[length] = (LOSSLESS_OPERATIONS_FILTER)
            fns[length] = (fn)
            length++
            return this
        },
        get() {
            const result = [];
            let idx = 0;
            elementIteration: for (let element of array){
                for (let i = 0; i < length; i++) {
                    switch (ops[i]) {
                        case LOSSLESS_OPERATIONS_MAP:
                            element = fns[i](element);
                            break;
                        case LOSSLESS_OPERATIONS_FILTER:
                            if (!fns[i](element)) {
                                continue elementIteration;
                            }
                            break;
                    }
                }
                result[idx++] = (element);
            }
            return result;
        }
    }
}

const filter1 = e => e % 100 === 0;
const map1 = e => Math.sin(e);
const filter2 = e => e > 0;

function losslessTest(arr) {
    return lossless(arr)
        .filter(filter1)
        .map(map1)
        .filter(filter2)
        .get()
}

if (typeof module !== 'undefined') {
    module.exports = losslessTest;
} else {
    const a = Array(100000).fill(0).map((e, i) => i)

    let losslessResult;
    const iterations = 10000;

    for(let i = 0; i < iterations; i++) {
        losslessResult = losslessTest(a);
    }

    console.log(JSON.stringify(losslessResult, null, '  '));
}
