"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraSubModeController = undefined;
class CameraSubModeController {
  Start() {
    this.OnStart();
  }
  Tick(t) {
    this.OnTick(t);
  }
  AfterTick(t) {
    this.OnAfterTick(t);
  }
  End() {
    this.OnEnd();
  }
  OnStart() {}
  OnTick(t) {}
  OnAfterTick(t) {}
  OnEnd() {}
}
exports.CameraSubModeController = CameraSubModeController;
//# sourceMappingURL=CameraSubModeController.js.map