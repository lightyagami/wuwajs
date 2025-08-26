"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (r = e[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(t, i, n) : r(t, i)) || n;
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
exports.VehicleSceneItemPerformComponent = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator");
const BaseVehiclePerformComponent_1 = require("./BaseVehiclePerformComponent");
const VehicleInfoDefines_1 = require("./VehicleInfoDefines");
let VehicleSceneItemPerformComponent = class VehicleSceneItemPerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.MoveComp = undefined;
    this.TagComp = undefined;
    this.PassengerTagMap = new Map();
  }
  OnStart() {
    if (!super.OnStart()) {
      return false;
    }
    this.ActorComp = this.Entity.GetComponent(1);
    this.AnimComp = this.Entity.GetComponent(236);
    this.MoveComp = this.Entity.GetComponent(237);
    this.TagComp = this.Entity.GetComponent(206);
    var e = this.CreatureData?.GetPbEntityInitData();
    return !!e?.ComponentsData && !!(0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent") && !!this.InitVehicleConfig();
  }
  OnEnd() {
    for (const e of this.PassengerTagMap.keys()) {
      this.RemoveAllTagsForPassenger(e);
    }
    super.OnEnd();
    return true;
  }
  OnInitData(e) {
    this.CreatureData = this.Entity.GetComponent(0);
    var t;
    var i = this.CreatureData.GetPbEntityInitData();
    if (i?.ComponentsData && (t = (0, IComponent_1.getComponent)(i.ComponentsData, "VehicleComponent"))) {
      i = (0, IComponent_1.getComponent)(i.ComponentsData, "BaseInfoComponent");
      this.VehicleType = i?.Category.VehicleType ?? "SceneItemAutoMoveVehicle";
      this.MaxSeatCount = t.SeatCount;
      this.DriverSeat = t.DriverSeat !== VehicleInfoDefines_1.INVALID_SEAT ? t.DriverSeat : -1;
    }
    return true;
  }
  EnterVehiclePerform(e) {
    var t;
    if (e.PassengerEntity) {
      this.Rhu("EnterVehiclePerform");
      if (this.PassengerTagMap.has(e.PassengerEntity)) {
        t = e.PassengerEntity.GetComponent(0)?.GetPbDataId();
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 42, "上次离开载具时Tag未清理", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["PassengerId", t], ["Tags", this.PassengerTagMap.get(e.PassengerEntity)]);
        }
        this.RemoveAllTagsForPassenger(e.PassengerEntity);
      } else {
        if (!this.PassengerTagMap.size) {
          this.AddEnterVehicleTagsForVehicle();
        }
        this.PassengerTagMap.set(e.PassengerEntity, new Set());
        this.AddEnterVehicleTagsForPassenger(e.PassengerEntity);
      }
    }
  }
  LeaveVehiclePerform(e) {
    if (e.PassengerEntity) {
      this.Rhu("LeaveVehiclePerform");
      this.RemoveAllTagsForPassenger(e.PassengerEntity);
      if (!this.PassengerTagMap.size) {
        this.RemoveEnterVehicleTagsForVehicle();
      }
    }
  }
  AddEnterVehicleTagsForVehicle() {
    if (this.Config && this.PassengerInfoMap.size === 1) {
      for (const e of this.Config.VehicleEnterTags) {
        this.TagComp?.AddTag(e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Vehicle", 42, "乘坐场景载具添加Tag", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Tag", e]);
        }
      }
    }
  }
  RemoveEnterVehicleTagsForVehicle() {
    if (this.Config && this.PassengerInfoMap.size === 1) {
      for (const e of this.Config.VehicleEnterTags) {
        this.TagComp?.RemoveTag(e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Vehicle", 42, "离开场景载具移除Tag", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Tag", e]);
        }
      }
    }
  }
  AddEnterVehicleTagsForPassenger(e) {
    if (this.Config) {
      for (const t of this.Config.PassengerEnterTags) {
        this.AddTagForPassenger(e, 1, t);
      }
    }
  }
  AddTagForPassenger(e, t, i) {
    if (e && this.PassengerTagMap.has(e)) {
      e.GetComponent(206)?.TagContainer.AddExactTag(t, i);
      this.PassengerTagMap.get(e).add(i);
    }
  }
  RemoveTagForPassenger(e, t, i) {
    if (e && this.PassengerTagMap.get(e)?.has(i)) {
      e.GetComponent(206)?.TagContainer.RemoveExactTag(t, i);
      this.PassengerTagMap.get(e).delete(i);
    }
  }
  RemoveAllTagsForPassenger(e) {
    if (e) {
      const i = e.GetComponent(206);
      var t = this.PassengerTagMap.get(e);
      if (t && i) {
        t.forEach(e => {
          i.RemoveTag(e);
        });
        this.PassengerTagMap.delete(e);
      }
    }
  }
  Lhu() {
    for (const e of this.PassengerInfoMap.values()) {
      if (e.IsRolePassenger(true)) {
        return true;
      }
    }
    return false;
  }
  Rhu(e) {
    if (this.Lhu()) {
      this.whu(e);
    } else {
      this.Ahu(e);
    }
  }
  whu(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 39, "提高载具Tick频率", ["ConfigId", this.EntityHandle?.PbDataId], ["Reason", e]);
    }
    if (this.Entity.GameBudgetManagedToken) {
      cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig.GroupName, this.Entity.GameBudgetManagedToken, true);
    }
  }
  Ahu(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Vehicle", 39, "降低载具Tick频率", ["ConfigId", this.EntityHandle?.PbDataId], ["Reason", e]);
    }
    if (this.Entity.GameBudgetManagedToken) {
      cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig.GroupName, this.Entity.GameBudgetManagedToken, false);
    }
  }
};
VehicleSceneItemPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(239)], VehicleSceneItemPerformComponent);
exports.VehicleSceneItemPerformComponent = VehicleSceneItemPerformComponent; //# sourceMappingURL=VehicleSceneItemPerformComponent.js.map