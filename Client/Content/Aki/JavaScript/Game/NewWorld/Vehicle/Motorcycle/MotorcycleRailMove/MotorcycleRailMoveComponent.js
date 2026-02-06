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
const MORTOR_MAX_SPEED = 3500;
let MotorcycleRailMoveComponent = class MotorcycleRailMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.WRm = false;
    this.QRm = undefined;
    this.KRm = new Queue_1.Queue();
    this.EIe = undefined;
    this.Hte = undefined;
    this.ph_ = undefined;
    this.Lie = undefined;
    this.aeu = undefined;
    this.$zo = undefined;
    this.B_g = undefined;
    this.EEf = false;
    this.IEf = undefined;
    this.$Qm = undefined;
    this.Cng = new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    this.RVf = undefined;
    this.LVf = new Map();
    this.bEf = ResourceSystem_1.ResourceSystem.InvalidId;
    this.vag = t => {
      if (this.$Qm && this.WRm) {
        t = this.png.BasicRailMoveConfig.ClientEventHandlers.get(t.TagId);
        if (t) {
          for (var [i, e] of t.ModifyCues) {
            if (e) {
              this.yag(i);
            } else {
              this.Sag(i);
            }
          }
        }
      }
    };
    this.Mag = new Map();
    this.GetRailMoveConfigUeData = t => {
      let i = this.LVf.get(t);
      if (!i) {
        if (!this.RVf) {
          this.qrg(false);
        }
        if (!(i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.RVf, t))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 查询摩托滑轨配置失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["RowName", t]);
          }
          return;
        }
        this.LVf.set(t, i);
      }
      return i;
    };
    this.wEf = t => {
      if (this.RVf && this.Hte?.IsAutonomousProxy) {
        switch (t) {
          case this.png.JumpAlongRailConfig.SkillId:
            this.REf();
            break;
          case this.png.SwitchRailConfig.SkillId:
            this.LEf();
            break;
          case this.png.JumpOffRailConfig.SkillId:
            this.PEf();
            break;
          case this.png.JumpToRailConfig.SkillId:
            this.AEf();
            break;
          default:
            if (this.QRm && this.KRm.Size) {
              if (!this.png.BasicRailMoveConfig.AllowUseSkillIds.has(t)) {
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
    this.WYf = undefined;
    this.hBg = false;
    this.Org = undefined;
    this.DEf = (t, i, e, o = false) => {
      var s;
      if (this.Hte && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) && Log_1.Log.CheckDebug() && Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleRailMoveComponent] VehicleRailMoveUpdater", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["Dist", this.WYf?.GetLocation() && t ? Vector_1.Vector.Dist(this.WYf.GetLocation(), t) : undefined]), (t || i) && (s = this.WYf?.GetLocation(), this.WYf ||= Transform_1.Transform.Create(this.Hte.ActorQuatProxy, this.Hte.ActorLocationProxy, Vector_1.Vector.OneVectorProxy), t && s && Vector_1.Vector.DistSquared(s, t) > LOG_THRESHOLD_MOVE_TOO_FAR_DIST_SQUARED && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) ? Log_1.Log.CheckError() && Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] VehicleRailMove too far!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldLoc", s], ["NewLoc", t], ["Dist", Vector_1.Vector.Dist(s, t)]) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] VehicleRailMove too far!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldLoc", s], ["NewLoc", t], ["Dist", Vector_1.Vector.Dist(s, t)])), t && this.WYf.SetLocation(t), i) && this.WYf.SetRotation(i.Quaternion()), this.hBg = o, e)) {
        this.Org ||= Vector_1.Vector.Create();
        e.GetClampedToSize(0, MORTOR_MAX_SPEED, this.Org);
        if (!this.Org.Equals(e)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 设置速度过大，限制在区间内", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OriginVelocitySize", e.Size()], ["OriginVelocity", e]);
          }
        }
      }
    };
    this.UEf = (t, i, e) => {
      return !!this.Hte && (t && t.DeepCopy(this.WYf?.GetLocation() ?? this.Hte.ActorLocationProxy), i && i.DeepCopy(this.WYf?.GetRotation().Rotator() ?? this.Hte.ActorRotationProxy), !e || !!this.QRm?.GetVelocity(e) || !((t = this.Hte?.Actor?.VehicleMovementComponent)?.IsValid() ? (e.FromUeVector(t.Velocity), 0) : !(i = this.Hte.Owner?.D_GetVelocity()) || (e.FromUeVector(i), 0)));
    };
  }
  GetIsInRailMoveMode() {
    return this.WRm;
  }
  get png() {
    return this.$Qm?.GetRailMoveConfig() ?? this.Cng;
  }
  vng(t) {
    if (t !== this.$Qm && (Log_1.Log.CheckInfo() && Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 更新当前轨道", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldRailSplineId", this.$Qm?.GetRailSplineId()], ["NewRailSplineId", t?.GetRailSplineId()]), this.$Qm && this.yng(), this.$Qm = t, this.$Qm)) {
      this.Sng();
    }
  }
  Sng() {
    if (this.$Qm) {
      for (var [t, i] of this.png.BasicRailMoveConfig.ModifyVehicleTagsOnEnterRail) {
        this.TPm(t, i);
      }
      for (var [e, o] of this.png.BasicRailMoveConfig.ModifyVehicleBuffsOnEnterRail) {
        this.NCg(e, o, "摩托入轨修改Buff");
      }
      for (var [s, r] of this.png.BasicRailMoveConfig.ModifyDriverPlayerTagsOnEnterRail) {
        this.ZRm(s, r);
      }
      for (var [a, h] of this.png.BasicRailMoveConfig.ModifyDriverBuffsOnEnterRail) {
        this.VCg(a, h, "摩托入轨修改Buff");
      }
      var l = this.$Qm.GetRailCreatureDataId();
      if (l) {
        this.Mng(l);
      }
    }
  }
  yng() {
    if (this.$Qm) {
      for (var [t, i] of this.png.BasicRailMoveConfig.ModifyVehicleTagsOnLeaveRail) {
        this.TPm(t, i);
      }
      for (var [e, o] of this.png.BasicRailMoveConfig.ModifyVehicleBuffsOnLeaveRail) {
        this.NCg(e, o, "摩托离轨修改Buff");
      }
      for (var [s, r] of this.png.BasicRailMoveConfig.ModifyDriverPlayerTagsOnLeaveRail) {
        this.ZRm(s, r);
      }
      for (var [a, h] of this.png.BasicRailMoveConfig.ModifyDriverBuffsOnLeaveRail) {
        this.VCg(a, h, "摩托离轨修改Buff");
      }
      var l = this.$Qm.GetRailCreatureDataId();
      if (l) {
        this.Eng(l);
      }
      this.PVf(this.png.BasicRailMoveConfig.AutoEnterRailCdAfterLeaveRail * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  Eng(i) {
    var t = Protocol_1.Aki.Protocol.MNm.create();
    t.F4n = i;
    t.TNm = Protocol_1.Aki.Protocol.bNm.Proto_MotorSliderInteractType_NormalExit;
    Net_1.Net.Call(21584, t, t => {
      if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 请求退出旧轨道失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["OldRailCreatureDataId", i], ["ErrorCode", t?.Q4n]);
        }
      }
    });
  }
  Mng(i) {
    var t = Protocol_1.Aki.Protocol.MNm.create();
    t.F4n = i;
    t.TNm = Protocol_1.Aki.Protocol.bNm.Proto_MotorSliderInteractType_Enter;
    Net_1.Net.Call(21584, t, t => {
      if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 请求进入新轨道失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["NewRailCreatureDataId", i], ["ErrorCode", t?.Q4n]);
        }
        if (this.$Qm?.GetRailCreatureDataId() === i) {
          this.SetFinishCurrentRailMove();
        }
      }
    });
  }
  yag(i) {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(this.Entity.Id);
    if (e) {
      e = this.aeu?.AddCue(i, {
        Instigator: e
      });
      if (e !== undefined && e !== GameplayCueController_1.INSTANT_CUE_HANDLE) {
        let t = this.Mag.get(i);
        if (!t) {
          t = new Set();
          this.Mag.set(i, t);
        }
        t.add(e);
      }
    }
  }
  Sag(t) {
    var i = this.Mag.get(t);
    if (i) {
      for (const e of i) {
        this.aeu?.RemoveCueByHandle(e);
      }
      this.Mag.delete(t);
    }
  }
  Eag() {
    for (const t of this.Mag.values()) {
      for (const i of t) {
        this.aeu?.RemoveCueByHandle(i);
      }
    }
    this.Mag.clear();
  }
  UpdateDefaultRailMoveConfig() {
    MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.UpdateRailMoveConfig(MotorcycleRailMoveDefine_1.DEFAULT_MOTOR_RAIL_MOVE_CONFIG_NAME, this.Cng, this.GetRailMoveConfigUeData);
  }
  qrg(t = true) {
    if (this.bEf !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.bEf);
      this.bEf = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (!this.RVf) {
      const e = MotorcycleRailMoveDefine_1.DT_MOTOR_RAIL_MOVE_CONFIG_PATH;
      if (t) {
        let i = false;
        t = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, t => {
          i = true;
          if (t) {
            this.RVf = t;
            if (this.bEf !== ResourceSystem_1.ResourceSystem.InvalidId) {
              ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.bEf);
              this.bEf = ResourceSystem_1.ResourceSystem.InvalidId;
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 加载轨道移动配置DT表失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["DtPath", e]);
          }
        });
        if (!i && t !== ResourceSystem_1.ResourceSystem.InvalidId) {
          this.bEf = t;
        }
      } else {
        t = ResourceSystem_1.ResourceSystem.Load(e, UE.DataTable);
        if (t) {
          this.RVf = t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 加载轨道移动配置DT表失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["DtPath", e]);
        }
      }
    }
  }
  OnInitData(t) {
    this.qrg(true);
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
    this.B_g = this.Entity.GetComponent(31);
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.wEf)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.wEf);
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
    this.BEf();
    return true;
  }
  REf() {
    if (this.WRm) {
      this.oFf();
    }
  }
  LEf() {
    var t;
    if (this.WRm && (t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight)) !== undefined && t !== 0) {
      if (t < 0) {
        this.nkm(0);
      } else {
        this.nkm(2);
      }
    }
  }
  PEf() {
    var t;
    if (this.WRm && (t = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight)) !== undefined && t !== 0) {
      if (t < 0) {
        this.kEf(0);
      } else {
        this.kEf(2);
      }
    }
  }
  AEf() {
    if (!this.WRm) {
      this.akm();
    }
  }
  OnTick(t) {
    if (this.RVf) {
      this.YRm(t * CommonDefine_1.SECOND_PER_MILLIONSECOND);
      this.zRm();
      this.qEf();
      this.O6f();
    }
  }
  YRm(t) {
    var i = this.QRm;
    if (this.QRm?.IsFinishMove) {
      if (this.QRm.IsFinishMoveOnFailure) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("MotorRailMove", 39, "VehicleRailMoveData因失败而结束，清除后续滑轨移动", ["Type", this.QRm.Type]);
        }
        this.KRm.Clear();
      }
      this.QRm.Exit();
      this.QRm = undefined;
    }
    if (this.QRm === undefined && this.KRm.Size) {
      this.QRm = this.KRm.Pop();
      if (!this.QRm.Enter(i)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 尝试进入目标MoveData失败，自动退出，并清除后续滑轨移动", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["RailMoveDataType", this.QRm?.Type]);
        }
        this.KRm.Clear();
        this.QRm.Exit();
        this.QRm = undefined;
      }
    }
    if (!i && this.QRm) {
      this.vng(this.QRm.RelatedRail);
      this.JRm();
    } else if (i && !this.QRm) {
      this.ewm();
      this.vng(undefined);
    } else {
      this.vng(this.QRm?.RelatedRail);
    }
    if (this.WRm && this.QRm) {
      if (t > LOG_THRESHOLD_DELTA_TIME_TOO_BIG) {
        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MotorRailMove", 39, "[MotorcycleRailMoveComponent] Delta time too big!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["deltaSeconds", t]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] Delta time too big!", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["deltaSeconds", t]);
        }
      }
      this.QRm.Tick(t);
      this.Grg(t);
    }
  }
  Grg(t) {
    if (this.Hte?.VehicleMoveComp) {
      var i;
      var e = this.Hte.VehicleMoveComp;
      if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MotorRailMove", 39, "[MotorcycleRailMoveComponent] ApplyRailMove", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["DeltaSec", t], ["Dist", this.WYf?.GetLocation() && this.Hte.ActorLocationProxy ? Vector_1.Vector.Dist(this.WYf.GetLocation(), this.Hte.ActorLocationProxy) : undefined]);
      }
      var o = e.VehicleMovement;
      if (this.Org) {
        e.SetForceSpeed(this.Org);
        if ((e = o?.WheelDisplayInfosObj) && e.DisplayInfos.Num() >= 2) {
          i = this.Org.Size();
          e.DisplayInfos.Get(0).WheelSpeed = i;
          e.DisplayInfos.Get(1).WheelSpeed = i;
          e.DisplayInfos.Get(0).WheelAccel = 0;
          e.DisplayInfos.Get(1).WheelAccel = 0;
        }
        this.Hte.ResetCachedVelocityTime();
      }
      if (this.WYf && o) {
        o.UpdateMotorRailMoveTransform(t, this.WYf.ToUeTransform(), true, this.hBg);
        this.B_g?.MarkDebugRecord("MotorcycleRailMoveComponent应用移动后");
        if (this.ph_) {
          for (const s of this.ph_.PassengerInfoMap.values()) {
            s.PassengerEntity?.GetComponent(31)?.MarkDebugRecord("MotorcycleRailMoveComponent应用移动后");
          }
        }
        this.Hte.ResetLocationCachedTime();
        this.Hte.ResetRotationCachedTime();
      }
    }
  }
  JRm() {
    if (!this.WRm && !(this.WRm = true, this.Hte?.VehicleMoveComp && (this.Hte.VehicleMoveComp.IsSpecialMove = true, this.Hte.VehicleMoveComp.DisableUeMovementTick("进入滑轨移动"), this.Hte.VehicleMoveComp.VehicleMovement?.ResetMotorRailMoveData()), this.TPm(248120534, true), this.ZRm(342806233, true), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.vag))) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CheckClientEvent, this.vag);
    }
  }
  ewm() {
    if (this.WRm) {
      this.WRm = false;
      this.WYf = undefined;
      this.hBg = false;
      this.Org = undefined;
      if (this.Hte?.VehicleMoveComp) {
        this.Hte.VehicleMoveComp.IsSpecialMove = false;
        this.Hte.VehicleMoveComp.EnableUeMovementTick("退出滑轨移动");
        this.Hte.VehicleMoveComp.VehicleMovement?.ResetMotorRailMoveData();
      }
      this.TPm(248120534, false);
      this.ZRm(342806233, false);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckClientEvent, this.vag)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CheckClientEvent, this.vag);
      }
      this.Eag();
      this.PVf(this.png.BasicRailMoveConfig.AutoEnterRailCdAfterLeaveRailMove * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  zRm() {
    if (this.ph_?.Driver && this.ph_.Driver.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() && this.Hte) {
      this.twm();
      this.iwm();
    }
  }
  twm() {
    let t = false;
    var i = this.GEf();
    if (i) {
      this.FEf(i);
    } else if (this.NEf()) {
      t = true;
    }
    this.TPm(1506180277, t);
  }
  GEf() {
    if (!this.EEf && this.Hte && !this.WRm && this.KRm.Empty && !this.QRm && !this.IsInNotAllowedSkill()) {
      let t = Number.MAX_VALUE;
      let i = undefined;
      for (const o of MotorcycleRailComponent_1.MotorcycleRailComponent.AllRailsThatPlayerInRange) {
        var e;
        if (o.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && !((e = o.GetDistanceToRail(this.UEf)) < 0) && !(e >= t)) {
          if (!o.GetRailMoveConfig()) {
            o.InitRailMoveConfig(this.GetRailMoveConfigUeData);
          }
          if (o.CheckIsRailCanDirectlyEnter(this.UEf)) {
            t = e;
            i = o;
          }
        }
      }
      return i || undefined;
    }
  }
  NEf() {
    if (this.Hte && !this.WRm && this.KRm.Empty && !this.QRm && !this.IsInNotAllowedSkill()) {
      let t = Number.MAX_VALUE;
      let i = undefined;
      for (const o of MotorcycleRailComponent_1.MotorcycleRailComponent.AllRailsThatPlayerInRange) {
        var e;
        if (o.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && !((e = o.GetDistanceToRail(this.UEf)) < 0) && !(e >= t)) {
          if (!o.GetRailMoveConfig()) {
            o.InitRailMoveConfig(this.GetRailMoveConfigUeData);
          }
          if (o.CheckIsRailCanJumpEnter(this.UEf)) {
            t = e;
            i = o;
          }
        }
      }
      return i || undefined;
    }
  }
  iwm() {
    var t = !!this.swm(0);
    var i = !!this.swm(2);
    this.ZRm(1284083505, t);
    this.ZRm(578211242, i);
    this.TPm(1126125546, t || i);
  }
  swm(i) {
    if (this.Hte && this.WRm && this.KRm.Empty && this.QRm && this.QRm instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData) {
      var e = this.QRm.GetCurrentSegmentPointOption();
      if (e) {
        var o = this.QRm.GetIsMoveAlongSplineForward();
        let t = undefined;
        if (t = i === 0 ? o ? e.LeftTargetId : e.RightTargetId : o ? e.RightTargetId : e.LeftTargetId) {
          o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t)?.Entity?.GetComponent(339);
          if (o && o.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide) {
            if (!o.GetRailMoveConfig()) {
              o.InitRailMoveConfig(this.GetRailMoveConfigUeData);
            }
            o.CheckIsRailCanSwitch(this.UEf);
            if (o.GetRelativeSideOfTarget(this.UEf) === i) {
              return o;
            }
          }
        }
      }
    }
  }
  O6f() {
    if (this.QRm && this.IsInNotAllowedSkill()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] 检测到使用滑轨中不允许的技能，自动退出摩托滑轨", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
      }
      this.SetClearAllRailMove();
    }
  }
  qEf() {
    let t = false;
    var i;
    if (this.WRm) {
      i = ModelManager_1.ModelManager.InputModel?.GetAxisValues()?.get(InputEnums_1.EInputAxis.MoveRight);
      t = i !== undefined && i !== 0;
    }
    this.TPm(1114941504, t);
    if (t && this.VEf(1126125546)) {
      this.Entity.GetComponent(44)?.BeginSkillAsync(this.png.SwitchRailConfig.SkillId, {
        Reason: "[MotorcycleRailMoveComponent] 释放切轨技能"
      }).finally(undefined);
    }
  }
  ZRm(t, i) {
    var e;
    var o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(o)) {
      e = ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(o, t, true);
      if (i && !e) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(o, t);
      } else if (!i && e) {
        ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(o, t);
      }
    }
  }
  TPm(t, i) {
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
  VEf(t) {
    var i = this.Lie;
    return !!i && i.HasTag(t);
  }
  NCg(t, i, e) {
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
  VCg(t, i, e) {
    var o;
    if (this.EIe && (o = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(202))) {
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
    if (this.QRm) {
      this.QRm.IsFinishMove = true;
    }
    this.KRm.Clear();
  }
  SetClearAllRailMoveAndTickImmediately() {
    if (this.QRm) {
      this.QRm.IsFinishMove = true;
    }
    this.KRm.Clear();
    this.OnTick(0);
  }
  SetFinishCurrentRailMove() {
    if (this.QRm) {
      this.QRm.IsFinishMove = true;
    }
  }
  TryJumpToSpecifiedRail(t) {
    if (t?.Entity.IsInit) {
      if (this.WRm) {
        this.SetClearAllRailMove();
      }
      this.awm(t);
    }
  }
  TryDirectlyEnterSpecifiedRail(t) {
    if (t?.Entity.IsInit) {
      if (this.WRm) {
        this.SetClearAllRailMove();
      }
      this.FEf(t);
    }
  }
  awm(t) {
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
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.Spline = e;
      i.SplinePointOptions.push(...o.Points);
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddJumpToTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  FEf(t) {
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
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.Spline = e;
      i.SplinePointOptions.push(...o.Points);
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddDirectlyEnterTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  HEf(t) {
    var i = t.GetRailSplineComp();
    var e = t.GetRailSplineCurve();
    var o = t.GetRailSplineData();
    if (!t.GetRailMoveConfig()) {
      t.InitRailMoveConfig(this.GetRailMoveConfigUeData);
    }
    var s = t.GetRailMoveConfig();
    if (i && o && s && e) {
      (i = new MotorcycleSwitchRailMoveData_1.MotorcycleSwitchRailMoveData(this.Entity, this.$Qm)).MoveConfig.DeepCopy(s);
      i.TargetSpline = e;
      i.GravityDir.DeepCopy(GravityUtils_1.GravityUtils.GetGravityDirectForActor(this.Hte));
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(s);
      i.Spline = e;
      i.SplinePointOptions.push(...o.Points);
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddSwitchTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  jEf(t, i) {
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
      e.MoveUpdater = this.DEf;
      e.MoveGetter = this.UEf;
      this.KRm.Push(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddDirectlyEnterTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  nFf(t, i) {
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
      e.MoveUpdater = this.DEf;
      e.MoveGetter = this.UEf;
      this.KRm.Push(e);
      (i = new MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData(this.Entity, t)).MoveConfig.DeepCopy(r);
      i.Spline = o;
      i.SplinePointOptions.push(...s.Points);
      i.MoveUpdater = this.DEf;
      i.MoveGetter = this.UEf;
      this.KRm.Push(i);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("MotorRailMove", 39, "[MotorcycleRailMoveComponent] AddDirectlyEnterTargetRailMove失败", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
    }
  }
  nkm(t) {
    t = this.swm(t);
    return !!t && (this.SetClearAllRailMove(), this.HEf(t), true);
  }
  akm() {
    var t = this.NEf();
    return !!t && (this.awm(t), true);
  }
  kEf(t) {
    var i;
    return !!this.WRm && !!this.QRm && !this.QRm.IsFinishMove && !!this.KRm.Empty && this.QRm instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData && !!(i = this.QRm.RelatedRail) && i.GetRailSplineType() === IComponent_1.ESplineType.MotorSlide && !(this.SetClearAllRailMove(), this.jEf(i, t), 0);
  }
  oFf() {
    var t;
    var i;
    return !!this.WRm && !!this.QRm && !this.QRm.IsFinishMove && !!(this.QRm instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData) && (t = this.QRm.GetIsMoveAlongSplineForward(), (i = this.QRm.RelatedRail) && !i.GetRailMoveConfig() && i.InitRailMoveConfig(this.GetRailMoveConfigUeData), !!i?.CheckIsRailCanJumpAlongAtDirection(this.UEf, this.QRm)) && (this.SetClearAllRailMove(), this.nFf(i, t), true);
  }
  PVf(t) {
    this.BEf();
    if (t < TimerSystem_1.MIN_TIME || t > TimerSystem_1.MAX_TIME) {
      this.EEf = false;
    } else {
      this.IEf = TimerSystem_1.TimerSystem.Delay(() => {
        this.EEf = false;
        this.BEf();
      }, t);
      if (this.IEf?.Valid()) {
        this.EEf = true;
      }
    }
  }
  BEf() {
    if (this.IEf?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.IEf);
    }
    this.IEf = undefined;
  }
  IsInNotAllowedSkill() {
    var t = this.Entity.GetComponent(44);
    return !!t?.CurrentSkill && (t = t.CurrentSkill.SkillId, !this.png.BasicRailMoveConfig.AllowUseSkillIds.has(t)) && this.png.JumpAlongRailConfig.SkillId !== t && this.png.SwitchRailConfig.SkillId !== t && this.png.JumpOffRailConfig.SkillId !== t && this.png.JumpToRailConfig.SkillId !== t;
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
MotorcycleRailMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(338)], MotorcycleRailMoveComponent);
exports.MotorcycleRailMoveComponent = MotorcycleRailMoveComponent; //# sourceMappingURL=MotorcycleRailMoveComponent.js.map