"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFragmentMemory = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFragmentMemory extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e.BoardId) {
      return false;
    }
    const s = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("MemoryDetailView", e.BoardId, () => {
      s.SetResult(true);
    });
    return s.Promise;
  }
  GetViewName(e) {
    return "MemoryDetailView";
  }
}
exports.OpenSystemFragmentMemory = OpenSystemFragmentMemory;
//# sourceMappingURL=OpenSystemFragmentMemory.js.map