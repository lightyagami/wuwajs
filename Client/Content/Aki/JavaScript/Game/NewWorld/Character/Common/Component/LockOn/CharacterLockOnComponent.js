"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, s, e);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        o = (r < 3 ? h(o) : r > 3 ? h(i, s, o) : h(i, s)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(i, s, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLockOnComponent = undefined;
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../../Camera/CameraController");
const FightCameraLogicComponent_1 = require("../../../../../Camera/FightCameraLogicComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const BaseLockOnComponent_1 = require("./BaseLockOnComponent");
const LockOnDebug_1 = require("./LockOnDebug");
const LockOnUtils_1 = require("./LockOnUtils");
const LOCK_DIR_COMPENSATE_REASON = "角色强锁补偿buff";
let CharacterLockOnComponent = class CharacterLockOnComponent extends BaseLockOnComponent_1.BaseLockOnComponent {
  constructor() {
    super(...arguments);
    this.SSa = Stats_1.Stat.Create("CharacterLockOnComponent.StatTickMoveDir");
    this.ESa = Stats_1.Stat.Create("CharacterLockOnComponent.StatTickCurrentInfo");
    this.ySa = Stats_1.Stat.Create("CharacterLockOnComponent.StatCheck");
    this.Hte = undefined;
    this.HBr = undefined;
    this.RSo = undefined;
    this.m1t = undefined;
    this.I3r = t => {
      t = t.GetComponent(34);
      this.IsLookAt = t.IsLookAt;
      this.IgnoreInfos = t.IgnoreInfos.slice();
      this.SetCurrentInfo(t.GetCurrentInfo);
      this.RestoreIgnoreTarget = t.RestoreIgnoreTarget;
      this.SetShowTarget(t.ShowTarget, t.ShowTargetSocket);
    };
    this._$r = Vector_1.Vector.Create();
    this.Zpe = t => {
      var i = this.IsCompensateLockDirection();
      if (t) {
        if (i) {
          this.ExitLockDirection();
          this.i01();
          this.EnterLockDirection();
        }
      } else {
        this.r01();
      }
    };
    this.a$r = (t, i) => {
      var s;
      if (i) {
        if (this.IsHardLock) {
          this.OldInfoAtRemoveDisableHardLockTag = this.GetCurrentInfo;
        }
      } else {
        i = this.OldInfoAtRemoveDisableHardLockTag?.EntityHandle?.Entity;
        if (this.OldInfoAtRemoveDisableHardLockTag && i?.Valid && (i = i.GetComponent(3))?.Valid && (s = ModelManager_1.ModelManager?.CameraModel?.FightCamera?.LogicComponent)?.CheckPositionInScreen(i.ActorLocationProxy, s.CameraAdjustController.CheckInScreenMinX, s.CameraAdjustController.CheckInScreenMaxX, s.CameraAdjustController.CheckInScreenMinY, s.CameraAdjustController.CheckInScreenMaxY)) {
          if (this.IsHardLock) {
            this.SetCurrentInfo(this.OldInfoAtRemoveDisableHardLockTag);
            this.SetShowTarget(this.GetCurrentInfo.EntityHandle, this.GetCurrentInfo.SocketName);
            this.SVarHardLockedQueue.Push(this.GetCurrentInfo);
          } else {
            this.EnterLockDirection();
          }
          this.OldInfoAtRemoveDisableHardLockTag = undefined;
        }
      }
    };
    this.l$r = false;
    this.CCa = undefined;
  }
  static get Dependencies() {
    return [186];
  }
  OnTargetDeadOrRemoved() {
    if (this.IsLookAt) {
      this.ForceLookAt(undefined, false);
    } else if (this.IsHardLock) {
      this.t$r(true);
    } else {
      this.SetCurrentInfo(undefined);
      this.SetShowTarget(undefined);
    }
  }
  OnStart() {
    super.OnStart();
    this.Hte = this.Entity.GetComponent(3);
    this.CreatureComp = this.Entity.GetComponent(0);
    this.SetLockOnConfig(this.CreatureComp.GetRoleConfig()?.LockOnDefaultId ?? 0, this.CreatureComp.GetRoleConfig()?.LockOnLookOnId ?? 0);
    this.HBr = this.Entity.GetComponent(186);
    this.RSo = this.Entity.GetComponent(67);
    this.m1t = this.Entity.GetComponent(185);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    this.TagComponent.ListenForTagAddOrRemove(483118073, this.a$r);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    return true;
  }
  OnDisable(t) {
    this.TagComponent?.RemoveTag(2130437044);
  }
  OnTick(t) {
    this.SSa.Start();
    this.m$r();
    this.SSa.Stop();
    this.ESa.Start();
    this.sra();
    this.ESa.Stop();
    this.ySa.Start();
    this.Check(t);
    this.ySa.Stop();
    this.UpdateTargetsIsLock(t);
    this.g$r();
    super.OnTick(t);
  }
  SetAndShowTarget(t, i) {
    this.SetCurrentInfo(t);
    if (t?.EntityHandle?.Valid) {
      LockOnDebug_1.LockOnDebug.SetDebugArrow(t);
    }
    if (i) {
      this.c$r(this.GetCurrentTarget(), this.GetCurrentTargetSocketName());
    }
  }
  SetShowTarget(t, i = "", s = false) {
    if (t) {
      if (!this.TagComponent?.HasTag(2130437044)) {
        this.TagComponent?.AddTag(2130437044);
      }
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharSetShowTarget, t.Id, i, s);
    } else if (this.TagComponent?.HasTag(2130437044)) {
      this.TagComponent?.RemoveTag(2130437044);
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharSetShowTarget, -1, "", s);
    }
    this.ShowTargetSetTime = Time_1.Time.WorldTime;
    s = t?.Entity?.GetComponent(3);
    if (this.ShowTarget !== t || this.ShowTargetSocket !== i) {
      if (t === undefined) {
        this.ShowTargetInternal = undefined;
        this.ShowTargetSocketInternal = "";
        GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(undefined);
        return false;
      }
      this.ShowTargetInternal = t;
      this.ShowTargetSocketInternal = i;
      if (s) {
        GlobalData_1.GlobalData.BpEventManager.小队技能目标改变时.Broadcast(s.Actor);
      }
    }
    return true;
  }
  c$r(t, i = "") {
    var s;
    var e;
    return !this.IsHardLock && !this.TagComponent.HasTag(2066208190) && (t?.Valid && t.Entity.Active ? (s = t.Entity.GetComponent(3)) ? i ? !!(e = s.LockOnParts.get(i)) && !!e.SoftLockValid && this.SetShowTarget(t, i) : !s.LockOnParts.size && this.SetShowTarget(t, i) : this.SetShowTarget(t, i) : this.SetShowTarget(undefined));
  }
  ClearLockOnTarget() {
    super.ClearLockOnTarget();
    this.ExitLockDirection();
    this.ForceLookAt(undefined, false);
  }
  ForceLookAt(i, t) {
    if (t) {
      if (!LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(i?.EntityHandle)) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "无效的看向目标！");
        return;
      }
      if (this.IsLookAt && !i?.Different(this.GetCurrentInfo)) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "重复进入看向状态！");
        return;
      }
      if (this.IgnoreInfos.some(t => !t.Different(i))) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "忽略锁定期间不能进入看向状态！");
        return;
      }
    }
    this.IsLookAt;
    if (t) {
      this.IsLookAt = true;
      if (this.IsHardLock) {
        if (!i?.Different(this.GetCurrentInfo)) {
          return;
        }
      } else {
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection);
      }
      this.SetCurrentInfo(i);
      this.SetShowTarget(i?.EntityHandle, i?.SocketName);
    } else if (this.IsLookAt && !i?.Different(this.GetCurrentInfo)) {
      this.IsLookAt = false;
      if (!this.IsHardLock) {
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
    }
    this.IsLookAt;
  }
  ForceIgnore(i, t) {
    if (t) {
      if (this.IgnoreInfos.some(t => !t.Different(i))) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "重复进入忽略锁定状态！");
        return;
      }
      if (this.IsLookAt && !this.GetCurrentInfo?.Different(i)) {
        CombatLog_1.CombatLog.Error("LockOn", this.Entity, "看向状态期间不能忽略锁定！");
        return;
      }
    }
    if (t) {
      this.IgnoreInfos.push(i);
      if (this.GetCurrentInfo && !i.Different(this.GetCurrentInfo)) {
        if (this.IsHardLock) {
          this.RestoreIgnoreTarget = this.GetCurrentInfo;
        }
        this.SetCurrentInfo(undefined);
        this.SetShowTarget(undefined);
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
    } else {
      if (this.IgnoreInfos.some(t => !t.Different(i))) {
        this.IgnoreInfos = this.IgnoreInfos.filter(t => t.Different(i));
      }
      if (this.RestoreIgnoreTarget && !this.RestoreIgnoreTarget.Different(i)) {
        if (!this.IsHardLock && LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(i.EntityHandle)) {
          this.SetCurrentInfo(this.RestoreIgnoreTarget);
          this.SetShowTarget(this.RestoreIgnoreTarget.EntityHandle, this.RestoreIgnoreTarget.SocketName);
          this.SVarHardLockedQueue.Push(this.RestoreIgnoreTarget);
          this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection);
        }
        this.RestoreIgnoreTarget = undefined;
      }
    }
  }
  sra() {
    var t;
    if (!this.IsLookAt) {
      if (this.TagComponent.HasTag(2066208190)) {
        this.ClearLockOnTarget();
      } else if (this.GetCurrentInfo?.EntityHandle?.Valid && this.HardLockConfig) {
        if (this.IsHardLock) {
          t = this.TmpVector1;
          this.GetSkillBoneLocation(this.GetCurrentInfo.EntityHandle, this.GetCurrentInfo.SocketName, t);
          if (this.IsEntityContainsDisableHardLockTag(this.GetCurrentInfo.EntityHandle) || this.CannotBeDetected(this.HardLockConfig, this.GetCurrentInfo.EntityHandle, t)) {
            this.ExitLockDirection();
          }
        } else if (this.IsEntityContainsDisableSoftLockTag(this.GetCurrentInfo.EntityHandle) || this.CannotBeDetected(this.HardLockConfig, this.GetCurrentInfo.EntityHandle, this.GetCurrentInfo.EntityHandle.Entity.GetComponent(1).ActorLocationProxy)) {
          this.SetCurrentInfo(undefined);
          this.SetShowTarget(undefined);
        }
      }
    }
  }
  m$r() {
    var t;
    var i;
    if (this.RSo && (t = this.RSo.GetMoveDirectionCache(), [i] = this.RSo.GetCameraInput(), i === 0 && this._$r.Equals(t, MathUtils_1.MathUtils.SmallNumber) || (this._$r.Set(t.X, t.Y, 0), this.InputDirect.DeepCopy(this.Hte.InputDirectProxy), this._$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) || (this.HasChangeInput = true), this.SpeedUpCleanTarget())) {
      this.HasChangeInput = true;
    }
  }
  EnterLockDirection() {
    if (!this.IsLookAt) {
      if (this.IsHardLock) {
        return;
      }
      if (this.TagComponent.HasTag(428837378)) {
        return;
      }
      if (this.TagComponent.HasTag(2066208190)) {
        return;
      }
      if (CameraController_1.CameraController.FightCamera.LogicComponent.IsDisableResetFocus) {
        return;
      }
      this.t$r(true);
      if (!this.GetCurrentInfo) {
        this.ResetFocus();
        return;
      }
      this.CheckCount = 0;
    }
    this.SVarHardLockedQueue.Push(this.GetCurrentInfo);
    this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection);
  }
  ExitLockDirection() {
    if (this.IsHardLock) {
      if (this.IsLookAt) {
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.LookAtDirection);
      } else {
        this.SetShowTarget(undefined);
        this.SVarHardLockedQueue.Clear();
        this.HBr.SetDirectionState(CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection);
      }
    }
  }
  r01() {
    if (this.IsHardLock) {
      this.m1t?.AddBuff(CharacterBuffIds_1.buffId.HardLockCompensateBuff, {
        InstigatorId: this.m1t?.CreatureDataId,
        Reason: LOCK_DIR_COMPENSATE_REASON
      });
    }
  }
  i01() {
    return !!this.IsCompensateLockDirection() && !!this.m1t && !(this.m1t.RemoveBuff(CharacterBuffIds_1.buffId.HardLockCompensateBuff, -1, LOCK_DIR_COMPENSATE_REASON), 0);
  }
  IsCompensateLockDirection() {
    return this.TagComponent.HasTag(1320595126);
  }
  t$r(t) {
    if (this.HardLockConfig) {
      if (t) {
        this.SVarHardLockedQueue.Clear();
      }
      for (var i = this.DetectAlternativeTargets(this.HardLockConfig, true); i.length && i.every(t => this.SVarHardLockedQueue.Has(t));) {
        this.SVarHardLockedQueue.Pop();
      }
      t = this.FindTheBest(this.GetVipList(i, true), 4, true, this.HardLockConfig.ToleranceAngle, 0);
      this.SetCurrentInfo(t);
      if (t) {
        this.SVarHardLockedQueue.Push(t);
        this.SetShowTarget(t.EntityHandle, t.SocketName, true);
        this.TimeElapsedSinceLastLock = 0;
        if (t?.EntityHandle?.Valid) {
          LockOnDebug_1.LockOnDebug.SetDebugArrow(t);
        }
      } else {
        this.SetShowTarget(undefined);
        this.ExitLockDirection();
      }
    }
  }
  GetSelfCamp() {
    return this.Hte.Actor.Camp;
  }
  g$r() {
    var t = this.IsHardLock;
    if (this.l$r !== t) {
      CombatMessage_1.CombatNet.Send(t ? 29003 : 28226, this.Entity, (t ? Protocol_1.Aki.Protocol.Ue_ : Protocol_1.Aki.Protocol.De_).create());
      this.l$r = t;
    }
  }
  RefreshCurrentLockState(t, i = "") {
    var s;
    if (this.GetCurrentInfo?.EntityHandle === t && (t = t?.Entity?.GetComponent(3)) && (s = this.GetCurrentInfo?.SocketName) && s === i && t.LockOnParts.has(s)) {
      if (!(i = t.LockOnParts.get(s)).HardLockValid) {
        this.ExitLockDirection();
      }
      if (!i.SoftLockValid) {
        this.SetShowTarget(undefined);
      }
    }
  }
  SpeedUpCleanTarget() {
    var t = this.Entity.GetComponent(189);
    return !!t?.Valid && !!(t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD) && !this.TagComponent.HasTag(-1371021686);
  }
  ResetTarget() {
    if (!this.IsLookAt && this.IsHardLock) {
      this.t$r(false);
    }
  }
  ChangeShowTarget(t, i, s) {
    if (this.IsLookAt || !this.IsHardLock || !this.HardLockConfig || !this.GetCurrentInfo) {
      return false;
    }
    var e;
    var h;
    var r;
    var o = this.DetectAlternativeTargets(this.HardLockConfig, true);
    var a = this.ActorLocationProxy;
    this.GetSkillBoneLocation(this.GetCurrentInfo.EntityHandle, this.GetCurrentInfo.SocketName, this.TmpVector1);
    this.TmpVector2.DeepCopy(a);
    this.TmpVector2.Z = this.TmpVector1.Z;
    this.TmpVector1.SubtractionEqual(a);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector1, Vector_1.Vector.UpVectorProxy, this.InverseQuat);
    this.InverseQuat.Inverse(this.InverseQuat);
    var n = t.SizeSquared();
    let c = undefined;
    let _ = MathUtils_1.MathUtils.LargeNumber;
    for (const C of o) {
      if (!!LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(C.EntityHandle) && !C.Equal(this.GetCurrentInfo) && !(this.GetSkillBoneLocation(C.EntityHandle, C.SocketName, this.TmpVector1), this.TmpVector1.SubtractionEqual(this.TmpVector2), this.InverseQuat.RotateVector(this.TmpVector1, this.TmpVector1), Math.abs(this.TmpVector1.X) < MathUtils_1.MathUtils.SmallNumber && Math.abs(this.TmpVector1.Y) < MathUtils_1.MathUtils.SmallNumber) && !(e = Math.atan2(this.TmpVector1.Y, this.TmpVector1.X) * MathUtils_1.MathUtils.RadToDeg, h = Math.asin(this.TmpVector1.Z / this.TmpVector1.Size()) * MathUtils_1.MathUtils.RadToDeg, this.TmpVector2D.X = e, this.TmpVector2D.Y = h, (r = this.TmpVector2D.DotProduct(t)) < 0)) {
        if ((r = i * (Math.acos(r / Math.sqrt(this.TmpVector2D.SizeSquared() * n)) * MathUtils_1.MathUtils.RadToDeg) / 180 + s * Math.sqrt(e * e + h * h)) < _) {
          _ = r;
          c = C;
        }
      }
    }
    return !!c && (this.SetCurrentInfo(c), this.SetShowTarget(c.EntityHandle, c.SocketName, true), true);
  }
  GetPredictedLockOnTarget() {
    if (this.TagComponent?.HasTag(-126337119)) {
      return this.CCa;
    }
  }
  SetPredictedLockOnTarget(t) {
    this.CCa = t;
  }
};
CharacterLockOnComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(34)], CharacterLockOnComponent);
exports.CharacterLockOnComponent = CharacterLockOnComponent; //# sourceMappingURL=CharacterLockOnComponent.js.map