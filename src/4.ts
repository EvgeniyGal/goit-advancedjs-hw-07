class Key {
  private signature: number;
  constructor() {
    this.signature = Math.round(Math.random() * 100000000);
  }

  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  private tenants: Person[] = [];
  constructor(protected key: Key) {}

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      this.door = false;
    } else {
      console.log("At first you must open the door!");
    }
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  public openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key: Key = new Key();
const person: Person = new Person(key);

const thiefKey: Key = new Key();
const thief: Person = new Person(thiefKey);

const house: MyHouse = new MyHouse(key);

house.openDoor(person.getKey());

house.comeIn(person);

console.log(house);

house.openDoor(thief.getKey());

house.comeIn(thief);

export {};
