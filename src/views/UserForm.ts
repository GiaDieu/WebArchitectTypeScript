export class UserForm {
  constructor(public parent: Element) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
      "mouseover:h1": this.onHeaderOver,
    };
  }

  onButtonClick(): void {
    console.log("Hi There!");
  }

  onHeaderOver(): void {
    console.log("h1 was overred");
  }

  template(): string {
    return `
        <div>
            <h1>UserForm</h1>
            <input/>
            <button>Click Me!</button>
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
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content); //understanding DocumentFragment below

    this.parent.append(templateElement.content);
  }

  //note: template Element => content such as HTML elements: Form, Input, Button (reference to a 'DocumentFragment')
  //Explanation: DocumentFragment is essentially an object that contains a reference of some HTML,
  //purpose to hold some HTML inside of memory before it attached and inserted to a DOM
}
