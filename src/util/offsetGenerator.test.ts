import { OffsetGenerator } from './OffsetGenerator';
test('offset generator', () => {
    const offsetGenerator = new OffsetGenerator;
    offsetGenerator.getNewOffset('   ');
    expect(offsetGenerator.offset).toBe(3);
    offsetGenerator.getNewOffset('   ');
    expect(offsetGenerator.offset).toBe(6);
});
