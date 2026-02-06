"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShooterComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../../Global");
const InputController_1 = require("../../../../../../Input/InputController");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const LogReportController_1 = require("../../../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../../../Module/LogReport/LogReportDefine");
const ActorUtils_1 = require("../../../../../../Utils/ActorUtils");
const GravityUtils_1 = require("../../../../../../Utils/GravityUtils");
const CustomPriorityManager_1 = require("../../../../../../Utils/Priority/CustomPriorityManager");
const FollowShooterDrone_1 = require("./FollowShooterDrone");
const DELAY_DISAPPEAR_MAX_TIME = 5000;
const lockOnTargetTag = 199201016;
const FOLLOW_SHOOTER_DEBUG_KEY = "FollowShooterComponent";
class TagModifier {
  constructor() {
    this.LZm = new Set();
    this.PZm = new Set();
    this.AZm = false;
    this.DZm = false;
    this.UZm = false;
  }
  static Create(t, i, s) {
    var o = new TagModifier();
    var e = t.AddTags.GameplayTags;
    var r = e.Num();
    for (let t = 0; t < r; t++) {
      o.LZm.add(e.Get(t).TagId);
    }
    var h = t.CheckTags.GameplayTags;
    var n = h.Num();
    for (let e = 0; e < n; e++) {
      var l = h.Get(e).TagId;
      let t = i.get(l);
      if (!t) {
        t = new Set();
        i.set(l, t);
      }
      t.add(s);
      o.PZm.add(l);
    }
    o.AZm = t.CheckHasTag;
    o.DZm = t.LogicType === 0;
    return o;
  }
  TriggerModifyTag(t, e) {
    if (this.xZm(t)) {
      if (!this.UZm) {
        this.UZm = true;
        for (const i of this.LZm) {
          e.TagContainer.UpdateExactTag(1, i, 1);
        }
      }
    } else if (this.UZm) {
      this.UZm = false;
      for (const s of this.LZm) {
        e.TagContainer.UpdateExactTag(1, s, -1);
      }
    }
  }
  xZm(t) {
    return !!t && (t = this.DZm ? t.HasAllTag(this.PZm) : t.HasAnyTag(this.PZm), this.AZm ? t : !t);
  }
}
let FollowShooterComponent = class FollowShooterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.tRr = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.L3f = undefined;
    this.Bhh = undefined;
    this.BZm = new Array();
    this.kZm = new Map();
    this.tz_ = new Array();
    this.M7g = new Map();
    this.Ruf = new Map();
    this.YIa = false;
    this.VBa = undefined;
    this.dnm = undefined;
    this.FollowShooterConfig = undefined;
    this.LockableCategories = undefined;
    this.LockOnTarget = undefined;
    this.jx_ = false;
    this.PlayerId = 0;
    this.IsPossessed = false;
    this.IsAutonomousProxy = false;
    this.LoadPromise = undefined;
    this.MaterialControllerHandles = new Set();
    this.IsWaitingForMaterialController = false;
    this.IsEnable = false;
    this.cNg = false;
    this.s6g = undefined;
    this.xie = () => {
      this.iz_();
      this.rz_();
      this._rl();
      this.kUa();
    };
    this.kUa = () => {
      if (this.NUa()) {
        if (this.FollowShooterConfig?.AutoEnable) {
          this.s6g?.TryEnter(1);
        }
      } else {
        this.s6g?.TryExit(1);
      }
    };
    this.M6l = t => {
      this._rl();
    };
    this.E6l = t => {
      this._rl();
    };
    this.Wng = () => {
      var t;
      var e = this.FollowShooterConfig?.LockOnConfig.CustomBulletTargetKey;
      if (e && !StringUtils_1.StringUtils.IsNothing(e) && (t = this.LockOnTarget?.deref())?.IsValid() && t.IsA(UE.KuroEntityActor.StaticClass())) {
        t = t.EntityId;
        ModelManager_1.ModelManager.BulletModel.SetEntityIdByCustomKey(this.Entity.Id, e, t);
      }
    };
    this.oz_ = t => {
      if (this.Xte) {
        var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.PlayerId, {
          ParamType: 2,
          IsControl: true
        })?.EntityHandle?.Entity?.GetComponent(217);
        var t = this.kZm.get(t);
        if (t) {
          for (const i of t) {
            this.BZm[i].TriggerModifyTag(e, this.Xte);
          }
        }
      }
    };
    this.wuf = (t, e) => {
      var i = this.Ruf.get(t);
      if (i && e && this.IsPossessed && (e = ((e = this.EIe?.GetSummonerId()) ? ModelManager_1.ModelManager.CreatureModel.GetEntity(e) : undefined)?.Entity?.CheckGetComponent(1))?.Owner?.IsValid() && this.n$t?.Owner?.IsValid() && (this.n$t.Owner.K2_AttachToActor(e.Owner, undefined, 2, 2, 1, false), (e = e?.SkeletalMesh)?.IsValid()) && this.FollowShooterConfig?.IsValid()) {
        FollowShooterDrone_1.FollowShooterDrone.SpecificOwnerSceneComponentExecute(this.Entity, this.FollowShooterConfig, i, FollowShooterDrone_1.FollowShooterDrone.AttachToByConfig.bind(FollowShooterDrone_1.FollowShooterDrone, e, t));
      }
    };
    this.E7g = (t, e) => {
      t = this.Ruf.get(t);
      if (t && this.FollowShooterConfig?.IsValid()) {
        FollowShooterDrone_1.FollowShooterDrone.SpecificOwnerSceneComponentExecute(this.Entity, this.FollowShooterConfig, t, FollowShooterDrone_1.FollowShooterDrone.SetHiddenInGame.bind(FollowShooterDrone_1.FollowShooterDrone, e));
      }
    };
    this.I7g = (t, e) => {
      if (e) {
        this.mUa();
      } else {
        this._rl();
      }
    };
    this.par = (t, e, i) => {
      if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(FOLLOW_SHOOTER_DEBUG_KEY) >= 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelPlay", 72, "FollowShooterComponent.OnAddMaterialController", ["Data", t.GetName()], ["UserData", e], ["Handle", i], ["Handles", this.MaterialControllerHandles]);
      }
      if (this.IsWaitingForMaterialController) {
        this.MaterialControllerHandles.add(i);
      }
    };
    this.var = t => {
      if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(FOLLOW_SHOOTER_DEBUG_KEY) >= 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelPlay", 72, "FollowShooterComponent.OnRemoveMaterialController", ["Handle", t], ["Handles", this.MaterialControllerHandles]);
      }
      if (this.IsWaitingForMaterialController && this.MaterialControllerHandles.delete(t) && this.MaterialControllerHandles.size === 0) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, true, "OnRemoveMaterialController.SetEnable");
        this.IsWaitingForMaterialController = false;
      }
    };
  }
  static get Dependencies() {
    return [43, 217, 3, 314];
  }
  OnInitData(t) {
    super.OnInitData(t);
    this.EIe = this.Entity.GetComponent(0);
    this.PlayerId = this.EIe?.GetPlayerId() ?? 0;
    this.IsAutonomousProxy = this.PlayerId === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (this.IsAutonomousProxy && (t = this.EIe?.GetPbEntityInitData())?.ComponentsData && (this.s6g = new CustomPriorityManager_1.CustomPriorityManager("FollowShooterComponent: " + t.Id), t = (0, IComponent_1.getComponent)(t.ComponentsData, "FollowShooterComponent"))) {
      this.LockableCategories = t.LockableCategories;
      this.Bhh = InputController_1.InputController.CreateInputLayer(5);
      this.LoadPromise = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(t.Config, UE.BP_FollowShooterConfig_C, t => {
        this.ResetConfig(t);
        this.LoadPromise?.SetResult();
        this.LoadPromise = undefined;
      });
    }
    return true;
  }
  OnStart() {
    super.OnStart();
    if (this.IsAutonomousProxy && (this.tRr = this.Entity.GetComponent(43), this.Xte = this.Entity.GetComponent(217), this.n$t = this.Entity.GetComponent(3), this.L3f = this.Entity.GetComponent(314), this.Bhh?.Start(this), this.dnm = new Map(), this.T7g(), this.n$t?.Actor.CharRenderingComponent)) {
      EventSystem_1.EventSystem.AddWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par);
      EventSystem_1.EventSystem.AddWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var);
    }
    return true;
  }
  OnEnd() {
    this.UnPossessed();
    this.VBa?.Remove();
    this.VBa = undefined;
    this.mUa();
    this.Bhh?.Clear();
    this.Bhh = undefined;
    this.dnm?.clear();
    this.dnm = undefined;
    this.R7g();
    this.MaterialControllerHandles.clear();
    this.IsWaitingForMaterialController = false;
    if (this.n$t?.Actor.CharRenderingComponent && (EventSystem_1.EventSystem.HasWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par) && EventSystem_1.EventSystem.RemoveWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par), EventSystem_1.EventSystem.HasWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var))) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var);
    }
    this.tRr = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.L3f = undefined;
    this.PlayerId = 0;
    this.IsAutonomousProxy = false;
    this.LoadPromise?.SetResult();
    this.LoadPromise = undefined;
    this.IsEnable = false;
    this.s6g?.ClearObject();
    this.s6g = undefined;
    return super.OnEnd();
  }
  OnTick(t) {
    var e = this.L3f?.SelfCenterTimeDilation ?? 1;
    this.Pxl(e * t);
    this.T_e(e * t);
  }
  GetEnable() {
    return this.IsEnable;
  }
  a6g(t) {
    if (this.FollowShooterConfig && this.IsAutonomousProxy && this.GetEnable() !== t) {
      if (!t) {
        this.mUa();
        for (let t = 0; t < this.FollowShooterConfig.AddTagsWhenEnable.Num(); ++t) {
          var e = this.FollowShooterConfig.AddTagsWhenEnable.Get(t);
          this.Xte?.RemoveTag(e.TagId);
          ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(this.PlayerId, e.TagId);
        }
        this.LockOnTarget = undefined;
        this.JIa();
        this.YIa = false;
        this.IsWaitingForMaterialController = false;
        this.MaterialControllerHandles.clear();
        this.IsEnable = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, false);
        if (this.jx_) {
          this.Xte?.RemoveTag(lockOnTargetTag);
          this.jx_ = false;
        }
        if (this.FollowShooterConfig && this.FollowShooterConfig.DelayDisappearMillisecond > 0 && this.FollowShooterConfig.DelayDisappearMillisecond <= DELAY_DISAPPEAR_MAX_TIME) {
          this.VBa ||= TimerSystem_1.TimerSystem.Delay(() => {
            this.VBa = undefined;
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, false, "FollowShooterComponent.SetEnable");
          }, this.FollowShooterConfig.DelayDisappearMillisecond);
        } else {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, false, "FollowShooterComponent.SetEnable");
        }
        return true;
      }
      if (this.NUa()) {
        this.VBa?.Remove();
        this.VBa = undefined;
        this.MaterialControllerHandles.clear();
        this.IsEnable = true;
        if (this.FollowShooterConfig.SetEntityEnableAfterMaterialController) {
          this.IsWaitingForMaterialController = true;
        } else {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, true, "FollowShooterComponent.SetEnable");
        }
        this._rl();
        for (let t = 0; t < this.FollowShooterConfig.AddTagsWhenEnable.Num(); ++t) {
          var i = this.FollowShooterConfig.AddTagsWhenEnable.Get(t);
          this.Xte?.AddTag(i.TagId);
          ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(this.PlayerId, i.TagId);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, true);
        return true;
      }
    }
    return false;
  }
  SetEnable(t, e, i = "") {
    return !!this.IsAutonomousProxy && (t ? this.s6g?.TryEnter(e, i) ?? false : this.s6g?.TryExit(e, i) ?? false);
  }
  NUa() {
    if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType !== 1) {
      return false;
    }
    if (!this.FollowShooterConfig || !this.IsAutonomousProxy) {
      return false;
    }
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(217);
    if (!e) {
      return false;
    }
    for (let t = 0; t < this.FollowShooterConfig.DisableWhenCurrentRoleHasTags.Num(); ++t) {
      var i = this.FollowShooterConfig.DisableWhenCurrentRoleHasTags.Get(t);
      if (e.HasTag(i.TagId)) {
        return false;
      }
    }
    return true;
  }
  Possessed() {
    if (this.FollowShooterConfig && this.IsAutonomousProxy && !this.IsPossessed) {
      this.IsPossessed = true;
      for (let t = 0; t < this.FollowShooterConfig.AddTagsToPlayerWhenPossess.Num(); t++) {
        var e = this.FollowShooterConfig.AddTagsToPlayerWhenPossess.Get(t);
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(this.PlayerId, e.TagId);
      }
      this.tjc();
      this.ijc();
      this.iz_();
      this.rz_();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, this.kUa);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateTeamGroupType, this.kUa);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify, this.Wng);
      if (this.FollowShooterConfig?.AutoEnable) {
        this.SetEnable(true, 1);
      }
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
      if (t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerPossessed, t);
      }
    }
  }
  UnPossessed() {
    if (this.FollowShooterConfig && this.IsAutonomousProxy && this.IsPossessed) {
      this.IsPossessed = false;
      for (let t = 0; t < this.FollowShooterConfig.AddTagsToPlayerWhenPossess.Num(); t++) {
        var e = this.FollowShooterConfig.AddTagsToPlayerWhenPossess.Get(t);
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(this.PlayerId, e.TagId);
      }
      this.s6g?.TryExitAll();
      this.nz_();
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.kUa);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateTeamGroupType, this.kUa);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify, this.Wng);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed);
    }
  }
  ZOf(t) {
    this.ResetConfig(t);
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerConfigChanged, t);
    }
  }
  ReloadConfig(t) {
    t = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_FollowShooterConfig_C);
    if (t?.IsValid()) {
      this.ZOf(t);
    }
  }
  async AsyncReloadConfig(t) {
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_FollowShooterConfig_C, t => {
      e.SetResult(t);
    });
    t = await e.Promise;
    if (t?.IsValid()) {
      this.ZOf(t);
      return t;
    }
  }
  ResetConfig(e) {
    if (e?.IsValid()) {
      this.FollowShooterConfig = e;
      this.Bhh?.ClearInputActions();
      for (let t = 0; t < e.NeedInputActions.Num(); t++) {
        var i = e.NeedInputActions.Get(t);
        var s = i.State;
        this.Bhh?.RegisterInputAction([i.Action, s]);
      }
      this.BZm.length = 0;
      this.kZm.clear();
      this.iz_();
      var o = e.AddTagByCheckCurrentRoleTag;
      var r = o.Num();
      for (let t = 0; t < r; t++) {
        const e = o.Get(t);
        var h = TagModifier.Create(e, this.kZm, t);
        this.BZm.push(h);
      }
      for (let t = 0, e = this.FollowShooterConfig.EnablePriority.Num(); t < e; t++) {
        const n = this.FollowShooterConfig.EnablePriority.Get(t);
        this.s6g?.Register(n.EnableType, {
          Enable: false,
          EnterCallback: t => {
            var e = this.a6g(true);
            if (n.EnterSkillId > 0 && (!t.IsReentrant || n.EnterSkillReentrant)) {
              this.tRr?.BeginSkillAsync(n.EnterSkillId, {
                Reason: "FollowShooter Enter " + n.EnableType
              });
            }
            return e;
          },
          EnterReentrant: true,
          ExitCallback: t => {
            if (n.ExitSkillId > 0) {
              this.tRr?.BeginSkillAsync(n.ExitSkillId, {
                Reason: "FollowShooter Exit " + n.EnableType
              });
            }
            return this.a6g(false);
          }
        });
      }
      this.T7g();
    }
  }
  tjc() {
    if (this.n$t && this.FollowShooterConfig) {
      let t = undefined;
      var e;
      if (this.FollowShooterConfig.BornTransform.OffsetTargetType === 0) {
        t = this.n$t;
      } else if (this.FollowShooterConfig.BornTransform.OffsetTargetType === 1) {
        t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
      }
      if (t?.Valid) {
        (e = Vector_1.Vector.Create()).FromUeVector(t.ActorTransform.TransformPositionNoScale(new UE.VectorDouble(this.FollowShooterConfig.BornTransform.Offset)));
        this.n$t.SetActorLocation(e.ToUeVector(), "UpdateBornPosition", false);
      }
    }
  }
  ijc() {
    if (this.FollowShooterConfig && this.FollowShooterConfig.BornTransform.RotateType !== 0 && this.n$t) {
      var t;
      var e = this.Entity.GetComponent(48);
      var i = e ? e.GravityUp : Vector_1.Vector.UpVectorProxy;
      var s = Rotator_1.Rotator.Create();
      if (this.FollowShooterConfig.BornTransform.RotateType === 1) {
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
        if (!o?.Valid) {
          return;
        }
        s.DeepCopy(o.ActorRotationProxy);
      } else if (this.FollowShooterConfig.BornTransform.RotateType === 2) {
        o = Vector_1.Vector.Create();
        r = Vector_1.Vector.Create();
        t = Vector_1.Vector.Create();
        o.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
        r.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorForwardVector());
        o.AdditionEqual(r.MultiplyEqual(this.FollowShooterConfig.BornTransform.RotateCameraDistance));
        t.DeepCopy(o);
        t.Subtraction(this.n$t.ActorLocationProxy, t);
        MathUtils_1.MathUtils.LookRotationForwardFirst(t, i, s);
      }
      var r = Quat_1.Quat.Create();
      var h = Rotator_1.Rotator.Create();
      var n = Rotator_1.Rotator.Create();
      var o = !e || e.IsStandardGravity;
      if (o) {
        h.DeepCopy(s);
        n.DeepCopy(this.n$t.ActorRotationProxy);
      } else {
        Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, i, r);
        GravityUtils_1.GravityUtils.GetRotatorInNormal(s, r, h);
        GravityUtils_1.GravityUtils.GetRotatorInNormal(this.n$t.ActorRotationProxy, r, n);
      }
      for (let t = 0; t < this.FollowShooterConfig.BornTransform.RotateInvalidAxis.Num(); ++t) {
        var l = this.FollowShooterConfig.BornTransform.RotateInvalidAxis.Get(t);
        if (l === 0) {
          h.Roll = n.Roll;
        } else if (l === 1) {
          h.Pitch = n.Pitch;
        } else if (l === 2) {
          h.Yaw = n.Yaw;
        }
      }
      if (o) {
        s.DeepCopy(h);
      } else {
        r.Inverse(r);
        GravityUtils_1.GravityUtils.GetRotatorInGravity(h, r, s);
      }
      this.n$t.SetActorRotation(s.ToUeRotator(), "UpdateBornRotation", false);
    }
  }
  rz_() {
    if (this.Xte) {
      var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.PlayerId, {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle?.Entity?.GetComponent(217);
      for (const e of this.BZm.values()) {
        e.TriggerModifyTag(t, this.Xte);
      }
    }
  }
  b7g(t, e, i = undefined) {
    if (t) {
      t = t.TagId;
      if (!this.Xte.HasTagAddOrRemoveListener(t, e)) {
        if ((e = this.Xte.ListenForTagAddOrRemove(t, e)) && (this.M7g.set(t, e), i)) {
          this.Ruf.set(t, i);
        }
      }
    }
  }
  T7g() {
    if (this.Xte && this.n$t && this.n$t.Owner?.IsValid() && this.FollowShooterConfig?.IsValid()) {
      this.R7g();
      for (let t = 0, e = this.FollowShooterConfig.DisableInputWhenHasTags.GameplayTags.Num(); t < e; t++) {
        this.b7g(this.FollowShooterConfig.DisableInputWhenHasTags.GameplayTags.Get(t), this.I7g);
      }
      for (let t = 0; t < this.FollowShooterConfig.LockOnConfig.ArrayAutoAimConfig.Num(); t++) {
        var i = this.FollowShooterConfig.LockOnConfig.ArrayAutoAimConfig.Get(t);
        var s = i.ShouldAimAtLockOnTargetName;
        if (FNameUtil_1.FNameUtil.IsNothing(s)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlay", 72, "FollowShooterComponent.RefreshTagListener ShouldAimAtLockOnTargetName为空", ["Index", t]);
          }
        } else {
          for (let t = 0; t < i.MapAttachToFollowingWhileHasTag.Num(); t++) {
            this.b7g(i.MapAttachToFollowingWhileHasTag.GetKey(t), this.wuf, s);
          }
          for (let t = 0, e = i.HideWhileHasTags.GameplayTags.Num(); t < e; t++) {
            this.b7g(i.HideWhileHasTags.GameplayTags.Get(t), this.E7g, s);
          }
        }
      }
    }
  }
  R7g() {
    for (const t of this.M7g.values()) {
      t.EndTask();
    }
    this.M7g.clear();
    this.Ruf.clear();
  }
  iz_() {
    if (this.FollowShooterConfig) {
      this.nz_();
      var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.PlayerId, {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle?.Entity?.GetComponent(217);
      if (e) {
        for (let t = 0; t < this.FollowShooterConfig.DisableWhenCurrentRoleHasTags.Num(); ++t) {
          var i = this.FollowShooterConfig.DisableWhenCurrentRoleHasTags.Get(t);
          var i = e.ListenForTagAddOrRemove(i.TagId, this.kUa);
          if (i) {
            this.tz_.push(i);
          }
        }
        for (const s of this.kZm.keys()) {
          var t = e.ListenForTagAddOrRemove(s, this.oz_);
          if (t) {
            this.tz_.push(t);
          }
        }
      }
    }
  }
  nz_() {
    for (const t of this.tz_) {
      t.EndTask();
    }
    this.tz_.length = 0;
  }
  _rl() {
    if (this.GetEnable() && this.Bhh) {
      this.mUa();
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      let t = e?.Id;
      e = e?.Entity?.CheckGetComponent(242);
      if (t = e && e.VehicleEntity?.Valid && e.VehicleEntity.GetComponent(264) ? e.VehicleEntity?.Id : t) {
        this.cNg = true;
        InputController_1.InputController.AddInputLayer(t, this.Bhh);
      }
    }
  }
  mUa() {
    if (this.Bhh && this.cNg) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.cNg = false;
    }
  }
  ExecuteCommand(t) {
    var e;
    if (t && t.CommandType === 1) {
      t = t.IntValue;
      e = this.LockOnTarget?.deref();
      e = ActorUtils_1.ActorUtils.GetEntityByActor(e, false);
      this.tRr.BeginSkillAsync(t, {
        Reason: "Follower Begin Skill",
        Target: e?.Entity
      });
      this.YIa = true;
    }
  }
  JIa() {
    if (this.FollowShooterConfig?.NeedUploadData) {
      var e = new LogReportDefine_1.FollowShooterUseLogData();
      let t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1)?.ActorLocationProxy;
      if (t = t || this.n$t?.ActorLocationProxy) {
        e.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
        e.i_father_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.Father;
        e.f_pos_x = t.X;
        e.f_pos_y = t.Y;
        e.f_pos_z = t.Z;
        e.i_has_target = this.YIa ? 1 : 0;
        LogReportController_1.LogReportController.UnitLogReport(e);
      }
    }
  }
  Pxl(t) {
    if (this.GetEnable()) {
      if (this.LockOnTarget && !this.jx_) {
        this.Xte?.AddTag(lockOnTargetTag);
        this.jx_ = true;
      } else if (!this.LockOnTarget && this.jx_) {
        this.Xte?.RemoveTag(lockOnTargetTag);
        this.jx_ = false;
      }
    }
  }
  T_e(t) {
    var e;
    if (this.GetEnable() && this.FollowShooterConfig?.IsValid() && this.dnm) {
      if ((e = this.LockOnTarget?.deref())?.IsValid()) {
        FollowShooterDrone_1.FollowShooterDrone.UpdateRotationToAimAtLockOnTarget(this.Entity, e, this.dnm, this.FollowShooterConfig, t);
      } else {
        e = this.n$t?.ActorGravityDirectProxy.MultiplyEqual(-1).ToUeVectorOld();
        FollowShooterDrone_1.FollowShooterDrone.UpdateRotationToCameraForward(this.Entity, e ?? Vector_1.Vector.UpVector, this.FollowShooterConfig, t);
      }
    }
  }
};
FollowShooterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(235)], FollowShooterComponent);
exports.FollowShooterComponent = FollowShooterComponent; //# sourceMappingURL=FollowShooterComponent.js.map