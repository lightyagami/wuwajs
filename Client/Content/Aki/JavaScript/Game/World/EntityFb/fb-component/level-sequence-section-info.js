"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSequenceSectionInfo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class LevelSequenceSectionInfo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsLevelSequenceSectionInfo(e, t) {
    return (t || new LevelSequenceSectionInfo()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelSequenceSectionInfo(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new LevelSequenceSectionInfo()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  key(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  frameId() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  state(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  actionList(e, t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionListLength() {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startLevelSequenceSectionInfo(e) {
    e.startObject(5);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addKey(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addFrameId(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static addState(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addActionList(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static createActionListVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; e >= 0; e--) {
      t.addOffset(i[e]);
    }
    return t.endVector();
  }
  static startActionListVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endLevelSequenceSectionInfo(e) {
    return e.endObject();
  }
  static createLevelSequenceSectionInfo(e, t, i, n, s, o) {
    LevelSequenceSectionInfo.startLevelSequenceSectionInfo(e);
    LevelSequenceSectionInfo.addType(e, t);
    LevelSequenceSectionInfo.addKey(e, i);
    LevelSequenceSectionInfo.addFrameId(e, n);
    LevelSequenceSectionInfo.addState(e, s);
    LevelSequenceSectionInfo.addActionList(e, o);
    return LevelSequenceSectionInfo.endLevelSequenceSectionInfo(e);
  }
}
exports.LevelSequenceSectionInfo = LevelSequenceSectionInfo;
//# sourceMappingURL=level-sequence-section-info.js.map