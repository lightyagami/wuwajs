"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectEffectModifyTipText = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemInspectEffectBase_1 = require("./ItemInspectEffectBase");
class ItemInspectEffectModifyTipText extends ItemInspectEffectBase_1.ItemInspectEffectBase {
  Execute(e) {
    var t = ModelManager_1.ModelManager.ItemInspectModel.GetViewName();
    if (t) {
      if (t) {
        UiManager_1.UiManager.GetViewByName(t)?.ExecuteModifyTipText(e.TipText, () => {
          this.FinishExecute(true);
        });
      }
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.ItemInspectEffectModifyTipText = ItemInspectEffectModifyTipText;
//# sourceMappingURL=ItemInspectEffectModifyTipText.js.map