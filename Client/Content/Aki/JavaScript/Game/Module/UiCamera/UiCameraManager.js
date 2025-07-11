"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraManager = undefined;
const UiCamera_1 = require("./UiCamera");
class UiCameraManager {
  static Initialize() {}
  static Clear() {
    this.XUo?.Destroy();
    this.XUo = undefined;
  }
  static Get() {
    if (!this.XUo) {
      this.XUo = new UiCamera_1.UiCamera();
      this.XUo.Initialize();
    }
    return this.XUo;
  }
  static Destroy(t = 0, i = 0, e = 0) {
    this.XUo?.Destroy(t, i, e);
    this.XUo = undefined;
  }
}
(exports.UiCameraManager = UiCameraManager).XUo = undefined;
//# sourceMappingURL=UiCameraManager.js.map