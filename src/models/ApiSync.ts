import Axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootURL: string) {}

  //fetch and update the current user that model is using it
  fetch(id: number): AxiosPromise {
    return Axios.get(`${this.rootURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      //NOTE: using Axios.put request which means you are going to update the Json data, this.data argument which means you send the data object to db.json
      return Axios.put(`${this.rootURL}/${id}`, data);
    } else {
      return Axios.post(this.rootURL, data);
    }
  }
}
