"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSlashTowerPrefabConfig = undefined;
class FbSlashTowerPrefabConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Afh = false;
    this.V_i = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSlashTowerPrefabConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Index() {
    if (!this.Afh) {
      this.Afh = true;
      this.V_i = this.FbDataInternal.index();
    }
    return this.V_i;
  }
}
exports.FbSlashTowerPrefabConfig = FbSlashTowerPrefabConfig;
//# sourceMappingURL=FbSlashTowerPrefabConfig.js.map