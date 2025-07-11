"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskInstanceDungeonViewModel = undefined;
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class MowingRiskInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  OnCheckInstanceUnlock(e) {
    return ActivityMowingRiskController_1.ActivityMowingRiskController.CheckInstanceUnlockByInstanceId(e);
  }
  OnGetUnlockConditionTextId(e) {
    var i = ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceLockTextIdByInstanceId(e);
    var e = ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceLockTextArgsByInstanceId(e) ?? [];
    return new LguiUtil_1.TableTextArgNew(i, e);
  }
}
exports.MowingRiskInstanceDungeonViewModel = MowingRiskInstanceDungeonViewModel;
//# sourceMappingURL=MowingRiskInstanceDungeonViewModel.js.map