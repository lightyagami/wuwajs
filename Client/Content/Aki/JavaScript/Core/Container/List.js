"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedNode = undefined;
class LinkedNode {
  constructor(t) {
    this.Element = undefined;
    this.Next = undefined;
    this.Element = t;
  }
}
exports.LinkedNode = LinkedNode;
class LinkedList {
  constructor(t) {
    this.t7 = undefined;
    this.i7 = undefined;
    this.s7 = 0;
    this.t7 = new LinkedNode(t);
    this.i7 = this.t7;
    this.s7 = 1;
  }
  get Count() {
    return this.s7 - 1;
  }
  get TailNode() {
    return this.i7;
  }
  AddTail(t) {
    t = new LinkedNode(t);
    this.i7.Next = t;
    this.i7 = t;
    this.s7++;
    return t;
  }
  RemoveNodesBeforeThis(s, e) {
    if (s !== this.t7) {
      if (this.i7 === s) {
        this.t7.Next = undefined;
        this.i7 = this.t7;
        this.s7 = 1;
      } else {
        let t = this.t7.Next;
        let i = 1;
        while (t !== s && t !== undefined) {
          t = t.Next;
          i++;
        }
        if (t !== undefined) {
          if (e) {
            this.t7.Next = s.Next;
            this.s7 -= i;
          } else {
            this.t7.Next = s;
            this.s7 -= i - 1;
          }
        }
      }
    }
  }
  RemoveNode(i) {
    if (i !== this.t7) {
      let t = this.t7;
      while (t.Next !== i && t !== this.i7) {
        t = t.Next;
      }
      if (t.Next === i) {
        t.Next = i.Next;
        if (i === this.i7) {
          this.i7 = t;
        }
        --this.s7;
      }
    }
  }
  GetHeadNextNode() {
    return this.t7.Next;
  }
  RemoveAllNodeWithoutHead() {
    this.t7.Next = undefined;
    this.i7 = this.t7;
    this.s7 = 1;
  }
}
exports.default = LinkedList;
//# sourceMappingURL=List.js.map