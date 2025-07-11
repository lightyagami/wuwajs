"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcStandbySit = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcStandbySit {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsNpcStandbySit(t, i) {
    return (i || new NpcStandbySit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcStandbySit(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new NpcStandbySit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  montage(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  registeredMontageId(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  faceExpressionId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  posEntityId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startNpcStandbySit(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMontage(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRegisteredMontageId(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addFaceExpressionId(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addPosEntityId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endNpcStandbySit(t) {
    return t.endObject();
  }
}
exports.NpcStandbySit = NpcStandbySit;
//# sourceMappingURL=npc-standby-sit.js.map