"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckDungeonHasSaveConfig = undefined;
class FbCheckDungeonHasSaveConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.MMh = false;
    this.EMh = 0;
    this.Tc1 = false;
    this.bc1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckDungeonHasSaveConfig(t);
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
  get IsHasSaveConfig() {
    if (!this.Tc1) {
      this.Tc1 = true;
      this.bc1 = this.FbDataInternal.isHasSaveConfig();
    }
    return this.bc1;
  }
}
exports.FbCheckDungeonHasSaveConfig = FbCheckDungeonHasSaveConfig;
//# sourceMappingURL=FbCheckDungeonHasSaveConfig.js.map