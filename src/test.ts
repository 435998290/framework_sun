import { Sun } from '../framework/sun';

const sun = new Sun({
    data: {
        name: 'Sun',
        age: 24,
    }
})

console.log('hello world');

sun.data = {
    name: 'Sunwy',
    age: 25
}