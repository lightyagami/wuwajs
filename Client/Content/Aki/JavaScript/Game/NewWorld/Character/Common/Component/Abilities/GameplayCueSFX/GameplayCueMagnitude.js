"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueMagnitude = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../../Core/Common/Time");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../../../Camera/CameraController");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueMagnitude extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.Y$o = false;
    this.J$o = undefined;
    this.$te = undefined;
    this.Xte = undefined;
    this.m1t = undefined;
    this.z$o = undefined;
    this.one = 0;
    this.rne = 0;
    this.Value = 0;
    this.Z$o = 0;
    this.ajc = false;
    this.$Tf = 0;
    this.w3f = false;
    this._yo = (t, i, s) => {
      if (t === this.z$o) {
        this.rne = i;
      } else {
        this.Value = i;
      }
      this.eYo(this.Value);
    };
    this.tYo = t => {
      this.eYo(t);
    };
  }
  OnInit() {
    this.one = this.CueConfig.Min;
    this.rne = this.CueConfig.Max;
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.Z$o) {
      t = this.iYo();
      this.eYo(t, false);
      if (!t) {
        this.Z$o = 0;
      }
    } else if (this.ajc) {
      if (!MathUtils_1.MathUtils.IsNearlyEqual(this.Value, CameraController_1.CameraController.CameraRotator.Pitch)) {
        this.eYo(CameraController_1.CameraController.CameraRotator.Pitch, false);
      }
    } else if (this.w3f) {
      this.eYo(Time_1.Time.FlowTime - this.$Tf, false);
    }
  }
  OnCreate() {
    this.iqi();
    this.Y$o = this.oYo();
  }
  OnDestroy() {
    this.rYo();
  }
  OnSetMagnitude(t) {}
  OnChangeRole(t) {
    this.rYo();
    super.OnChangeRole(t);
    this.iqi();
    this.Y$o = this.oYo();
  }
  UseMagnitude() {
    return this.CueConfig.Magni !== 0 && !this.IsInstant;
  }
  HasMagnitudeComponent() {
    return !!this.$te && !!this.m1t && !!this.Xte;
  }
  oYo() {
    if (!this.UseMagnitude() || !this.HasMagnitudeComponent()) {
      return false;
    }
    let t = 0;
    switch (this.CueConfig.Magni) {
      case 1:
        if (!this.Ii(this.CueConfig.AttrId, "属性Id没填！")) {
          return false;
        }
        this.z$o = CharacterAttributeTypes_1.attributeIdsWithMax.get(this.CueConfig.AttrId);
        if (this.CueConfig.bListenAttr && (this.$te.AddListener(this.CueConfig.AttrId, this._yo, "GameplayCueMagnitude"), this.z$o)) {
          this.$te.AddListener(this.z$o, this._yo, "GameplayCueMagnitudeMax");
        }
        t = this.$te.GetCurrentValue(this.CueConfig.AttrId);
        if (this.z$o) {
          this.rne = this.$te.GetCurrentValue(this.z$o);
        }
        break;
      case 2:
        if (!this.Ii(this.CueConfig.Tag, "Tag没填！")) {
          return false;
        }
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.CueConfig.Tag);
        if (this.CueConfig.bListenAttr) {
          this.J$o = this.Xte.ListenForTagAnyCountChanged(i, this.tYo);
        }
        t = this.Xte.GetTagCount(i);
        break;
      case 3:
        t = this.m1t.GetBuffByHandle(this.BuffHandleId)?.Level ?? 1;
        break;
      case 4:
        if (this.CueConfig.bListenAttr) {
          this.Z$o = this.BuffHandleId;
        }
        t = this.iYo();
        break;
      case 5:
        this.ajc = this.CueConfig.bListenAttr;
        t = CameraController_1.CameraController.CameraRotator.Pitch;
        break;
      case 6:
        this.$Tf = Time_1.Time.FlowTime;
        this.w3f = true;
        t = 0;
        break;
      default:
        return false;
    }
    return this.eYo(t);
  }
  rYo() {
    if (this.Y$o) {
      switch (this.CueConfig.Magni) {
        case 1:
          if (this.CueConfig.bListenAttr && (this.$te.RemoveListener(this.CueConfig.AttrId, this._yo), this.z$o)) {
            this.$te.RemoveListener(this.z$o, this._yo);
          }
          break;
        case 2:
          if (this.CueConfig.bListenAttr && this.J$o) {
            this.J$o.EndTask();
            this.J$o = undefined;
          }
          break;
        case 3:
          break;
        case 4:
          if (this.CueConfig.bListenAttr) {
            this.Z$o = 0;
          }
          break;
        case 5:
          this.ajc = false;
          break;
        case 6:
          this.w3f = false;
      }
    }
  }
  eYo(t, i = true) {
    if (!this.Ii(this.rne >= this.one, "Buff特效表Min>Max！有问题")) {
      return false;
    }
    this.Value = t;
    t = this.Normalize();
    if (i && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "Cue特效幅度", ["BuffId", this.BuffId], ["CueId", this.CueConfig.Id], ["EntityId", this.EntityHandle.Id], ["Value", t]);
    }
    this.OnSetMagnitude(t);
    return true;
  }
  Normalize() {
    if (this.Z$o) {
      return this.Value;
    } else if (this.one === this.rne) {
      return 0;
    } else {
      return (MathUtils_1.MathUtils.Clamp(this.Value, this.one, this.rne) - this.one) / (this.rne - this.one);
    }
  }
  ToRange(t) {
    return t * (this.rne - this.one) + this.one;
  }
  Ii(t, i) {
    return !!t || (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 28, i, ["CueId", this.CueConfig.Id]), false);
  }
  iYo() {
    var t = this.m1t.GetBuffByHandle(this.BuffHandleId)?.GetRemainDuration() ?? 0;
    var i = this.m1t.GetBuffByHandle(this.BuffHandleId)?.Duration ?? 1;
    if (i > 0) {
      return t / i;
    } else {
      return 0;
    }
  }
  iqi() {
    this.$te = this.EntityHandle.Entity.GetComponent(183);
    this.m1t = this.EntityHandle.Entity.GetComponent(222);
    this.Xte = this.EntityHandle.Entity.GetComponent(217);
  }
  SyncMagnitude(t) {}
}
exports.GameplayCueMagnitude = GameplayCueMagnitude;
//# sourceMappingURL=GameplayCueMagnitude.js.map