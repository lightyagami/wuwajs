"use strict";

var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var r = arguments.length;
  var a = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        a = (r < 3 ? s(a) : r > 3 ? s(i, e, a) : s(i, e)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRailMoveComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const GameplayCueController_1 = require("../../../Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const MotorcycleRailComponent_1 = require("../../../Common/Component/MotorcycleRailComponent");
const MotorcycleAccelerateAlongRailMoveData_1 = require("./MotorcycleAccelerateAlongRailMoveData");
const MotorcycleJumpAlongRailMoveData_1 = require("./MotorcycleJumpAlongRailMoveData");
const MotorcycleJumpFromRailMoveData_1 = require("./MotorcycleJumpFromRailMoveData");
const MotorcycleJumpToRailMoveData_1 = require("./MotorcycleJumpToRailMoveData");
const MotorcycleRailMoveConfigs_1 = require("./MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDefine_1 = require("./MotorcycleRailMoveDefine");
const MotorcycleRailMoveUtils_1 = require("./MotorcycleRailMoveUtils");
const MotorcycleSimpleMoveToRailMoveData_1 = require("./MotorcycleSimpleMoveToRailMoveData");
const MotorcycleSwitchRailMoveData_1 = require("./MotorcycleSwitchRailMoveData");
const LOG_THRESHOLD_MOVE_TOO_FAR_DIST_SQUARED = 250000;
const LOG_THRESHOLD_DELTA_TIME_TOO_BIG = 1;
let MotorcycleRailMoveComponent = class MotorcycleRailMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.BRm = false;
    this.kRm = undefined;
    this.qRm = new Queue_1.Queue();
    this.EIe = undefined;
    this.Hte = undefined;
    this.ph_ = undefined;
    this.Lie = undefined;
    this.aeu = undefined;
    this.$zo = undefined;
    this.TXf = undefined;
    this.uyf = false;
    this.cyf = undefined;
    this.z$m = undefined;
    this.IWf = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.vqf = undefined;
    this.yqf = new Map();
    this.myf = ResourceSystem_1.ResourceSystem.InvalidId;
    this.WQf = t => {
      if (this.z$m && this.BRm) {
        t = this.TWf.BasicRailMoveConfig.ClientEventHandlers.get(t.TagId);
        if (t) {
          for (var [i, e] of t.ModifyCues) {
            if (e) {
              this.QQf(i);
            } else {
              this.KQf(i);
            }
          }
        }
      }
    };
    this.XQf = new Map();
    this.GetRailMoveConfigUeData = t => {
      let i = this.yqf.get(t);
      if (!i) {
        if (!this.vqf) {
          this.p$f(false);
        }
        if (!(i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.vqf, t))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 查询摩托滑轨配置失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["RowName", t]);
          }
          return;
        }
        this.yqf.set(t, i);
      }
      return i;
    };
    this.fyf = t => {
      if (this.vqf && this.Hte?.IsAutonomousProxy) {
        switch (t) {
          case this.TWf.JumpAlongRailConfig.SkillId:
            this.gyf();
            break;
          case this.TWf.SwitchRailConfig.SkillId:
            this.Cyf();
            break;
          case this.TWf.JumpOffRailConfig.SkillId:
            this.pyf();
            break;
          case this.TWf.JumpToRailConfig.SkillId:
            this.vyf();
            break;
          default:
            if (this.kRm && this.qRm.Size) {
              if (!this.TWf.BasicRailMoveConfig.AllowUseSkillIds.has(t)) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 尝试使用滑轨中不允许的技能，自动退出摩托滑轨", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["SkillId", t]);
                }
                this.SetClearAllRailMoveAndTickImmediately();
              }
            }
        }
      }
    };
    this.OnVehicleBeenEntered = t => {};
    this.OnVehicleBeenLeaved = t => {
      if (t.IsDriver) {
        this.SetClearAllRailMoveAndTickImmediately();
      }
    };
    this.k8f = undefined;
    this.v$f = undefined;
    this.yyf = (t, i, e) => {
      var o;
      if (this.Hte && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) && Log_1.Log.CheckDebug() && Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleRailMoveComponent] VehicleRailMoveUpdater", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["Dist", this.k8f?.GetLocation() && t ? Vector_1.Vector.Dist(this.k8f.GetLocation(), t) : undefined]), (t || i) && (o = this.k8f?.GetLocation(), this.k8f ||= Transform_1.Transform.Create(this.Hte.ActorQuatProxy, this.Hte.ActorLocationProxy, Vector_1.Vector.OneVectorProxy), t && o && Vector_1.Vector.DistSquared(o, t) > LOG_THRESHOLD_MOVE_TOO_FAR_DIST_SQUARED && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) ? Log_1.Log.CheckError() && Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] VehicleRailMove too far!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldLoc", o], ["NewLoc", t], ["Dist", Vector_1.Vector.Dist(o, t)]) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] VehicleRailMove too far!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldLoc", o], ["NewLoc", t], ["Dist", Vector_1.Vector.Dist(o, t)])), t && this.k8f.SetLocation(t), i) && this.k8f.SetRotation(i.Quaternion()), e)) {
        this.v$f ||= Vector_1.Vector.Create();
        this.v$f.DeepCopy(e);
      }
    };
    this.Syf = (t, i, e) => {
      return !!this.Hte && (t && t.DeepCopy(this.k8f?.GetLocation() ?? this.Hte.ActorLocationProxy), i && i.DeepCopy(this.k8f?.GetRotation().Rotator() ?? this.Hte.ActorRotationProxy), !e || !!this.kRm?.GetVelocity(e) || !((t = this.Hte?.Actor?.VehicleMovementComponent)?.IsValid() ? (e.FromUeVector(t.Velocity), 0) : !(i = this.Hte.Owner?.D_GetVelocity()) || (e.FromUeVector(i), 0)));
    };
  }
  GetIsInRailMoveMode() {
    return this.BRm;
  }
  get TWf() {
    return this.z$m?.GetRailMoveConfig() ?? this.IWf;
  }
  bWf(t) {
    if (t !== this.z$m && (Log_1.Log.CheckInfo() && Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 更新当前轨道", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldRailSplineId", this.z$m?.GetRailSplineId()], ["NewRailSplineId", t?.GetRailSplineId()]), this.z$m && this.RWf(), this.z$m = t, this.z$m)) {
      this.LWf();
    }
  }
  LWf() {
    if (this.z$m) {
      for (var [t, i] of this.TWf.BasicRailMoveConfig.ModifyVehicleTagsOnEnterRail) {
        this.tPm(t, i);
      }
      for (var [e, o] of this.TWf.BasicRailMoveConfig.ModifyVehicleBuffsOnEnterRail) {
        this.DJf(e, o, "摩托入轨修改Buff");
      }
      for (var [s, r] of this.TWf.BasicRailMoveConfig.ModifyDriverPlayerTagsOnEnterRail) {
        this.VRm(s, r);
      }
      for (var [a, h] of this.TWf.BasicRailMoveConfig.ModifyDriverBuffsOnEnterRail) {
        this.UJf(a, h, "摩托入轨修改Buff");
      }
      var l = this.z$m.GetRailCreatureDataId();
      if (l) {
        this.wWf(l);
      }
    }
  }
  RWf() {
    if (this.z$m) {
      for (var [t, i] of this.TWf.BasicRailMoveConfig.ModifyVehicleTagsOnLeaveRail) {
        this.tPm(t, i);
      }
      for (var [e, o] of this.TWf.BasicRailMoveConfig.ModifyVehicleBuffsOnLeaveRail) {
        this.DJf(e, o, "摩托离轨修改Buff");
      }
      for (var [s, r] of this.TWf.BasicRailMoveConfig.ModifyDriverPlayerTagsOnLeaveRail) {
        this.VRm(s, r);
      }
      for (var [a, h] of this.TWf.BasicRailMoveConfig.ModifyDriverBuffsOnLeaveRail) {
        this.UJf(a, h, "摩托离轨修改Buff");
      }
      var l = this.z$m.GetRailCreatureDataId();
      if (l) {
        this.PWf(l);
      }
      this.Mqf(this.TWf.BasicRailMoveConfig.AutoEnterRailCdAfterLeaveRail * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  PWf(i) {
    var t = Protocol_1.Aki.Protocol.sOm.create();
    t.F4n = i;
    t.lOm = Protocol_1.Aki.Protocol._Om.Proto_MotorSliderInteractType_NormalExit;
    Net_1.Net.Call(25867, t, t => {
      if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 请求退出旧轨道失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldRailCreatureDataId", i], ["ErrorCode", t?.Q4n]);
        }
      }
    });
  }
  wWf(i) {
    var t = Protocol_1.Aki.Protocol.sOm.create();
    t.F4n = i;
    t.lOm = Protocol_1.Aki.Protocol._Om.Proto_MotorSliderInteractType_Enter;
    Net_1.Net.Call(25867, t, t => {
      if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 请求进入新轨道失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["NewRailCreatureDataId", i], ["ErrorCode", t?.Q4n]);
        }
        if (this.z$m?.GetRailCreatureDataId() === i) {
          this.SetFinishCurrentRailMove();
        }
      }
    });
  }
  QQf(i) {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(this.Entity.Id);
    if (e) {
      e = this.aeu?.AddCue(i, {
        Instigator: e
      });
      if (e !== undefined && e !== GameplayCueController_1.INSTANT_CUE_HANDLE) {
        let t = this.XQf.get(i);
        if (!t) {
          t = new Set();
          this.XQf.set(i, t);
        }
        t.add(e);
      }
    }
  }
  KQf(t) {
    var i = this.XQf.get(t);
    if (i) {
      for (const e of i) {
        this.aeu?.RemoveCueByHandle(e);
      }
      this.XQf.delete(t);
    }
  }
  YQf() {
    for (const t of this.XQf.values()) {
      for (const i of t) {
        this.aeu?.RemoveCueByHandle(i);
      }
    }
    this.XQf.clear();
  }
  UpdateDefaultRailMoveConfig() {
    MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.UpdateRailMoveConfig(MotorcycleRailMoveDefine_1.DEFAULT_MOTOR_RAIL_MOVE_CONFIG_NAME, this.IWf, this.GetRailMoveConfigUeData);
  }
  p$f(t = true) {
    if (this.myf !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.myf);
      this.myf = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (!this.vqf) {
      const e = MotorcycleRailMoveDefine_1.DT_MOTOR_RAIL_MOVE_CONFIG_PATH;
      if (t) {
        let i = false;
        t = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, t => {
          i = true;
          if (t) {
            this.vqf = t;
            if (this.myf !== ResourceSystem_1.ResourceSystem.InvalidId) {
              ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.myf);
              this.myf = ResourceSystem_1.ResourceSystem.InvalidId;
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 加载轨道移动配置DT表失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["DtPath", e]);
          }
        });
        if (!i && t !== ResourceSystem_1.ResourceSystem.InvalidId) {
          this.myf = t;
        }
      } else {
        t = ResourceSystem_1.ResourceSystem.Load(e, UE.DataTable);
        if (t) {
          this.vqf = t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 加载轨道移动配置DT表失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["DtPath", e]);
        }
      }
    }
  }
  OnInitData(t) {
    this.p$f(true);
    return true;
  }
  OnInit(t) {
    this.Hte = this.Entity.GetComponent(247);
    this.EIe = this.Entity.GetComponent(0);
    return true;
  }
  OnActivate() {
    this.UpdateDefaultRailMoveConfig();
    this.ph_ = this.Entity.GetComponent(250);
    this.Lie = this.Entity.GetComponent(254);
    this.aeu = this.Entity.GetComponent(238);
    this.$zo = this.Entity.GetComponent(257);
    this.TXf = this.Entity.GetComponent(30);
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fyf)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fyf);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnVehicleBeenEntered)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnVehicleBeenEntered);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved);
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.Eyf();
    return true;
  }
  gyf() {
    if (this.BRm) {
      this.gxf();
    }
  }
  Cyf() {
    var t;
    if (this.BRm && (t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight)) !== undefined && t !== 0) {
      if (t < 0) {
        this.i2m(0);
      } else {
        this.i2m(2);
      }
    }
  }
  pyf() {
    var t;
    if (this.BRm && (t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight)) !== undefined && t !== 0) {
      if (t < 0) {
        this.Iyf(0);
      } else {
        this.Iyf(2);
      }
    }
  }
  vyf() {
    if (!this.BRm) {
      this.o2m();
    }
  }
  OnTick(t) {
    if (this.vqf) {
      this.GRm(t * CommonDefine_1.SECOND_PER_MILLIONSECOND);
      this.FRm();
      this.Tyf();
      this.IGf();
    }
  }
  GRm(t) {
    var i = this.kRm;
    if (this.kRm?.IsFinishMove) {
      if (this.kRm.IsFinishMoveOnFailure) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MotorRailMove", 39, "VehicleRailMoveData因失败而结束，清除后续滑轨移动", ["Type", this.kRm.Type]);
        }
        this.qRm.Clear();
      }
      this.kRm.Exit();
      this.kRm = undefined;
    }
    if (this.kRm === undefined && this.qRm.Size) {
      this.kRm = this.qRm.Pop();
      if (!this.kRm.Enter(i)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 尝试进入目标MoveData失败，自动退出，并清除后续滑轨移动", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["RailMoveDataType", this.kRm?.Type]);
        }
        this.qRm.Clear();
        this.kRm.Exit();
        this.kRm = undefined;
      }
    }
    if (!i && this.kRm) {
      this.bWf(this.kRm.RelatedRail);
      this.NRm();
    } else if (i && !this.kRm) {
      this.jRm();
      this.bWf(undefined);
    } else {
      this.bWf(this.kRm?.RelatedRail);
    }
    if (this.BRm && this.kRm) {
      if (t > LOG_THRESHOLD_DELTA_TIME_TOO_BIG) {
        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] Delta time too big!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["deltaSeconds", t]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] Delta time too big!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["deltaSeconds", t]);
        }
      }
      this.kRm.Tick(t);
      this.y$f(t);
    }
  }
  y$f(t) {
    if (this.Hte?.VehicleMoveComp) {
      var i;
      var e = this.Hte.VehicleMoveComp;
      if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveComponent] ApplyRailMove", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["DeltaSec", t], ["Dist", this.k8f?.GetLocation() && this.Hte.ActorLocationProxy ? Vector_1.Vector.Dist(this.k8f.GetLocation(), this.Hte.ActorLocationProxy) : undefined]);
      }
      var o = e.VehicleMovement;
      if (this.v$f) {
        e.SetForceSpeed(this.v$f);
        if ((e = o?.WheelDisplayInfosObj) && e.DisplayInfos.Num() >= 2) {
          i = this.v$f.Size();
          e.DisplayInfos.Get(0).WheelSpeed = i;
          e.DisplayInfos.Get(1).WheelSpeed = i;
          e.DisplayInfos.Get(0).WheelAccel = 0;
          e.DisplayInfos.Get(1).WheelAccel = 0;
        }
        this.Hte.ResetCachedVelocityTime();
      }
      if (this.k8f && o) {
        o.UpdateMotorRailMoveTransform(t, this.k8f.ToUeTransform(), true, false);
        this.TXf?.MarkDebugRecord("MotorcycleRailMoveComponent应用移动后");
        if (this.ph_) {
          for (const s of this.ph_.PassengerInfoMap.values()) {
            s.PassengerEntity?.GetComponent(30)?.MarkDebugRecord("MotorcycleRailMoveComponent应用移动后");
          }
        }
        this.Hte.ResetLocationCachedTime();
        this.Hte.ResetRotationCachedTime();
      }
    }
  }
  NRm() {
    if (!this.BRm && !(this.BRm = true, this.Hte?.VehicleMoveComp && (this.Hte.VehicleMoveComp.IsSpecialMove = true, this.Hte.VehicleMoveComp.DisableUeMovementTick("进入滑轨移动"), this.Hte.VehicleMoveComp.VehicleMovement?.ResetMotorRailMoveData()), this.tPm(248120534, true), this.VRm(342806233, true), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.WQf))) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CheckClientEvent, this.WQf);
    }
  }
  jRm() {
    if (this.BRm) {
      this.BRm = false;
      this.k8f = undefined;
      this.v$f = undefined;
      if (this.Hte?.VehicleMoveComp) {
        this.Hte.VehicleMoveComp.IsSpecialMove = false;
        this.Hte.VehicleMoveComp.EnableUeMovementTick("退出滑轨移动");
        this.Hte.VehicleMoveComp.VehicleMovement?.ResetMotorRailMoveData();
      }
      this.tPm(248120534, false);
      this.VRm(342806233, false);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.WQf)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CheckClientEvent, this.WQf);
      }
      this.YQf();
      this.Mqf(this.TWf.BasicRailMoveConfig.AutoEnterRailCdAfterLeaveRailMove * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  FRm() {
    if (this.ph_?.Driver && this.ph_.Driver.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() && this.Hte) {
      this.HRm();
      this.$Rm();
    }
  }
  HRm() {
    let t = false;
    var i = this.wyf();
    if (i) {
      this.Ryf(i);
    } else if (this.Lyf()) {
      t = true;
    }
    this.tPm(1506180277, t);
  }
  wyf() {
    if (!this.uyf && this.Hte && !this.BRm && this.qRm.Empty && !this.kRm && !this.IsInNotAllowedSkill()) {
      let t = Number.MAX_VALUE;
      let i = undefined;
      for (const o of MotorcycleRailComponent_1.MotorcycleRailComponent.AllRailsThatPlayerInRange) {
        var e;
        if (o.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && !((e = o.GetDistanceToRail(this.Syf)) < 0) && !(e >= t)) {
          if (!o.GetRailMoveConfig()) {
            o.InitRailMoveConfig(this.GetRailMoveConfigUeData);
          }
          if (o.CheckIsRailCanDirectlyEnter(this.Syf)) {
            t = e;
            i = o;
          }
        }
      }
      return i || undefined;
    }
  }
  Lyf() {
    if (this.Hte && !this.BRm && this.qRm.Empty && !this.kRm && !this.IsInNotAllowedSkill()) {
      let t = Number.MAX_VALUE;
      let i = undefined;
      for (const o of MotorcycleRailComponent_1.MotorcycleRailComponent.AllRailsThatPlayerInRange) {
        var e;
        if (o.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && !((e = o.GetDistanceToRail(this.Syf)) < 0) && !(e >= t)) {
          if (!o.GetRailMoveConfig()) {
            o.InitRailMoveConfig(this.GetRailMoveConfigUeData);
          }
          if (o.CheckIsRailCanJumpEnter(this.Syf)) {
            t = e;
            i = o;
          }
        }
      }
      return i || undefined;
    }
  }
  $Rm() {
    var t = !!this.XRm(0);
    var i = !!this.XRm(2);
    this.VRm(1284083505, t);
    this.VRm(578211242, i);
    this.tPm(1126125546, t || i);
  }
  XRm(i) {
    if (this.Hte && this.BRm && this.qRm.Empty && this.kRm && this.kRm instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData) {
      var e = this.kRm.GetCurrentSegmentPointOption();
      if (e) {
        var o = this.kRm.GetIsMoveAlongSplineForward();
        let t = undefined;
        if (t = i === 0 ? o ? e.LeftTargetId : e.RightTargetId : o ? e.RightTargetId : e.LeftTargetId) {
          o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t)?.Entity?.GetComponent(337);
          if (o && o.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide) {
            if (!o.GetRailMoveConfig()) {
              o.InitRailMoveConfig(this.GetRailMoveConfigUeData);
            }
            o.CheckIsRailCanSwitch(this.Syf);
            if (o.GetRelativeSideOfTarget(this.Syf) === i) {
              return o;
            }
          }
        }
      }
    }
  }
  IGf() {
    if (this.kRm && this.IsInNotAllowedSkill()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 检测到使用滑轨中不允许的技能，自动退出摩托滑轨", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
      }
      this.SetClearAllRailMove();
    }
  }
  Tyf() {
    let t = false;
    var i;
    if (this.BRm) {
      i = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight);
      t = i !== undefined && i !== 0;
    }
    this.tPm(1114941504, t);
    if (t && this.Pyf(1126125546)) {
      this.Entity.GetComponent(42)?.BeginSkillAsync(this.TWf.SwitchRailConfig.SkillId, {
        Reason: "[MotorcycleRailMoveComponent] 释放切轨技能"
      }).finally(undefined);
    }
  }
  VRm(t, i) {
    var e;
    var o;
    if (this.ph_?.Driver && this.ph_.Driver.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() && (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(e))) {
      o = ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(e, t, true);
      if (i && !o) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(e, t);
      } else if (!i && o) {
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(e, t);
      }
    }
  }
  tPm(t, i) {
    var e;
    var o = this.Lie;
    if (o) {
      e = o.HasTag(t);
      if (i && !e) {
        o.AddTag(t);
      } else if (!i && e) {
        o.RemoveTag(t);
      }
    }
  }
  Pyf(t) {
    var i = this.Lie;
    return !!i && i.HasTag(t);
  }
  DJf(t, i, e) {
    if (this.EIe && this.$zo) {
      if (i) {
        this.$zo?.AddBuff(t, {
          InstigatorId: this.EIe.GetCreatureDataId(),
          Reason: e,
          PreMessageId: this.EIe.MotorContextId
        });
      } else {
        this.$zo?.RemoveBuff(t, -1, e, this.EIe.MotorContextId);
      }
    }
  }
  UJf(t, i, e) {
    var o;
    if (this.EIe && this.ph_?.Driver && this.ph_.Driver.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() && (o = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(200))) {
      if (i) {
        o.AddBuff(t, {
          InstigatorId: this.EIe.GetCreatureDataId(),
          Reason: e,
          PreMessageId: this.EIe.MotorContextId
        });
      } else {
        o.RemoveBuff(t, -1, e, this.EIe.MotorContextId);
      }
    }
  }
  SetClearAllRailMove() {
    if (this.kRm) {
      this.kRm.IsFinishMove = true;
    }
    this.qRm.Clear();
  }
  SetClearAllRailMoveAndTickImmediately() {
    if (this.kRm) {
      this.kRm.IsFinishMove = true;
    }
    this.qRm.Clear();
    this.OnTick(0);
  }
  SetFinishCurrentRailMove() {
    if (this.kRm) {
      this.kRm.IsFinishMove = true;
    }
  }
  TryJumpToSpecifiedRail(t) {
    if (t?.Entity.IsInit) {
      if (this.BRm) {
        this.SetClearAllRailMove();
      }
      this.YRm(t);
    }
  }
  TryDirectlyEnterSpecifiedRail(t) {
    if (t?.Entity.IsInit) {
      if (this.BRm) {
        this.SetClearAllRailMove();
      }
      this.Ryf(t);
    }
  }
  YRm(t) {
    var i = t.GetRailSplineComp();
    var e = t.GetRailSplineCurve();
    var o = t.GetRailSplineData();
    if (!t.GetRailMoveConfig()) {
      t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
    }
    var s = t.GetRailMoveConfig();
    if (i && o && s && e) {
      (i = new MotorcycleJumpToRailMoveData_1.MotorcycleJumpToRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.TargetSpline = e;
      i.GravityDir.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.Spline = e;
      i.SplinePointOptions.push(...o.Points);
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddJumpToTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  Ryf(t) {
    var i = t.GetRailSplineComp();
    var e = t.GetRailSplineCurve();
    var o = t.GetRailSplineData();
    if (!t.GetRailMoveConfig()) {
      t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
    }
    var s = t.GetRailMoveConfig();
    if (i && o && s && e) {
      (i = new MotorcycleSimpleMoveToRailMoveData_1.MotorcycleSimpleMoveToRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.TargetSpline = e;
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.Spline = e;
      i.SplinePointOptions.push(...o.Points);
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddDirectlyEnterTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  Ayf(t) {
    var i = t.GetRailSplineComp();
    var e = t.GetRailSplineCurve();
    var o = t.GetRailSplineData();
    if (!t.GetRailMoveConfig()) {
      t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
    }
    var s = t.GetRailMoveConfig();
    if (i && o && s && e) {
      (i = new MotorcycleSwitchRailMoveData_1.MotorcycleSwitchRailMoveData(this.Entity, this.z$m)).MoveConfig.DeepCopy(s);
      i.TargetSpline = e;
      i.GravityDir.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.Spline = e;
      i.SplinePointOptions.push(...o.Points);
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddSwitchTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  Dyf(t, i) {
    var e = t.GetRailSplineComp();
    var o = t.GetRailSplineCurve();
    var s = t.GetRailSplineData();
    if (!t.GetRailMoveConfig()) {
      t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
    }
    var r = t.GetRailMoveConfig();
    if (e && s && r && o) {
      (e = new MotorcycleJumpFromRailMoveData_1.MotorcycleJumpFromRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(r);
      e.Spline = o;
      e.SplinePointOptions.push(...s.Points);
      e.JumpSideDir = i;
      e.GravityDir.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
      e.MoveUpdater = this.yyf;
      e.MoveGetter = this.Syf;
      this.qRm.Push(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddDirectlyEnterTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  Cxf(t, i) {
    var e = t.GetRailSplineComp();
    var o = t.GetRailSplineCurve();
    var s = t.GetRailSplineData();
    if (!t.GetRailMoveConfig()) {
      t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
    }
    var r = t.GetRailMoveConfig();
    if (e && s && r && o) {
      (e = new MotorcycleJumpAlongRailMoveData_1.MotorcycleJumpAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(r);
      e.TargetSpline = o;
      e.TargetIsForward = i;
      e.GravityDir.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
      e.MoveUpdater = this.yyf;
      e.MoveGetter = this.Syf;
      this.qRm.Push(e);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(r);
      i.Spline = o;
      i.SplinePointOptions.push(...s.Points);
      i.MoveUpdater = this.yyf;
      i.MoveGetter = this.Syf;
      this.qRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddDirectlyEnterTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  i2m(t) {
    t = this.XRm(t);
    return !!t && (this.SetClearAllRailMove(), this.Ayf(t), true);
  }
  o2m() {
    var t = this.Lyf();
    return !!t && (this.YRm(t), true);
  }
  Iyf(t) {
    var i;
    return !!this.BRm && !!this.kRm && !this.kRm.IsFinishMove && !!this.qRm.Empty && this.kRm instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData && !!(i = this.kRm.RelatedRail) && i.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && !(this.SetClearAllRailMove(), this.Dyf(i, t), 0);
  }
  gxf() {
    var t;
    var i;
    return !!this.BRm && !!this.kRm && !this.kRm.IsFinishMove && !!(this.kRm instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData) && (t = this.kRm.GetIsMoveAlongSplineForward(), (i = this.kRm.RelatedRail) && !i.GetRailMoveConfig() && i.InitRailMoveConfig(this.GetRailMoveConfigUeData), !!i?.CheckIsRailCanJumpAlongAtDirection(this.Syf, this.kRm)) && (this.SetClearAllRailMove(), this.Cxf(i, t), true);
  }
  Mqf(t) {
    this.Eyf();
    if (t < TimerSystem_1.MIN_TIME || t > TimerSystem_1.MAX_TIME) {
      this.uyf = false;
    } else {
      this.cyf = TimerSystem_1.TimerSystem.Delay(() => {
        this.uyf = false;
        this.Eyf();
      }, t);
      if (this.cyf?.Valid()) {
        this.uyf = true;
      }
    }
  }
  Eyf() {
    if (this.cyf?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.cyf);
    }
    this.cyf = undefined;
  }
  IsInNotAllowedSkill() {
    var t = this.Entity.GetComponent(42);
    return !!t?.CurrentSkill && (t = t.CurrentSkill.SkillId, !this.TWf.BasicRailMoveConfig.AllowUseSkillIds.has(t)) && this.TWf.JumpAlongRailConfig.SkillId !== t && this.TWf.SwitchRailConfig.SkillId !== t && this.TWf.JumpOffRailConfig.SkillId !== t && this.TWf.JumpToRailConfig.SkillId !== t;
  }
  GmForceReloadRailMoveConfig() {
    this.UpdateDefaultRailMoveConfig();
    for (const t of MotorcycleRailComponent_1.MotorcycleRailComponent.AllRailsThatPlayerInRange) {
      if (t.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && t.GetRailMoveConfig()) {
        t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
      }
    }
  }
};
MotorcycleRailMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(336)], MotorcycleRailMoveComponent);
exports.MotorcycleRailMoveComponent = MotorcycleRailMoveComponent; //# sourceMappingURL=MotorcycleRailMoveComponent.js.map