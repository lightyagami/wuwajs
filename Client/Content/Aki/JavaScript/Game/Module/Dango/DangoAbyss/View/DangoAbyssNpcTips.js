"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssNpcTips = undefined;
const GenericPromptFloatTipsBase_1 = require("../../../GenericPrompt/View/GenericPromptFloatTipsBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssNpcTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  SetMainText() {
    if (this.Data.MainTextObj) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.ExtraText, this.Data.MainTextObj.TextKey);
      this.ExtraText.SetUIActive(true);
    }
  }
  SetExtraText() {}
}
exports.DangoAbyssNpcTips = DangoAbyssNpcTips;
//# sourceMappingURL=DangoAbyssNpcTips.js.map