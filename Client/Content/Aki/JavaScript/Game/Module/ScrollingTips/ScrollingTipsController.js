"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollingTipsController = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class ScrollingTipsController extends UiControllerBase_1.UiControllerBase {
  static ShowTipsById(e, ...r) {
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(e);
    e = new LguiUtil_1.TableTextArgNew(e);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, e, undefined, r);
  }
  static ShowTipsByText(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
  }
  static ShowTipsByTextId(e, ...r) {
    e = new LguiUtil_1.TableTextArgNew(e);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, e, undefined, r);
  }
}
exports.ScrollingTipsController = ScrollingTipsController;
//# sourceMappingURL=ScrollingTipsController.js.map