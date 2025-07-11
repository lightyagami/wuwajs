"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopCameraLookAt = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopCameraLookAt {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsStopCameraLookAt(t, o) {
    return (o || new StopCameraLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStopCameraLookAt(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new StopCameraLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startStopCameraLookAt(t) {
    t.startObject(0);
  }
  static endStopCameraLookAt(t) {
    return t.endObject();
  }
  static createStopCameraLookAt(t) {
    StopCameraLookAt.startStopCameraLookAt(t);
    return StopCameraLookAt.endStopCameraLookAt(t);
  }
}
exports.StopCameraLookAt = StopCameraLookAt;
//# sourceMappingURL=stop-camera-look-at.js.map