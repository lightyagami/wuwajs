"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskAdventureGuide = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskAdventureGuide extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var a = r;
    if (UiManager_1.UiManager.IsViewShow("AdventureGuideView") && ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName === a) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
      this.Finish();
    } else {
      e = Number(e);
      if (r !== "NewSoundAreaView" || ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(e)) {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(a, e, (e, r) => {
          this.Finish();
        });
        if (UiManager_1.UiManager.IsViewShow("AdventureGuideView")) {
          this.Finish();
        }
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOpen");
      }
    }
  }
}
exports.SkipTaskAdventureGuide = SkipTaskAdventureGuide;
//# sourceMappingURL=SkipTaskAdventureGuide.js.map