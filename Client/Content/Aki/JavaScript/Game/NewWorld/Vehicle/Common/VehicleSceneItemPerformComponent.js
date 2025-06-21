"use strict";
var __decorate = this && this.__decorate || function(e, t, i, o) {
  var r, s = arguments.length,
    n = s < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, i, o);
  else
    for (var h = e.length - 1; 0 <= h; h--)(r = e[h]) && (n = (s < 3 ? r(n) : 3 < s ? r(t, i, n) : r(t, i)) || n);
  return 3 < s && n && Object.defineProperty(t, i, n), n
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.VehicleSceneItemPerformComponent = void 0;
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator"),
  BaseVehiclePerformComponent_1 = require("./BaseVehiclePerformComponent"),
  VehicleInfoDefines_1 = require("./VehicleInfoDefines");
let VehicleSceneItemPerformComponent = class VehicleSceneItemPerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments), this.ActorComp = void 0, this.AnimComp = void 0, this.MoveComp = void 0, this.TagComp = void 0, this.PassengerTagMap = new Map
  }
  OnStart() {
    if (!super.OnStart()) return !1;
    this.ActorComp = this.Entity.GetComponent(1), this.AnimComp = this.Entity.GetComponent(235), this.MoveComp = this.Entity.GetComponent(236), this.TagComp = this.Entity.GetComponent(205);
    var e = this.CreatureData?.GetPbEntityInitData();
    return !!e?.ComponentsData && !(!(0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent") || !this.InitVehicleConfig())
  }
  OnEnd() {
    for (const e of this.PassengerTagMap.keys()) this.RemoveAllTagsForPassenger(e);
    return super.OnEnd(), !0
  }
  OnInitData(e) {
    this.CreatureData = this.Entity.GetComponent(0);
    var t, i = this.CreatureData.GetPbEntityInitData();
    return i?.ComponentsData && (t = (0, IComponent_1.getComponent)(i.ComponentsData, "VehicleComponent")) && (i = (0, IComponent_1.getComponent)(i.ComponentsData, "BaseInfoComponent"), this.VehicleType = i?.Category.VehicleType ?? "SceneItemAutoMoveVehicle", this.MaxSeatCount = t.SeatCount, this.DriverSeat = t.DriverSeat !== VehicleInfoDefines_1.INVALID_SEAT ? t.DriverSeat : -1), !0
  }
  EnterVehiclePerform(e) {
    var t;
    e.PassengerEntity && (this.cou("EnterVehiclePerform"), this.PassengerTagMap.has(e.PassengerEntity) ? (t = e.PassengerEntity.GetComponent(0)?.GetPbDataId(), Log_1.Log.CheckError() && Log_1.Log.Error("Vehicle", 42, "上次离开载具时Tag未清理", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["PassengerId", t], ["Tags", this.PassengerTagMap.get(e.PassengerEntity)]), this.RemoveAllTagsForPassenger(e.PassengerEntity)) : (this.PassengerTagMap.size || this.AddEnterVehicleTagsForVehicle(), this.PassengerTagMap.set(e.PassengerEntity, new Set), this.AddEnterVehicleTagsForPassenger(e.PassengerEntity)))
  }
  LeaveVehiclePerform(e) {
    e.PassengerEntity && (this.cou("LeaveVehiclePerform"), this.RemoveAllTagsForPassenger(e.PassengerEntity), this.PassengerTagMap.size || this.RemoveEnterVehicleTagsForVehicle())
  }
  AddEnterVehicleTagsForVehicle() {
    if (this.Config && 1 === this.PassengerInfoMap.size)
      for (const e of this.Config.VehicleEnterTags) this.TagComp?.AddTag(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Vehicle", 42, "乘坐场景载具添加Tag", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Tag", e])
  }
  RemoveEnterVehicleTagsForVehicle() {
    if (this.Config && 1 === this.PassengerInfoMap.size)
      for (const e of this.Config.VehicleEnterTags) this.TagComp?.RemoveTag(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Vehicle", 42, "离开场景载具移除Tag", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Tag", e])
  }
  AddEnterVehicleTagsForPassenger(e) {
    if (this.Config)
      for (const t of this.Config.PassengerEnterTags) this.AddTagForPassenger(e, 1, t)
  }
  AddTagForPassenger(e, t, i) {
    e && this.PassengerTagMap.has(e) && (e.GetComponent(205)?.TagContainer.AddExactTag(t, i), this.PassengerTagMap.get(e).add(i))
  }
  RemoveTagForPassenger(e, t, i) {
    e && this.PassengerTagMap.get(e)?.has(i) && (e.GetComponent(205)?.TagContainer.RemoveExactTag(t, i), this.PassengerTagMap.get(e).delete(i))
  }
  RemoveAllTagsForPassenger(e) {
    if (e) {
      const i = e.GetComponent(205);
      var t = this.PassengerTagMap.get(e);
      t && i && (t.forEach(e => {
        i.RemoveTag(e)
      }), this.PassengerTagMap.delete(e))
    }
  }
  dou() {
    for (const e of this.PassengerInfoMap.values())
      if (e.IsRolePassenger(!0)) return !0;
    return !1
  }
  cou(e) {
    this.dou() ? this.mou(e) : this.fou(e)
  }
  mou(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 39, "提高载具Tick频率", ["ConfigId", this.EntityHandle?.PbDataId], ["Reason", e]), this.Entity.GameBudgetManagedToken && cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig.GroupName, this.Entity.GameBudgetManagedToken, !0)
  }
  fou(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Vehicle", 39, "降低载具Tick频率", ["ConfigId", this.EntityHandle?.PbDataId], ["Reason", e]), this.Entity.GameBudgetManagedToken && cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig.GroupName, this.Entity.GameBudgetManagedToken, !1)
  }
};
VehicleSceneItemPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(238)], VehicleSceneItemPerformComponent), exports.VehicleSceneItemPerformComponent = VehicleSceneItemPerformComponent;
//# sourceMappingURL=VehicleSceneItemPerformComponent.js.map