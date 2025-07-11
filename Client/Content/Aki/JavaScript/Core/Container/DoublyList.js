"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoublyLinkedNode = undefined;
class DoublyLinkedNode {
  constructor(t) {
    this.Element = undefined;
    this.Pre = undefined;
    this.Next = undefined;
    this.Element = t;
  }
}
exports.DoublyLinkedNode = DoublyLinkedNode;
class DoublyLinkedList {
  constructor(t) {
    this.t7 = undefined;
    this.i7 = undefined;
    this.s7 = 0;
    this.t7 = new DoublyLinkedNode(t);
    this.t7.Next = this.t7;
    this.t7.Pre = this.t7;
    this.i7 = this.t7;
    this.s7 = 1;
  }
  static From(t) {
    var i = t.length;
    var s = new DoublyLinkedList(t.shift());
    s.s7 = i;
    t.reduce((t, i) => {
      if (t) {
        t.Next = new DoublyLinkedNode(i);
        return (t.Next.Pre = t).Next;
      }
    }, s.t7);
    return s;
  }
  get CountWithHead() {
    return this.s7 - 1;
  }
  Find(t) {
    let i = 0;
    let s = this.t7;
    if (s) {
      for (i = 0; i < this.s7 && !t.call(this, s); i++) {
        s = s.Next;
      }
      if (i !== this.s7) {
        return s;
      } else {
        return undefined;
      }
    }
  }
  Insert(t, i) {
    var s;
    var t = new DoublyLinkedNode(t);
    var e = this.Find(t => t === i);
    if (e) {
      s = e.Next;
      (e.Next = t).Pre = e;
      if (t.Next = s) {
        s.Pre = t;
      }
      this.s7++;
    }
    if (!t.Next) {
      this.i7 = t;
    }
    return t;
  }
  Remove(i) {
    var t = this.Find(t => t === i);
    if (t) {
      if (this.t7 === t) {
        this.t7 = t.Next;
      }
      if (t === this.i7) {
        this.i7 = t?.Pre;
      }
      if (t.Pre) {
        t.Pre.Next = t.Next;
      }
      if (t.Next) {
        t.Next.Pre = t.Pre;
      }
      this.s7--;
    }
  }
  RemoveThis(t) {
    if (this.t7 !== t) {
      if (t === this.i7) {
        this.i7 = t.Pre;
      }
      if (t.Pre) {
        t.Pre.Next = t.Next;
      }
      if (t.Next) {
        t.Next.Pre = t.Pre;
      }
      this.s7--;
    }
  }
  AddTail(t) {
    var t = new DoublyLinkedNode(t);
    var i = this.t7?.Pre;
    var s = i?.Next;
    if (i) {
      i.Next = t;
    }
    t.Pre = i;
    if (t.Next = s) {
      s.Pre = t;
    }
    this.s7++;
    return this.i7 = t;
  }
  GetHeadNode() {
    return this.t7;
  }
  GetTailNode() {
    return this.i7;
  }
  RemoveAllNodeWithoutHead() {
    if (this.t7) {
      this.t7.Next = this.t7;
      this.t7.Pre = this.t7;
      this.i7 = this.t7;
      this.s7 = 1;
    }
  }
}
exports.default = DoublyLinkedList;
//# sourceMappingURL=DoublyList.js.map