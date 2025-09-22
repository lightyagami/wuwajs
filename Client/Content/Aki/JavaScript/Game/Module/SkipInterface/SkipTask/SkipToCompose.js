"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToCompose = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ComposeDefine_1 = require("../../Manufacture/Compose/ComposeDefine");
const SkipTask_1 = require("./SkipTask");
class SkipToCompose extends SkipTask_1.SkipTask {
  OnRun(e, n, i, a) {
    var r;
    var e = Number(e);
    if (UiManager_1.UiManager.IsViewShow("ComposeCarryOnView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeSwitchType, e, a);
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
    } else {
      (r = new ComposeDefine_1.ComposeViewOpenData()).Type = e;
      if (ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem) {
        r.SelectData = ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem;
      } else {
        r.SelectData = {
          ItemId: a,
          IncId: 0,
          Count: 0,
          SelectedCount: 0
        };
      }
      UiManager_1.UiManager.OpenView("ComposeCarryOnView", r);
      ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = undefined;
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
      this.Finish();
    }
  }
}
exports.SkipToCompose = SkipToCompose;
//# sourceMappingURL=SkipToCompose.js.map