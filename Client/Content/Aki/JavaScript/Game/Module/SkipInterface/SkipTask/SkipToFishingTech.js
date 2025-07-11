"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToFishingTech = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipToFishingTech extends SkipTask_1.SkipTask {
  OnRun(e, i) {
    e = {
      Type: Number(e),
      NodeId: Number(i)
    };
    UiManager_1.UiManager.OpenView("FishingTechRootView", e);
    this.Finish();
  }
}
exports.SkipToFishingTech = SkipToFishingTech;
//# sourceMappingURL=SkipToFishingTech.js.map