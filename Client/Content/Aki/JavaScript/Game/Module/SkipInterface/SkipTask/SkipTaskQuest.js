"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskQuest = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SkipTask_1 = require("./SkipTask");
const DEFAULT_PARAM = "0";
class SkipTaskQuest extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var i;
    var e = typeof e == "string" ? Number(e) : e;
    let s = false;
    if (e && (i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)) && i.CanShowInUiPanel()) {
      s = true;
    }
    UiManager_1.UiManager.OpenView("QuestView", e);
    if (!s && r !== DEFAULT_PARAM) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(r);
    }
    this.Finish();
  }
}
exports.SkipTaskQuest = SkipTaskQuest;
//# sourceMappingURL=SkipTaskQuest.js.map