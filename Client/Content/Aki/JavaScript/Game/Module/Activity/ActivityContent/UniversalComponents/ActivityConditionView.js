"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityConditionView = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConditionGroupData_1 = require("../../ConditionGroupData"),
  CommonConditionView_1 = require("./CommonConditionView");
class ActivityConditionView extends CommonConditionView_1.CommonConditionView {
  constructor() {
    super(...arguments), this.LOe = 0
  }
  OnStart() {
    var i, t = this.OpenParam;
    this.LOe = t.ActivityId, this.LOe && (t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.LOe)) && (ModelManager_1.ModelManager.ActivityModel.SendActivityLockConditionLogData(t), i = ModelManager_1.ModelManager.ActivityModel.GetActivityConditionData(t), t.HasPreOpenCondition() ? this.ConditionGroupData = new ConditionGroupData_1.ConditionGroupData(t.PreOpenConditionGroupId, i, t.LocalConfig.Name, !0) : this.ConditionGroupData = new ConditionGroupData_1.ConditionGroupData(t.ConditionGroupId, i, t.LocalConfig.Name, !1), this.TextIdMap.set("FinishAllConditionOpen", "ActivityNotOpen_Tips01"), this.TextIdMap.set("FinishAnyConditionOpen", "ActivityNotOpen_Tips02"), this.TextIdMap.set("FinishAllConditionPreOpen", "ActivityNotPreOpen_Tips01"), this.TextIdMap.set("FinishAnyConditionPreOpen", "ActivityNotPreOpen_Tips02"), this.CreateConditionLayout())
  }
}
exports.ActivityConditionView = ActivityConditionView;
//# sourceMappingURL=ActivityConditionView.js.map