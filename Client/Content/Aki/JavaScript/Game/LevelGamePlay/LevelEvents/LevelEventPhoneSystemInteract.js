"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPhoneSystemInteract = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPhoneSystemInteract extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    if (e.InteractType.Type === "OpenPhoneMessageBoard") {
      if ((e = e.InteractType.PhoneBoardType.MessageBoardConfig.PhoneMessageId) && (e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(e))) {
        UiManager_1.UiManager.OpenView("PhoneMsgPanelViewBig", e);
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    }
  }
}
exports.LevelEventPhoneSystemInteract = LevelEventPhoneSystemInteract;
//# sourceMappingURL=LevelEventPhoneSystemInteract.js.map