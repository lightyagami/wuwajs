"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const GravityUtils_1 = require("../Utils/GravityUtils");
class TurningParams {
  constructor(t) {
    this.NeedTurn = false;
    this.AddRate = 0;
    this.TotalTime = 0;
    this.StartAngle = 0;
    this.EndAngle = 0;
    this.PreFrameAngle = 0;
    this.IsInit = false;
    this.TotalTime = t;
  }
  CalcTurningRate(t, e, i) {
    var r;
    var n = t.Entity.GetComponent(186);
    this.EndAngle = n.MainAnimInstance.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK, this.TotalTime);
    this.StartAngle = n.MainAnimInstance.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK, 0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "TurnAdd 1058338", ["EntityId", t.Entity.Id], ["endAngle", this.EndAngle], ["startTime", e], ["startAngle", this.StartAngle]);
    }
    var n = this.EndAngle - this.StartAngle;
    if (!MathUtils_1.MathUtils.IsNearlyZero(n)) {
      e = MathUtils_1.MathUtils.WrapAngle(GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInput(t));
      this.AddRate = (r = e - n) / n;
      this.NeedTurn = true;
      this.PreFrameAngle = this.StartAngle;
      this.IsInit = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 6, "TurnAdd 1058338", ["EntityId", t.Entity.Id], ["needAddAngle", r], ["Current", t.ActorRotationProxy], ["Input", t.InputRotatorProxy], ["Delta", e]);
      }
    }
  }
}
class TsAnimNotifyStateTurnAdd extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, i) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var r = t.CharacterActorComponent;
    if (!r?.Valid) {
      return false;
    }
    if (r.GetSequenceBinding()) {
      return false;
    }
    if (!r.IsMoveAutonomousProxy) {
      return false;
    }
    TsAnimNotifyStateTurnAdd.Initialize();
    i = new TurningParams(i);
    TsAnimNotifyStateTurnAdd.CachedMap.set(t, i);
    t = r.Entity.GetComponent(190);
    if (t) {
      t.IsTurning = true;
    }
    return true;
  }
  K2_NotifyTick(t, e, i) {
    var r;
    var n;
    var s;
    var a;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(r = t.CharacterActorComponent)?.Valid && !r.GetSequenceBinding() && !!r.IsMoveAutonomousProxy && !!(n = r.Entity.GetComponent(186))?.Valid && !!(t = TsAnimNotifyStateTurnAdd.CachedMap.get(t)) && !(t.IsInit || t.CalcTurningRate(r, this.CurrentTimeLength, i), !t.NeedTurn) && !(i = t.AddRate, n = n.MainAnimInstance.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK, 0), s = t.PreFrameAngle, (a = !!r.Entity.GetComponent(242)?.IsOnVehicle) && r.SetForbidSettingLocAndRot(false, 0), TsAnimNotifyStateTurnAdd.TmpRotator.Yaw = i * (n - s), r.AddActorLocalRotation(TsAnimNotifyStateTurnAdd.TmpRotator, "TsAnimNotifyStateTurnAdd", false), t.PreFrameAngle = n, a && r.SetForbidSettingLocAndRot(true, 0), 0);
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var i = t.CharacterActorComponent;
    if (!i?.Valid) {
      return false;
    }
    if (i.GetSequenceBinding()) {
      return false;
    }
    if (!i.IsMoveAutonomousProxy) {
      return false;
    }
    TsAnimNotifyStateTurnAdd.CachedMap?.delete(t);
    t = i.Entity.GetComponent(190);
    if (t) {
      t.IsTurning = false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "TurnAdd End", ["EntityId", i.Entity.Id], ["Current", i.ActorRotationProxy], ["Input", i.InputRotatorProxy]);
    }
    return true;
  }
  GetNotifyName() {
    return "根据RootLook曲线控制角色转向";
  }
  static Initialize() {
    if (!TsAnimNotifyStateTurnAdd.IsInit) {
      TsAnimNotifyStateTurnAdd.CachedMap = new Map();
      TsAnimNotifyStateTurnAdd.TmpRotator = new UE.Rotator(0, 0, 0);
      TsAnimNotifyStateTurnAdd.IsInit = true;
    }
  }
}
TsAnimNotifyStateTurnAdd.IsInit = false;
TsAnimNotifyStateTurnAdd.CachedMap = undefined;
TsAnimNotifyStateTurnAdd.TmpRotator = undefined;
exports.default = TsAnimNotifyStateTurnAdd; //# sourceMappingURL=TsAnimNotifyStateTurnAdd.js.map