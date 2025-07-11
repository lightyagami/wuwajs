"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOptionPreOption = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TalkOptionPreOption {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTalkOptionPreOption(t, i) {
    return (i || new TalkOptionPreOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkOptionPreOption(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TalkOptionPreOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  preOptions(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  preOptionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  preOptionsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startTalkOptionPreOption(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPreOptions(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPreOptionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addInt32(r[t]);
    }
    return i.endVector();
  }
  static startPreOptionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endTalkOptionPreOption(t) {
    return t.endObject();
  }
  static createTalkOptionPreOption(t, i, r) {
    TalkOptionPreOption.startTalkOptionPreOption(t);
    TalkOptionPreOption.addType(t, i);
    TalkOptionPreOption.addPreOptions(t, r);
    return TalkOptionPreOption.endTalkOptionPreOption(t);
  }
}
exports.TalkOptionPreOption = TalkOptionPreOption;
//# sourceMappingURL=talk-option-pre-option.js.map