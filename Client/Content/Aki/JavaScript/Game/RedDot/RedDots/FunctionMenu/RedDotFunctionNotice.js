"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFunctionNotice = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionNotice extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewResonanceButton";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh];
  }
  OnCheck() {
    return ControllerHolder_1.ControllerHolder.KuroSdkController.GetPostWebViewRedPointState();
  }
}
exports.RedDotFunctionNotice = RedDotFunctionNotice;
//# sourceMappingURL=RedDotFunctionNotice.js.map