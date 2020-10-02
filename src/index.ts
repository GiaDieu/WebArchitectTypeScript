import { Collections } from "./models/Collections";
import { User, UserProps } from "./models/User";

const collections = new Collections<User, UserProps>(
  "http://localhost:3000/users",
  (json: UserProps) => User.builUser(json)
);

collections.on("change", () => {
  console.log(collections);
});
collections.fetch();
