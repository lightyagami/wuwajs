"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessmanPickInteraction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class ChessmanPickInteraction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsChessmanPickInteraction(t, s) {
    return (s || new ChessmanPickInteraction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChessmanPickInteraction(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new ChessmanPickInteraction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  checkedActions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (s || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  checkedActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  uncheckedActions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (s || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  uncheckedActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  targetChessboard() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  availablePosEffect(t) {
    var s = this.bb.__offset(this.bb_pos, 12);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startChessmanPickInteraction(t) {
    t.startObject(5);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addCheckedActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createCheckedActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startCheckedActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addUncheckedActions(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static createUncheckedActionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startUncheckedActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addTargetChessboard(t, s) {
    t.addFieldInt32(3, s, 0);
  }
  static addAvailablePosEffect(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static endChessmanPickInteraction(t) {
    return t.endObject();
  }
  static createChessmanPickInteraction(t, s, i, e, n, c) {
    ChessmanPickInteraction.startChessmanPickInteraction(t);
    ChessmanPickInteraction.addType(t, s);
    ChessmanPickInteraction.addCheckedActions(t, i);
    ChessmanPickInteraction.addUncheckedActions(t, e);
    ChessmanPickInteraction.addTargetChessboard(t, n);
    ChessmanPickInteraction.addAvailablePosEffect(t, c);
    return ChessmanPickInteraction.endChessmanPickInteraction(t);
  }
}
exports.ChessmanPickInteraction = ChessmanPickInteraction;
//# sourceMappingURL=chessman-pick-interaction.js.map