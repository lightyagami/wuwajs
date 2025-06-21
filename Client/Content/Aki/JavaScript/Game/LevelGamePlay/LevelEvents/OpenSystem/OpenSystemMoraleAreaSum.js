"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpenSystemMoraleAreaSum = void 0;
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMoraleAreaSum extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, a) {
    return e && (0 === e.BoardId ? await UiManager_1.UiManager.OpenViewAsync("MoraleAreaSumView", {
      StartSequenceName: "Occupy"
    }) : await UiManager_1.UiManager.OpenViewAsync("MoraleAreaSumView")), !0
  }
  GetViewName(e, a) {
    return "MoraleAreaSumView"
  }
}
exports.OpenSystemMoraleAreaSum = OpenSystemMoraleAreaSum;
//# sourceMappingURL=OpenSystemMoraleAreaSum.js.map