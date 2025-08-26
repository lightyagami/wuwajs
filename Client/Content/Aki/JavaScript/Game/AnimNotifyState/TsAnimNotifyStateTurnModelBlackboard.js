"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const tmpQuat = Quat_1.Quat.Create();
class TurnModelBlackboardParams {
  constructor() {
    this.TotalDuration = 0;
    this.TurnModel = Rotator_1.Rotator.Create();
    this.TurnModelQuat = Quat_1.Quat.Create();
    this.RunTime = 0;
  }
}
class TsAnimNotifyStateTurnModelBlackboard extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.TurnModelKey = "";
    this.Curve = undefined;
    this.TurnActorOnEnd = true;
    this.Absolute = false;
    this.ParamsMap = new Map();
  }
  Constructor() {
    this.ParamsMap = new Map();
  }
  Init() {
    this.ParamsMap ||= new Map();
  }
  K2_NotifyBegin(t, r, e) {
    this.Init();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var a = t.CharacterActorComponent.Entity;
    if (!a.GetComponent(178)?.Valid) {
      return false;
    }
    a = a.Id;
    if (!this.TurnModelKey) {
      return false;
    }
    a = ControllerHolder_1.ControllerHolder.BlackboardController.GetRotatorValueByEntity(a, this.TurnModelKey);
    if (!a) {
      return false;
    }
    if (this.Absolute) {
      s = t.CharacterActorComponent?.ActorRotationProxy;
      a.Pitch -= s?.Pitch ?? 0;
      a.Yaw -= s?.Yaw ?? 0;
      a.Roll -= s?.Roll ?? 0;
    }
    var s = new TurnModelBlackboardParams();
    s.TotalDuration = e;
    s.TurnModel.FromUeRotator(a);
    s.TurnModel.Quaternion(s.TurnModelQuat);
    s.RunTime = 0;
    this.ParamsMap.set(t, s);
    return true;
  }
  K2_NotifyTick(t, r, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var a = t.CharacterActorComponent.Entity.GetComponent(178);
    if (!a?.Valid) {
      return false;
    }
    t = this.ParamsMap.get(t);
    if (!t) {
      return false;
    }
    var s = t.TotalDuration;
    var i = t.TurnModelQuat;
    var o = t.RunTime;
    var n = o + e;
    let u = 0;
    u = this.Curve ? this.Curve.GetFloatValue(n / s) - this.Curve.GetFloatValue(o / s) : e / s;
    Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, i, u, tmpQuat);
    a.AddModelQuat(tmpQuat, true);
    t.RunTime = n;
    return true;
  }
  K2_NotifyEnd(t, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var e = t.CharacterActorComponent;
    var a = t.CharacterActorComponent.Entity;
    var s = this.ParamsMap.get(t);
    if (!s) {
      return false;
    }
    this.ParamsMap.delete(t);
    if (this.TurnActorOnEnd) {
      e.AddActorLocalRotation(s.TurnModel.ToUeRotator(), "TsAnimNotifyStateTurnModelBlackboard", false);
    }
    t = a.GetComponent(178);
    return !!t && (t.ResetModelQuat(), true);
  }
  GetNotifyName() {
    return "黑板旋转角色";
  }
}
exports.default = TsAnimNotifyStateTurnModelBlackboard;
//# sourceMappingURL=TsAnimNotifyStateTurnModelBlackboard.js.map