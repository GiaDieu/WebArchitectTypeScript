import { User } from "./models/User";

const collections = User.buildCollections();
collections.on("change", () => {
  console.log(collections);
});
collections.fetch();
