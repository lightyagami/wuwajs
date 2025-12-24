"use strict";

var BaseLockOnComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var n = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        n = (r < 3 ? o(n) : r > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseLockOnComponent = exports.CustomizedLockedQueue = exports.LockOnInfo = exports.ShowTargetInfo = exports.lockOnEnhancedTags = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const CameraController_1 = require("../../../../../Camera/CameraController");
const CameraUtility_1 = require("../../../../../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../../GameSettings/GameSettingsManager");
const Global_1 = require("../../../../../Global");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CampUtils_1 = require("../../Blueprint/Utils/CampUtils");
const SkillUtils_1 = require("../Skill/SkillUtils");
const LockOnDebug_1 = require("./LockOnDebug");
const LockOnUtils_1 = require("./LockOnUtils");
const PROFILE_KEY = "BaseLockOnComponent_IsBlock";
const DELAY_TIME = 1000;
const CHECK_COUNT = 3;
const RESET_FOCUS_TIME = 0.6;
const RESET_TARGETS_ISLOCK_TIME = 10000;
const DEFAULT_LOCKON_CONFIG_ID = 0;
exports.lockOnEnhancedTags = [-336338240, -164894127];
class ShowTargetInfo {
  constructor() {
    this.ShowTarget = undefined;
    this.SocketName = "";
    this.LastSetTime = -0;
  }
}
exports.ShowTargetInfo = ShowTargetInfo;
class LockOnInfo {
  constructor(t, e = "") {
    this.EntityHandle = undefined;
    this.SocketName = "";
    this.EntityHandle = t;
    this.SocketName = e;
  }
  Copy(t) {
    this.EntityHandle = t.EntityHandle;
    this.SocketName = t.SocketName;
  }
  Equal(t) {
    return this.EntityHandle?.Id === t.EntityHandle?.Id && this.SocketName === t.SocketName;
  }
  Different(t) {
    return this.EntityHandle !== t.EntityHandle || this.SocketName !== t.SocketName && !!t.SocketName && !!this.SocketName;
  }
}
exports.LockOnInfo = LockOnInfo;
class CustomizedLockedQueue {
  constructor() {
    this.YYo = [];
  }
  Has(e) {
    return !!e && this.YYo.some(t => t.Equal(e));
  }
  Push(t) {
    if (t && !this.Has(t)) {
      this.YYo.push(t);
    }
  }
  Pop() {
    return this.YYo.shift();
  }
  Clear() {
    this.YYo.length = 0;
  }
}
exports.CustomizedLockedQueue = CustomizedLockedQueue;
let BaseLockOnComponent = BaseLockOnComponent_1 = class BaseLockOnComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hfa = Stats_1.Stat.Create("BaseLockOnComponent.DetectAlternativeTargets.Total");
    this.jfa = Stats_1.Stat.Create("BaseLockOnComponent.DetectAlternativeTargets.CheckBase");
    this.Wfa = Stats_1.Stat.Create("BaseLockOnComponent.DetectAlternativeTargets.CheckDistance");
    this.Qfa = Stats_1.Stat.Create("BaseLockOnComponent.DetectAlternativeTargets.FinalSetting");
    this.Kfa = Stats_1.Stat.Create("BaseLockOnComponent.CannotBeDetected");
    this.Xfa = Stats_1.Stat.Create("BaseLockOnComponent.IsBlock");
    this.Yfa = Stats_1.Stat.Create("BaseLockOnComponent.IsBlock.RayEndLocation");
    this.Jfa = Stats_1.Stat.Create("BaseLockOnComponent.IsBlock.TraceDetectBlock");
    this.zfa = Stats_1.Stat.Create("BaseLockOnComponent.FindTheBest");
    this.Zfa = Stats_1.Stat.Create("BaseLockOnComponent.FindTheBest.Direction");
    this.eva = Stats_1.Stat.Create("BaseLockOnComponent.FindTheBest.Calculation");
    this.tva = Stats_1.Stat.Create("BaseLockOnComponent.GetSkillBoneLocation");
    this.ISa = Stats_1.Stat.Create("BaseLockOnComponent.StatLockOnDebugTick");
    this.eLf = undefined;
    this.CreatureComp = undefined;
    this.GXr = undefined;
    this.s3u = undefined;
    this.a3u = undefined;
    this.ShowTargetInternal = undefined;
    this.ShowTargetSocketInternal = "";
    this.RestoreIgnoreTarget = undefined;
    this.IgnoreInfos = [];
    this.OldInfoAtRemoveDisableHardLockTag = undefined;
    this.ShowTargetSetTime = 0;
    this.TagComponent = undefined;
    this.SoftLockConfig = undefined;
    this.CurSoftLockConfig = undefined;
    this.HardLockConfig = undefined;
    this.WXr = undefined;
    this.IsLookAt = false;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.InverseQuat = Quat_1.Quat.Create();
    this.TmpVector2D = Vector2D_1.Vector2D.Create();
    this.RayBeginLocation = Vector_1.Vector.Create();
    this.RayEndLocation = Vector_1.Vector.Create();
    this.CheckCount = 0;
    this.YXr = 0;
    this.JXr = false;
    this.TimeElapsedSinceLastLock = 0;
    this.uoe = undefined;
    this.ZXr = t => {
      if (this.GXr?.EntityHandle?.Id === t) {
        this.OnTargetDeadOrRemoved();
      }
    };
    this.zpe = (t, e) => {
      if (this.GXr?.EntityHandle === e) {
        this.OnTargetDeadOrRemoved();
      }
    };
    this.eTa = new Set();
    this.InputDirect = Vector_1.Vector.Create();
    this.HasChangeInput = false;
  }
  get ActorLocationProxy() {
    return this.s3u || this.eLf.ActorLocationProxy;
  }
  get l3u() {
    return this.a3u || this.eLf.ActorForwardProxy;
  }
  get GetCurrentInfo() {
    return this.GXr;
  }
  get SVarHardLockedQueue() {
    return BaseLockOnComponent_1.tLf;
  }
  SetCurrentInfo(t) {
    var e = this.GXr;
    this.GXr = t;
    if (e?.EntityHandle !== t?.EntityHandle || e?.SocketName !== t?.SocketName) {
      if (e && e.EntityHandle && EventSystem_1.EventSystem.HasWithTarget(e.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      if (this.GXr && this.GXr.EntityHandle && !EventSystem_1.EventSystem.HasWithTarget(this.GXr.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.AddWithTarget(this.GXr.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    }
  }
  GetCurrentTarget() {
    return this.GXr?.EntityHandle;
  }
  GetCurrentTargetSocketName() {
    return this.GXr?.SocketName ?? "";
  }
  GetTargetInfo() {
    this.WXr.ShowTarget = this.ShowTarget;
    this.WXr.SocketName = this.ShowTargetSocket;
    this.WXr.LastSetTime = this.ShowTargetSetTime;
    return this.WXr;
  }
  get ShowTarget() {
    return this.ShowTargetInternal;
  }
  get ShowTargetSocket() {
    return this.ShowTargetSocketInternal;
  }
  OnTargetDeadOrRemoved() {
    this.SetCurrentInfo(undefined);
    this.SetShowTarget(undefined);
  }
  GetEntitiesToCheck(t) {
    this.eTa.clear();
    BaseLockOnComponent_1.EnhancedEntityIds.forEach(t => {
      var e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
      if (e) {
        this.eTa.add(e);
      } else {
        BaseLockOnComponent_1.EnhancedEntityIds.delete(t);
      }
    });
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(this.ActorLocationProxy, t, 255, this.eTa, false);
    return this.eTa;
  }
  OnInitData() {
    this.WXr = new ShowTargetInfo();
    return true;
  }
  OnStart() {
    this.eLf = this.Entity.GetComponent(1);
    this.TagComponent = this.Entity.GetComponent(215);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.ZXr);
    this.koe();
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.ZXr);
    this.SetCurrentInfo(undefined);
    return true;
  }
  koe() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.eLf.Owner;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    if (this.JXr) {
      this.uoe.DrawTime = 5;
      this.uoe.SetDrawDebugTrace(2);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, ColorUtils_1.ColorUtils.LinearRed);
    }
  }
  SetLockOnConfig(t, e) {
    if (t !== 0) {
      this.SoftLockConfig = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(t);
    }
    if (e !== 0) {
      this.HardLockConfig = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(e);
    }
  }
  OnTick(t) {
    this.ISa.Start();
    LockOnDebug_1.LockOnDebug.Tick(this.Entity);
    this.ISa.Stop();
  }
  Check(t) {
    if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(this.GXr?.EntityHandle)) {
      if (this.IsHardLock || this.IsLookAt) {
        this.YXr += t;
        if (!(this.YXr < DELAY_TIME)) {
          this.YXr = 0;
          t = Global_1.Global.CharacterCameraManager.D_K2_GetActorLocation();
          if (this.IsBlock(this.GXr, t)) {
            this.CheckCount++;
            if (this.CheckCount >= CHECK_COUNT) {
              this.ClearLockOnTarget();
              this.CheckCount = 0;
            }
          } else {
            this.CheckCount = 0;
          }
        }
      }
    } else {
      this.ClearLockOnTarget();
    }
  }
  ClearLockOnTarget() {
    this.SetCurrentInfo(undefined);
    this.SetShowTarget(undefined);
  }
  UpdateTargetsIsLock(t) {
    if (this.IsHardLock) {
      this.TimeElapsedSinceLastLock += t;
      if (!(this.TimeElapsedSinceLastLock < RESET_TARGETS_ISLOCK_TIME)) {
        this.TimeElapsedSinceLastLock = 0;
        BaseLockOnComponent_1.tLf.Clear();
        BaseLockOnComponent_1.tLf.Push(this.GXr);
      }
    }
  }
  _3u(t) {
    if (t !== "" && (t = (t = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(this.Entity.Id, t)) && EntitySystem_1.EntitySystem.GetComponent(t, 1))) {
      this.s3u = t.ActorLocationProxy;
      this.a3u = t.ActorForwardProxy;
    }
  }
  Emn() {
    if (this.s3u) {
      this.s3u = undefined;
      this.a3u = undefined;
    }
  }
  DetectSoftLockTarget({
    LockOnConfigId: e = DEFAULT_LOCKON_CONFIG_ID,
    SkillTargetPriority: i = 8,
    ShowTarget: s = false,
    GlobalTarget: o = false,
    BlackboardKey: r = ""
  }, t = true) {
    if (o) {
      o = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(33);
      this.SetCurrentInfo(o?.GXr);
    } else if (!this.IsHardLock && !this.IsLookAt) {
      this._3u(r);
      if (t) {
        let t = this.SoftLockConfig;
        if (DEFAULT_LOCKON_CONFIG_ID !== e) {
          t = ConfigManager_1.ConfigManager.WorldConfig.GetLockOnConfig(e);
        }
        if (this.CurSoftLockConfig = t) {
          o = this.DetectAlternativeTargets(t, false);
          r = this.FindTheBest(this.GetVipList(o, false), i, false, t.ToleranceAngle);
          this.SetAndShowTarget(r, s);
        }
      } else if (!this.GXr) {
        this.DetectSoftLockTarget({});
      }
      this.Emn();
    }
  }
  SetAndShowTarget(t, e) {}
  SetShowTarget(t, e = 0, i) {
    return false;
  }
  FindTheBest(t, e, i, s) {
    this.zfa.Start();
    this.Zfa.Start();
    if (e === 8) {
      switch (GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.SkillLockEnemyMode)) {
        case 0:
          e = 0;
          break;
        case 1:
          e = 4;
          break;
        case 2:
          e = 3;
      }
    }
    let o = undefined;
    let r = false;
    switch (e) {
      case 0:
      case 5:
        r = !this.HasChangeInput && !this.s3u;
        this.HasChangeInput = false;
        o = this.InputDirect.IsNearlyZero() ? this.E$r() : this.InputDirect;
        break;
      case 1:
      case 7:
        o = this.l3u;
        break;
      case 2:
        o = this.E$r();
        r = true;
        break;
      case 3:
        break;
      case 4:
      case 6:
        o = this.E$r();
    }
    this.Zfa.Stop();
    var n = [5, 7, 6].includes(e);
    var h = CommonParamById_1.configCommonParamById.GetIntConfig("LockOnOffset");
    let a = undefined;
    let c = Number.MAX_VALUE;
    let _ = undefined;
    let l = Number.MAX_VALUE;
    for (const m of t) {
      this.eva.Start();
      switch (this.S$r(m, i, r)) {
        case 0:
          this.eva.Stop();
          continue;
        case 1:
          break;
        case 2:
          LockOnDebug_1.LockOnDebug.SetDebugString(m, 0, 0, this.InputDirect, o);
          this.eva.Stop();
          this.zfa.Stop();
          return m;
      }
      this.GetSkillBoneLocation(m.EntityHandle, m.SocketName, this.TmpVector1);
      var C = this.ActorLocationProxy;
      var u = Vector_1.Vector.Dist(C, this.TmpVector1);
      let t = 0;
      if (o) {
        this.TmpVector2.DeepCopy(o);
        this.TmpVector2.Normalize();
        this.TmpVector2.Multiply(n ? 0 : h, this.TmpVector2);
        C.Subtraction(this.TmpVector2, this.TmpVector2);
        this.TmpVector1.Subtraction(this.TmpVector2, this.TmpVector1);
        t = this.y$r(o, this.TmpVector1);
      }
      if (t < s) {
        if (!a || u < c) {
          a = m;
          c = u;
        }
      } else if (!n) {
        if (!_ || u < l) {
          _ = m;
          l = u;
        }
      }
      LockOnDebug_1.LockOnDebug.SetDebugString(m, t, u, this.InputDirect, o);
      this.eva.Stop();
    }
    this.zfa.Stop();
    return a || _;
  }
  S$r(e, t, i) {
    if (t && BaseLockOnComponent_1.tLf.Has(e) || this.IgnoreInfos.some(t => !t.Different(e))) {
      return 0;
    } else if (i && LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(this.GXr?.EntityHandle) && this.GXr?.Equal(e)) {
      return 2;
    } else {
      return 1;
    }
  }
  E$r() {
    var t = Vector_1.Vector.Create();
    CameraController_1.CameraController.CameraRotator.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, t);
    return t;
  }
  y$r(t, e, i = false) {
    return Math.acos(i ? t.DotProduct(e) / Math.sqrt(t.SizeSquared() * e.SizeSquared()) : t.CosineAngle2D(e)) * MathUtils_1.MathUtils.RadToDeg;
  }
  ResetFocus() {
    if (!CameraController_1.CameraController.FightCamera.LogicComponent.IsDisableResetFocus && !!ModelManager_1.ModelManager.CameraModel.IsEnableResetFocus && !this.IsLookAt && !this.IsHardLock) {
      CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput();
      CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(CameraUtility_1.CameraUtility.GetCameraDefaultFocusRotator(), RESET_FOCUS_TIME);
    }
  }
  ResetPitch(t = RESET_FOCUS_TIME, e = undefined, i = true, s = 0) {
    var o = CommonParamById_1.configCommonParamById.GetFloatConfig("InitialCameraPitch");
    var r = this.TmpRotator;
    CameraUtility_1.CameraUtility.SetPitchInGravity(CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation, o, r);
    CameraController_1.CameraController.FightCamera.LogicComponent.ResetCameraInput();
    CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(r, t, e, i, s);
  }
  GetSkillBoneLocation(t, e, i) {
    this.tva.Start();
    if (t && t.Entity && (t = SkillUtils_1.SkillUtils.GetTargetSocketTransform(t.Entity, e, 0, "索敌", 2))) {
      i.FromUeVector(t.GetLocation());
    } else {
      i.Reset();
    }
    this.tva.Stop();
  }
  LockOnSpecifyTarget(t) {
    var e;
    if (!this.IsHardLock && !this.IsLookAt) {
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(t)) {
        (e = new LockOnInfo()).EntityHandle = t;
        this.SetCurrentInfo(e);
        this.SetShowTarget(t);
      }
    }
  }
  IsBlock(t, e) {
    this.Xfa.Start();
    this.RayBeginLocation.FromUeVector(e);
    e = t.EntityHandle.Entity.GetComponent(1);
    if (t.SocketName) {
      this.GetSkillBoneLocation(t.EntityHandle, t.SocketName, this.RayEndLocation);
    } else {
      this.Yfa.Start();
      this.RayEndLocation.DeepCopy(e.ActorLocationProxy);
      if (t = t.EntityHandle.Entity.GetComponent(0)?.GetFightInterConfig()?.LockOffset) {
        t = Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
        this.RayEndLocation.Addition(t, this.RayEndLocation);
      }
      this.Yfa.Stop();
    }
    this.Jfa.Start();
    t = this.TraceDetectBlock(this.RayBeginLocation, this.RayEndLocation, e.Owner);
    this.Jfa.Stop();
    this.Xfa.Stop();
    return t;
  }
  TraceDetectBlock(t, e, i) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e);
    return !!TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) && !!this.uoe.HitResult.bBlockingHit && (t = this.uoe.HitResult.Actors.Get(0), e = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(t), i !== t) && i !== e;
  }
  GetSelfCamp() {
    return this.eLf.Owner?.Camp ?? -1;
  }
  DetectAlternativeTargets(e, t) {
    this.Hfa.Start();
    LockOnDebug_1.LockOnDebug.Clear();
    var i = [];
    var s = Global_1.Global.CharacterCameraManager.D_K2_GetActorLocation();
    for (const u of this.GetEntitiesToCheck(Math.max(e.Distance, e.SectorRadius))) {
      this.jfa.Start();
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(u)) {
        if (u.Id === this.Entity.Id) {
          this.jfa.Stop();
        } else {
          var o = u.Entity.GetComponent(0)?.GetEntityType();
          var r = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(u);
          if (r?.IsValid()) {
            var n = u.Entity.GetComponent(126)?.LockControl;
            if (!n || n.EnableCondition && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(n.EnableCondition, r) || !n.DisableCondition || !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(n.DisableCondition, r)) {
              var h;
              var n = r;
              var r = r instanceof TsBaseCharacter_1.default;
              if (h = SkillUtils_1.SkillUtils.IsTsActor(u)) {
                if (!n || !r) {
                  this.jfa.Stop();
                  continue;
                }
                r = this.GetSelfCamp();
                if (r < 0) {
                  this.jfa.Stop();
                  continue;
                }
                if (CampUtils_1.CampUtils.GetCampRelationship(n.Camp, r) !== 2) {
                  this.jfa.Stop();
                  continue;
                }
              } else {
                if (t) {
                  this.jfa.Stop();
                  continue;
                }
                if (o !== Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
                  this.jfa.Stop();
                  continue;
                }
                n = u.Entity.GetComponent(126)?.LockRange;
                if (!n || n <= 0) {
                  this.jfa.Stop();
                  continue;
                }
                r = u.Entity.GetComponent(1);
                if (n < Vector_1.Vector.Dist2D(r.ActorLocationProxy, this.ActorLocationProxy)) {
                  this.jfa.Stop();
                  continue;
                }
              }
              if (t ? this.IsEntityContainsDisableHardLockTag(u) : this.IsEntityContainsDisableSoftLockTag(u)) {
                this.jfa.Stop();
              } else if (this.IsEntityDetectableByMe(u)) {
                this.jfa.Stop();
                this.Wfa.Start();
                o = u.Entity.GetComponent(3);
                if ((o?.LockOnParts?.size ?? 0) > 0) {
                  let t = false;
                  var n = o.LockOnParts.values();
                  var a = this.TmpVector1;
                  for (const m of n) {
                    this.GetSkillBoneLocation(u, m.BoneNameString, a);
                    if (!(t = this.CannotBeDetected(e, u, a))) {
                      break;
                    }
                  }
                  if (t) {
                    this.Wfa.Stop();
                    continue;
                  }
                } else if (this.CannotBeDetected(e, u, u.Entity.GetComponent(1).ActorLocationProxy)) {
                  this.Wfa.Stop();
                  continue;
                }
                this.Wfa.Stop();
                this.Qfa.Start();
                if (h) {
                  r = u.Entity.GetComponent(3);
                  if (r?.LockOnParts.size) {
                    var c;
                    var _ = u.Entity.GetComponent(72);
                    var l = u.Entity.GetComponent(41);
                    for ([, c] of r.LockOnParts) {
                      if ((t ? c.HardLockValid : c.SoftLockValid) && (!l || !l.IgnoreSocketName.has(c.BoneNameString))) {
                        if (_ && c.EnablePartName) {
                          var C = _.PartMapByBone.get(c.EnablePartName);
                          if (C && !C.Active) {
                            continue;
                          }
                        }
                        C = new LockOnInfo();
                        C.EntityHandle = u;
                        C.SocketName = c.BoneNameString;
                        if (!this.IsBlock(C, s)) {
                          LockOnDebug_1.LockOnDebug.Push(C);
                          i.push(C);
                        }
                      }
                    }
                  } else {
                    o = new LockOnInfo();
                    o.EntityHandle = u;
                    if (this.IsBlock(o, s)) {
                      this.Qfa.Stop();
                      continue;
                    }
                    LockOnDebug_1.LockOnDebug.Push(o);
                    i.push(o);
                  }
                } else {
                  n = new LockOnInfo();
                  n.EntityHandle = u;
                  if (this.IsBlock(n, s)) {
                    this.Qfa.Stop();
                    continue;
                  }
                  LockOnDebug_1.LockOnDebug.Push(n);
                  i.push(n);
                }
                this.Qfa.Stop();
              } else {
                this.jfa.Stop();
              }
            } else {
              this.jfa.Stop();
            }
          } else {
            this.jfa.Stop();
          }
        }
      } else {
        this.jfa.Stop();
      }
    }
    this.Hfa.Stop();
    return i;
  }
  GetVipList(t, e) {
    var i = t.filter(t => t.EntityHandle?.Entity?.GetComponent(215)?.HasTag(1659143519));
    if (e) {
      if (i.every(t => BaseLockOnComponent_1.tLf.Has(t))) {
        return t;
      } else {
        return i;
      }
    } else if (i.length) {
      return i;
    } else {
      return t;
    }
  }
  IsEntityContainsDisableHardLockTag(t) {
    t = t.Entity?.GetComponent(215);
    return !!t?.Valid && (t.HasAnyTag([-1243968098, -620990172]) || this.TagComponent.HasAnyTag([-620990172, 63495198]));
  }
  IsEntityContainsDisableSoftLockTag(t) {
    t = t.Entity?.GetComponent(215);
    return !!t?.Valid && (t.HasAnyTag([-1243968098, -1092371289]) || this.TagComponent.HasAnyTag([-1092371289, 63495198]));
  }
  IsEntityDetectableByMe(t) {
    var e = (t.Entity?.GetComponent(215)).HasTag(-504316709);
    var t = t.Entity?.GetComponent(0);
    return !e || t.GetSummonerId() === this.CreatureComp.GetCreatureDataId();
  }
  CannotBeDetected(t, e, i) {
    this.Kfa.Start();
    t = !this.IsInAreaRole(t, this.ActorLocationProxy, i) && !this.A$r(e, i, this.ActorLocationProxy);
    this.Kfa.Stop();
    return t;
  }
  IsInAreaRole(t, e, i) {
    var s = e.Z - i.Z;
    if (s < -t.UpDistance || s > t.DownDistance) {
      return false;
    }
    if (Vector_1.Vector.DistSquared(e, i) <= t.Distance * t.Distance) {
      return true;
    }
    s = this.eLf.Owner?.Controller;
    if (!s) {
      return false;
    }
    s = (s.GetControlRotation().Yaw % 360 + 360) % 360;
    if (Vector_1.Vector.DistSquared(e, i) > t.SectorRadius * t.SectorRadius) {
      return false;
    }
    i.Subtraction(e, this.TmpVector1).Normalize(MathUtils_1.MathUtils.SmallNumber);
    i = Math.atan2(this.TmpVector1.Y, this.TmpVector1.X) * 180 / Math.PI;
    e = Math.abs((360 + i) % 360 - s);
    return (e > 180 ? 360 - e : e) <= t.SectorAngle / 2;
  }
  A$r(t, e, i) {
    var s;
    return !!t.Entity?.GetComponent(215)?.HasAnyTag(exports.lockOnEnhancedTags) && !!(t = t.Entity.GetComponent(3))?.LockOnConfig && !((s = e.Z - i.Z) < -t.LockOnConfig.UpDistance) && !(s > t.LockOnConfig.DownDistance) && !(Vector_1.Vector.DistSquared(e, i) > t.LockOnConfig.Distance * t.LockOnConfig.Distance);
  }
  get IsHardLock() {
    return this.TagComponent.HasTag(-1150819426);
  }
};
BaseLockOnComponent.tLf = new CustomizedLockedQueue();
BaseLockOnComponent.EnhancedEntityIds = new Set();
BaseLockOnComponent = BaseLockOnComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(32)], BaseLockOnComponent);
exports.BaseLockOnComponent = BaseLockOnComponent; //# sourceMappingURL=BaseLockOnComponent.js.map