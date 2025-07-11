"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTemplateMatrix = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbGroupDestroyListenConfig_1 = require("./FbGroupDestroyListenConfig");
const FbTemplateMatrixRow_1 = require("./FbTemplateMatrixRow");
const FbVector2_1 = require("../Var/FbVector2");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTemplateMatrix {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.JPc = false;
    this.ZPc = undefined;
    this.exc = false;
    this.txc = undefined;
    this.ixc = false;
    this.rxc = undefined;
    this.oxc = false;
    this.nxc = undefined;
    this.sxc = false;
    this.axc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTemplateMatrix(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MatrixSize() {
    if (!this.JPc) {
      this.JPc = true;
      this.ZPc = FbVector2_1.FbVector2.Create(this.FbDataInternal.matrixSize());
    }
    return this.ZPc;
  }
  get TemplateMatrix() {
    if (!this.exc) {
      this.exc = true;
      this.txc = new Array();
      var i = this.FbDataInternal.templateMatrixLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.templateMatrix(t, new fb_component_1.TemplateMatrixRow());
          this.txc.push(FbTemplateMatrixRow_1.FbTemplateMatrixRow.Create(e));
        }
      }
    }
    return this.txc;
  }
  get EntityInterval() {
    if (!this.ixc) {
      this.ixc = true;
      this.rxc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.entityInterval());
    }
    return this.rxc;
  }
  get GroupDestroyListenConfigs() {
    if (!this.oxc) {
      this.oxc = true;
      this.nxc = new Array();
      var i = this.FbDataInternal.groupDestroyListenConfigsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.groupDestroyListenConfigs(t, new fb_component_1.GroupDestroyListenConfig());
          this.nxc.push(FbGroupDestroyListenConfig_1.FbGroupDestroyListenConfig.Create(e));
        }
      }
    }
    return this.nxc;
  }
  get OnNonGroupEntityDestroy() {
    if (!this.sxc) {
      this.sxc = true;
      this.axc = new Array();
      var i = this.FbDataInternal.onNonGroupEntityDestroyLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.onNonGroupEntityDestroy(t, new fb_action_1.ActionInfo());
          this.axc.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.axc;
  }
}
exports.FbTemplateMatrix = FbTemplateMatrix;
//# sourceMappingURL=FbTemplateMatrix.js.map