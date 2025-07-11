"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskTrackNewSoundArea = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideView_1 = require("../../AdventureGuide/Views/GuideView");
const SkipTask_1 = require("./SkipTask");
class SkipTaskTrackNewSoundArea extends SkipTask_1.SkipTask {
  OnRun(e) {
    var r;
    var a = "NewSoundAreaView";
    if (UiManager_1.UiManager.IsViewShow("AdventureGuideView") && ModelManager_1.ModelManager.AdventureGuideModel.CurrentGuideTabName === a) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsInView");
      this.Finish();
    } else if (ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(22)) {
      (r = new GuideView_1.AdventureGuideViewOpenData()).OpenTabViewName = a;
      a = Number(e);
      e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(a);
      r.OpenParam = e.Secondary;
      r.NewSoundDetectTracingIdList = [a];
      ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideViewWithOpenData(r, (e, r) => {
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
exports.SkipTaskTrackNewSoundArea = SkipTaskTrackNewSoundArea;
//# sourceMappingURL=SkipTaskTrackNewSoundArea.js.map