import Person from './Person';

class Friend extends Person{
    constructor(name) {
      super(name);
    }
    callName() {
      console.log(this.name);
    }
}

var friend = new Friend('mfreeman59');

friend.callName();
