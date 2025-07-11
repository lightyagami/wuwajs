"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckIsShowProgressBarInMapExploreDetailView = undefined;
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsShowProgressBarInMapExploreDetailView extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a = UiManager_1.UiManager.GetViewByName("MapExploreDetailView");
    return a !== undefined && (a.IsShowProgressBar ?? false);
  }
}
exports.LevelConditionCheckIsShowProgressBarInMapExploreDetailView = LevelConditionCheckIsShowProgressBarInMapExploreDetailView;
//# sourceMappingURL=LevelConditionCheckIsShowProgressBarInMapExploreDetailView.js.map