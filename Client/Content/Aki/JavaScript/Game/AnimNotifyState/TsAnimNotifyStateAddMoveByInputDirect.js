"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CombatLog_1 = require("../Utils/CombatLog");
class AddMoveParams {
  constructor() {
    this.NowTime = 0;
    this.CurrentSpeed = 0;
    this.InputDirectCache = Vector_1.Vector.Create();
    this.AccumulativeSpeedUpTime = 0;
    this.CharSkillComp = undefined;
    this.MoveComp = undefined;
    this.CharActorComp = undefined;
  }
}
const paramMap = new Map();
class TsAnimNotifyStateAddMoveByInputDirect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MaxSpeed = 10;
    this.AccelerationTime = 0;
    this.DecelerationTime = 0;
    this.SpeedCurve = undefined;
    this.Distance = 0;
    this.Acceleration = 0;
    this.Deceleration = 0;
    this.TotalTime = 0;
    this.TmpVector = undefined;
  }
  Constructor() {
    this.Acceleration = 0;
    this.Deceleration = 0;
    this.TotalTime = 0;
    this.TmpVector = undefined;
  }
  K2_NotifyBegin(t, i, s) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    this.TmpVector ||= Vector_1.Vector.Create();
    var h = new AddMoveParams();
    var e = t.CharacterActorComponent.Entity;
    h.CharSkillComp = e.GetComponent(40);
    h.MoveComp = e.GetComponent(45);
    h.CharActorComp = t.CharacterActorComponent;
    paramMap.set(t.CharacterActorComponent.Entity.Id, h);
    this.TotalTime = s;
    if (this.AccelerationTime + this.DecelerationTime > s) {
      CombatLog_1.CombatLog.Error("Skill", t.CharacterActorComponent.Entity, "加速时间+减速时间大于帧事件总时长", ["加速时间", this.AccelerationTime], ["减速时间", this.DecelerationTime], ["总时长", this.TotalTime], ["动画", i.GetName()]);
      return false;
    } else {
      if (this.AccelerationTime > 0) {
        this.Acceleration = this.MaxSpeed / this.AccelerationTime;
      }
      if (this.DecelerationTime > 0) {
        this.Deceleration = this.MaxSpeed / this.DecelerationTime;
      }
      return true;
    }
  }
  K2_NotifyTick(t, i, s) {
    var h;
    var e;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (h = t.CharacterActorComponent.Entity, (e = paramMap.get(h.Id)) ? ((t = t.CharacterActorComponent.InputDirectProxy).IsNearlyZero() || e.InputDirectCache.DeepCopy(t), t = this.GetOffset(t, s, e), e.MoveComp?.MoveCharacter(t, s, "TsAnimNotifyStateAddMoveByInputDirect"), e.NowTime += s, true) : (CombatLog_1.CombatLog.Error("Skill", h, "没有找到对应的AddMoveParams", ["EntityId", h.Id]), false));
  }
  K2_NotifyEnd(t, i) {
    t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (paramMap.delete(t.CharacterActorComponent.Entity.Id), true);
  }
  GetNotifyName() {
    return "输入向量叠加位移";
  }
  GetOffset(t, i, s) {
    var h;
    if (this.SpeedCurve) {
      if (this.IsDecelerating(t, s)) {
        if (this.DecelerationTime <= 0) {
          this.SetCurrentSpeedFromCurve(s, 0);
        } else if (this.AccelerationTime <= 0) {
          s.AccumulativeSpeedUpTime -= i;
          s.AccumulativeSpeedUpTime = Math.max(s.AccumulativeSpeedUpTime, 0);
          h = this.SpeedCurve.GetFloatValue(s.AccumulativeSpeedUpTime / this.DecelerationTime);
          this.SetCurrentSpeedFromCurve(s, h);
        } else {
          s.AccumulativeSpeedUpTime -= i * (this.AccelerationTime / this.DecelerationTime);
          s.AccumulativeSpeedUpTime = Math.max(s.AccumulativeSpeedUpTime, 0);
          h = this.SpeedCurve.GetFloatValue(s.AccumulativeSpeedUpTime / this.AccelerationTime);
          this.SetCurrentSpeedFromCurve(s, h);
        }
      } else if (this.AccelerationTime <= 0) {
        this.SetCurrentSpeedFromCurve(s, 1);
        s.AccumulativeSpeedUpTime = this.DecelerationTime;
      } else {
        s.AccumulativeSpeedUpTime += i;
        s.AccumulativeSpeedUpTime = Math.min(s.AccumulativeSpeedUpTime, this.AccelerationTime);
        h = this.SpeedCurve.GetFloatValue(s.AccumulativeSpeedUpTime / this.AccelerationTime);
        this.SetCurrentSpeedFromCurve(s, h);
      }
    } else if (this.IsDecelerating(t, s)) {
      if (this.Deceleration) {
        s.CurrentSpeed -= this.Deceleration * i;
        s.CurrentSpeed = Math.max(s.CurrentSpeed, 0);
      } else {
        s.CurrentSpeed = 0;
      }
    } else if (this.Acceleration) {
      s.CurrentSpeed += this.Acceleration * i;
      s.CurrentSpeed = Math.min(s.CurrentSpeed, this.MaxSpeed);
    } else {
      s.CurrentSpeed = this.MaxSpeed;
    }
    this.TmpVector.DeepCopy(s.InputDirectCache);
    this.TmpVector.Normalize();
    this.TmpVector.MultiplyEqual(s.CurrentSpeed * i);
    return this.TmpVector;
  }
  IsDecelerating(t, i) {
    var s = i.CharSkillComp?.GetSkillTargetForAns();
    if (this.Distance > 0 && s) {
      var h = i.CharActorComp.ActorLocationProxy;
      var s = this.GetTargetPosition(i, s);
      if (Vector_1.Vector.Dist2D(h, s) < this.Distance) {
        return true;
      }
    }
    return t.IsNearlyZero() || i.NowTime > this.TotalTime - this.DecelerationTime;
  }
  SetCurrentSpeedFromCurve(t, i) {
    i = this.MaxSpeed * i;
    t.CurrentSpeed = i <= 0 ? 0 : i;
  }
  GetTargetPosition(t, i) {
    var t = t.CharSkillComp.SkillTargetSocket;
    var s = i.Entity.GetComponent(3);
    if (t && s) {
      s = s.Actor.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(t));
      this.TmpVector.DeepCopy(s);
    } else {
      t = i.Entity.GetComponent(1);
      this.TmpVector.DeepCopy(t.ActorLocationProxy);
    }
    return this.TmpVector;
  }
}
exports.default = TsAnimNotifyStateAddMoveByInputDirect;
//# sourceMappingURL=TsAnimNotifyStateAddMoveByInputDirect.js.map