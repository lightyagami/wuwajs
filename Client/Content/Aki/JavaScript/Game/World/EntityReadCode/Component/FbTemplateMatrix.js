"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbTemplateMatrix = void 0;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbGroupDestroyListenConfig_1 = require("./FbGroupDestroyListenConfig"),
  FbTemplateMatrixRow_1 = require("./FbTemplateMatrixRow"),
  FbVector2_1 = require("../Var/FbVector2"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTemplateMatrix {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.JPc = !1, this.ZPc = void 0, this.exc = !1, this.txc = void 0, this.ixc = !1, this.rxc = void 0, this.oxc = !1, this.nxc = void 0, this.sxc = !1, this.axc = void 0
  }
  static Create(t) {
    if (t) return new FbTemplateMatrix(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get MatrixSize() {
    return this.JPc || (this.JPc = !0, this.ZPc = FbVector2_1.FbVector2.Create(this.FbDataInternal.matrixSize())), this.ZPc
  }
  get TemplateMatrix() {
    if (!this.exc) {
      this.exc = !0, this.txc = new Array;
      var i = this.FbDataInternal.templateMatrixLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.templateMatrix(t, new fb_component_1.TemplateMatrixRow);
          this.txc.push(FbTemplateMatrixRow_1.FbTemplateMatrixRow.Create(e))
        }
    }
    return this.txc
  }
  get EntityInterval() {
    return this.ixc || (this.ixc = !0, this.rxc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.entityInterval())), this.rxc
  }
  get GroupDestroyListenConfigs() {
    if (!this.oxc) {
      this.oxc = !0, this.nxc = new Array;
      var i = this.FbDataInternal.groupDestroyListenConfigsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.groupDestroyListenConfigs(t, new fb_component_1.GroupDestroyListenConfig);
          this.nxc.push(FbGroupDestroyListenConfig_1.FbGroupDestroyListenConfig.Create(e))
        }
    }
    return this.nxc
  }
  get OnNonGroupEntityDestroy() {
    if (!this.sxc) {
      this.sxc = !0, this.axc = new Array;
      var i = this.FbDataInternal.onNonGroupEntityDestroyLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.onNonGroupEntityDestroy(t, new fb_action_1.ActionInfo);
          this.axc.push(FbActionInfo_1.FbActionInfo.Create(e))
        }
    }
    return this.axc
  }
}
exports.FbTemplateMatrix = FbTemplateMatrix;
//# sourceMappingURL=FbTemplateMatrix.js.map