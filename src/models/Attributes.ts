export class Attributes<T> {
  constructor(private data: T) {}

  //Note 1: <K extends keyof T> contraint => limits the types of K and
  // the value of K or the type of K can only be one of KEYS of T
  //an instant for this situation
  //interface UserProps {
  //     id: number;
  //     name: string;
  //     age: number;
  //   }

  //this means percisely the K can only ever be of the different keys (either id or name or age) of UserProps

  //for more information pls review the lesson from TypeScript and JS
  // In TypeScript : strings can be types
  // In JavaScript: all keys of Object are strings
  //=> in general, all keys of Object can actually be types as well

  // NOTE 2: T[K] it is similar to JavaScript to get the value of key In JS Object
  //For example:
  // const colors = {red:'red'}
  //colors['red]

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set = (update: T): void => {
    Object.assign(this.data, update);
  };

  getAll(): T {
    return this.data;
  }
}
