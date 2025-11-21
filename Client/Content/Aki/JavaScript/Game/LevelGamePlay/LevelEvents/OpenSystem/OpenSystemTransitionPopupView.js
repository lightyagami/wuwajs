"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemTransitionPopupView = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TransitionPopupById_1 = require("../../../../Core/Define/ConfigQuery/TransitionPopupById");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTransitionPopupView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    if (!TransitionPopupById_1.configTransitionPopupById.GetConfig(e.BoardId)) {
      return false;
    }
    var r = this.GetViewName(e);
    const s = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenViewByPlot(r, {
      BoardId: e.BoardId
    }, e => {
      s.SetResult(e);
    });
    await s.Promise;
    return true;
  }
  GetViewName(e) {
    return "TransitionPopupView";
  }
}
exports.OpenSystemTransitionPopupView = OpenSystemTransitionPopupView;
//# sourceMappingURL=OpenSystemTransitionPopupView.js.map