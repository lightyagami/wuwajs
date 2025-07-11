"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JigsawFoundation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const jigsaw_config_js_1 = require("../fb-action/jigsaw-config.js");
const jigsaw_completed_config_js_1 = require("../fb-component/jigsaw-completed-config.js");
const jigsaw_item_matched_config_js_1 = require("../fb-component/jigsaw-item-matched-config.js");
const jigsaw_piece_match_js_1 = require("../fb-component/jigsaw-piece-match.js");
const union_jigsaw_complete_condition_js_1 = require("../fb-component/union-jigsaw-complete-condition.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class JigsawFoundation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsJigsawFoundation(t, i) {
    return (i || new JigsawFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsJigsawFoundation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new JigsawFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  modelId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  placeOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  initMatchList(t, i) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return (i || new jigsaw_piece_match_js_1.JigsawPieceMatch()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  initMatchListLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  completeConditionType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_jigsaw_complete_condition_js_1.UnionJigsawCompleteCondition.NONE;
    }
  }
  completeCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  completedConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new jigsaw_completed_config_js_1.JigsawCompletedConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  jigsawConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (t || new jigsaw_config_js_1.JigsawConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchedConfig(t, i) {
    var s = this.bb.__offset(this.bb_pos, 20);
    if (s) {
      return (i || new jigsaw_item_matched_config_js_1.JigsawItemMatchedConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  matchedConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startJigsawFoundation(t) {
    t.startObject(9);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addModelId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPlaceOffset(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addInitMatchList(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createInitMatchListVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startInitMatchListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addCompleteConditionType(t, i) {
    t.addFieldInt8(4, i, union_jigsaw_complete_condition_js_1.UnionJigsawCompleteCondition.NONE);
  }
  static addCompleteCondition(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addCompletedConfig(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addJigsawConfig(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addMatchedConfig(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createMatchedConfigVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startMatchedConfigVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endJigsawFoundation(t) {
    return t.endObject();
  }
}
exports.JigsawFoundation = JigsawFoundation;
//# sourceMappingURL=jigsaw-foundation.js.map