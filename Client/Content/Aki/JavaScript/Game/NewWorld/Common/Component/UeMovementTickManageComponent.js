"use strict";
var UeMovementTickManageComponent_1, __decorate = this && this.__decorate || function(t, i, e, s) {
  var o, h = arguments.length,
    n = h < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, i, e, s);
  else
    for (var r = t.length - 1; 0 <= r; r--)(o = t[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(i, e, n) : o(i, e)) || n);
  return 3 < h && n && Object.defineProperty(i, e, n), n
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UeMovementTickManageComponent = exports.UeMovementTickController = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  CharacterAnimationComponent_1 = require("../../Character/Common/Component/CharacterAnimationComponent"),
  UeSkeletalTickManageComponent_1 = require("./UeSkeletalTickManageComponent");
class VelocityCacheInfo {
  constructor() {
    this.Frame = 0n, this.SpeedZ = void 0, this.VelocityZ = void 0, this.LastZ = void 0, this.MoveMode = void 0, this.Context = ""
  }
  Dump() {
    GlobalData_1.GlobalData.IsPlayInEditor && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Test", 50, "Dump", ["Frame", this.Frame], ["CurZ1", this.SpeedZ], ["CurZ2", this.VelocityZ], ["LastZ", this.LastZ], ["Mode", this.MoveMode], ["Context", this.Context]);
    var t = "";
    return (t += `[Frame, ${this.Frame}]`) + `[CurZ1, ${this.SpeedZ}]` + `[CurZ2, ${this.VelocityZ}]` + `[LastZ, ${this.LastZ}]` + `[Mode, ${this.MoveMode}]` + `[Context, ${this.Context}]` + "，"
  }
}
class UeMovementTickController {
  static AddManager(t, i) {
    for (; this.Managers.length <= i;) this.Managers.push(new Set);
    this.Managers[i].add(t)
  }
  static DeleteManager(t, i) {
    for (; this.Managers.length <= i;) this.Managers.push(new Set);
    this.Managers[i].delete(t)
  }
  static TickManagersPriority1(o) {
    if (this.PreTickedManagers.length = 0, UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming)
      for (let s = this.Managers.length - 1; 0 <= s; --s) {
        let t = new Array;
        for (const n of this.Managers[s]) n.Active && (!n.SkelTickMgr?.MainSkelComp || 1 < n.SkelTickMgr.MainSkelComp.GetAnimInstanceUpdateState() ? (this.PreTickedManagers.push(n), n.PreProxyTick(o)) : t.push(n));
        let i = new Array,
          e = t.length + 1;
        for (; 0 < t.length && t.length < e;) {
          e = t.length;
          for (const r of t) 1 !== r.SkelTickMgr.MainSkelComp.GetAnimInstanceUpdateState() ? (this.PreTickedManagers.push(r), r.PreProxyTick(o)) : i.push(r);
          var h = t;
          t = i, (i = h).length = 0
        }
        if (0 < t.length)
          for (const a of t) this.PreTickedManagers.push(a), a.PreProxyTick(o)
      } else
        for (let t = this.Managers.length - 1; 0 <= t; --t)
          for (const i of this.Managers[t]) i.Active && (this.PreTickedManagers.push(i), i.PreProxyTick(o))
  }
  static TickManagers() {
    for (const t of this.PreTickedManagers) t.ProxyTick();
    this.PreTickedManagers.length = 0
  }
  static get EnabledMovementParallel() {
    return this.dtc
  }
  static set EnabledMovementParallel(t) {
    this.dtc = t
  }
}(exports.UeMovementTickController = UeMovementTickController).Managers = new Array, UeMovementTickController.PreTickedManagers = new Array, UeMovementTickController.dtc = !0;
let UeMovementTickManageComponent = UeMovementTickManageComponent_1 = class UeMovementTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Hte = void 0, this.o4o = void 0, this.oRe = void 0, this.tr_ = void 0, this.Msn = void 0, this.Esn = void 0, this.SkelTickMgr = void 0, this.dzl = 0, this.mzl = 0, this.Dsn = 0, this.$k_ = !1, this.Qzl = 0, this.Kzl = void 0, this.$zl = Vector_1.Vector.Create(), this.Xzl = Rotator_1.Rotator.Create(), this.ysn = !1, this.prl = (0, puerts_1.$ref)(void 0), this.utl = !1, this.Frozen = !1, this.Isn = 0, this.OnEntityBudgetTickEnableChange = t => {
      this.oRe?.Valid && t && this.oRe.ConsumeRootMotion()
    }, this.EnableVelocityInfoCache = !1, this.VelocityInfoCacheArray = new Array, this.VelocityInfoFrameSize = 5, this.FrameCounter = 0, this.LastFrame = 0n, this.TmpVector = Vector_1.Vector.Create()
  }
  static get Dependencies() {
    return [3]
  }
  get TickMode() {
    return this.Dsn
  }
  set TickMode(t) {
    if (this.Dsn !== t) {
      var i = this.Dsn;
      switch (this.Dsn = t, i) {
        case 1:
          UeMovementTickController.DeleteManager(this, 0), TickSystem_1.TickSystem.CleanMovementProxyTickFunction(this.o4o), 4 !== t && (this.dzl = 0, this.mzl = 0);
          break;
        case 3:
          this.o4o.SetKuroOnlyTickOutside(!0), this.o4o.SetComponentTickEnabled(!1);
          break;
        case 4:
          UeMovementTickController.DeleteManager(this, 0)
      }
      switch (t) {
        case 1:
          UeMovementTickController.AddManager(this, 0), TickSystem_1.TickSystem.SetMovementProxyTickFunction(0, this.o4o, 1);
          break;
        case 3:
          this.o4o.SetKuroOnlyTickOutside(!1), this.o4o.SetComponentTickEnabled(!0);
          break;
        case 4:
          UeMovementTickController.AddManager(this, 0)
      }
    }
  }
  get ForbiddenTickPose() {
    return this.ysn
  }
  set ForbiddenTickPose(t) {
    this.ysn !== t && (this.ysn = t, this.o4o.bForbiddenTickPose = t)
  }
  get TeleportLock() {
    return this.utl
  }
  set TeleportLock(t) {
    this.utl = t
  }
  OnInit() {
    return !0
  }
  OnStart() {
    return this.Hte = this.Entity.GetComponent(3), this.Msn = this.Entity.GetComponent(45), this.tr_ = this.Entity.GetComponent(233), this.o4o = this.Hte.Owner.GetComponentByClass(UE.CharacterMovementComponent.StaticClass()), !!this.o4o && (this.Esn = this.Entity.GetComponent(30), this.SkelTickMgr = this.Entity.GetComponent(114), this.o4o.SetKuroOnlyTickOutside(!0), this.o4o.SetComponentTickEnabled(!1), this.oRe = this.Entity.GetComponent(177), this.ForbiddenTickPose = 1 < this.Entity.GetTickInterval() || UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming, this.Isn = Time_1.Time.Frame, this.utl = !1, this.TickMode = UeMovementTickController.EnabledMovementParallel ? 1 : 2, ModelManager_1.ModelManager.SundryModel.RoleFallingDebugLogOn && this.Hte.IsRoleAndCtrlByMe && this.SetVelocityInfoCacheEnable(!0), !0)
  }
  OnEnd() {
    return this.TickMode = 0, !(this.Kzl = void 0)
  }
  OnDisable() {
    this.Hte?.Actor && (this.Hte.Actor.BasedMovement.MovementBase = void 0), this.Hte?.IsRoleAndCtrlByMe && Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 6, "UeMovementTickManageComponent Disable", ["Entity", this.Entity.Id], ["DisableInfo", this.DumpDisableInfo()])
  }
  OnEnable() {
    this.Hte?.IsRoleAndCtrlByMe && Log_1.Log.CheckInfo() && Log_1.Log.Info("Movement", 6, "UeMovementTickManageComponent Enable", ["Entity", this.Entity.Id]), this.Isn = Time_1.Time.Frame
  }
  OnTick(t) {
    2 === this.TickMode && (this.TickMovement(t), this.ResetCachedTransformAndSetModelBuffer(), UeMovementTickController.EnabledMovementParallel) && (this.Hte?.Actor.GetAttachRootParentActor()?.IsValid() ? this.TickMode = 4 : this.TickMode = 1)
  }
  PreProxyTick(t) {
    this.dzl++, this.mzl += this.Entity.TimeDilation * t, this.dzl >= this.Entity.GetTickInterval() && this.TickMovement(this.mzl)
  }
  ProxyTick() {
    this.dzl >= this.Entity.GetTickInterval() && (this.ResetCachedTransformAndSetModelBuffer(), this.dzl = 0, this.mzl = 0), UeMovementTickController.EnabledMovementParallel ? this.Hte?.Actor.GetAttachRootParentActor()?.IsValid() ? this.TickMode = 4 : this.TickMode = 1 : this.TickMode = 2
  }
  TickMovement(t) {
    if (this.$k_ = !1, this.Hte?.LastActorLocation.DeepCopy(this.Hte.ActorLocationProxy), this.frl(), this.o4o && !this.TeleportLock && !ControllerHolder_1.ControllerHolder.WorldController.GetIsWorldOriginInUiMode() && (!this.Hte?.Actor.GetAttachRootParentActor() || this.Msn?.NeedRootMotionWhenAttached)) {
      if (this.Esn && this.Esn.MarkDebugRecord("移动组件更新前 ", void 0, !0), this.tr_)
        for (const o of this.tr_.PassengerInfoMap.values())(o.PassengerEntity?.GetComponent(30))?.MarkDebugRecord("载具移动组件更新前", void 0, !0);
      this.Msn.ConsumeForceFallingSpeed();
      var i, e, s = this.Entity.GetComponent(122)?.CurrentTimeScale ?? 1;
      !this.Msn.NeedRootMotionWhenAttached && this.Msn.IsSpecialMove || (this.Msn && (this.Msn.GetAndConsumeAddMove(t * MathUtils_1.MathUtils.MillisecondToSecond * s, UeMovementTickManageComponent_1.Lz, UeMovementTickManageComponent_1.Gue), UeMovementTickManageComponent_1.Lz.IsNearlyZero() || (3 === this.o4o.MovementMode ? this.Hte.AddActorWorldOffset(UeMovementTickManageComponent_1.Lz.ToUeVector(), "AddMove", !0) : this.o4o.SetAddMove(UeMovementTickManageComponent_1.Lz.ToUeVector())), UeMovementTickManageComponent_1.Gue.IsNearlyZero() || this.Hte?.AddActorLocalRotation(UeMovementTickManageComponent_1.Gue.ToUeRotator(), "叠加旋转", !1)), i = 1 < this.Entity.GetTickInterval(), this.ForbiddenTickPose = i || this.Frozen || UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming, this.Qzl = 0, (e = this.oRe?.Actor?.Mesh) && e.bEnableUpdateRateOptimizations && !this.Msn.BasePlatform && (e.GetAnimUpdateRateParameters(this.prl), !(e = (0, puerts_1.$unref)(this.prl)).bSkipUpdate) && e.UpdateRate > this.Entity.GetTickInterval() && (this.Qzl = e.UpdateRate * t / Math.max(1, this.Entity.GetTickInterval())), i && this.oRe?.Valid && this.Hte.Owner.WasRecentlyRenderedOnScreen() && (this.Qzl = Math.max(t, this.Qzl)), this.Qzl <= CharacterAnimationComponent_1.MIN_BUFFER_TIME_LENGTH || !this.oRe ? this.o4o.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * s) : (this.Kzl = this.oRe.GetMeshTransform(), this.$zl.DeepCopy(this.Hte.ActorLocationProxy), this.Xzl.DeepCopy(this.Hte.ActorRotationProxy), this.o4o.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * s), this.Hte.ResetAllCachedTime())), this.$k_ = !0
    }
  }
  ResetCachedTransformAndSetModelBuffer() {
    if (this.CacheVelocityInfo("AfterTickMovement"), this.UpdateVelocityCache(), this.$k_ && (this.Msn.IsSpecialMove || this.Hte.ResetAllCachedTime(), !(this.Kzl && this.Qzl >= CharacterAnimationComponent_1.MIN_BUFFER_TIME_LENGTH) || this.$zl.Equals(this.Hte.ActorLocationProxy) && this.Xzl.Equals(this.Hte.ActorRotationProxy) || (this.oRe.SetModelBuffer(this.Kzl, this.Qzl), this.Kzl = void 0), this.Msn.ApplyForceSpeedAndRecordSpeed(), this.Esn && this.Esn.MarkDebugRecord("移动组件更新后", void 0, !0), this.tr_))
      for (const i of this.tr_.PassengerInfoMap.values()) {
        var t = i.PassengerEntity?.GetComponent(30);
        (i.PassengerEntity?.GetComponent(1))?.ResetAllCachedTime(), t?.MarkDebugRecord("载具移动组件更新后", void 0, !0)
      }
  }
  frl() {
    this.Hte?.IsRoleAndCtrlByMe && 1 < Time_1.Time.Frame - this.Isn && Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 6, "[b1057126] 角色更新异常", ["DebugLastTickFrame", this.Isn], ["Current", Time_1.Time.Frame]), this.Isn = Time_1.Time.Frame
  }
  SetVelocityInfoCacheEnable(t) {
    this.EnableVelocityInfoCache !== t && (this.Hte.Actor.CharacterMovement.bKuroVelocityDebug = t, this.Hte.Actor.Mesh.bRootMotionDebug = t, this.EnableVelocityInfoCache = t, this.VelocityInfoCacheArray.length = 0, this.FrameCounter = 0)
  }
  UpdateVelocityCache() {
    if (this.EnableVelocityInfoCache)
      for (; this.FrameCounter > this.VelocityInfoFrameSize;) {
        for (var t = this.VelocityInfoCacheArray.shift()?.Frame;;) {
          if (!this.VelocityInfoCacheArray.length) break;
          if (t === this.LastFrame || t !== this.VelocityInfoCacheArray[0].Frame) break;
          this.VelocityInfoCacheArray.shift()
        }
        this.FrameCounter--
      }
  }
  CacheVelocityInfo(t) {
    var i;
    this.EnableVelocityInfoCache && ((i = new VelocityCacheInfo).Frame = UE.KismetSystemLibrary.GetFrameCount(), i.SpeedZ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorVelocityProxy), i.MoveMode = this.Hte.Actor.CharacterMovement.MovementMode, this.TmpVector.FromUeVector(this.Hte.Actor.CharacterMovement.Velocity), i.VelocityZ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.TmpVector), this.TmpVector.FromUeVector(this.Hte.Actor.CharacterMovement.GetLastUpdateVelocity()), i.LastZ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.TmpVector), i.Context = t, t = UE.KismetSystemLibrary.GetFrameCount(), this.VelocityInfoCacheArray.push(i), this.FrameCounter += this.LastFrame === t ? 0 : 1, this.LastFrame = t)
  }
  DumpVelocityCacheInfo(i = "", e = !1) {
    if (this.EnableVelocityInfoCache)
      if (this.VelocityInfoCacheArray.length) {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 50, "[b1123700] Dump cached velocity infos", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Frame", UE.KismetSystemLibrary.GetFrameCount()], ["Name", this.Hte?.Actor.GetName()], ["Size", this.VelocityInfoCacheArray.length], ["OnlyLast", e], ["Reason", i]);
        let t = "";
        if (e) {
          e = this.VelocityInfoCacheArray.length;
          t += this.VelocityInfoCacheArray[e - 1].Dump()
        } else
          for (const s of this.VelocityInfoCacheArray) t += s.Dump();
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 50, "[b1123700] DumpInfos", ["Info", t])
      } else Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 50, "[b1123700] Cannot dump velocity infos for empty cache", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Frame", UE.KismetSystemLibrary.GetFrameCount()], ["Name", this.Hte?.Actor.GetName()], ["Reason", i])
  }
};
UeMovementTickManageComponent.Lz = Vector_1.Vector.Create(), UeMovementTickManageComponent.Gue = Rotator_1.Rotator.Create(), UeMovementTickManageComponent = UeMovementTickManageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(113)], UeMovementTickManageComponent), exports.UeMovementTickManageComponent = UeMovementTickManageComponent;
//# sourceMappingURL=UeMovementTickManageComponent.js.map