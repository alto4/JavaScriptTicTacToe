class Dog {
  constructor(name, age, breed) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  getDetails() {
    alert(`${this.name} is a ${this.age}-year-old ${this.breed}.`);
  }
}
