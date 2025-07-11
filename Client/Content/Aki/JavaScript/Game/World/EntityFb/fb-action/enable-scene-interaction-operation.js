"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSceneInteractionOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSceneInteractionOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnableSceneInteractionOperation(e, t) {
    return (t || new EnableSceneInteractionOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnableSceneInteractionOperation(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnableSceneInteractionOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startEnableSceneInteractionOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEnableSceneInteractionOperation(e) {
    return e.endObject();
  }
  static createEnableSceneInteractionOperation(e, t) {
    EnableSceneInteractionOperation.startEnableSceneInteractionOperation(e);
    EnableSceneInteractionOperation.addType(e, t);
    return EnableSceneInteractionOperation.endEnableSceneInteractionOperation(e);
  }
}
exports.EnableSceneInteractionOperation = EnableSceneInteractionOperation;
//# sourceMappingURL=enable-scene-interaction-operation.js.map