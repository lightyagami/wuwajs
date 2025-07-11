"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedFill = undefined;
const FbJigsawConfig_1 = require("../Action/FbJigsawConfig");
const FbPieceIndex_1 = require("../Action/FbPieceIndex");
class FbFixedFill {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.hNh = false;
    this.lNh = 0;
    this._Nh = false;
    this.cNh = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbFixedFill(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ModelId() {
    if (!this.hNh) {
      this.hNh = true;
      this.lNh = this.FbDataInternal.modelId();
    }
    return this.lNh;
  }
  get Centre() {
    if (!this._Nh) {
      this._Nh = true;
      this.cNh = FbPieceIndex_1.FbPieceIndex.Create(this.FbDataInternal.centre());
    }
    return this.cNh;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = FbJigsawConfig_1.FbJigsawConfig.Create(this.FbDataInternal.config());
    }
    return this.TAe;
  }
}
exports.FbFixedFill = FbFixedFill;
//# sourceMappingURL=FbFixedFill.js.map