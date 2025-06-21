"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbCheckDungeonHasSaveConfig = void 0;
class FbCheckDungeonHasSaveConfig {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.MMh = !1, this.EMh = 0, this.nc1 = !1, this.sc1 = !1
  }
  static Create(t) {
    if (t) return new FbCheckDungeonHasSaveConfig(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get DungeonId() {
    return this.MMh || (this.MMh = !0, this.EMh = this.FbDataInternal.dungeonId()), this.EMh
  }
  get IsHasSaveConfig() {
    return this.nc1 || (this.nc1 = !0, this.sc1 = this.FbDataInternal.isHasSaveConfig()), this.sc1
  }
}
exports.FbCheckDungeonHasSaveConfig = FbCheckDungeonHasSaveConfig;
//# sourceMappingURL=FbCheckDungeonHasSaveConfig.js.map