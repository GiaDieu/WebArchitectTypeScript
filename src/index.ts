import { UserList } from "./views/UserList";
import { Collections } from "./models/Collections";
import { User, UserProps } from "./models/User";

const users = new Collections(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.builUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
