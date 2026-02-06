"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemPhonograph = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPhonograph extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e.GramophoneId) {
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayActorEntityId = e.GramophoneId;
    }
    ModelManager_1.ModelManager.PhonographModel.IsGlobal = e.SetMapMusic ?? false;
    e = ModelManager_1.ModelManager.PhonographModel.GetUnlockItemIds();
    if (e.length > 0) {
      return ControllerHolder_1.ControllerHolder.PhonographController.UnlockMusicRequest(e);
    } else {
      return (await UiManager_1.UiManager.OpenViewAsync("PhonographView")) !== undefined;
    }
  }
  GetViewName(e) {
    if (ModelManager_1.ModelManager.PhonographModel.GetUnlockItemIds().length > 0) {
      return "PhonographNewMusicView";
    } else {
      return "PhonographView";
    }
  }
}
exports.OpenSystemPhonograph = OpenSystemPhonograph;
//# sourceMappingURL=OpenSystemPhonograph.js.map