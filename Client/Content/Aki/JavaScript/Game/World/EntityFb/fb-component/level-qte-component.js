"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelQteComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_qte_type_js_1 = require("../fb-component/union-qte-type.js");
class LevelQteComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsLevelQteComponent(e, t) {
    return (t || new LevelQteComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelQteComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new LevelQteComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  qteConfigType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_qte_type_js_1.UnionQteType.NONE;
    }
  }
  qteConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startLevelQteComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addQteConfigType(e, t) {
    e.addFieldInt8(1, t, union_qte_type_js_1.UnionQteType.NONE);
  }
  static addQteConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endLevelQteComponent(e) {
    return e.endObject();
  }
  static createLevelQteComponent(e, t, n, o) {
    LevelQteComponent.startLevelQteComponent(e);
    LevelQteComponent.addDisabled(e, t);
    LevelQteComponent.addQteConfigType(e, n);
    LevelQteComponent.addQteConfig(e, o);
    return LevelQteComponent.endLevelQteComponent(e);
  }
}
exports.LevelQteComponent = LevelQteComponent;
//# sourceMappingURL=level-qte-component.js.map