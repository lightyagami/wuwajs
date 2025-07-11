"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemovePreloadResourcePhantomCharacter = undefined;
const UnionDelayRemoveConfigHelper_1 = require("./UnionDelayRemoveConfigHelper");
class FbRemovePreloadResourcePhantomCharacter {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.OSh = false;
    this.FSh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRemovePreloadResourcePhantomCharacter(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get DelayReMove() {
    var e;
    var t;
    if (!this.OSh && (this.OSh = true, e = this.FbDataInternal.delayReMoveType(), t = UnionDelayRemoveConfigHelper_1.UnionDelayRemoveConfigHelper.GetUnionDelayRemoveConfigObject(e))) {
      this.FSh = UnionDelayRemoveConfigHelper_1.UnionDelayRemoveConfigHelper.ReadUnionDelayRemoveConfig(e, this.FbDataInternal.delayReMove(t));
    }
    return this.FSh;
  }
}
exports.FbRemovePreloadResourcePhantomCharacter = FbRemovePreloadResourcePhantomCharacter;
//# sourceMappingURL=FbRemovePreloadResourcePhantomCharacter.js.map