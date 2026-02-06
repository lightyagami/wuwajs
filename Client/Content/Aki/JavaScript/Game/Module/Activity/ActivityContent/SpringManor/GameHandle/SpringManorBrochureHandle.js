"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorBrochureHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
class SpringManorBrochureHandle {
  GetCurrentProgress() {
    var r = ModelManager_1.ModelManager.SpringManorModel?.ActivityData?.Id;
    if (!r) {
      return 0;
    }
    let e = 0;
    ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(r, 2)?.BookItemIds.forEach(r => {
      if (ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetBookItemStateById(r) === 2) {
        e++;
      }
    });
    return e;
  }
  GetTotalProgress() {
    var r = ModelManager_1.ModelManager.SpringManorModel?.ActivityData?.Id;
    if (r) {
      return ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(r, 2)?.BookItemIds.length ?? 0;
    } else {
      return 0;
    }
  }
  EnterGame() {
    UiManager_1.UiManager.OpenView("Spring26BrochureView");
  }
  GetRedDotName() {
    return "SpringManorBrochureReward";
  }
}
exports.SpringManorBrochureHandle = SpringManorBrochureHandle;
//# sourceMappingURL=SpringManorBrochureHandle.js.map