"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckPlayerCanJoinRogue = undefined;
class FbCheckPlayerCanJoinRogue {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.lJh = false;
    this._Jh = false;
    this.cJh = false;
    this.uJh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckPlayerCanJoinRogue(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CanJoin() {
    if (!this.lJh) {
      this.lJh = true;
      this._Jh = this.FbDataInternal.canJoin();
    }
    return this._Jh;
  }
  get RogueType() {
    if (!this.cJh) {
      this.cJh = true;
      this.uJh = this.FbDataInternal.rogueType();
    }
    return this.uJh;
  }
}
exports.FbCheckPlayerCanJoinRogue = FbCheckPlayerCanJoinRogue;
//# sourceMappingURL=FbCheckPlayerCanJoinRogue.js.map