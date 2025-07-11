"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGroupDestroyListenConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbGroupDestroyListenConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.UPc = false;
    this.BPc = undefined;
    this.kPc = false;
    this.OPc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGroupDestroyListenConfig(t);
    }
  }
  get GroupType() {
    if (!this.UPc) {
      this.UPc = true;
      this.BPc = this.FbDataInternal.groupType();
    }
    return this.BPc;
  }
  get OnTriggerActions() {
    if (!this.kPc) {
      this.kPc = true;
      this.OPc = new Array();
      var i = this.FbDataInternal.onTriggerActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.onTriggerActions(t, new fb_action_1.ActionInfo());
          this.OPc.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.OPc;
  }
}
exports.FbGroupDestroyListenConfig = FbGroupDestroyListenConfig;
//# sourceMappingURL=FbGroupDestroyListenConfig.js.map