"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbChargeSlashHook = void 0;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbChargeSlashHook {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.BGh = !1, this.qGh = void 0, this.kGh = !1, this.GGh = void 0, this.OGh = !1, this.FGh = void 0, this.Z11 = !1, this.ec1 = void 0, this.tc1 = !1, this.ic1 = 0, this.qPc = !1, this.GPc = void 0, this.tx1 = !1, this.ix1 = 0, this.av1 = !1, this.hv1 = !1
  }
  static Create(t) {
    if (t) return new FbChargeSlashHook(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get HookActions() {
    if (!this.BGh) {
      this.BGh = !0, this.qGh = new Array;
      var i = this.FbDataInternal.hookActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.hookActions(t, new fb_action_1.ActionInfo);
          this.qGh.push(FbActionInfo_1.FbActionInfo.Create(s))
        }
    }
    return this.qGh
  }
  get ExitHookActions() {
    if (!this.kGh) {
      this.kGh = !0, this.GGh = new Array;
      var i = this.FbDataInternal.exitHookActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.exitHookActions(t, new fb_action_1.ActionInfo);
          this.GGh.push(FbActionInfo_1.FbActionInfo.Create(s))
        }
    }
    return this.GGh
  }
  get FinishActions() {
    if (!this.OGh) {
      this.OGh = !0, this.FGh = new Array;
      var i = this.FbDataInternal.finishActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.finishActions(t, new fb_action_1.ActionInfo);
          this.FGh.push(FbActionInfo_1.FbActionInfo.Create(s))
        }
    }
    return this.FGh
  }
  get TargetEntityIds() {
    if (!this.Z11) {
      this.Z11 = !0, this.ec1 = new Array;
      var i = this.FbDataInternal.targetEntityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t) this.ec1.push(this.FbDataInternal.targetEntityIds(t))
    }
    return this.ec1
  }
  get MaxRandomDelayTime() {
    return this.tc1 || (this.tc1 = !0, this.ic1 = this.FbDataInternal.maxRandomDelayTime()), this.ic1
  }
  get CharacterLookAt() {
    return this.qPc || (this.qPc = !0, this.GPc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.characterLookAt())), this.GPc
  }
  get CharacterLookAtPointId() {
    return this.tx1 || (this.tx1 = !0, this.ix1 = this.FbDataInternal.characterLookAtPointId()), this.ix1
  }
  get IsAdjustCameraConfig() {
    return this.av1 || (this.av1 = !0, this.hv1 = this.FbDataInternal.isAdjustCameraConfig()), this.hv1
  }
}
exports.FbChargeSlashHook = FbChargeSlashHook;
//# sourceMappingURL=FbChargeSlashHook.js.map