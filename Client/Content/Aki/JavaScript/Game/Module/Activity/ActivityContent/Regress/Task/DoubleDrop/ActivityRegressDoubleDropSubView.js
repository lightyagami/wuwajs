"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressDoubleDropSubView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ActivityRegressTaskSubViewBase_1 = require("../ActivityRegressTaskSubViewBase");
const ActivityRegressDoubleDropChallengeItem_1 = require("./ActivityRegressDoubleDropChallengeItem");
class ActivityRegressDoubleDropSubView extends ActivityRegressTaskSubViewBase_1.ActivityRegressTaskSubViewBase {
  constructor() {
    super(...arguments);
    this.B_1 = undefined;
    this.k_1 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.B_1 = new ActivityRegressDoubleDropChallengeItem_1.ActivityRegressDoubleDropChallengeItem(1);
    var e = this.GetItem(0);
    await this.B_1.CreateThenShowByActorAsync(e.GetOwner());
    this.k_1 = new ActivityRegressDoubleDropChallengeItem_1.ActivityRegressDoubleDropChallengeItem(2);
    var e = this.GetItem(1);
    await this.k_1.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.MarkDoubleDropReminderShown();
    ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.MarkDoubleDropFirstRedDotShown();
  }
}
exports.ActivityRegressDoubleDropSubView = ActivityRegressDoubleDropSubView;
//# sourceMappingURL=ActivityRegressDoubleDropSubView.js.map