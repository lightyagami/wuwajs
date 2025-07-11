"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportDungeonFunction = undefined;
class FbTeleportDungeonFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Jch = false;
    this.l7 = false;
    this.Zch = false;
    this.euh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportDungeonFunction(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Enable() {
    if (!this.Jch) {
      this.Jch = true;
      this.l7 = this.FbDataInternal.enable();
    }
    return this.l7;
  }
  get DungeonList() {
    if (!this.Zch) {
      this.Zch = true;
      this.euh = new Array();
      var i = this.FbDataInternal.dungeonListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.euh.push(this.FbDataInternal.dungeonList(t));
        }
      }
    }
    return this.euh;
  }
}
exports.FbTeleportDungeonFunction = FbTeleportDungeonFunction;
//# sourceMappingURL=FbTeleportDungeonFunction.js.map