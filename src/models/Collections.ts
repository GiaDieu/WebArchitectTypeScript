import Axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

//<T, K> is for User and UserProps accordingly
export class Collections<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootURL: string, public deserialize: (json: K) => T) {}
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    Axios.get(this.rootURL).then((response: AxiosResponse): void => {
      response.data.forEach((value: K) => {
        //   const user = User.buildUser(value);
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
  }
}
