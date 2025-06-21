"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbGroupDestroyListenConfig = void 0;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbGroupDestroyListenConfig {
  constructor(t) {
    this.FbDataInternal = t, this.UPc = !1, this.BPc = void 0, this.kPc = !1, this.OPc = void 0
  }
  static Create(t) {
    if (t) return new FbGroupDestroyListenConfig(t)
  }
  get GroupType() {
    return this.UPc || (this.UPc = !0, this.BPc = this.FbDataInternal.groupType()), this.BPc
  }
  get OnTriggerActions() {
    if (!this.kPc) {
      this.kPc = !0, this.OPc = new Array;
      var i = this.FbDataInternal.onTriggerActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.onTriggerActions(t, new fb_action_1.ActionInfo);
          this.OPc.push(FbActionInfo_1.FbActionInfo.Create(s))
        }
    }
    return this.OPc
  }
}
exports.FbGroupDestroyListenConfig = FbGroupDestroyListenConfig;
//# sourceMappingURL=FbGroupDestroyListenConfig.js.map