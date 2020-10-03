//method 1
//interface ModelForView {
//   on(eventName: string, callback: () => void): void;
// }

//method 2
// import {Models} from "../models/Models";
// <T extends Model<K>, K> => pass 2 arguments as T generic Type and second generic type K and pass the K type argument in class Model

import { Models } from "../models/Models";

export abstract class View<T extends Models<K>, K> {
  regions: { [key: string]: Element } = {}; // Note regions: step 3
  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel(); // Note Rerender: step 3 render again
    // this idea is the goal of rerendering, rerender the template, rebind the all different events
    // and add HTML to the page;
  }

  regionsMap(): { [key: string]: string } {
    //the goal is nesting the view
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
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

  mapRegions(fragment: DocumentFragment): void {
    //Note regions: step 2
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = ""; //Note Rerender: step 2 everytime render anything, we look previous the parent and remove it

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content); //understanding DocumentFragment below

    this.mapRegions(templateElement.content); // Note regions: step 1

    this.onRender();
    this.parent.append(templateElement.content);
  }

  //note: template Element => content such as HTML elements: Form, Input, Button (reference to a 'DocumentFragment')
  //Explanation: DocumentFragment is essentially an object that contains a reference of some HTML,
  //purpose to hold some HTML inside of memory before it attached and inserted to a DOM
}
