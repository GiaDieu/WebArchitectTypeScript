import { User } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
        <div>
            <h1>UserForm</h1>
            <div>User Name: ${this.model.get("name")}</div>
            <div>User Age: ${this.model.get("age")}</div>
            <input/>
            <button>Click Me!</button>
            <button class="set-age">Set Random Age</button>
        </div>
        `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      //eventKey = 'click:button';
      const [eventName, selector] = eventKey.split(":");
      //expected: eventName: 'click'; selector: 'button'
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = ""; // everytime render anything, we look previous the parent and remove it

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content); //understanding DocumentFragment below

    this.parent.append(templateElement.content);
  }

  //note: template Element => content such as HTML elements: Form, Input, Button (reference to a 'DocumentFragment')
  //Explanation: DocumentFragment is essentially an object that contains a reference of some HTML,
  //purpose to hold some HTML inside of memory before it attached and inserted to a DOM
}
