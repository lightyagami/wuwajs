"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupAiComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_group_ai_option_js_1 = require("../fb-component/union-group-ai-option.js");
class GroupAiComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGroupAiComponent(t, i) {
    return (i || new GroupAiComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGroupAiComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GroupAiComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entities(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_group_ai_option_js_1.UnionGroupAiOption.NONE;
    }
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startGroupAiComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addEntities(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntitiesVector(i, o) {
    i.startVector(4, o.length, 4);
    for (let t = o.length - 1; t >= 0; t--) {
      i.addInt32(o[t]);
    }
    return i.endVector();
  }
  static startEntitiesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addOptionType(t, i) {
    t.addFieldInt8(2, i, union_group_ai_option_js_1.UnionGroupAiOption.NONE);
  }
  static addOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endGroupAiComponent(t) {
    return t.endObject();
  }
  static createGroupAiComponent(t, i, o, n, s) {
    GroupAiComponent.startGroupAiComponent(t);
    GroupAiComponent.addDisabled(t, i);
    GroupAiComponent.addEntities(t, o);
    GroupAiComponent.addOptionType(t, n);
    GroupAiComponent.addOption(t, s);
    return GroupAiComponent.endGroupAiComponent(t);
  }
}
exports.GroupAiComponent = GroupAiComponent;
//# sourceMappingURL=group-ai-component.js.map