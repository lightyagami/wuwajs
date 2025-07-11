"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerInput = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerInput {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayerInput(t, e) {
    return (e || new PlayerInput()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayerInput(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayerInput()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  input() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPlayerInput(t) {
    t.startObject(1);
  }
  static addInput(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static endPlayerInput(t) {
    return t.endObject();
  }
  static createPlayerInput(t, e) {
    PlayerInput.startPlayerInput(t);
    PlayerInput.addInput(t, e);
    return PlayerInput.endPlayerInput(t);
  }
}
exports.PlayerInput = PlayerInput;
//# sourceMappingURL=player-input.js.map