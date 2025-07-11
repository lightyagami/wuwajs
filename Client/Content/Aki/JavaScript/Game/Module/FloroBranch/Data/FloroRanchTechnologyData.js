"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTechnologyData = undefined;
class FloroRanchTechnologyData {
  constructor(t) {
    this.Lo = undefined;
    this.P4e = false;
    this.Lo = t;
  }
  UpdateUnLockState(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e;
  }
  get Id() {
    return this.Lo.Id;
  }
  get Name() {
    return this.Lo.Name;
  }
  get Column() {
    return this.Lo.Column;
  }
  get Row() {
    return this.Lo.Row;
  }
  get Cost() {
    return this.Lo.Cost;
  }
  get Des() {
    return this.Lo.Desc;
  }
  get PreNode() {
    return this.Lo.PreNode;
  }
  get Icon() {
    return this.Lo.Icon;
  }
}
exports.FloroRanchTechnologyData = FloroRanchTechnologyData;
//# sourceMappingURL=FloroRanchTechnologyData.js.map