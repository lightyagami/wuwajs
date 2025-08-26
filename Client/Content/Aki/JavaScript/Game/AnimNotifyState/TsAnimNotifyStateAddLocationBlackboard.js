"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class AddLocationBlackboardParams {
  constructor() {
    this.TotalDuration = -0;
    this.AddOffset = Vector_1.Vector.Create();
    this.RunTime = -0;
  }
}
const paramsPool = new Array();
const paramsMaps = new Map();
const tmpVector = Vector_1.Vector.Create();
class TsAnimNotifyStateAddLocationBlackboard extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.AddLocationKey = "";
    this.Curve = undefined;
    this.NeedChangeToFlying = false;
    this.黑板类型 = 0;
  }
  Constructor() {}
  K2_NotifyBegin(t, r, e) {
    var a = t.GetOwner();
    if (!(a instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var s = a.CharacterActorComponent.Entity.Id;
    if (!this.AddLocationKey) {
      return false;
    }
    let o = paramsMaps.get(this.AddLocationKey);
    if (!o) {
      o = new Map();
      paramsMaps.set(this.AddLocationKey, o);
    }
    var i = paramsPool.length > 0 ? paramsPool.pop() : new AddLocationBlackboardParams();
    i.TotalDuration = e;
    i.RunTime = 0;
    switch (this.黑板类型) {
      case 0:
        var n = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s, this.AddLocationKey);
        if (!n) {
          return false;
        }
        i.AddOffset.FromUeVector(n);
        break;
      case 1:
        n = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s, this.AddLocationKey);
        if (!n) {
          return false;
        }
        i.AddOffset.FromUeVector(n);
        i.AddOffset.SubtractionEqual(a.CharacterActorComponent.ActorLocationProxy);
        break;
      case 2:
      case 3:
        {
          let t = undefined;
          if (!(t = this.黑板类型 === 2 ? ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(s, this.AddLocationKey) : ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(s, this.AddLocationKey))) {
            return false;
          }
          n = EntitySystem_1.EntitySystem.Get(t);
          if (!n?.Valid) {
            return false;
          }
          n = n.GetComponent(1);
          i.AddOffset.DeepCopy(n.ActorLocationProxy);
          i.AddOffset.SubtractionEqual(a.CharacterActorComponent.ActorLocationProxy);
          break;
        }
      default:
        return false;
    }
    o.set(s, i);
    if (this.NeedChangeToFlying) {
      a.KuroSetMovementMode({
        Mode: 5,
        Context: "[TsAnimNotifyStateAddLocationBlackboard.K2_NotifyBegin]"
      });
    }
    return true;
  }
  K2_NotifyTick(r, t, e) {
    r = r.GetOwner();
    if (!(r instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var r = r.CharacterActorComponent.Entity;
    var a = r.Id;
    var s = paramsMaps.get(this.AddLocationKey);
    if (!s) {
      return false;
    }
    s = s.get(a);
    if (!s) {
      return false;
    }
    if (!(s.RunTime >= s.TotalDuration)) {
      a = Math.min(s.TotalDuration, s.RunTime + e);
      let t = 0;
      t = this.Curve ? this.Curve.GetFloatValue(a / s.TotalDuration) - this.Curve.GetFloatValue(s.RunTime / s.TotalDuration) : (a - s.RunTime) / s.TotalDuration;
      r = r.GetComponent(179);
      s.AddOffset.Multiply(t, tmpVector);
      r.MoveCharacter(tmpVector, e);
      s.RunTime = a;
    }
    return true;
  }
  K2_NotifyEnd(t, r) {
    var e;
    var a;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(e = paramsMaps.get(this.AddLocationKey)) && (t = t.CharacterActorComponent.Entity.Id, (a = e.get(t)) && (paramsPool.push(a), e.delete(t)), true);
  }
  GetNotifyName() {
    return "黑板位置设置角色位置偏移";
  }
}
exports.default = TsAnimNotifyStateAddLocationBlackboard;
//# sourceMappingURL=TsAnimNotifyStateAddLocationBlackboard.js.map