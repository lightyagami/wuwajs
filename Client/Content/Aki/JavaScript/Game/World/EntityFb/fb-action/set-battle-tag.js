"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetBattleTag = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const set_entity_tag_js_1 = require("../fb-action/set-entity-tag.js");
class SetBattleTag {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetBattleTag(t, e) {
    return (e || new SetBattleTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetBattleTag(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetBattleTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  setTags(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (e || new set_entity_tag_js_1.SetEntityTag()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  setTagsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSetBattleTag(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSetTags(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createSetTagsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startSetTagsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endSetBattleTag(t) {
    return t.endObject();
  }
  static createSetBattleTag(t, e, s) {
    SetBattleTag.startSetBattleTag(t);
    SetBattleTag.addType(t, e);
    SetBattleTag.addSetTags(t, s);
    return SetBattleTag.endSetBattleTag(t);
  }
}
exports.SetBattleTag = SetBattleTag;
//# sourceMappingURL=set-battle-tag.js.map