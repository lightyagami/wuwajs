"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToInfrastructureMainView = undefined;
const InfrastructureController_1 = require("../../Infrastructure/InfrastructureController");
const SkipTask_1 = require("./SkipTask");
class SkipToInfrastructureMainView extends SkipTask_1.SkipTask {
  OnRun() {
    InfrastructureController_1.InfrastructureController.OpenInfrastructureMainView();
    this.Finish();
  }
}
exports.SkipToInfrastructureMainView = SkipToInfrastructureMainView;
//# sourceMappingURL=SkipToInfrastructureMainView.js.map