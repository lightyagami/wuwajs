"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraData = undefined;
const FbFlowTemplateMode_1 = require("./FbFlowTemplateMode");
const FbSetCameraAnim_1 = require("./FbSetCameraAnim");
class FbCameraData {
  constructor(t) {
    this.FbDataInternal = t;
    this.Ygh = false;
    this.zgh = undefined;
    this.Jgh = false;
    this.Zgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCameraData(t);
    }
  }
  get Camera() {
    if (!this.Ygh) {
      this.Ygh = true;
      this.zgh = FbFlowTemplateMode_1.FbFlowTemplateMode.Create(this.FbDataInternal.camera());
    }
    return this.zgh;
  }
  get CameraAnim() {
    if (!this.Jgh) {
      this.Jgh = true;
      this.Zgh = FbSetCameraAnim_1.FbSetCameraAnim.Create(this.FbDataInternal.cameraAnim());
    }
    return this.Zgh;
  }
}
exports.FbCameraData = FbCameraData;
//# sourceMappingURL=FbCameraData.js.map