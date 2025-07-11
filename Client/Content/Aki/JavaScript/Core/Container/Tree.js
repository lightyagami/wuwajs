"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = undefined;
const Log_1 = require("../Common/Log");
class Tree {
  constructor(t, e = undefined) {
    this.Element = t;
    this.Parent = undefined;
    this.Q7 = undefined;
    this.Parent = e;
  }
  get ChildMap() {
    this.Q7 ||= new Map();
    return this.Q7;
  }
  AddChild(t) {
    var e = t.Element;
    if (this.ChildMap.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RedDot", 16, "重复添加子节点！", ["element", e]);
      }
    } else {
      (t.Parent = this).ChildMap.set(e, t);
    }
  }
  AddChildElement(t) {
    var e;
    if (this.ChildMap.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RedDot", 16, "重复添加子节点！", ["element", t]);
      }
    } else {
      ((e = new Tree(t, this)).Parent = this).ChildMap.set(t, e);
    }
  }
  AddParent(t) {
    if (this.Parent !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RedDot", 16, "该节点已存在父节点！", ["element", this.Element]);
      }
    } else {
      (this.Parent = t).ChildMap.set(this.Element, this);
    }
  }
  AddParentElement(t) {
    if (this.Parent !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RedDot", 16, "该节点已存在父节点！", ["element", this.Element]);
      }
    } else {
      this.Parent = new Tree(t);
      this.Parent.ChildMap.set(this.Element, this);
    }
  }
  GetRoot() {
    if (this.Parent) {
      return this.Parent.GetRoot();
    } else {
      return this;
    }
  }
  IsRoot() {
    return this.Parent === undefined;
  }
  IsLeaf() {
    return this.ChildMap.size <= 0;
  }
}
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map