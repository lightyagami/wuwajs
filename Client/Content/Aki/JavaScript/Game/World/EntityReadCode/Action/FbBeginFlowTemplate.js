"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBeginFlowTemplate = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbFlowActorUnit_1 = require("./FbFlowActorUnit");
class FbBeginFlowTemplate {
  constructor(t) {
    this.FbDataInternal = t;
    this.ogh = false;
    this.ngh = false;
    this.GMh = false;
    this.OMh = undefined;
    this.FMh = false;
    this.NMh = undefined;
    this.VMh = false;
    this.jMh = false;
    this.Omh = false;
    this.Fmh = false;
  }
  static Create(t) {
    if (t) {
      return new FbBeginFlowTemplate(t);
    }
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get Actors() {
    if (!this.GMh) {
      this.GMh = true;
      this.OMh = new Array();
      var i = this.FbDataInternal.actorsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actors(t, new fb_action_1.FlowActorUnit());
          this.OMh.push(FbFlowActorUnit_1.FbFlowActorUnit.Create(s));
        }
      }
    }
    return this.OMh;
  }
  get MontageIds() {
    if (!this.FMh) {
      this.FMh = true;
      this.NMh = new Array();
      var i = this.FbDataInternal.montageIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.NMh.push(this.FbDataInternal.montageIds(t));
        }
      }
    }
    return this.NMh;
  }
  get UseFreeCamera() {
    if (!this.VMh) {
      this.VMh = true;
      this.jMh = this.FbDataInternal.useFreeCamera();
    }
    return this.jMh;
  }
  get IsSwitchMainRole() {
    if (!this.Omh) {
      this.Omh = true;
      this.Fmh = this.FbDataInternal.isSwitchMainRole();
    }
    return this.Fmh;
  }
}
exports.FbBeginFlowTemplate = FbBeginFlowTemplate;
//# sourceMappingURL=FbBeginFlowTemplate.js.map