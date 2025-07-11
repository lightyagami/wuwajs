"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToMoonChasingBase = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipToMoonChasingBase extends SkipTask_1.SkipTask {
  CheckMainViewOpen() {
    return UiManager_1.UiManager.GetViewByName("MoonChasingMainView") !== undefined;
  }
  SkipToMap(e) {
    var e = ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(e);
    if (e !== undefined) {
      e = {
        MarkId: e.FocusMarkId,
        MarkType: 6
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
    }
  }
}
exports.SkipToMoonChasingBase = SkipToMoonChasingBase;
//# sourceMappingURL=SkipToMoonChasingBase.js.map