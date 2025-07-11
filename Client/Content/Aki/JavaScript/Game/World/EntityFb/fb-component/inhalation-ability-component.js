"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InhalationAbilityComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const inhalation_config_js_1 = require("../fb-component/inhalation-config.js");
class InhalationAbilityComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInhalationAbilityComponent(t, i) {
    return (i || new InhalationAbilityComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInhalationAbilityComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new InhalationAbilityComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  inhalationConfigs(t, i) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return (i || new inhalation_config_js_1.InhalationConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  inhalationConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInhalationAbilityComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addInhalationConfigs(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createInhalationConfigsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      i.addOffset(n[t]);
    }
    return i.endVector();
  }
  static startInhalationConfigsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endInhalationAbilityComponent(t) {
    return t.endObject();
  }
  static createInhalationAbilityComponent(t, i, n) {
    InhalationAbilityComponent.startInhalationAbilityComponent(t);
    InhalationAbilityComponent.addDisabled(t, i);
    InhalationAbilityComponent.addInhalationConfigs(t, n);
    return InhalationAbilityComponent.endInhalationAbilityComponent(t);
  }
}
exports.InhalationAbilityComponent = InhalationAbilityComponent;
//# sourceMappingURL=inhalation-ability-component.js.map