"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadPhantomCharacterForSkill = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PreloadPhantomCharacterForSkill {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsPreloadPhantomCharacterForSkill(r, t) {
    return (t || new PreloadPhantomCharacterForSkill()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsPreloadPhantomCharacterForSkill(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PreloadPhantomCharacterForSkill()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  id() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.readInt32(this.bb_pos + r);
    } else {
      return 0;
    }
  }
  static startPreloadPhantomCharacterForSkill(r) {
    r.startObject(2);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addId(r, t) {
    r.addFieldInt32(1, t, 0);
  }
  static endPreloadPhantomCharacterForSkill(r) {
    return r.endObject();
  }
  static createPreloadPhantomCharacterForSkill(r, t, a) {
    PreloadPhantomCharacterForSkill.startPreloadPhantomCharacterForSkill(r);
    PreloadPhantomCharacterForSkill.addType(r, t);
    PreloadPhantomCharacterForSkill.addId(r, a);
    return PreloadPhantomCharacterForSkill.endPreloadPhantomCharacterForSkill(r);
  }
}
exports.PreloadPhantomCharacterForSkill = PreloadPhantomCharacterForSkill;
//# sourceMappingURL=preload-phantom-character-for-skill.js.map