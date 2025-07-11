"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToComposeExchange = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ComposeDefine_1 = require("../../Manufacture/Compose/ComposeDefine");
const SkipTask_1 = require("./SkipTask");
class SkipToComposeExchange extends SkipTask_1.SkipTask {
  OnRun(e, i, n, a) {
    if (UiManager_1.UiManager.IsViewShow("ComposeCarryOnView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeSwitchType, 4, a);
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
    } else {
      (a = new ComposeDefine_1.ComposeViewOpenData()).Type = 4;
      a.SelectData = ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem;
      UiManager_1.UiManager.OpenView("ComposeCarryOnView", a);
      ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = undefined;
      if (UiManager_1.UiManager.IsViewShow("ItemTipsView")) {
        UiManager_1.UiManager.CloseView("ItemTipsView");
      }
      this.Finish();
    }
  }
}
exports.SkipToComposeExchange = SkipToComposeExchange;
//# sourceMappingURL=SkipToComposeExchange.js.map