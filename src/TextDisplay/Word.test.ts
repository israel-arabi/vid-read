import { Word, combineLamAndAlifToLa } from './Word';

const Lam = 'ل';
const Alif = 'ا';
const La = 'لا';

test('just lam and alif', () => {
    const la = combineLamAndAlifToLa([Lam, Alif]);
    expect(la).toEqual(["لا"]);
});

test('alif first then lam', () => {
    const la = combineLamAndAlifToLa([Alif, Lam]);
    expect(la).toEqual(["ا", "ل"]);
});

test('alif first then lam then alif', () => {
    const la = combineLamAndAlifToLa([Alif, Lam, Alif]);
    expect(la).toEqual(["ا", La]);
});

test('Lam, La, La, La, Lam', () => {
    const la = combineLamAndAlifToLa([Lam, Lam, Alif, Lam, Alif, Lam, Alif, Lam]);
    expect(la).toEqual([Lam, La, La, La, Lam]);
});

test('‍‍this', () => {
    const splitted = '‍‍س‍لا‍'.replace(/[\u200B-\u200D\uFEFF]/g, '').split('');
    const la = combineLamAndAlifToLa(splitted);
    expect(la[0]).toEqual('س');
    expect(la[1]).toEqual(La);
    expect(la).toEqual(['س', La]);
});
