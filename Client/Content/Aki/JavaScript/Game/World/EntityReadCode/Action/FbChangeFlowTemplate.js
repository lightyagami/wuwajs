"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeFlowTemplate = undefined;
const FbFlowTemplateMode_1 = require("./FbFlowTemplateMode");
const FbPosA_1 = require("./FbPosA");
class FbChangeFlowTemplate {
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
      return new FbChangeFlowTemplate(t);
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
      var e = this.FbDataInternal.actorIdArrayLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
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
      var e = this.FbDataInternal.talkerIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.kMh.push(this.FbDataInternal.talkerIds(t));
        }
      }
    }
    return this.kMh;
  }
}
exports.FbChangeFlowTemplate = FbChangeFlowTemplate;
//# sourceMappingURL=FbChangeFlowTemplate.js.map