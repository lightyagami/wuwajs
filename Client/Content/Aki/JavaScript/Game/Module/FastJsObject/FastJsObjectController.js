"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FastJsObjectController = undefined;
const Cpp = require("cpp");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class FastJsObjectController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Cpp.FKuroFastJsObjectCommon.RegisterFastJsObjectCommonInfo("Tuple", "X", "Y", "Z", "Pitch", "Yaw", "Roll");
    Cpp.FFastMoveReplaySample.RegisterMoveReplaySampleInfo("KVn", "Proto_ControllerPitch", "rSs");
    return true;
  }
}
exports.FastJsObjectController = FastJsObjectController;
//# sourceMappingURL=FastJsObjectController.js.map