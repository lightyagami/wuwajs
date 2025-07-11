"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeisureInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_leisure_interact_option_js_1 = require("../fb-action/union-leisure-interact-option.js");
class LeisureInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLeisureInteract(t, e) {
    return (e || new LeisureInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLeisureInteract(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LeisureInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_leisure_interact_option_js_1.UnionLeisureInteractOption.NONE;
    }
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  sceneEntity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startLeisureInteract(t) {
    t.startObject(3);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(0, e, union_leisure_interact_option_js_1.UnionLeisureInteractOption.NONE);
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSceneEntity(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endLeisureInteract(t) {
    return t.endObject();
  }
  static createLeisureInteract(t, e, i, r) {
    LeisureInteract.startLeisureInteract(t);
    LeisureInteract.addOptionType(t, e);
    LeisureInteract.addOption(t, i);
    LeisureInteract.addSceneEntity(t, r);
    return LeisureInteract.endLeisureInteract(t);
  }
}
exports.LeisureInteract = LeisureInteract;
//# sourceMappingURL=leisure-interact.js.map