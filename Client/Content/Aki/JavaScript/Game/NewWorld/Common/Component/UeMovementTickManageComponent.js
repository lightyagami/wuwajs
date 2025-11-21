"use strict";

var UeMovementTickManageComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(i, e, n) : o(i, e)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UeMovementTickManageComponent = exports.UeMovementTickController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const CharacterAnimationComponent_1 = require("../../Character/Common/Component/CharacterAnimationComponent");
const UeSkeletalTickManageComponent_1 = require("./UeSkeletalTickManageComponent");
class VelocityCacheInfo {
  constructor() {
    this.Frame = 0n;
    this.SpeedZ = undefined;
    this.VelocityZ = undefined;
    this.LastZ = undefined;
    this.MoveMode = undefined;
    this.Context = "";
  }
  Dump() {
    if (GlobalData_1.GlobalData.IsPlayInEditor && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 50, "Dump", ["Frame", this.Frame], ["CurZ1", this.SpeedZ], ["CurZ2", this.VelocityZ], ["LastZ", this.LastZ], ["Mode", this.MoveMode], ["Context", this.Context]);
    }
    var t = "";
    return `${t += `[Frame, ${this.Frame}]`}[CurZ1, ${this.SpeedZ}][CurZ2, ${this.VelocityZ}][LastZ, ${this.LastZ}][Mode, ${this.MoveMode}][Context, ${this.Context}]，`;
  }
}
class UeMovementTickController {
  static AddManager(t, i) {
    while (this.Managers.length <= i) {
      this.Managers.push(new Set());
    }
    this.Managers[i].add(t);
  }
  static DeleteManager(t, i) {
    while (this.Managers.length <= i) {
      this.Managers.push(new Set());
    }
    this.Managers[i].delete(t);
  }
  static TickManagersPriority1(o) {
    this.PreTickedManagers.length = 0;
    if (UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming) {
      for (let s = this.Managers.length - 1; s >= 0; --s) {
        let t = new Array();
        for (const n of this.Managers[s]) {
          if (n.Active) {
            if (!n.SkelTickMgr?.MainSkelComp || n.SkelTickMgr.MainSkelComp.GetAnimInstanceUpdateState() > 1) {
              this.PreTickedManagers.push(n);
              n.PreProxyTick(o);
            } else {
              t.push(n);
            }
          }
        }
        let i = new Array();
        let e = t.length + 1;
        while (t.length > 0 && t.length < e) {
          e = t.length;
          for (const r of t) {
            if (r.SkelTickMgr.MainSkelComp.GetAnimInstanceUpdateState() !== 1) {
              this.PreTickedManagers.push(r);
              r.PreProxyTick(o);
            } else {
              i.push(r);
            }
          }
          var h = t;
          t = i;
          (i = h).length = 0;
        }
        if (t.length > 0) {
          for (const a of t) {
            this.PreTickedManagers.push(a);
            a.PreProxyTick(o);
          }
        }
      }
    } else {
      for (let t = this.Managers.length - 1; t >= 0; --t) {
        for (const i of this.Managers[t]) {
          if (i.Active) {
            this.PreTickedManagers.push(i);
            i.PreProxyTick(o);
          }
        }
      }
    }
  }
  static TickManagers() {
    for (const t of this.PreTickedManagers) {
      t.ProxyTick();
    }
    this.PreTickedManagers.length = 0;
  }
  static get EnabledMovementParallel() {
    return this.dtc;
  }
  static set EnabledMovementParallel(t) {
    this.dtc = t;
  }
}
(exports.UeMovementTickController = UeMovementTickController).Managers = new Array();
UeMovementTickController.PreTickedManagers = new Array();
UeMovementTickController.dtc = true;
let UeMovementTickManageComponent = UeMovementTickManageComponent_1 = class UeMovementTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.o4o = undefined;
    this.oRe = undefined;
    this.tr_ = undefined;
    this.Msn = undefined;
    this.Esn = undefined;
    this.SkelTickMgr = undefined;
    this.dzl = 0;
    this.mzl = 0;
    this.Dsn = 0;
    this.$k_ = false;
    this.Qzl = 0;
    this.Kzl = undefined;
    this.$zl = Vector_1.Vector.Create();
    this.Xzl = Rotator_1.Rotator.Create();
    this.ysn = false;
    this.prl = (0, puerts_1.$ref)(undefined);
    this.utl = false;
    this.Frozen = false;
    this.Isn = 0;
    this.OnEntityBudgetTickEnableChange = t => {
      if (this.oRe?.Valid && t) {
        this.oRe.ConsumeRootMotion();
      }
    };
    this.EnableVelocityInfoCache = false;
    this.VelocityInfoCacheArray = new Array();
    this.VelocityInfoFrameSize = 5;
    this.FrameCounter = 0;
    this.LastFrame = 0n;
    this.TmpVector = Vector_1.Vector.Create();
  }
  static get Dependencies() {
    return [3];
  }
  get TickMode() {
    return this.Dsn;
  }
  set TickMode(t) {
    if (this.Dsn !== t) {
      var i = this.Dsn;
      this.Dsn = t;
      switch (i) {
        case 1:
          UeMovementTickController.DeleteManager(this, 0);
          TickSystem_1.TickSystem.CleanMovementProxyTickFunction(this.o4o);
          if (t !== 4) {
            this.dzl = 0;
            this.mzl = 0;
          }
          break;
        case 3:
          this.o4o.SetKuroOnlyTickOutside(true);
          this.o4o.SetComponentTickEnabled(false);
          break;
        case 4:
          UeMovementTickController.DeleteManager(this, 0);
      }
      switch (t) {
        case 1:
          UeMovementTickController.AddManager(this, 0);
          TickSystem_1.TickSystem.SetMovementProxyTickFunction(0, this.o4o, 1);
          break;
        case 3:
          this.o4o.SetKuroOnlyTickOutside(false);
          this.o4o.SetComponentTickEnabled(true);
          break;
        case 4:
          UeMovementTickController.AddManager(this, 0);
      }
    }
  }
  get ForbiddenTickPose() {
    return this.ysn;
  }
  set ForbiddenTickPose(t) {
    if (this.ysn !== t) {
      this.ysn = t;
      this.o4o.bForbiddenTickPose = t;
    }
  }
  get TeleportLock() {
    return this.utl;
  }
  set TeleportLock(t) {
    this.utl = t;
  }
  OnInit() {
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Msn = this.Entity.GetComponent(45);
    this.tr_ = this.Entity.GetComponent(237);
    this.o4o = this.Hte.Owner.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
    return !!this.o4o && (this.Esn = this.Entity.GetComponent(30), this.SkelTickMgr = this.Entity.GetComponent(118), this.o4o.SetKuroOnlyTickOutside(true), this.o4o.SetComponentTickEnabled(false), this.oRe = this.Entity.GetComponent(181), this.ForbiddenTickPose = this.Entity.GetTickInterval() > 1 || UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming, this.Isn = Time_1.Time.Frame, this.utl = false, this.TickMode = UeMovementTickController.EnabledMovementParallel ? 1 : 2, ModelManager_1.ModelManager.SundryModel.RoleFallingDebugLogOn && this.Hte.IsRoleAndCtrlByMe && this.SetVelocityInfoCacheEnable(true), true);
  }
  OnEnd() {
    this.TickMode = 0;
    return !(this.Kzl = undefined);
  }
  OnDisable() {
    if (this.Hte?.Actor) {
      this.Hte.Actor.BasedMovement.MovementBase = undefined;
    }
    if (this.Hte?.IsRoleAndCtrlByMe && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "UeMovementTickManageComponent Disable", ["Entity", this.Entity.Id], ["DisableInfo", this.DumpDisableInfo()]);
    }
  }
  OnEnable() {
    if (this.Hte?.IsRoleAndCtrlByMe && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "UeMovementTickManageComponent Enable", ["Entity", this.Entity.Id]);
    }
    this.Isn = Time_1.Time.Frame;
  }
  OnTick(t) {
    if (this.TickMode === 2 && (this.TickMovement(t), this.ResetCachedTransformAndSetModelBuffer(), UeMovementTickController.EnabledMovementParallel)) {
      if (this.Hte?.Actor.GetAttachRootParentActor()?.IsValid()) {
        this.TickMode = 4;
      } else {
        this.TickMode = 1;
      }
    }
  }
  PreProxyTick(t) {
    this.dzl++;
    this.mzl += this.Entity.TimeDilation * t;
    if (this.dzl >= this.Entity.GetTickInterval()) {
      this.TickMovement(this.mzl);
    }
  }
  ProxyTick() {
    if (this.dzl >= this.Entity.GetTickInterval()) {
      this.ResetCachedTransformAndSetModelBuffer();
      this.dzl = 0;
      this.mzl = 0;
    }
    if (UeMovementTickController.EnabledMovementParallel) {
      if (this.Hte?.Actor.GetAttachRootParentActor()?.IsValid()) {
        this.TickMode = 4;
      } else {
        this.TickMode = 1;
      }
    } else {
      this.TickMode = 2;
    }
  }
  TickMovement(t) {
    this.$k_ = false;
    this.Hte?.LastActorLocation.DeepCopy(this.Hte.ActorLocationProxy);
    this.frl();
    if (this.o4o && !this.TeleportLock) {
      if (ControllerHolder_1.ControllerHolder.WorldController.GetIsWorldOriginInUiMode()) {
        if (this.o4o.MovementMode !== 3) {
          return;
        }
      }
      if (!this.Hte?.Actor.GetAttachRootParentActor() || this.Msn?.NeedRootMotionWhenAttached) {
        if (this.Esn) {
          this.Esn.MarkDebugRecord("移动组件更新前 ", undefined, true);
        }
        if (this.tr_) {
          for (const o of this.tr_.PassengerInfoMap.values()) {
            o.PassengerEntity?.GetComponent(30)?.MarkDebugRecord("载具移动组件更新前", undefined, true);
          }
        }
        this.Msn.ConsumeForceFallingSpeed();
        var i;
        var e;
        var s = this.Entity.GetComponent(126)?.CurrentTimeScale ?? 1;
        if (!!this.Msn.NeedRootMotionWhenAttached || !this.Msn.IsSpecialMove) {
          if (this.Msn) {
            this.Msn.GetAndConsumeAddMove(t * MathUtils_1.MathUtils.MillisecondToSecond * s, UeMovementTickManageComponent_1.Lz, UeMovementTickManageComponent_1.Gue);
            if (!UeMovementTickManageComponent_1.Lz.IsNearlyZero()) {
              if (this.o4o.MovementMode === 3) {
                this.Hte.AddActorWorldOffset(UeMovementTickManageComponent_1.Lz.ToUeVector(), "AddMove", true);
              } else {
                this.o4o.SetAddMove(UeMovementTickManageComponent_1.Lz.ToUeVector());
              }
            }
            if (!UeMovementTickManageComponent_1.Gue.IsNearlyZero()) {
              this.Hte?.AddActorLocalRotation(UeMovementTickManageComponent_1.Gue.ToUeRotator(), "叠加旋转", false);
            }
          }
          i = this.Entity.GetTickInterval() > 1;
          this.ForbiddenTickPose = i || this.Frozen || UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming;
          this.Qzl = 0;
          if ((e = this.oRe?.Actor?.Mesh) && e.bEnableUpdateRateOptimizations && !this.Msn.BasePlatform && (e.GetAnimUpdateRateParameters(this.prl), !(e = (0, puerts_1.$unref)(this.prl)).bSkipUpdate) && e.UpdateRate > this.Entity.GetTickInterval()) {
            this.Qzl = e.UpdateRate * t * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation / Math.max(1, this.Entity.GetTickInterval());
          }
          if (i && this.oRe?.Valid && this.Hte.Owner.WasRecentlyRenderedOnScreen()) {
            this.Qzl = Math.max(t * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation, this.Qzl);
          }
          if (this.Qzl <= CharacterAnimationComponent_1.MIN_BUFFER_TIME_LENGTH || !this.oRe) {
            this.o4o.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * s);
          } else {
            this.Kzl = this.oRe.GetMeshTransform();
            this.$zl.DeepCopy(this.Hte.ActorLocationProxy);
            this.Xzl.DeepCopy(this.Hte.ActorRotationProxy);
            this.o4o.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * s);
            this.Hte.ResetAllCachedTime();
          }
        }
        this.$k_ = true;
      }
    }
  }
  ResetCachedTransformAndSetModelBuffer() {
    this.CacheVelocityInfo("AfterTickMovement");
    this.UpdateVelocityCache();
    if (this.$k_ && (this.Msn.IsSpecialMove || this.Hte.ResetAllCachedTime(), !this.Kzl || !(this.Qzl >= CharacterAnimationComponent_1.MIN_BUFFER_TIME_LENGTH) || this.$zl.Equals(this.Hte.ActorLocationProxy) && this.Xzl.Equals(this.Hte.ActorRotationProxy) || (this.oRe.SetModelBuffer(this.Kzl, this.Qzl), this.Kzl = undefined), this.Msn.ApplyForceSpeedAndRecordSpeed(), this.Esn && this.Esn.MarkDebugRecord("移动组件更新后", undefined, true), this.tr_)) {
      for (const i of this.tr_.PassengerInfoMap.values()) {
        var t = i.PassengerEntity?.GetComponent(30);
        i.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime();
        t?.MarkDebugRecord("载具移动组件更新后", undefined, true);
      }
    }
  }
  frl() {
    if (this.Hte?.IsRoleAndCtrlByMe && Time_1.Time.Frame - this.Isn > 1 && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Movement", 6, "[b1057126] 角色更新异常", ["DebugLastTickFrame", this.Isn], ["Current", Time_1.Time.Frame]);
    }
    this.Isn = Time_1.Time.Frame;
  }
  SetVelocityInfoCacheEnable(t) {
    if (this.EnableVelocityInfoCache !== t) {
      this.Hte.Actor.CharacterMovement.bKuroVelocityDebug = t;
      this.Hte.Actor.Mesh.bRootMotionDebug = t;
      this.EnableVelocityInfoCache = t;
      this.VelocityInfoCacheArray.length = 0;
      this.FrameCounter = 0;
    }
  }
  UpdateVelocityCache() {
    if (this.EnableVelocityInfoCache) {
      while (this.FrameCounter > this.VelocityInfoFrameSize) {
        var t = this.VelocityInfoCacheArray.shift()?.Frame;
        while (true) {
          if (!this.VelocityInfoCacheArray.length) {
            break;
          }
          if (t === this.LastFrame || t !== this.VelocityInfoCacheArray[0].Frame) {
            break;
          }
          this.VelocityInfoCacheArray.shift();
        }
        this.FrameCounter--;
      }
    }
  }
  CacheVelocityInfo(t) {
    var i;
    if (this.EnableVelocityInfoCache) {
      (i = new VelocityCacheInfo()).Frame = UE.KismetSystemLibrary.GetFrameCount();
      i.SpeedZ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorVelocityProxy);
      i.MoveMode = this.Hte.Actor.CharacterMovement.MovementMode;
      this.TmpVector.FromUeVector(this.Hte.Actor.CharacterMovement.Velocity);
      i.VelocityZ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.TmpVector);
      this.TmpVector.FromUeVector(this.Hte.Actor.CharacterMovement.GetLastUpdateVelocity());
      i.LastZ = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.TmpVector);
      i.Context = t;
      t = UE.KismetSystemLibrary.GetFrameCount();
      this.VelocityInfoCacheArray.push(i);
      this.FrameCounter += this.LastFrame === t ? 0 : 1;
      this.LastFrame = t;
    }
  }
  DumpVelocityCacheInfo(i = "", e = false) {
    if (this.EnableVelocityInfoCache) {
      if (this.VelocityInfoCacheArray.length) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Test", 50, "[b1123700] Dump cached velocity infos", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Frame", UE.KismetSystemLibrary.GetFrameCount()], ["Name", this.Hte?.Actor.GetName()], ["Size", this.VelocityInfoCacheArray.length], ["OnlyLast", e], ["Reason", i]);
        }
        let t = "";
        if (e) {
          e = this.VelocityInfoCacheArray.length;
          t += this.VelocityInfoCacheArray[e - 1].Dump();
        } else {
          for (const s of this.VelocityInfoCacheArray) {
            t += s.Dump();
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Test", 50, "[b1123700] DumpInfos", ["Info", t]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 50, "[b1123700] Cannot dump velocity infos for empty cache", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Frame", UE.KismetSystemLibrary.GetFrameCount()], ["Name", this.Hte?.Actor.GetName()], ["Reason", i]);
      }
    }
  }
};
UeMovementTickManageComponent.Lz = Vector_1.Vector.Create();
UeMovementTickManageComponent.Gue = Rotator_1.Rotator.Create();
UeMovementTickManageComponent = UeMovementTickManageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(117)], UeMovementTickManageComponent);
exports.UeMovementTickManageComponent = UeMovementTickManageComponent; //# sourceMappingURL=UeMovementTickManageComponent.js.map