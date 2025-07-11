"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasserbyNpcTemplateSource = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PasserbyNpcTemplateSource {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPasserbyNpcTemplateSource(e, t) {
    return (t || new PasserbyNpcTemplateSource()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPasserbyNpcTemplateSource(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PasserbyNpcTemplateSource()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  templateIds(e, t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + e * 4, t);
    } else {
      return undefined;
    }
  }
  templateIdsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startPasserbyNpcTemplateSource(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTemplateIds(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createTemplateIdsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let e = s.length - 1; e >= 0; e--) {
      t.addOffset(s[e]);
    }
    return t.endVector();
  }
  static startTemplateIdsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endPasserbyNpcTemplateSource(e) {
    return e.endObject();
  }
  static createPasserbyNpcTemplateSource(e, t, s) {
    PasserbyNpcTemplateSource.startPasserbyNpcTemplateSource(e);
    PasserbyNpcTemplateSource.addType(e, t);
    PasserbyNpcTemplateSource.addTemplateIds(e, s);
    return PasserbyNpcTemplateSource.endPasserbyNpcTemplateSource(e);
  }
}
exports.PasserbyNpcTemplateSource = PasserbyNpcTemplateSource;
//# sourceMappingURL=passerby-npc-template-source.js.map