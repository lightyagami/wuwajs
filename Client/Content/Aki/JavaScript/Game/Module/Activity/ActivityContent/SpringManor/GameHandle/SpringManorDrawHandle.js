"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorDrawHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
class SpringManorDrawHandle {
  GetCurrentProgress() {
    var e = ModelManager_1.ModelManager.SpringManorModel?.ActivityData?.Id;
    if (!e) {
      return 0;
    }
    let r = 0;
    ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(e, 0)?.BookItemIds.forEach(e => {
      if (ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetBookItemStateById(e) === 2) {
        r++;
      }
    });
    ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(e, 1)?.BookItemIds.forEach(e => {
      if (ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetBookItemStateById(e) === 2) {
        r++;
      }
    });
    return r;
  }
  GetTotalProgress() {
    var e = ModelManager_1.ModelManager.SpringManorModel?.ActivityData?.Id;
    if (e) {
      return (ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(e, 0)?.BookItemIds.length ?? 0) + (ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureByActivityAndType(e, 1)?.BookItemIds.length ?? 0);
    } else {
      return 0;
    }
  }
  EnterGame() {
    UiManager_1.UiManager.OpenView("Spring26AlbumView", {
      OpenTab: 0
    });
  }
  GetRedDotName() {
    return "SpringManorAlbumReward";
  }
}
exports.SpringManorDrawHandle = SpringManorDrawHandle;
//# sourceMappingURL=SpringManorDrawHandle.js.map