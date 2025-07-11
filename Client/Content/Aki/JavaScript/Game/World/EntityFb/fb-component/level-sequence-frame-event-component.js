"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSequenceFrameEventComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const level_sequence_section_info_js_1 = require("../fb-component/level-sequence-section-info.js");
class LevelSequenceFrameEventComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsLevelSequenceFrameEventComponent(e, t) {
    return (t || new LevelSequenceFrameEventComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelSequenceFrameEventComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new LevelSequenceFrameEventComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  forwardSections(e, t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return (t || new level_sequence_section_info_js_1.LevelSequenceSectionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  forwardSectionsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  backWardSections(e, t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return (t || new level_sequence_section_info_js_1.LevelSequenceSectionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  backWardSectionsLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startLevelSequenceFrameEventComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addForwardSections(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createForwardSectionsVector(t, n) {
    t.startVector(4, n.length, 4);
    for (let e = n.length - 1; e >= 0; e--) {
      t.addOffset(n[e]);
    }
    return t.endVector();
  }
  static startForwardSectionsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addBackWardSections(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createBackWardSectionsVector(t, n) {
    t.startVector(4, n.length, 4);
    for (let e = n.length - 1; e >= 0; e--) {
      t.addOffset(n[e]);
    }
    return t.endVector();
  }
  static startBackWardSectionsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endLevelSequenceFrameEventComponent(e) {
    return e.endObject();
  }
  static createLevelSequenceFrameEventComponent(e, t, n, r) {
    LevelSequenceFrameEventComponent.startLevelSequenceFrameEventComponent(e);
    LevelSequenceFrameEventComponent.addDisabled(e, t);
    LevelSequenceFrameEventComponent.addForwardSections(e, n);
    LevelSequenceFrameEventComponent.addBackWardSections(e, r);
    return LevelSequenceFrameEventComponent.endLevelSequenceFrameEventComponent(e);
  }
}
exports.LevelSequenceFrameEventComponent = LevelSequenceFrameEventComponent;
//# sourceMappingURL=level-sequence-frame-event-component.js.map