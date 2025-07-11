"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSwitchSubLevelsDirectly = undefined;
class FbSwitchSubLevelsDirectly {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.HTh = false;
    this.WTh = undefined;
    this.QTh = false;
    this.KTh = undefined;
    this.$Th = false;
    this.XTh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSwitchSubLevelsDirectly(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LoadLevels() {
    if (!this.HTh) {
      this.HTh = true;
      this.WTh = new Array();
      var i = this.FbDataInternal.loadLevelsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.WTh.push(this.FbDataInternal.loadLevels(t));
        }
      }
    }
    return this.WTh;
  }
  get UnloadLevels() {
    if (!this.QTh) {
      this.QTh = true;
      this.KTh = new Array();
      var i = this.FbDataInternal.unloadLevelsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.KTh.push(this.FbDataInternal.unloadLevels(t));
        }
      }
    }
    return this.KTh;
  }
  get TeleportEntityId() {
    if (!this.$Th) {
      this.$Th = true;
      this.XTh = this.FbDataInternal.teleportEntityId();
    }
    return this.XTh;
  }
}
exports.FbSwitchSubLevelsDirectly = FbSwitchSubLevelsDirectly;
//# sourceMappingURL=FbSwitchSubLevelsDirectly.js.map