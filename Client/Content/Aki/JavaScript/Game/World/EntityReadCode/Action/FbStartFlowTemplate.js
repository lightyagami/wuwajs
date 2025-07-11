"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStartFlowTemplate = undefined;
const FbFlowTemplateMode_1 = require("./FbFlowTemplateMode");
const FbPosA_1 = require("./FbPosA");
class FbStartFlowTemplate {
  constructor(t) {
    this.FbDataInternal = t;
    this.sfh = false;
    this.afh = undefined;
    this.hfh = false;
    this.lfh = undefined;
    this.DMh = false;
    this.BMh = undefined;
    this.qMh = false;
    this.kMh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStartFlowTemplate(t);
    }
  }
  get TemplateMode() {
    if (!this.sfh) {
      this.sfh = true;
      this.afh = FbFlowTemplateMode_1.FbFlowTemplateMode.Create(this.FbDataInternal.templateMode());
    }
    return this.afh;
  }
  get TargetPos() {
    if (!this.hfh) {
      this.hfh = true;
      this.lfh = FbPosA_1.FbPosA.Create(this.FbDataInternal.targetPos());
    }
    return this.lfh;
  }
  get ActorIdArray() {
    if (!this.DMh) {
      this.DMh = true;
      this.BMh = new Array();
      var s = this.FbDataInternal.actorIdArrayLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.BMh.push(this.FbDataInternal.actorIdArray(t));
        }
      }
    }
    return this.BMh;
  }
  get TalkerIds() {
    if (!this.qMh) {
      this.qMh = true;
      this.kMh = new Array();
      var s = this.FbDataInternal.talkerIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.kMh.push(this.FbDataInternal.talkerIds(t));
        }
      }
    }
    return this.kMh;
  }
}
exports.FbStartFlowTemplate = FbStartFlowTemplate;
//# sourceMappingURL=FbStartFlowTemplate.js.map