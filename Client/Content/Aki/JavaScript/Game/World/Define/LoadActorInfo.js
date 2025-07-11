"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadActorInfo = undefined;
const zero = 0n;
class LoadActorInfo {
  constructor(o, t, s) {
    this.EntityId = o;
    this.Entity = t;
    this.Actor = s;
  }
  IsValid() {
    return this.EntityId !== zero && this.Entity !== undefined && this.Actor !== undefined && !!this.Actor;
  }
  static Create(o, t = undefined, s = undefined) {
    return new LoadActorInfo(o, t, s);
  }
}
(exports.LoadActorInfo = LoadActorInfo).Undefined = new LoadActorInfo(zero, undefined, undefined);
//# sourceMappingURL=LoadActorInfo.js.map