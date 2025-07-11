"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemPhonograph = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class OpenSystemPhonograph extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e.GramophoneId) {
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayActorEntityId = e.GramophoneId;
    }
    e = ConfigManager_1.ConfigManager.PhonographConfig.GetUnlockItemIds();
    if (e.length > 0) {
      return ControllerHolder_1.ControllerHolder.PhonographController.UnlockMusicRequest(e);
    } else {
      return (await UiManager_1.UiManager.OpenViewAsync("PhonographView")) !== undefined;
    }
  }
  GetViewName(e) {
    if (ConfigManager_1.ConfigManager.PhonographConfig.GetUnlockItemIds().length > 0) {
      return "PhonographNewMusicView";
    } else {
      return "PhonographView";
    }
  }
}
exports.OpenSystemPhonograph = OpenSystemPhonograph;
//# sourceMappingURL=OpenSystemPhonograph.js.map