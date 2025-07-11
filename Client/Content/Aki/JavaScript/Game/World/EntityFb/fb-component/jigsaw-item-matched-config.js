"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JigsawItemMatchedConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const piece_index_js_1 = require("../fb-action/piece-index.js");
const condition_action_js_1 = require("../fb-component/condition-action.js");
class JigsawItemMatchedConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsJigsawItemMatchedConfig(t, i) {
    return (i || new JigsawItemMatchedConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsJigsawItemMatchedConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new JigsawItemMatchedConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  targetIndex(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new piece_index_js_1.PieceIndex()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  jigsawItemIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  jigsawItemIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  jigsawItemIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  conditionActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return (i || new condition_action_js_1.ConditionAction()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  conditionActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  unmatchedActions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 12);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  unmatchedActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startJigsawItemMatchedConfig(t) {
    t.startObject(5);
  }
  static addTargetIndex(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addJigsawItemIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createJigsawItemIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt32(s[t]);
    }
    return i.endVector();
  }
  static startJigsawItemIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addActions(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addConditionActions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createConditionActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startConditionActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addUnmatchedActions(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static createUnmatchedActionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startUnmatchedActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endJigsawItemMatchedConfig(t) {
    return t.endObject();
  }
  static createJigsawItemMatchedConfig(t, i, s, e, n, a) {
    JigsawItemMatchedConfig.startJigsawItemMatchedConfig(t);
    JigsawItemMatchedConfig.addTargetIndex(t, i);
    JigsawItemMatchedConfig.addJigsawItemIds(t, s);
    JigsawItemMatchedConfig.addActions(t, e);
    JigsawItemMatchedConfig.addConditionActions(t, n);
    JigsawItemMatchedConfig.addUnmatchedActions(t, a);
    return JigsawItemMatchedConfig.endJigsawItemMatchedConfig(t);
  }
}
exports.JigsawItemMatchedConfig = JigsawItemMatchedConfig;
//# sourceMappingURL=jigsaw-item-matched-config.js.map