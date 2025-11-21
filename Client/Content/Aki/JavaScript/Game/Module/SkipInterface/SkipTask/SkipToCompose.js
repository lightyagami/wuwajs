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
  OnRun(e, n, a, i) {
    var o;
    var e = Number(e);
    if (UiManager_1.UiManager.IsViewShow("ComposeCarryOnView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeSwitchType, e, i);
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
    } else {
      (o = new ComposeDefine_1.ComposeViewOpenData()).Type = e;
      o.SkipSourceView = ModelManager_1.ModelManager.ComposeModel.ComposeSkipSourceView;
      if (ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem) {
        o.SelectData = ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem;
      } else {
        o.SelectData = {
          ItemId: i,
          IncId: 0,
          Count: 0,
          SelectedCount: 0
        };
      }
      UiManager_1.UiManager.OpenView("ComposeCarryOnView", o);
      ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = undefined;
      ModelManager_1.ModelManager.ComposeModel.ComposeSkipSourceView = undefined;
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
      this.Finish();
    }
  }
}
exports.SkipToCompose = SkipToCompose;
//# sourceMappingURL=SkipToCompose.js.map