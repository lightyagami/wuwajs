"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehiclePassengerInfo = exports.VehicleRideSharingInfo = exports.ScenePlayerVehicleInfo = exports.EntityVehicleInfo = exports.VehicleInfoDefines = exports.INVALID_SEAT = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
exports.INVALID_SEAT = 999;
class VehicleInfoDefines {
  static GetSeatSocketName(e) {
    let s = this.Drl;
    if (e < 10) {
      s += "0";
    }
    s += (e + 1).toString();
    return new UE.FName(s);
  }
}
(exports.VehicleInfoDefines = VehicleInfoDefines).Drl = "SeatProp";
class EntityVehicleInfo {
  constructor() {
    this.EntityCreatureId = 0;
    this.VehicleCreatureId = 0;
    this.Seat = -1;
    this.ExitType = 0;
  }
  DeepCopy() {
    var e = new EntityVehicleInfo();
    e.EntityCreatureId = this.EntityCreatureId;
    e.VehicleCreatureId = this.VehicleCreatureId;
    e.Seat = this.Seat;
    return e;
  }
  Equals(e) {
    return this.EntityCreatureId === e.EntityCreatureId && this.VehicleCreatureId === e.VehicleCreatureId && this.Seat === e.Seat;
  }
}
class ScenePlayerVehicleInfo extends (exports.EntityVehicleInfo = EntityVehicleInfo) {
  constructor() {
    super(...arguments);
    this.PlayerId = 0;
  }
  DeepCopy() {
    var e = new ScenePlayerVehicleInfo();
    e.PlayerId = this.PlayerId;
    e.EntityCreatureId = this.EntityCreatureId;
    e.VehicleCreatureId = this.VehicleCreatureId;
    e.Seat = this.Seat;
    return e;
  }
  Equals(e) {
    return this.PlayerId === e.PlayerId && super.Equals(e);
  }
}
exports.ScenePlayerVehicleInfo = ScenePlayerVehicleInfo;
class VehicleRideSharingInfo {
  constructor(e) {
    this.PlayerId = 0;
    this.RoleId = 0;
    this.RoleCreatureId = 0;
    this.Seat = -1;
    this.PlayerId = e.W5n;
    this.RoleId = e.Q6n;
    this.RoleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    this.Seat = e.fhl;
  }
}
exports.VehicleRideSharingInfo = VehicleRideSharingInfo;
class VehiclePassengerInfo {
  constructor() {
    this.VehicleEntity = undefined;
    this.PassengerEntity = undefined;
    this.VehicleType = "Gongduola";
    this.IsDriver = false;
    this.Seat = -1;
    this.ExitType = 0;
  }
  IsRolePassenger(e = false) {
    var s = this.PassengerEntity?.GetComponent(3);
    if (e) {
      return !!s?.IsRoleAndCtrlByMe;
    } else {
      return !!s?.CreatureData.IsRole();
    }
  }
  IsNpcPassenger() {
    return this.PassengerEntity?.GetComponent(3)?.CreatureData.IsNpc() ?? false;
  }
}
exports.VehiclePassengerInfo = VehiclePassengerInfo;
//# sourceMappingURL=VehicleInfoDefines.js.map