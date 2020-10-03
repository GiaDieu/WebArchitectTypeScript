### TypeScript Environment install

> npm install -g typescript

### Using Parcel to display HTML template

> npm install -g parcel-bundler

> For Developers: pls kindly add the file.ts to index.html and then **run parcel index.html**

for example:

```html
<script src="./src/index.ts"></script>
```

### Using Backend Server (Json Server)

> npm install -g json-server

### Json set-up

- Create new File as **db.json**
- In db.json , you should write

```JSON
{
    "users":[]
}
```

- To run the server : **json-server db.json**

> NOTE: To work it out with this project, you should open 2 terminals or seperate terminals in VSCode for an instance

### Manage The Package.json to easily running command lines

```JSON
"scripts": {
    "start:db": "json-server -w db.json",
    "start:parcel": "parcel index.html"
  }
```
