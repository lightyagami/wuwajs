"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSpawnTemplateEntityConfig = void 0;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSpawnTemplateEntityConfig {
  constructor(t) {
    this.FbDataInternal = t, this.FPc = !1, this.NPc = void 0, this.VPc = !1, this.jPc = void 0, this.HPc = !1, this.$Pc = void 0, this.WPc = !1, this.QPc = void 0
  }
  static Create(t) {
    if (t) return new FbSpawnTemplateEntityConfig(t)
  }
  get TemplateBpType() {
    return this.FPc || (this.FPc = !0, this.NPc = this.FbDataInternal.templateBpType()), this.NPc
  }
  get PosOffset() {
    return this.VPc || (this.VPc = !0, this.jPc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.posOffset())), this.jPc
  }
  get RotOffset() {
    return this.HPc || (this.HPc = !0, this.$Pc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotOffset())), this.$Pc
  }
  get GroupTypes() {
    if (!this.WPc) {
      this.WPc = !0, this.QPc = new Array;
      var i = this.FbDataInternal.groupTypesLength();
      if (i)
        for (let t = 0; t < i; ++t) this.QPc.push(this.FbDataInternal.groupTypes(t))
    }
    return this.QPc
  }
}
exports.FbSpawnTemplateEntityConfig = FbSpawnTemplateEntityConfig;
//# sourceMappingURL=FbSpawnTemplateEntityConfig.js.map