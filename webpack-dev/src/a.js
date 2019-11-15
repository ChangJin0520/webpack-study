module.exports = {
    a: 'jin'
};

require('@babel/polyfill'); // polyfill 更高级的语法

class B {

}

function * gen(param) {
    yield 1;
}

console.log(gen().next());

console.log('aaa'.includes('a'));
