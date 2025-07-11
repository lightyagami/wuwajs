"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventBvbPlayDialog = undefined;
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventBvbPlayDialog extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    var t;
    if (e) {
      if (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView")) {
        t.OpenParam.DialogManager.NotifyDialogType(e.DialogType);
      } else if (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView")) {
        t.OpenParam.DialogManager.NotifyDialogType(e.DialogType);
      }
    }
    this.FinishExecute(true);
  }
}
exports.LevelEventBvbPlayDialog = LevelEventBvbPlayDialog;
//# sourceMappingURL=LevelEventBvbPlayDialog.js.map