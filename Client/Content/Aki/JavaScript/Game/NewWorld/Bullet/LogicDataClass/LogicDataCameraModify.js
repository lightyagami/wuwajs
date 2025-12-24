"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataCameraModify extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.Player = 0;
    this.Tag = undefined;
    this.Duration = -0;
    this.BlendIn = -0;
    this.BlendOut = -0;
    this.BlendOutInterrupt = -0;
    this.ModifierSettings = undefined;
    this.ClientType = 0;
    this.CameraAttachSocket = "CameraPosition";
    this.Conditions = undefined;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataCameraModify;
//# sourceMappingURL=LogicDataCameraModify.js.map