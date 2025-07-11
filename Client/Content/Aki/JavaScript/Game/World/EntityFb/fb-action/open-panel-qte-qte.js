"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenPanelQteQte = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenPanelQteQte {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsOpenPanelQteQte(e, t) {
    return (t || new OpenPanelQteQte()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsOpenPanelQteQte(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new OpenPanelQteQte()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startOpenPanelQteQte(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endOpenPanelQteQte(e) {
    return e.endObject();
  }
  static createOpenPanelQteQte(e, t, n) {
    OpenPanelQteQte.startOpenPanelQteQte(e);
    OpenPanelQteQte.addType(e, t);
    OpenPanelQteQte.addId(e, n);
    return OpenPanelQteQte.endOpenPanelQteQte(e);
  }
}
exports.OpenPanelQteQte = OpenPanelQteQte;
//# sourceMappingURL=open-panel-qte-qte.js.map