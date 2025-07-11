"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadTrialCharacterForSkill = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const character_group_new_js_1 = require("../fb-action/character-group-new.js");
class PreloadTrialCharacterForSkill {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsPreloadTrialCharacterForSkill(r, t) {
    return (t || new PreloadTrialCharacterForSkill()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsPreloadTrialCharacterForSkill(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PreloadTrialCharacterForSkill()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  characterGroupNew(r, t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return (t || new character_group_new_js_1.CharacterGroupNew()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + r * 4), this.bb);
    } else {
      return undefined;
    }
  }
  characterGroupNewLength() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__vector_len(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  static startPreloadTrialCharacterForSkill(r) {
    r.startObject(2);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addCharacterGroupNew(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static createCharacterGroupNewVector(t, a) {
    t.startVector(4, a.length, 4);
    for (let r = a.length - 1; r >= 0; r--) {
      t.addOffset(a[r]);
    }
    return t.endVector();
  }
  static startCharacterGroupNewVector(r, t) {
    r.startVector(4, t, 4);
  }
  static endPreloadTrialCharacterForSkill(r) {
    return r.endObject();
  }
  static createPreloadTrialCharacterForSkill(r, t, a) {
    PreloadTrialCharacterForSkill.startPreloadTrialCharacterForSkill(r);
    PreloadTrialCharacterForSkill.addType(r, t);
    PreloadTrialCharacterForSkill.addCharacterGroupNew(r, a);
    return PreloadTrialCharacterForSkill.endPreloadTrialCharacterForSkill(r);
  }
}
exports.PreloadTrialCharacterForSkill = PreloadTrialCharacterForSkill;
//# sourceMappingURL=preload-trial-character-for-skill.js.map