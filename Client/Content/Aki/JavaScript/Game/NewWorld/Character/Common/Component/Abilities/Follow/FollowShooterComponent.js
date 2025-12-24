"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        r = (h < 3 ? o(r) : h > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShooterComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
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
const FollowShooterDrone_1 = require("./FollowShooterDrone");
const DELAY_DISAPPEAR_MAX_TIME = 5000;
const lockOnTargetTag = 199201016;
let FollowShooterComponent = class FollowShooterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.tRr = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.Bkf = undefined;
    this.Bhh = undefined;
    this.ZY_ = new Map();
    this.ez_ = new Map();
    this.tz_ = new Array();
    this.$af = new Map();
    this.Waf = new Map();
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
    this.xie = () => {
      this.iz_();
      this.rz_();
      this._rl();
      this.kUa();
    };
    this.kUa = () => {
      if (this.CanEnable()) {
        if (this.FollowShooterConfig?.AutoEnable) {
          this.SetEnable(true);
        }
      } else {
        this.SetEnable(false);
      }
    };
    this.M6l = t => {
      this._rl();
    };
    this.E6l = t => {
      this._rl();
    };
    this.HWf = () => {
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
        })?.EntityHandle?.Entity?.GetComponent(215);
        var t = this.ez_.get(t);
        if (t) {
          for (const s of t) {
            var i = this.ZY_.get(s);
            if (i && e?.HasAnyTag(i)) {
              if (!this.Xte.HasExactTag(s)) {
                this.Xte.AddTag(s);
              }
            } else {
              this.Xte.RemoveTag(s);
            }
          }
        }
      }
    };
    this.Qaf = (t, e) => {
      var i = this.Waf.get(t);
      if (i && e && this.IsPossessed && (e = ((e = this.EIe?.GetSummonerId()) ? ModelManager_1.ModelManager.CreatureModel.GetEntity(e) : undefined)?.Entity?.CheckGetComponent(1))?.Owner?.IsValid() && this.n$t?.Owner?.IsValid() && (this.n$t.Owner.K2_AttachToActor(e.Owner, undefined, 2, 2, 1, false), (e = e?.SkeletalMesh)?.IsValid()) && this.FollowShooterConfig?.IsValid()) {
        FollowShooterDrone_1.FollowShooterDrone.SpecificOwnerSceneComponentExecute(this.Entity, this.FollowShooterConfig, i, FollowShooterDrone_1.FollowShooterDrone.AttachToByConfig.bind(FollowShooterDrone_1.FollowShooterDrone, e, t));
      }
    };
    this.par = (t, e, i) => {
      if (this.IsWaitingForMaterialController) {
        this.MaterialControllerHandles.add(i);
      }
    };
    this.var = t => {
      if (this.IsWaitingForMaterialController && this.MaterialControllerHandles.delete(t) && this.MaterialControllerHandles.size === 0) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, true, "OnRemoveMaterialController.SetEnable");
        this.IsWaitingForMaterialController = false;
      }
    };
  }
  static get Dependencies() {
    return [41, 215, 3, 312];
  }
  OnInitData(t) {
    super.OnInitData(t);
    this.EIe = this.Entity.GetComponent(0);
    this.PlayerId = this.EIe?.GetPlayerId() ?? 0;
    this.IsAutonomousProxy = this.PlayerId === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (this.IsAutonomousProxy && (t = this.EIe?.GetPbEntityInitData())?.ComponentsData && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "FollowShooterComponent"))) {
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
    if (this.IsAutonomousProxy && (this.tRr = this.Entity.GetComponent(41), this.Xte = this.Entity.GetComponent(215), this.n$t = this.Entity.GetComponent(3), this.Bkf = this.Entity.GetComponent(312), this.Bhh?.Start(this), this.dnm = new Map(), this.FollowShooterConfig && this.zaf(this.FollowShooterConfig.LockOnConfig), this.n$t?.Actor.CharRenderingComponent)) {
      EventSystem_1.EventSystem.AddWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par);
      EventSystem_1.EventSystem.AddWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var);
    }
    return true;
  }
  OnEnd() {
    this.UnPossessed();
    this.VBa?.Remove();
    this.VBa = undefined;
    if (this.Bhh) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
    this.dnm?.clear();
    this.dnm = undefined;
    for (const t of this.$af.values()) {
      t.EndTask();
    }
    this.$af.clear();
    this.Waf.clear();
    this.MaterialControllerHandles.clear();
    this.IsWaitingForMaterialController = false;
    if (this.n$t?.Actor.CharRenderingComponent && (EventSystem_1.EventSystem.HasWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par) && EventSystem_1.EventSystem.RemoveWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par), EventSystem_1.EventSystem.HasWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var))) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.n$t.Actor.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var);
    }
    this.tRr = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.Bkf = undefined;
    this.PlayerId = 0;
    this.IsAutonomousProxy = false;
    this.LoadPromise?.SetResult();
    this.LoadPromise = undefined;
    this.IsEnable = false;
    return super.OnEnd();
  }
  OnTick(t) {
    var e = this.Bkf?.SelfCenterTimeDilation ?? 1;
    this.Pxl(e * t);
    this.T_e(e * t);
  }
  GetEnable() {
    return this.IsEnable;
  }
  SetEnable(t) {
    if (this.FollowShooterConfig && this.IsAutonomousProxy && this.GetEnable() !== t) {
      if (t) {
        if (this.CanEnable()) {
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
            var e = this.FollowShooterConfig.AddTagsWhenEnable.Get(t);
            this.Xte?.AddTag(e.TagId);
            ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(this.PlayerId, e.TagId);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, true);
        }
      } else {
        if (this.Bhh) {
          InputController_1.InputController.RemoveInputLayer(this.Bhh);
        }
        for (let t = 0; t < this.FollowShooterConfig.AddTagsWhenEnable.Num(); ++t) {
          var i = this.FollowShooterConfig.AddTagsWhenEnable.Get(t);
          this.Xte?.RemoveTag(i.TagId);
          ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(this.PlayerId, i.TagId);
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
      }
    }
  }
  CanEnable() {
    if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType !== 1) {
      return false;
    }
    if (!this.FollowShooterConfig) {
      return false;
    }
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(215);
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
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify, this.HWf);
      if (this.FollowShooterConfig?.AutoEnable) {
        this.SetEnable(true);
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
      this.SetEnable(false);
      this.nz_();
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.kUa);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateTeamGroupType, this.kUa);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify, this.HWf);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed);
    }
  }
  yUf(t) {
    this.ResetConfig(t);
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerConfigChanged, t);
    }
  }
  ReloadConfig(t) {
    t = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_FollowShooterConfig_C);
    if (t?.IsValid()) {
      this.yUf(t);
    }
  }
  async AsyncReloadConfig(t) {
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_FollowShooterConfig_C, t => {
      e.SetResult(t);
    });
    t = await e.Promise;
    if (t?.IsValid()) {
      this.yUf(t);
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
      this.ZY_.clear();
      this.ez_.clear();
      this.iz_();
      var o = e.AddTagsWhenCurrentRoleHasAnyTags;
      for (let t = 0; t < o.Num(); t++) {
        var h = o.GetKey(t);
        var r = o.Get(h)?.GameplayTags;
        if (r) {
          var n = new Set();
          var l = h.TagId;
          this.ZY_.set(l, n);
          for (let e = 0; e < r.Num(); e++) {
            var a = r.Get(e).TagId;
            n.add(a);
            let t = this.ez_.get(a);
            if (!t) {
              t = new Set();
              this.ez_.set(a, t);
            }
            t.add(l);
          }
        }
      }
      this.zaf(e.LockOnConfig);
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
      var e = this.Entity.GetComponent(46);
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
        h = Vector_1.Vector.Create();
        t = Vector_1.Vector.Create();
        o.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
        h.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorForwardVector());
        o.AdditionEqual(h.MultiplyEqual(this.FollowShooterConfig.BornTransform.RotateCameraDistance));
        t.DeepCopy(o);
        t.Subtraction(this.n$t.ActorLocationProxy, t);
        MathUtils_1.MathUtils.LookRotationForwardFirst(t, i, s);
      }
      var h = Quat_1.Quat.Create();
      var r = Rotator_1.Rotator.Create();
      var n = Rotator_1.Rotator.Create();
      var o = !e || e.IsStandardGravity;
      if (o) {
        r.DeepCopy(s);
        n.DeepCopy(this.n$t.ActorRotationProxy);
      } else {
        Quat_1.Quat.FindBetween(Vector_1.Vector.UpVectorProxy, i, h);
        GravityUtils_1.GravityUtils.GetRotatorInNormal(s, h, r);
        GravityUtils_1.GravityUtils.GetRotatorInNormal(this.n$t.ActorRotationProxy, h, n);
      }
      for (let t = 0; t < this.FollowShooterConfig.BornTransform.RotateInvalidAxis.Num(); ++t) {
        var l = this.FollowShooterConfig.BornTransform.RotateInvalidAxis.Get(t);
        if (l === 0) {
          r.Roll = n.Roll;
        } else if (l === 1) {
          r.Pitch = n.Pitch;
        } else if (l === 2) {
          r.Yaw = n.Yaw;
        }
      }
      if (o) {
        s.DeepCopy(r);
      } else {
        h.Inverse(h);
        GravityUtils_1.GravityUtils.GetRotatorInGravity(r, h, s);
      }
      this.n$t.SetActorRotation(s.ToUeRotator(), "UpdateBornRotation", false);
    }
  }
  rz_() {
    if (this.Xte) {
      var t;
      var e;
      var i = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.PlayerId, {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle?.Entity?.GetComponent(215);
      for ([t, e] of this.ZY_) {
        if (i?.HasAnyTag(e)) {
          if (!this.Xte.HasExactTag(t)) {
            this.Xte.AddTag(t);
          }
        } else {
          this.Xte.RemoveTag(t);
        }
      }
    }
  }
  zaf(e) {
    if (this.Xte && this.n$t && this.n$t.Owner?.IsValid()) {
      for (const t of this.$af.values()) {
        t.EndTask();
      }
      this.$af.clear();
      this.Waf.clear();
      for (let t = 0; t < e.ArrayAutoAimConfig.Num(); t++) {
        var i = e.ArrayAutoAimConfig.Get(t);
        for (let t = 0; t < i.MapAttachToFollowingWhileHasTag.Num(); t++) {
          var s = i.MapAttachToFollowingWhileHasTag.GetKey(t);
          var o = i.ShouldAimAtLockOnTargetName;
          if (!FNameUtil_1.FNameUtil.IsNothing(o) && s) {
            o = s.TagId;
            if (!this.Xte.HasTagAddOrRemoveListener(o, this.Qaf)) {
              if (s = this.Xte.ListenForTagAddOrRemove(o, this.Qaf)) {
                this.$af.set(o, s);
                this.Waf.set(o, i.ShouldAimAtLockOnTargetName);
              }
            }
          }
        }
      }
    }
  }
  iz_() {
    if (this.FollowShooterConfig) {
      this.nz_();
      var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.PlayerId, {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle?.Entity?.GetComponent(215);
      if (e) {
        for (let t = 0; t < this.FollowShooterConfig.DisableWhenCurrentRoleHasTags.Num(); ++t) {
          var i = this.FollowShooterConfig.DisableWhenCurrentRoleHasTags.Get(t);
          var i = e.ListenForTagAddOrRemove(i.TagId, this.kUa);
          if (i) {
            this.tz_.push(i);
          }
        }
        for (const s of this.ez_.keys()) {
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
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      let t = e?.Id;
      e = e?.Entity?.CheckGetComponent(242);
      if (t = e && e.VehicleEntity?.Valid && e.VehicleEntity.GetComponent(264) ? e.VehicleEntity?.Id : t) {
        InputController_1.InputController.AddInputLayer(t, this.Bhh);
      }
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
FollowShooterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(234)], FollowShooterComponent);
exports.FollowShooterComponent = FollowShooterComponent; //# sourceMappingURL=FollowShooterComponent.js.map