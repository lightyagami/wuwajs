"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChargeSlashHook = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbChargeSlashHook {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.BGh = false;
    this.qGh = undefined;
    this.kGh = false;
    this.GGh = undefined;
    this.OGh = false;
    this.FGh = undefined;
    this.vc1 = false;
    this.yc1 = undefined;
    this.Sc1 = false;
    this.Mc1 = 0;
    this.qPc = false;
    this.GPc = undefined;
    this.Dx1 = false;
    this.Ux1 = 0;
    this.Rv1 = false;
    this.Lv1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbChargeSlashHook(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HookActions() {
    if (!this.BGh) {
      this.BGh = true;
      this.qGh = new Array();
      var i = this.FbDataInternal.hookActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.hookActions(t, new fb_action_1.ActionInfo());
          this.qGh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.qGh;
  }
  get ExitHookActions() {
    if (!this.kGh) {
      this.kGh = true;
      this.GGh = new Array();
      var i = this.FbDataInternal.exitHookActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.exitHookActions(t, new fb_action_1.ActionInfo());
          this.GGh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.GGh;
  }
  get FinishActions() {
    if (!this.OGh) {
      this.OGh = true;
      this.FGh = new Array();
      var i = this.FbDataInternal.finishActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.finishActions(t, new fb_action_1.ActionInfo());
          this.FGh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.FGh;
  }
  get TargetEntityIds() {
    if (!this.vc1) {
      this.vc1 = true;
      this.yc1 = new Array();
      var i = this.FbDataInternal.targetEntityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.yc1.push(this.FbDataInternal.targetEntityIds(t));
        }
      }
    }
    return this.yc1;
  }
  get MaxRandomDelayTime() {
    if (!this.Sc1) {
      this.Sc1 = true;
      this.Mc1 = this.FbDataInternal.maxRandomDelayTime();
    }
    return this.Mc1;
  }
  get CharacterLookAt() {
    if (!this.qPc) {
      this.qPc = true;
      this.GPc = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.characterLookAt());
    }
    return this.GPc;
  }
  get CharacterLookAtPointId() {
    if (!this.Dx1) {
      this.Dx1 = true;
      this.Ux1 = this.FbDataInternal.characterLookAtPointId();
    }
    return this.Ux1;
  }
  get IsAdjustCameraConfig() {
    if (!this.Rv1) {
      this.Rv1 = true;
      this.Lv1 = this.FbDataInternal.isAdjustCameraConfig();
    }
    return this.Lv1;
  }
}
exports.FbChargeSlashHook = FbChargeSlashHook;
//# sourceMappingURL=FbChargeSlashHook.js.map