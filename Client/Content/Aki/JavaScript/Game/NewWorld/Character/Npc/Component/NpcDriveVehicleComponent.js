"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, r, o);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (i = e[c]) {
        s = (n < 3 ? i(s) : n > 3 ? i(t, r, s) : i(t, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcDriveVehicleComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const VehicleInfoDefines_1 = require("../../../Vehicle/Common/VehicleInfoDefines");
const CharacterDriveVehicleComponent_1 = require("../../Common/Component/CharacterDriveVehicleComponent");
const DRIVE_MONTAGE_DEFAULT_OFFSET_X = 35;
const VEHICLE_PB = "dI_";
let NpcDriveVehicleComponent = class NpcDriveVehicleComponent extends CharacterDriveVehicleComponent_1.CharacterDriveVehicleComponent {
  constructor() {
    super(...arguments);
    this.NpcPerformComp = undefined;
  }
  OnStart() {
    return !!super.OnStart() && (this.NpcPerformComp = this.Entity.GetComponent(191), true);
  }
  OnActivate() {
    if (!this.NpcPerformComp?.IsBaseRoleNpc) {
      this.AttachOffset.Set(DRIVE_MONTAGE_DEFAULT_OFFSET_X, 0, 0);
    }
    super.OnActivate();
    var e;
    var t = this.Entity.GetComponent(0);
    var r = t.ComponentDataMap.get(VEHICLE_PB)?.dI_;
    if (r) {
      (e = new VehicleInfoDefines_1.EntityVehicleInfo()).EntityCreatureId = t.GetCreatureDataId();
      e.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(r.TI_);
      e.Seat = r.fhl;
      ControllerHolder_1.ControllerHolder.VehicleController.VehicleUpdateEntity(e);
    }
  }
  InitEnterEffectAsset() {}
  PostEnterVehiclePerform(e) {
    super.PostEnterVehiclePerform(e);
    this.NpcPerformComp?.OnEnterVehicle();
  }
  LeaveVehiclePerform(e) {
    this.NpcPerformComp?.OnLeaveVehicle();
    super.LeaveVehiclePerform(e);
  }
};
NpcDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(235)], NpcDriveVehicleComponent);
exports.NpcDriveVehicleComponent = NpcDriveVehicleComponent; //# sourceMappingURL=NpcDriveVehicleComponent.js.map