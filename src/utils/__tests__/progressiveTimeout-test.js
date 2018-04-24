import progressiveTimeout from '../progressiveTimeout';

describe('progressiveTimeout', () => {
  test('first timeout is 0 seconds, then increase by 2 seconds', async () => {
    const start = Date.now();
    await progressiveTimeout();
    const duration = Date.now() - start;
    expect(duration < 50).toBeTruthy();

    const start2 = Date.now();
    await progressiveTimeout();
    const duration2 = Date.now() - start2;
    expect(duration2 > 2000 && duration2 < 2050).toBeTruthy();
  });
});
