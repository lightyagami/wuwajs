"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityConditionView = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConditionGroupData_1 = require("../../ConditionGroupData");
const CommonConditionView_1 = require("./CommonConditionView");
class ActivityConditionView extends CommonConditionView_1.CommonConditionView {
  constructor() {
    super(...arguments);
    this.LOe = 0;
  }
  OnStart() {
    var i;
    var t = this.OpenParam;
    this.LOe = t.ActivityId;
    if (this.LOe && (t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe))) {
      ModelManager_1.ModelManager.ActivityModel.SendActivityLockConditionLogData(t);
      i = ModelManager_1.ModelManager.ActivityModel.GetActivityConditionData(t);
      if (t.HasPreOpenCondition()) {
        this.ConditionGroupData = new ConditionGroupData_1.ConditionGroupData(t.PreOpenConditionGroupId, i, t.LocalConfig.Name, true);
      } else {
        this.ConditionGroupData = new ConditionGroupData_1.ConditionGroupData(t.ConditionGroupId, i, t.LocalConfig.Name, false);
      }
      this.TextIdMap.set("FinishAllConditionOpen", "ActivityNotOpen_Tips01");
      this.TextIdMap.set("FinishAnyConditionOpen", "ActivityNotOpen_Tips02");
      this.TextIdMap.set("FinishAllConditionPreOpen", "ActivityNotPreOpen_Tips01");
      this.TextIdMap.set("FinishAnyConditionPreOpen", "ActivityNotPreOpen_Tips02");
      this.CreateConditionLayout();
    }
  }
}
exports.ActivityConditionView = ActivityConditionView;
//# sourceMappingURL=ActivityConditionView.js.map