"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitOrbitalCamera = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExitOrbitalCamera {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsExitOrbitalCamera(t, r) {
    return (r || new ExitOrbitalCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExitOrbitalCamera(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ExitOrbitalCamera()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startExitOrbitalCamera(t) {
    t.startObject(0);
  }
  static endExitOrbitalCamera(t) {
    return t.endObject();
  }
  static createExitOrbitalCamera(t) {
    ExitOrbitalCamera.startExitOrbitalCamera(t);
    return ExitOrbitalCamera.endExitOrbitalCamera(t);
  }
}
exports.ExitOrbitalCamera = ExitOrbitalCamera;
//# sourceMappingURL=exit-orbital-camera.js.map