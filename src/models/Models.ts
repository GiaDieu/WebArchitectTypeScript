import { AxiosPromise, AxiosResponse } from "axios";

interface ModelsAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Events {
  on(eventName: string, callback: () => void);
  trigger(eventName: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface HasId {
  id?: number;
}
export class Models<T extends HasId> {
  constructor(
    private attributes: ModelsAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  // the idea of set method is updating some data on User and trigger the events so that all other parts of application
  // that essentially listening to instance of user and get some notifications whenever User Data changes
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  //fetch method is idea the first of all, it must get the current id from get() class Attributes
  //if the id exists, then we can call fetch(id: number): AxiosPromise on class Sync
  //and then waiting for the request has been resolved, and get the response back from the json
  //and take the information we get and set it on the set() method from class Attributes

  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without Id");
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  // Save() methods , the idea is pulling off all different properties from the user (get() class Attributes) and call save() from class Sync

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
