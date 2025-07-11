"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DaolingAuthentication = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DaolingAuthentication {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDaolingAuthentication(t, i) {
    return (i || new DaolingAuthentication()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDaolingAuthentication(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DaolingAuthentication()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startDaolingAuthentication(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endDaolingAuthentication(t) {
    return t.endObject();
  }
  static createDaolingAuthentication(t, i) {
    DaolingAuthentication.startDaolingAuthentication(t);
    DaolingAuthentication.addType(t, i);
    return DaolingAuthentication.endDaolingAuthentication(t);
  }
}
exports.DaolingAuthentication = DaolingAuthentication;
//# sourceMappingURL=daoling-authentication.js.map