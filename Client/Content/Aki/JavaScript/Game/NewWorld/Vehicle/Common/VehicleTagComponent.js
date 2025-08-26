"use strict";

var __decorate = this && this.__decorate || function (e, t, s, i) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, s) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, s, i);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (n = e[h]) {
        r = (o < 3 ? n(r) : o > 3 ? n(t, s, r) : n(t, s)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleTagComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const BaseTagComponent_1 = require("../../Common/Component/BaseTagComponent");
let VehicleTagComponent = class VehicleTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.PerformComp = undefined;
    this.PassengerTagMap = new Map();
    this.OnEnterVehicle = e => {
      var t;
      if (e.PassengerEntity) {
        if (this.PassengerTagMap.has(e.PassengerEntity)) {
          t = e.PassengerEntity.GetComponent(0)?.GetPbDataId();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 50, "上次离开载具时Tag未清理", ["VehiclePbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["PassengerId", t], ["Tags", this.PassengerTagMap.get(e.PassengerEntity)]);
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
    };
    this.OnLeaveVehicle = e => {
      if (e.PassengerEntity) {
        this.RemoveAllTagsForPassenger(e.PassengerEntity);
        if (!this.PassengerTagMap.size) {
          this.RemoveEnterVehicleTagsForVehicle();
        }
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.ActorComp = this.Entity.GetComponent(1);
    this.PerformComp = this.Entity.GetComponent(234);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  OnActivate() {
    super.OnActivate();
  }
  OnEnd() {
    for (const e of this.PassengerTagMap.keys()) {
      this.RemoveAllTagsForPassenger(e);
    }
    super.OnEnd();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  OnClear() {
    super.OnClear();
    return true;
  }
  AddEnterVehicleTagsForPassenger(e) {
    if (this.PerformComp?.Config) {
      for (const t of this.PerformComp.Config.PassengerEnterTags) {
        this.AddTagForPassenger(e, 1, t);
      }
    }
  }
  AddEnterVehicleTagsForVehicle() {
    if (this.PerformComp?.Config && this.PerformComp.PassengerInfoMap.size === 1) {
      for (const e of this.PerformComp.Config.VehicleEnterTags) {
        this.AddTag(e);
      }
    }
  }
  RemoveEnterVehicleTagsForVehicle() {
    if (this.PerformComp?.Config && this.PerformComp.PassengerInfoMap.size === 1) {
      for (const e of this.PerformComp.Config.VehicleEnterTags) {
        this.RemoveTag(e);
      }
    }
  }
  AddTagForPassenger(e, t, s) {
    if (e && this.PassengerTagMap.has(e)) {
      e.GetComponent(206)?.TagContainer.AddExactTag(t, s);
      this.PassengerTagMap.get(e).add(s);
    }
  }
  RemoveTagForPassenger(e, t, s) {
    if (e && this.PassengerTagMap.get(e)?.has(s)) {
      e.GetComponent(206)?.TagContainer.RemoveExactTag(t, s);
      this.PassengerTagMap.get(e).delete(s);
    }
  }
  RemoveAllTagsForPassenger(e) {
    if (e) {
      const s = e.GetComponent(206);
      var t = this.PassengerTagMap.get(e);
      if (t && s) {
        t.forEach(e => {
          s.RemoveTag(e);
        });
        this.PassengerTagMap.delete(e);
      }
    }
  }
};
VehicleTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(242)], VehicleTagComponent);
exports.VehicleTagComponent = VehicleTagComponent; //# sourceMappingURL=VehicleTagComponent.js.map