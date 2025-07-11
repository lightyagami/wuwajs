"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectTrigger = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DetectTrigger {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsDetectTrigger(e, t) {
    return (t || new DetectTrigger()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDetectTrigger(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DetectTrigger()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startDetectTrigger(e) {
    e.startObject(0);
  }
  static endDetectTrigger(e) {
    return e.endObject();
  }
  static createDetectTrigger(e) {
    DetectTrigger.startDetectTrigger(e);
    return DetectTrigger.endDetectTrigger(e);
  }
}
exports.DetectTrigger = DetectTrigger;
//# sourceMappingURL=detect-trigger.js.map