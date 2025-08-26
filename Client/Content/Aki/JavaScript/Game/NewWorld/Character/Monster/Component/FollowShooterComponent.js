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
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const InputController_1 = require("../../../../Input/InputController");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LogReportController_1 = require("../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../Module/LogReport/LogReportDefine");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const DELAY_DISAPPEAR_MAX_TIME = 5000;
const lockOnTargetTag = 199201016;
let FollowShooterComponent = class FollowShooterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.tRr = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.IsEnable = false;
    this.j8 = 0;
    this.beh = false;
    this.IsAutonomousProxy = false;
    this.Bhh = undefined;
    this.Pia = false;
    this.u4l = new Set();
    this.wia = new Set();
    this.ZY_ = new Map();
    this.ez_ = new Map();
    this.Bia = new Set();
    this.tz_ = new Array();
    this.$Ia = false;
    this.YIa = false;
    this.FBa = 0;
    this.VBa = undefined;
    this.AimType = 0;
    this.z8c = Vector_1.Vector.Create();
    this.J8c = 0;
    this.Z8c = 0;
    this.ejc = 0;
    this.$s1 = new Array();
    this.LoadConfigPromise = undefined;
    this.xie = () => {
      this.iz_();
      this.rz_();
      this._rl();
      this.kUa();
    };
    this.kUa = () => {
      if (this.NUa()) {
        if (this.Pia) {
          this.SetEnable(true);
        }
      } else {
        this.SetEnable(false);
      }
    };
    this.oz_ = t => {
      if (this.Xte) {
        var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
          ParamType: 2,
          IsControl: true
        })?.EntityHandle?.Entity?.GetComponent(206);
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
    this.FollowShooterConfig = undefined;
    this.LockableCategories = undefined;
    this.LockOnTarget = undefined;
    this.jx_ = false;
  }
  OnInitData(t) {
    var e = this.Entity.GetComponent(0);
    this.j8 = e?.GetPlayerId() ?? 0;
    this.IsAutonomousProxy = this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (this.IsAutonomousProxy && (e = e?.GetPbEntityInitData())?.ComponentsData && (e = (0, IComponent_1.getComponent)(e.ComponentsData, "FollowShooterComponent"))) {
      this.LockableCategories = e.LockableCategories;
      this.Bhh = InputController_1.InputController.CreateInputLayer(3);
      this.LoadConfigPromise = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e.Config, UE.BP_FollowShooterConfig_C, t => {
        if (t?.IsValid) {
          this.FollowShooterConfig = t;
          this.Pia = t.AutoEnable;
          this.$Ia = t.NeedUploadData;
          this.FBa = t.DelayDisappearMillisecond;
          this.AimType = t.AimType;
          var e = t.BornTransform;
          this.z8c.FromUeVector(e.Offset);
          this.J8c = e.OffsetTargetType;
          this.Z8c = e.RotateType;
          this.ejc = e.RotateCameraDistance;
          var i = e.RotateInvalidAxis;
          for (let t = 0; t < i.Num(); t++) {
            var s = i.Get(t);
            this.$s1.push(s);
          }
          var o = t.NeedInputActions;
          for (let t = 0; t < o.Num(); t++) {
            var r = o.Get(t);
            var h = r.State;
            this.Bhh?.RegisterInputAction([r.Action, h]);
          }
          var n = t.AddTagsWhenEnable;
          for (let t = 0; t < n.Num(); t++) {
            var a = n.Get(t);
            this.wia.add(a.TagId);
          }
          var l = t.AddTagsToPlayerWhenPossess;
          for (let t = 0; t < l.Num(); t++) {
            var _ = l.Get(t);
            this.u4l.add(_.TagId);
          }
          var v = t.DisableWhenCurrentRoleHasTags;
          for (let t = 0; t < v.Num(); t++) {
            var f = v.Get(t);
            this.Bia.add(f.TagId);
          }
          var u = t.AddTagsWhenCurrentRoleHasAnyTags;
          for (let t = 0; t < u.Num(); t++) {
            var p = u.GetKey(t);
            var C = u.Get(p)?.GameplayTags;
            if (C) {
              var d = new Set();
              var m = p.TagId;
              this.ZY_.set(m, d);
              for (let e = 0; e < C.Num(); e++) {
                var c = C.Get(e).TagId;
                d.add(c);
                let t = this.ez_.get(c);
                if (!t) {
                  t = new Set();
                  this.ez_.set(c, t);
                }
                t.add(m);
              }
            }
          }
          this.LoadConfigPromise?.SetResult();
          this.LoadConfigPromise = undefined;
        }
      });
    }
    return true;
  }
  OnStart() {
    var t = this.Entity.GetComponent(0).GetCreatureDataId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(this.j8)?.GetComponent(225)?.OnFollowerAdd(t);
    if (this.IsAutonomousProxy) {
      this.tRr = this.Entity.GetComponent(40);
      this.Xte = this.Entity.GetComponent(206);
      this.n$t = this.Entity.GetComponent(1);
      this.Bhh?.Start(this);
    }
    return true;
  }
  OnEnd() {
    this.SetEnable(false);
    this.UnPossess();
    this.FBa = 0;
    this.VBa?.Remove();
    this.VBa = undefined;
    this.AimType = 0;
    this.u4l.clear();
    this.wia.clear();
    this.Bia.clear();
    this.Pia = false;
    this.j8 = 0;
    this.IsAutonomousProxy = false;
    this.beh = false;
    this.LoadConfigPromise?.SetResult();
    this.LoadConfigPromise = undefined;
    if (this.Bhh) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
    return true;
  }
  OnTick(t) {
    this.Pxl(t);
  }
  Possess() {
    if (this.IsAutonomousProxy && !this.beh) {
      this.beh = true;
      for (const t of this.u4l) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(this.j8, t);
      }
      this.tjc();
      this.ijc();
      this.iz_();
      this.rz_();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, this.kUa);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateTeamGroupType, this.kUa);
      if (this.Pia) {
        this.SetEnable(true);
      }
    }
  }
  tjc() {
    if (this.n$t) {
      let t = undefined;
      var e;
      if (this.J8c === 0) {
        t = this.n$t;
      } else if (this.J8c === 1) {
        t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
      }
      if (t?.Valid) {
        (e = Vector_1.Vector.Create()).FromUeVector(t.ActorTransform.TransformPositionNoScale(this.z8c.ToUeVector()));
        this.n$t.SetActorLocation(e.ToUeVector(), "UpdateBornPosition", false);
      }
    }
  }
  ijc() {
    if (this.Z8c !== 0 && this.n$t) {
      var t;
      var e = this.Entity.GetComponent(45);
      var i = e ? e.GravityUp : Vector_1.Vector.UpVectorProxy;
      var s = Rotator_1.Rotator.Create();
      if (this.Z8c === 1) {
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
        if (!o?.Valid) {
          return;
        }
        s.DeepCopy(o.ActorRotationProxy);
      } else if (this.Z8c === 2) {
        o = Vector_1.Vector.Create();
        r = Vector_1.Vector.Create();
        t = Vector_1.Vector.Create();
        o.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
        r.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorForwardVector());
        o.AdditionEqual(r.MultiplyEqual(this.ejc));
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
      for (const a of this.$s1) {
        if (a === 0) {
          h.Roll = n.Roll;
        } else if (a === 1) {
          h.Pitch = n.Pitch;
        } else if (a === 2) {
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
  UnPossess() {
    if (this.IsAutonomousProxy && this.beh) {
      this.beh = false;
      for (const t of this.u4l) {
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(this.j8, t);
      }
      this.SetEnable(false);
      this.nz_();
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, this.kUa);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateTeamGroupType, this.kUa);
    }
  }
  SetEnable(t) {
    if (this.IsAutonomousProxy && this.IsEnable !== t) {
      if (t) {
        if (this.NUa()) {
          this.VBa?.Remove();
          this.VBa = undefined;
          this.IsEnable = true;
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, true, "Follower Enable", true);
          this._rl();
          for (const e of this.wia) {
            this.Xte?.AddTag(e);
            ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(this.j8, e);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, true);
        }
      } else {
        if (this.Bhh) {
          InputController_1.InputController.RemoveInputLayer(this.Bhh);
        }
        for (const i of this.wia) {
          this.Xte?.RemoveTag(i);
          ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(this.j8, i);
        }
        this.JIa();
        this.IsEnable = false;
        this.YIa = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, false);
        if (this.jx_) {
          this.Xte?.RemoveTag(lockOnTargetTag);
          this.jx_ = false;
        }
        if (this.FBa > 0 && this.FBa <= DELAY_DISAPPEAR_MAX_TIME) {
          this.VBa ||= TimerSystem_1.TimerSystem.Delay(() => {
            this.VBa = undefined;
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, false, "Follower Disable", true);
          }, this.FBa);
        } else {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.Entity, false, "Follower Disable", true);
        }
      }
    }
  }
  NUa() {
    var t;
    return ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 1 && !!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(206)) && !t.HasAnyTag(this.Bia);
  }
  rz_() {
    if (this.Xte) {
      var t;
      var e;
      var i = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle?.Entity?.GetComponent(206);
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
  iz_() {
    this.nz_();
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.j8, {
      ParamType: 2,
      IsControl: true
    })?.EntityHandle?.Entity?.GetComponent(206);
    if (t) {
      for (const s of this.Bia) {
        var e = t.ListenForTagAddOrRemove(s, this.kUa);
        if (e) {
          this.tz_.push(e);
        }
      }
      for (const o of this.ez_.keys()) {
        var i = t.ListenForTagAddOrRemove(o, this.oz_);
        if (i) {
          this.tz_.push(i);
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
    var t;
    if (this.IsEnable && this.Bhh && (InputController_1.InputController.RemoveInputLayer(this.Bhh), (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid)) {
      InputController_1.InputController.AddInputLayer(t.Id, this.Bhh);
    }
  }
  ExecuteCommand(t) {
    if (t && t.CommandType === 1) {
      t = t.IntValue;
      this.tRr.BeginSkillAsync(t, {
        Reason: "Follower Begin Skill",
        Target: this.LockOnTarget?.Entity
      });
      this.YIa = true;
    }
  }
  JIa() {
    if (this.$Ia) {
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
    if (this.IsEnable) {
      if (this.LockOnTarget && !this.jx_) {
        this.Xte?.AddTag(lockOnTargetTag);
        this.jx_ = true;
      } else if (!this.LockOnTarget && this.jx_) {
        this.Xte?.RemoveTag(lockOnTargetTag);
        this.jx_ = false;
      }
    }
  }
};
FollowShooterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(223)], FollowShooterComponent);
exports.FollowShooterComponent = FollowShooterComponent; //# sourceMappingURL=FollowShooterComponent.js.map