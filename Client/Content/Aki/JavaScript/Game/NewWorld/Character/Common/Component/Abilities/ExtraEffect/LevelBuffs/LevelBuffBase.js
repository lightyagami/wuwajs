"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelBuffBase = undefined;
class LevelBuffBase {
  constructor(e, s, t, o, a) {
    this.Entity = e;
    this.BuffId = s;
    this.Params = t;
    this.Param1 = o;
    this.Param2 = a;
  }
  OnCreated() {}
  OnRemoved(e) {}
  OnStackChanged(e, s, t) {}
}
exports.LevelBuffBase = LevelBuffBase;
//# sourceMappingURL=LevelBuffBase.js.map