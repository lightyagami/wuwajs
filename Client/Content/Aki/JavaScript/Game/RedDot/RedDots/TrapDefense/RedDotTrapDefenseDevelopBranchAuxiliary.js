"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseDevelopBranchAuxiliary = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseDevelopBranchAuxiliary extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefenseDevelopBranchAll";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.TrapDefenseOnBranchUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CheckAuxiliaryRedDot();
  }
}
exports.RedDotTrapDefenseDevelopBranchAuxiliary = RedDotTrapDefenseDevelopBranchAuxiliary;
//# sourceMappingURL=RedDotTrapDefenseDevelopBranchAuxiliary.js.map