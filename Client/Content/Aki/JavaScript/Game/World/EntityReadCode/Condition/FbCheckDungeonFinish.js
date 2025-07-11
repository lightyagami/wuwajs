"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckDungeonFinish = undefined;
class FbCheckDungeonFinish {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.MMh = false;
    this.EMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckDungeonFinish(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DungeonId() {
    if (!this.MMh) {
      this.MMh = true;
      this.EMh = this.FbDataInternal.dungeonId();
    }
    return this.EMh;
  }
}
exports.FbCheckDungeonFinish = FbCheckDungeonFinish;
//# sourceMappingURL=FbCheckDungeonFinish.js.map