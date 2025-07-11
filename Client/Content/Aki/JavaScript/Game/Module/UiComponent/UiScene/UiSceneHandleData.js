"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSceneHandleData = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class UiSceneHandleData {
  constructor() {
    this.Cxo = undefined;
    this.CustomPromise = new CustomPromise_1.CustomPromise();
  }
  SetSequence(e) {
    this.Cxo = e;
  }
  DestroyUiCameraSequence() {
    this.Cxo?.DestroyUiCameraSequence();
    this.Cxo = undefined;
  }
}
exports.UiSceneHandleData = UiSceneHandleData;
//# sourceMappingURL=UiSceneHandleData.js.map