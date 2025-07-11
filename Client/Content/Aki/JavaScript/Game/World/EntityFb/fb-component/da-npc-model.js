"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DaNpcModel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DaNpcModel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDaNpcModel(t, e) {
    return (e || new DaNpcModel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDaNpcModel(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DaNpcModel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  da(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startDaNpcModel(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endDaNpcModel(t) {
    return t.endObject();
  }
  static createDaNpcModel(t, e, s) {
    DaNpcModel.startDaNpcModel(t);
    DaNpcModel.addType(t, e);
    DaNpcModel.addDa(t, s);
    return DaNpcModel.endDaNpcModel(t);
  }
}
exports.DaNpcModel = DaNpcModel;
//# sourceMappingURL=da-npc-model.js.map