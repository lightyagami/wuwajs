"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReboundComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_rebound_option_js_1 = require("../fb-component/union-rebound-option.js");
class ReboundComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsReboundComponent(t, n) {
    return (n || new ReboundComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsReboundComponent(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new ReboundComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_rebound_option_js_1.UnionReboundOption.NONE;
    }
  }
  option(t) {
    var n = this.bb.__offset(this.bb_pos, 10);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startReboundComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addBulletId(t, n) {
    t.addFieldInt64(1, n, BigInt("0"));
  }
  static addOptionType(t, n) {
    t.addFieldInt8(2, n, union_rebound_option_js_1.UnionReboundOption.NONE);
  }
  static addOption(t, n) {
    t.addFieldOffset(3, n, 0);
  }
  static endReboundComponent(t) {
    return t.endObject();
  }
  static createReboundComponent(t, n, o, e, i) {
    ReboundComponent.startReboundComponent(t);
    ReboundComponent.addDisabled(t, n);
    ReboundComponent.addBulletId(t, o);
    ReboundComponent.addOptionType(t, e);
    ReboundComponent.addOption(t, i);
    return ReboundComponent.endReboundComponent(t);
  }
}
exports.ReboundComponent = ReboundComponent;
//# sourceMappingURL=rebound-component.js.map