"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyStateVehicleAddTag extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
    this.AddToVehicle = true;
    this.AddToDriver = false;
    this.AddToPassengerExceptDriver = false;
  }
  Constructor() {}
  K2_NotifyBegin(e, t, i) {
    var e = e.GetOwner();
    var s = this.Tag?.TagId;
    if (!s || !(e instanceof TsBaseVehicle_1.default)) {
      return false;
    }
    var e = e.VehicleActorComponent?.Entity;
    var r = e?.GetComponent(242);
    if (!e || !r) {
      return false;
    }
    if (this.AddToVehicle) {
      r.TagContainer.AddExactTag(4, s);
    }
    e = e.GetComponent(234);
    if (this.AddToDriver && e.Driver) {
      r.AddTagForPassenger(e.Driver, 4, s);
    }
    if (this.AddToPassengerExceptDriver) {
      for (const o of e.PassengerInfoMap.values()) {
        if (!o.IsDriver && o.PassengerEntity) {
          r.AddTagForPassenger(o.PassengerEntity, 4, s);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    var i = this.Tag?.TagId;
    if (!i || !(e instanceof TsBaseVehicle_1.default)) {
      return false;
    }
    var e = e.VehicleActorComponent?.Entity;
    var s = e?.GetComponent(242);
    if (!e || !s) {
      return false;
    }
    if (this.AddToVehicle) {
      e?.GetComponent(206)?.TagContainer.RemoveExactTag(4, i);
    }
    e = e.GetComponent(234);
    if (this.AddToDriver && e.Driver) {
      s.RemoveTagForPassenger(e.Driver, 4, i);
    }
    if (this.AddToPassengerExceptDriver) {
      for (const r of e.PassengerInfoMap.values()) {
        if (!r.IsDriver && r.PassengerEntity) {
          s.RemoveTagForPassenger(r.PassengerEntity, 4, i);
        }
      }
    }
    return true;
  }
  GetNotifyName() {
    return "载具添加TAG";
  }
}
exports.default = TsAnimNotifyStateVehicleAddTag;
//# sourceMappingURL=TsAnimNotifyStateVehicleAddTag.js.map