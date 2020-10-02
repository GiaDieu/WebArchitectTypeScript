import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";

import { Models } from "./Models";
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootURL = "http://localhost:3000/users";

export class User extends Models<UserProps> {
  // public events: Eventing = new Eventing();
  // public sync: Sync<UserProps> = new Sync<UserProps>(rootURL);
  // public attributes: Attributes<UserProps> = new Attributes<UserProps>() => this will cause error
  // since Attributes class has arguments of data
  // Solution:
  // we need to specify new Attributes from constructor
  // public attributes: Attributes<UserProps>;
  // constructor(attrs: UserProps) {
  //   this.attributes = new Attributes<UserProps>(attrs);
  // }

  static builUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootURL)
    );
  }
}
