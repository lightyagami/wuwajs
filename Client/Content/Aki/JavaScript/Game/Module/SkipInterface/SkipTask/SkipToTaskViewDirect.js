"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToTaskViewDirect = undefined;
const MoonChasingController_1 = require("../../Activity/ActivityContent/MoonChasing/Main/MoonChasingController");
const SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToTaskViewDirect extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun(o) {
    if (this.CheckMainViewOpen()) {
      MoonChasingController_1.MoonChasingController.OpenTaskView();
    } else {
      this.SkipToMap(parseInt(o));
    }
  }
}
exports.SkipToTaskViewDirect = SkipToTaskViewDirect;
//# sourceMappingURL=SkipToTaskViewDirect.js.map