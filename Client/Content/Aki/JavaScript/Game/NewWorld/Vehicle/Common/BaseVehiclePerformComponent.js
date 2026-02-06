"use strict";

var BaseVehiclePerformComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, r);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        n = (s < 3 ? o(n) : s > 3 ? o(t, i, n) : o(t, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseVehiclePerformComponent = exports.ALWAYS_SUCCESS_VEHICLE_PREPERFORM_HANDLE = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController");
const VehicleConfig_1 = require("./VehicleConfig");
const VehicleInfoDefines_1 = require("./VehicleInfoDefines");
exports.ALWAYS_SUCCESS_VEHICLE_PREPERFORM_HANDLE = 1;
let BaseVehiclePerformComponent = BaseVehiclePerformComponent_1 = class BaseVehiclePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.CreatureData = undefined;
    this.MaxSeatCount = 0;
    this.DriverSeat = -1;
    this.CanBeenManipulated = true;
    this.VehicleType = "Gongduola";
    this.Config = undefined;
    this.ConfigInternal = undefined;
    this.VehicleFeatures = new Set();
    this.$pg = undefined;
    this.DriverInternal = undefined;
    this.PassengerInfoMap = new Map();
    this.SeatInfoMap = new Map();
    this.IsPendingDestroy = false;
    this.d4f = undefined;
    this.EntityHandle = undefined;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpVector3 = Vector_1.Vector.Create();
    this.TmpVector4 = Vector_1.Vector.Create();
    this.TmpVector5 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpQuat1 = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.TmpTrans1 = Transform_1.Transform.Create();
    this.TmpTrans2 = Transform_1.Transform.Create();
    this.OnRemoveEntity = (e, t) => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      this.EntityHandle = undefined;
      for (const i of this.PassengerInfoMap.values()) {
        if (i.PassengerEntity?.Valid) {
          this.Leave(i.PassengerEntity);
        }
      }
    };
    this.m4f = "TrialAttributeModifier";
  }
  GetCurrentOrLastDriver() {
    return this.Driver || (this.$pg !== undefined ? EntitySystem_1.EntitySystem.Get(this.$pg) : undefined);
  }
  get Driver() {
    return this.DriverInternal;
  }
  set Driver(e) {
    var t;
    if (this.DriverInternal !== e && (t = this.DriverInternal, this.DriverInternal = e, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleDriverChange, t, e), this.OnSetDriver(), e)) {
      this.$pg = e.Id;
    }
  }
  OnSetDriver() {}
  OnInitData(e) {
    this.CreatureData = this.Entity.GetComponent(0);
    var t = this.CreatureData.GetPbEntityInitData();
    if (t?.ComponentsData) {
      var i = (0, IComponent_1.getComponent)(t.ComponentsData, "BaseInfoComponent");
      if (!i?.Category.VehicleType) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "无法获取载具类型", ["PbDataId", this.CreatureData.GetPbDataId()], ["CreatureId", this.CreatureData.GetCreatureDataId()]);
        }
        return false;
      }
      this.VehicleType = i.Category.VehicleType;
      i = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      if (i && (this.MaxSeatCount = i.SeatCount, this.DriverSeat = i.DriverSeat !== VehicleInfoDefines_1.INVALID_SEAT ? i.DriverSeat : -1, i.VehicleTypedConfig)) {
        this.d4f = i.VehicleTypedConfig.TrialAttributeId;
      }
    }
    return true;
  }
  OnStart() {
    this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    return true;
  }
  OnEnd() {
    this.Driver = undefined;
    return super.OnEnd();
  }
  OnActivate() {
    this.InitVehicleFeatures();
  }
  OnPostActivate() {
    if (this.Entity.Active) {
      ControllerHolder_1.ControllerHolder.VehicleController.OnVehicleEnable(this.Entity);
    }
  }
  OnEnable() {
    ControllerHolder_1.ControllerHolder.VehicleController.OnVehicleEnable(this.Entity);
  }
  OnAfterTick(e) {
    for (const t of this.PassengerInfoMap.values()) {
      t.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime();
    }
  }
  InitVehicleConfig() {
    var e = this.LoadVehicleConfigAsset();
    this.Config = new VehicleConfig_1.VehicleConfig(this.Entity, e);
    this.ConfigInternal = this.Config.DeepCopy();
    return this.Config.Init();
  }
  LoadVehicleConfigAsset() {
    var e = this.CreatureData?.GetPbEntityInitData();
    if (e?.ComponentsData) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent");
      if (e && e.Config !== "" && e.Config !== "None") {
        return this.LoadVehicleConfig(e.Config);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 50, "载具初始化没有VehicleComp组件或没有配置载具DA", ["PbDataId", this.CreatureData?.GetPbDataId()], ["CreatureId", this.CreatureData?.GetCreatureDataId()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "载具初始化失败，没有组件信息", ["PbDataId", this.CreatureData?.GetPbDataId()], ["CreatureId", this.CreatureData?.GetCreatureDataId()]);
    }
  }
  LoadVehicleConfig(e) {
    var t = ResourceSystem_1.ResourceSystem.Load(e, UE.BP_VehicleConfig_C);
    if (t?.IsValid()) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 50, "载具初始化失败，无法读取有效的载具DA配置", ["PbDataId", this.CreatureData?.GetPbDataId()], ["CreatureId", this.CreatureData?.GetCreatureDataId()], ["Path", e]);
    }
  }
  InitVehicleFeatures() {
    var e = this.CreatureData?.GetPbEntityInitData();
    if (e) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent");
      if (e?.VehicleFeatures?.length) {
        for (const i of e.VehicleFeatures) {
          var t = i.Type;
          this.VehicleFeatures.add(t);
          switch (t) {
            case 1:
              this.InitVehicleMovementFeature(i);
              break;
            case 2:
              this.InitVehicleBattleFeature(i);
          }
        }
      }
    }
  }
  InitVehicleMovementFeature(e) {}
  InitVehicleBattleFeature(e) {}
  TryEnter(e, t) {
    return !!this.EnterConditionCheck(e, t) && (e.GetComponent(1).CreatureData?.IsRole() ? this.Egg(e, t, 0) : this.Igg(e, t, 0), true);
  }
  TryEnterAtOnce(e, t, i = "") {
    var r;
    var o;
    var s;
    var n;
    if (this.EnterConditionCheck(e, t)) {
      r = ++BaseVehiclePerformComponent_1.PrePerformHandleGenerator;
      o = this.Entity.GetComponent(0);
      s = e.GetComponent(1);
      (n = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).EntityCreatureId = s.CreatureData.GetCreatureDataId();
      n.VehicleCreatureId = o.GetCreatureDataId();
      n.Seat = t;
      n.ExitType = 1;
      n.PlayerId = s.CreatureData.GetPlayerId();
      if (s.CreatureData?.IsRole()) {
        this.Egg(e, t, r, i);
        ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(n);
      } else {
        this.Igg(e, t, r, i);
        ModelManager_1.ModelManager.VehicleModel.UpdateEntityVehicleData(n);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 预表现请求进入载具", ["V_PbDataId", this.CreatureData.GetPbDataId()], ["V_CreatureId", this.CreatureData.GetCreatureDataId()], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_CreatureId", e.GetComponent(0)?.GetCreatureDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Seat", t], ["isDriver", this.DriverSeat === t], ["Reason", i]);
      }
      this.Enter(e, t);
      return r;
    } else {
      return 0;
    }
  }
  Enter(e, t) {
    var i;
    var r = this.DriverSeat === t;
    var o = new VehicleInfoDefines_1.VehiclePassengerInfo();
    o.VehicleEntity = this.Entity;
    o.PassengerEntity = e;
    o.VehicleType = this.VehicleType;
    o.IsDriver = r;
    o.Seat = t;
    var s = e.GetComponent(0);
    var n = e.GetComponent(242);
    var h = this.Entity.GetComponent(1);
    var a = this.CreatureData.GetPbDataId();
    if (r && (i = s.GetPlayerId(), h?.SetAutonomous(i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 进入载具设置移动主控", ["v", i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()]);
    }
    if (n?.VehicleEntity && n.VehicleEntity !== this.Entity) {
      h = n.VehicleEntity.GetComponent(246);
      i = n.VehicleEntity.GetComponent(0);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[BaseVehicleComp] 进入载具时乘客已在其他载具上", ["Passenger", s.GetPbDataId()], ["OldVehicle", i?.GetPbDataId()], ["NewVehicle", a]);
      }
      h?.Leave(e, 1);
    }
    var n = this.SeatInfoMap.get(t);
    if (n) {
      if (n.PassengerEntity === e) {
        return;
      }
      s = n.PassengerEntity.GetComponent(0);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[BaseVehicleComp] 进入载具时目标位置已有实体", ["Vehicle", a], ["OldPassenger", s?.GetPbDataId()], ["NewPassenger", e.GetComponent(0)?.GetPbDataId()], ["Seat", t]);
      }
      this.Leave(n.PassengerEntity, 1);
    }
    this.PassengerInfoMap.set(e.Id, o);
    this.SeatInfoMap.set(t, o);
    if (r) {
      this.Driver = e;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 进入载具", ["V_PbDataId", a], ["V_CreatureId", this.CreatureData.GetCreatureDataId()], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_CreatureId", e.GetComponent(0)?.GetCreatureDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Seat", t], ["isDriver", r]);
    }
    this.AddTrialAttributeModifier(o);
    this.EnterVehiclePerform(o);
    EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.OnEnterVehicle, o);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, o);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterVehicle, o);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleBeenEntered, o);
    this.Entity.GetComponent(248)?.StartForceDisableAnimOptimization2(7);
  }
  TryLeave(e, t = 0) {
    return !!this.LeaveConditionCheck(e) && (e.GetComponent(1)?.CreatureData?.IsRole() ? this.Tgg(e, t, 0) : this.bgg(e, t, 0), true);
  }
  TryLeaveAtOnce(e, t = 0, i = "") {
    var r;
    var o;
    if (this.LeaveConditionCheck(e)) {
      r = ++BaseVehiclePerformComponent_1.PrePerformHandleGenerator;
      if (e.GetComponent(1)?.CreatureData?.IsRole()) {
        this.Tgg(e, t, r, i);
      } else {
        this.bgg(e, t, r, i);
      }
      o = this.PassengerInfoMap.get(e.Id);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 预表现请求退出载具", ["V_PbDataId", this.CreatureData?.GetPbDataId()], ["V_CreatureId", this.CreatureData?.GetCreatureDataId()], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_CreatureId", e.GetComponent(0)?.GetCreatureDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Seat", o?.Seat], ["isDriver", o?.IsDriver], ["ExitType", o?.ExitType], ["Reason", i]);
      }
      this.Leave(e, t);
      return r;
    } else {
      return 0;
    }
  }
  TryLeaveAll(e = 0) {
    for (var [, t] of this.PassengerInfoMap) {
      this.TryLeave(t.PassengerEntity, e);
    }
  }
  TryLeaveAllAtOnce(e = 0, t = "") {
    for (var [, i] of this.PassengerInfoMap) {
      this.TryLeaveAtOnce(i.PassengerEntity, e, t);
    }
  }
  Leave(e, t = 0) {
    var i = this.PassengerInfoMap.get(e.Id);
    if (i && (i.ExitType = t, i.ExitType !== 3) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 50, "[BaseVehicleComp] 退出载具", ["V_PbDataId", this.CreatureData?.GetPbDataId()], ["V_CreatureId", this.CreatureData?.GetCreatureDataId()], ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()], ["P_CreatureId", e.GetComponent(0)?.GetCreatureDataId()], ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()], ["Seat", i.Seat], ["isDriver", i.IsDriver], ["ExitType", i.ExitType]), this.LeaveVehiclePerform(i), this.RemoveTrialAttributeModifier(i), EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.OnLeaveVehicle, i), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, i), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveVehicle, i), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVehicleBeenLeaved, i), this.PassengerInfoMap.delete(e.Id), this.SeatInfoMap.delete(i.Seat), e === this.Driver && (this.Driver = undefined), this.PassengerInfoMap.size === 0)) {
      this.Entity.GetComponent(248)?.CancelForceDisableAnimOptimization(7);
    }
  }
  ResetVehicleConfig(e = false) {
    this.Config = this.ConfigInternal?.DeepCopy();
    if (e) {
      this.RefreshMoveConfigFromVehicleConfig();
    }
  }
  RefreshMoveConfigFromVehicleConfig() {}
  FixBornLocation(e = 0, t) {}
  Egg(e, t, i, r = "") {
    var e = e.GetComponent(0);
    var o = this.Entity.GetComponent(0);
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : e.GetPlayerId();
    var s = Protocol_1.Aki.Protocol.GC_.create();
    s.F4n = MathUtils_1.MathUtils.NumberToLong(o.GetCreatureDataId());
    s.ORs = e;
    s.phl = true;
    s.fhl = t;
    s.Rxf = !!i;
    s.evg = r;
    Net_1.Net.Call(23532, s, e => {
      if (i) {
        e = e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterVehicleAtOnceResponse, i, e);
      }
    });
  }
  Tgg(e, t, i, r = "") {
    var o = e.GetComponent(0);
    var s = this.Entity.GetComponent(0);
    var e = this.PassengerInfoMap.get(e.Id);
    var o = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : o.GetPlayerId();
    var t = ControllerHolder_1.ControllerHolder.VehicleController.ToServerExitVehicleType(t);
    var n = Protocol_1.Aki.Protocol.GC_.create();
    n.F4n = MathUtils_1.MathUtils.NumberToLong(s.GetCreatureDataId());
    n.ORs = o;
    n.phl = false;
    n.fhl = e.Seat;
    n.bI_ = t;
    n.Rxf = !!i;
    n.evg = r;
    Net_1.Net.Call(23532, n, e => {
      if (i) {
        e = e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveVehicleAtOnceResponse, i, e);
      }
    });
  }
  Igg(e, t, i, r = "") {
    var e = e.GetComponent(0);
    var o = this.Entity.GetComponent(0);
    var s = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : e.GetPlayerId();
    var n = Protocol_1.Aki.Protocol.Dzf.create();
    n.F4n = MathUtils_1.MathUtils.NumberToLong(e.GetCreatureDataId());
    n.TI_ = MathUtils_1.MathUtils.NumberToLong(o.GetCreatureDataId());
    n.ORs = s;
    n.phl = true;
    n.fhl = t;
    n.Rxf = !!i;
    n.evg = r;
    Net_1.Net.Call(28551, n, e => {
      if (i) {
        e = e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterVehicleAtOnceResponse, i, e);
      }
    });
  }
  bgg(e, t, i, r = "") {
    var o = e.GetComponent(0);
    var s = this.Entity.GetComponent(0);
    var e = this.PassengerInfoMap.get(e.Id);
    var n = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : o.GetPlayerId();
    var t = ControllerHolder_1.ControllerHolder.VehicleController.ToServerExitVehicleType(t);
    var h = Protocol_1.Aki.Protocol.Dzf.create();
    h.F4n = MathUtils_1.MathUtils.NumberToLong(o.GetCreatureDataId());
    h.TI_ = MathUtils_1.MathUtils.NumberToLong(s.GetCreatureDataId());
    h.ORs = n;
    h.phl = false;
    h.fhl = e.Seat;
    h.bI_ = t;
    h.Rxf = !!i;
    h.evg = r;
    Net_1.Net.Call(28551, h, e => {
      if (i) {
        e = e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveVehicleAtOnceResponse, i, e);
      }
    });
  }
  HandlePendingDestroy() {
    ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
  }
  EnterConditionCheck(e, t) {
    var i = e.GetComponent(0);
    if (t < 0 || t >= this.MaxSeatCount) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[EnterConditionCheck] 座位不合法", ["P_PbDataId", i?.GetPbDataId()], ["V_PbDataId", this.CreatureData?.GetPbDataId()], ["Seat", t]);
      }
      return false;
    } else if (this.SeatInfoMap.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[EnterConditionCheck] 目标座位已被占用", ["P_PbDataId", i?.GetPbDataId()], ["V_PbDataId", this.CreatureData?.GetPbDataId()], ["Seat", t]);
      }
      return false;
    } else if (this.CanBeenManipulated || this.DriverSeat !== t) {
      return !!(e = e.GetComponent(242)) && !e.IsOnVehicle || (Log_1.Log.CheckError() && Log_1.Log.Error("Vehicle", 50, "[EnterConditionCheck] 没有驾驶组件 或 已经处于载具上", ["P_PbDataId", i?.GetPbDataId()], ["V_PbDataId", this.CreatureData?.GetPbDataId()], ["HasDriverComp", !!e], ["Seat", t]), false);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 50, "[EnterConditionCheck] 自动驾驶的载具不能乘坐驾驶位", ["P_PbDataId", i?.GetPbDataId()], ["V_PbDataId", this.CreatureData?.GetPbDataId()], ["Seat", t]);
      }
      return false;
    }
  }
  LeaveConditionCheck(e) {
    var t = e.GetComponent(0);
    return !!this.PassengerInfoMap.has(e.Id) || (Log_1.Log.CheckError() && Log_1.Log.Error("Vehicle", 50, "[LeaveConditionCheck] 不在此载具上无法离开", ["P_PbDataId", t?.GetPbDataId()], ["V_PbDataId", this.CreatureData?.GetPbDataId()]), false);
  }
  EnterVehiclePerform(e) {}
  LeaveVehiclePerform(e) {}
  SetGravityDirectForVehicle(e) {}
  SetGravityDirectForVehicleWithoutRotate(e) {}
  IsDriver(e) {
    return this.Driver === e;
  }
  IsPassenger(e) {
    return this.PassengerInfoMap.has(e.Id);
  }
  TryFindUsableSeat(t) {
    for (let e = 0; e < this.MaxSeatCount; e++) {
      if ((t || e !== this.DriverSeat) && !this.SeatInfoMap.has(e)) {
        return e;
      }
    }
    return -1;
  }
  IsVehicleInUse(e) {
    if (e === VehicleInfoDefines_1.INVALID_SEAT) {
      return !!this.PassengerInfoMap.size;
    } else {
      return this.SeatInfoMap.has(e);
    }
  }
  GetVehicleVelocity(e) {}
  wug(e) {
    var t;
    return !!this.d4f && !!e.IsDriver && !!(t = e.PassengerEntity?.GetComponent(0)) && !!t.IsRole() && !!(t = e.PassengerEntity?.GetComponent(222)) && !!t.HasBuffAuthority();
  }
  AddTrialAttributeModifier(e) {
    var t;
    if (this.wug(e)) {
      if (e = ConfigManager_1.ConfigManager.MotorConfig.GetTrialMotorConfig(this.d4f)) {
        if (e.Level !== 0) {
          if (t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(e.Level)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Vehicle", 85, "添加试用属性Modifier", ["Level", this.d4f]);
            }
            FormationAttributeController_1.FormationAttributeController.AddSpeedModifier(this.m4f, 14, 0, t.NitrogenRecoverRate, 1);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 85, "无效的等级", ["Level", e.Level]);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 85, "无效的试用属性", ["Id", this.d4f]);
      }
    }
  }
  RemoveTrialAttributeModifier(e) {
    if (this.wug(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 85, "移除试用属性Modifier", ["Id", this.d4f]);
      }
      FormationAttributeController_1.FormationAttributeController.RemoveSpeedModifier(this.m4f, 14);
    }
  }
};
BaseVehiclePerformComponent.PrePerformHandleGenerator = exports.ALWAYS_SUCCESS_VEHICLE_PREPERFORM_HANDLE;
BaseVehiclePerformComponent = BaseVehiclePerformComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(246)], BaseVehiclePerformComponent);
exports.BaseVehiclePerformComponent = BaseVehiclePerformComponent; //# sourceMappingURL=BaseVehiclePerformComponent.js.map