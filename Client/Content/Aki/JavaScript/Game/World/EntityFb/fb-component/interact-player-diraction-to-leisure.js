"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractPlayerDiractionToLeisure = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractPlayerDiractionToLeisure {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsInteractPlayerDiractionToLeisure(t, e) {
    return (e || new InteractPlayerDiractionToLeisure()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractPlayerDiractionToLeisure(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new InteractPlayerDiractionToLeisure()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  begin() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  end() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInteractPlayerDiractionToLeisure(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBegin(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addEnd(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endInteractPlayerDiractionToLeisure(t) {
    return t.endObject();
  }
  static createInteractPlayerDiractionToLeisure(t, e, r, i) {
    InteractPlayerDiractionToLeisure.startInteractPlayerDiractionToLeisure(t);
    InteractPlayerDiractionToLeisure.addType(t, e);
    InteractPlayerDiractionToLeisure.addBegin(t, r);
    InteractPlayerDiractionToLeisure.addEnd(t, i);
    return InteractPlayerDiractionToLeisure.endInteractPlayerDiractionToLeisure(t);
  }
}
exports.InteractPlayerDiractionToLeisure = InteractPlayerDiractionToLeisure;
//# sourceMappingURL=interact-player-diraction-to-leisure.js.map