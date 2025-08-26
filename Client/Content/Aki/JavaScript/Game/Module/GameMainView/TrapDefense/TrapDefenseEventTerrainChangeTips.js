"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseEventTerrainChangeTips = undefined;
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class TrapDefenseEventTerrainChangeTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnStart() {
    this.Data = this.OpenParam;
  }
  OnFinishShowImplementImplementImplement() {
    this.CloseMe();
  }
  OnBeforeDestroy() {
    var e = this.Data?.Callback;
    if (e) {
      e();
    }
  }
}
exports.TrapDefenseEventTerrainChangeTips = TrapDefenseEventTerrainChangeTips;
//# sourceMappingURL=TrapDefenseEventTerrainChangeTips.js.map