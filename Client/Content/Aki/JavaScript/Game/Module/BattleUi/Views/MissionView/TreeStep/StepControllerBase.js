"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepControllerBase = undefined;
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class StepControllerBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ShowData = undefined;
    this.Config = undefined;
  }
  CheckTextVisible() {
    return true;
  }
  OnTick(e) {}
  async OnConfigRefresh(e, s) {
    this.ShowData = e;
    this.Config = s;
  }
}
exports.StepControllerBase = StepControllerBase;
//# sourceMappingURL=StepControllerBase.js.map