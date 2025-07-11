"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelPrefabParamsConfig = undefined;
const UnionParamsPresetHelper_1 = require("../Var/UnionParamsPresetHelper");
class FbLevelPrefabParamsConfig {
  constructor(e) {
    this.FbDataInternal = e;
    this.MYh = false;
    this.EYh = undefined;
    this.P_h = false;
    this.U_h = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbLevelPrefabParamsConfig(e);
    }
  }
  get ReferenceActorKey() {
    if (!this.MYh) {
      this.MYh = true;
      this.EYh = this.FbDataInternal.referenceActorKey();
    }
    return this.EYh;
  }
  get Params() {
    var e;
    var s;
    if (!this.P_h && (this.P_h = true, e = this.FbDataInternal.paramsType(), s = UnionParamsPresetHelper_1.UnionParamsPresetHelper.GetUnionParamsPresetObject(e))) {
      this.U_h = UnionParamsPresetHelper_1.UnionParamsPresetHelper.ReadUnionParamsPreset(e, this.FbDataInternal.params(s));
    }
    return this.U_h;
  }
}
exports.FbLevelPrefabParamsConfig = FbLevelPrefabParamsConfig;
//# sourceMappingURL=FbLevelPrefabParamsConfig.js.map