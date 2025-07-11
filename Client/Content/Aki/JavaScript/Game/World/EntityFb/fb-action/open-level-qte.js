"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenLevelQte = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class OpenLevelQte {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsOpenLevelQte(e, t) {
    return (t || new OpenLevelQte()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsOpenLevelQte(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new OpenLevelQte()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  levelQteEntityType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  levelQteEntity(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startOpenLevelQte(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addLevelQteEntityType(e, t) {
    e.addFieldInt8(1, t, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addLevelQteEntity(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endOpenLevelQte(e) {
    return e.endObject();
  }
  static createOpenLevelQte(e, t, i, s) {
    OpenLevelQte.startOpenLevelQte(e);
    OpenLevelQte.addType(e, t);
    OpenLevelQte.addLevelQteEntityType(e, i);
    OpenLevelQte.addLevelQteEntity(e, s);
    return OpenLevelQte.endOpenLevelQte(e);
  }
}
exports.OpenLevelQte = OpenLevelQte;
//# sourceMappingURL=open-level-qte.js.map