"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskFloroRanchRelatedView = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SkipTask_1 = require("./SkipTask");
class SkipTaskFloroRanchRelatedView extends SkipTask_1.SkipTask {
  constructor() {
    super(...arguments);
    this.YHt = e => {
      if (!this.lY_(e)) {
        UiManager_1.UiManager.OpenView(e);
      }
    };
  }
  OnRun(e, i, a) {
    var r = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (r && r.IsUnLock()) {
      switch (Number(e)) {
        case 1:
          this.YHt("FloroRanchMainView");
          break;
        case 2:
          this.YHt("FloroRanchMainView");
          this.YHt("FloroRanchTechnologyView");
          break;
        case 3:
          this.YHt("FloroRanchMainView");
          this.YHt("FloroRanchDungeonSelectView");
          break;
        case 4:
          this.YHt("FloroRanchMainView");
          this.YHt("FloroRanchHandBookView");
      }
      this.Finish();
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ActivityLock");
    }
  }
  lY_(e) {
    return !!UiManager_1.UiManager.IsViewOpen(e) || UiManager_1.UiManager.GetViewByName(e) !== undefined && (UiManager_1.UiManager.NormalResetToView(e), true);
  }
}
exports.SkipTaskFloroRanchRelatedView = SkipTaskFloroRanchRelatedView;
//# sourceMappingURL=SkipTaskFloroRanchRelatedView.js.map