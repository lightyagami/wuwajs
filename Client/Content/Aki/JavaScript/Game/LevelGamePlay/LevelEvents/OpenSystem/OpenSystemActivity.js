"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemActivity = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemActivity extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    if (!e) {
      return true;
    }
    const r = new CustomPromise_1.CustomPromise();
    return !!ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(e.BoardId, 4, undefined, e => {
      r.SetResult(e);
    }) && r.Promise;
  }
  GetViewName(e, t) {
    return "CommonActivityView";
  }
}
exports.OpenSystemActivity = OpenSystemActivity;
//# sourceMappingURL=OpenSystemActivity.js.map