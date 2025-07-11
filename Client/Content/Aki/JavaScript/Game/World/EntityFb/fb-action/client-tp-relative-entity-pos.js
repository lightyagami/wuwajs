"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientTpRelativeEntityPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClientTpRelativeEntityPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsClientTpRelativeEntityPos(t, e) {
    return (e || new ClientTpRelativeEntityPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsClientTpRelativeEntityPos(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ClientTpRelativeEntityPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  sourcePosEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetPosEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startClientTpRelativeEntityPos(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addSourcePosEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addTargetPosEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endClientTpRelativeEntityPos(t) {
    return t.endObject();
  }
  static createClientTpRelativeEntityPos(t, e, i, s) {
    ClientTpRelativeEntityPos.startClientTpRelativeEntityPos(t);
    ClientTpRelativeEntityPos.addType(t, e);
    ClientTpRelativeEntityPos.addSourcePosEntityId(t, i);
    ClientTpRelativeEntityPos.addTargetPosEntityId(t, s);
    return ClientTpRelativeEntityPos.endClientTpRelativeEntityPos(t);
  }
}
exports.ClientTpRelativeEntityPos = ClientTpRelativeEntityPos;
//# sourceMappingURL=client-tp-relative-entity-pos.js.map