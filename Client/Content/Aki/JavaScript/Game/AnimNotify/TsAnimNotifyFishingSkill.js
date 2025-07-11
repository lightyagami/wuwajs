"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyFishingSkill extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.SkillType = 0;
  }
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    return e instanceof TsBaseVehicle_1.default && !!e.VehicleActorComponent?.Entity?.Valid && (ControllerHolder_1.ControllerHolder.FishingController.BeginFishingSkill(this.SkillType), true);
  }
  GetNotifyName() {
    return "捕鱼技能";
  }
}
exports.default = TsAnimNotifyFishingSkill;
//# sourceMappingURL=TsAnimNotifyFishingSkill.js.map