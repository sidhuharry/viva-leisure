import { singleton } from '../../src/types/singleton';

describe('Test singleton', () => {
  test('It must return same instances on multiple invokations', () => {
    class WannaBeSingleton {
      constructor() {}
      getValues() {}
    }
    const isItSingleton = singleton(WannaBeSingleton);

    expect(
      isItSingleton.getInstance() === isItSingleton.getInstance()
    ).toBeTruthy();
  });

  test('It must return same instances on multiple invokations for classes with constructor parameters', () => {
    class WannaBeSingleton {
      private value: string;
      constructor(value: string) {
        this.value = value;
      }
      getValues() {
        return this.value;
      }
    }
    const isItSingleton = singleton(WannaBeSingleton, 'Viva');

    expect(
      isItSingleton.getInstance() === isItSingleton.getInstance()
    ).toBeTruthy();
  });
});
