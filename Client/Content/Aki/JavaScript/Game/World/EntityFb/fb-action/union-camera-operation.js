"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionCameraOperation = exports.unionToUnionCameraOperation = exports.UnionCameraOperation = undefined;
const disable_camera_operation_js_1 = require("../fb-action/disable-camera-operation.js");
const enable_camera_operation_js_1 = require("../fb-action/enable-camera-operation.js");
var UnionCameraOperation;
function unionToUnionCameraOperation(e, a) {
  switch (UnionCameraOperation[e]) {
    case "NONE":
      return;
    case "DisableCameraOperation":
      return a(new disable_camera_operation_js_1.DisableCameraOperation());
    case "EnableCameraOperation":
      return a(new enable_camera_operation_js_1.EnableCameraOperation());
    default:
      return;
  }
}
function unionListToUnionCameraOperation(e, a, n) {
  switch (UnionCameraOperation[e]) {
    case "NONE":
      return;
    case "DisableCameraOperation":
      return a(n, new disable_camera_operation_js_1.DisableCameraOperation());
    case "EnableCameraOperation":
      return a(n, new enable_camera_operation_js_1.EnableCameraOperation());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.DisableCameraOperation = 1] = "DisableCameraOperation";
  e[e.EnableCameraOperation = 2] = "EnableCameraOperation";
})(UnionCameraOperation = exports.UnionCameraOperation ||= {});
exports.unionToUnionCameraOperation = unionToUnionCameraOperation;
exports.unionListToUnionCameraOperation = unionListToUnionCameraOperation; //# sourceMappingURL=union-camera-operation.js.map