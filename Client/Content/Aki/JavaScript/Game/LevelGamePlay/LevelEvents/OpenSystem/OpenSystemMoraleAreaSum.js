"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemMoraleAreaSum = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMoraleAreaSum extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, a) {
    if (e) {
      if (e.BoardId === 0) {
        await UiManager_1.UiManager.OpenViewAsync("MoraleAreaSumView", {
          StartSequenceName: "Occupy"
        });
      } else {
        await UiManager_1.UiManager.OpenViewAsync("MoraleAreaSumView");
      }
    }
    return true;
  }
  GetViewName(e, a) {
    return "MoraleAreaSumView";
  }
}
exports.OpenSystemMoraleAreaSum = OpenSystemMoraleAreaSum;
//# sourceMappingURL=OpenSystemMoraleAreaSum.js.map