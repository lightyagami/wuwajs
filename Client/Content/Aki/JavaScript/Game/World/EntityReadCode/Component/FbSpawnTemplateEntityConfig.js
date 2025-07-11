"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnTemplateEntityConfig = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSpawnTemplateEntityConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.FPc = false;
    this.NPc = undefined;
    this.VPc = false;
    this.jPc = undefined;
    this.HPc = false;
    this.$Pc = undefined;
    this.WPc = false;
    this.QPc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSpawnTemplateEntityConfig(t);
    }
  }
  get TemplateBpType() {
    if (!this.FPc) {
      this.FPc = true;
      this.NPc = this.FbDataInternal.templateBpType();
    }
    return this.NPc;
  }
  get PosOffset() {
    if (!this.VPc) {
      this.VPc = true;
      this.jPc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.posOffset());
    }
    return this.jPc;
  }
  get RotOffset() {
    if (!this.HPc) {
      this.HPc = true;
      this.$Pc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotOffset());
    }
    return this.$Pc;
  }
  get GroupTypes() {
    if (!this.WPc) {
      this.WPc = true;
      this.QPc = new Array();
      var i = this.FbDataInternal.groupTypesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.QPc.push(this.FbDataInternal.groupTypes(t));
        }
      }
    }
    return this.QPc;
  }
}
exports.FbSpawnTemplateEntityConfig = FbSpawnTemplateEntityConfig;
//# sourceMappingURL=FbSpawnTemplateEntityConfig.js.map