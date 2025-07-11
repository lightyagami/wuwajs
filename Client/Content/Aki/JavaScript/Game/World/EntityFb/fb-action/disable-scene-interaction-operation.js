"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableSceneInteractionOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DisableSceneInteractionOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsDisableSceneInteractionOperation(e, t) {
    return (t || new DisableSceneInteractionOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsDisableSceneInteractionOperation(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new DisableSceneInteractionOperation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startDisableSceneInteractionOperation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endDisableSceneInteractionOperation(e) {
    return e.endObject();
  }
  static createDisableSceneInteractionOperation(e, t) {
    DisableSceneInteractionOperation.startDisableSceneInteractionOperation(e);
    DisableSceneInteractionOperation.addType(e, t);
    return DisableSceneInteractionOperation.endDisableSceneInteractionOperation(e);
  }
}
exports.DisableSceneInteractionOperation = DisableSceneInteractionOperation;
//# sourceMappingURL=disable-scene-interaction-operation.js.map