"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInstanceRedDot = exports.TowerDefenseRewardRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const TowerDefenceController_1 = require("../../../Module/TowerDefence/TowerDefenceController");
const RedDotBase_1 = require("../../RedDotBase");
class TowerDefenseRewardRedDot extends RedDotBase_1.RedDotBase {
  constructor() {
    super(...arguments);
    this.VZs = [EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView];
  }
  OnGetEvents() {
    return this.VZs;
  }
  OnCheck(e) {
    return TowerDefenceController_1.TowerDefenseController.CheckHasReward();
  }
}
exports.TowerDefenseRewardRedDot = TowerDefenseRewardRedDot;
class TowerDefenseInstanceRedDot extends RedDotBase_1.RedDotBase {
  constructor() {
    super(...arguments);
    this.VZs = [EventDefine_1.EEventName.TowerDefenseOnInstanceInfoUpdateNotify];
  }
  OnGetEvents() {
    return this.VZs;
  }
  OnCheck(e) {
    return TowerDefenceController_1.TowerDefenseController.CheckHasNewStage();
  }
}
exports.TowerDefenseInstanceRedDot = TowerDefenseInstanceRedDot;
//# sourceMappingURL=TowerDefenceRewardRedDot.js.map