"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionPreload = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionPreload extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    if (e && e.Mp4Names) {
      ControllerHolder_1.ControllerHolder.VideoBpController.RemovePreload();
    }
  }
}
exports.GuaranteeActionPreload = GuaranteeActionPreload;
//# sourceMappingURL=GuaranteeActionPreload.js.map