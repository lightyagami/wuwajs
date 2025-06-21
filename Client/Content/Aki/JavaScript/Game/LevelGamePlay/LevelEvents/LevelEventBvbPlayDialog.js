"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventBvbPlayDialog = void 0;
const UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventBvbPlayDialog extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    var t;
    e && ((t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView")) ? t.OpenParam.DialogManager.NotifyDialogType(e.DialogType) : (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView")) && t.OpenParam.DialogManager.NotifyDialogType(e.DialogType)), this.FinishExecute(!0)
  }
}
exports.LevelEventBvbPlayDialog = LevelEventBvbPlayDialog;
//# sourceMappingURL=LevelEventBvbPlayDialog.js.map