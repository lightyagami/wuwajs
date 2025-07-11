"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkOption = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const option_lock_tip_js_1 = require("../fb-action/option-lock-tip.js");
const union_talk_option_param_js_1 = require("../fb-action/union-talk-option-param.js");
const union_talk_option_pre_condition_js_1 = require("../fb-action/union-talk-option-pre-condition.js");
class TalkOption {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTalkOption(t, i) {
    return (i || new TalkOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkOption(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TalkOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tidTalkOption(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  textId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  plotLineId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  plotLineKey(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  icon() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  readMarkEnabled() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 16);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  optionStyle() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  preConditionType() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_talk_option_pre_condition_js_1.UnionTalkOptionPreCondition.NONE;
    }
  }
  preCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 24);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  editFlag(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  optionLockTip(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    if (i) {
      return (t || new option_lock_tip_js_1.OptionLockTip()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  typeParamsType() {
    var t = this.bb.__offset(this.bb_pos, 30);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_talk_option_param_js_1.UnionTalkOptionParam.NONE;
    }
  }
  typeParams(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startTalkOption(t) {
    t.startObject(15);
  }
  static addTidTalkOption(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTextId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPlotLineId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addPlotLineKey(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addIcon(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static addReadMarkEnabled(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(6, i, 0);
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
  static addOptionStyle(t, i) {
    t.addFieldInt8(7, i, 0);
  }
  static addPreConditionType(t, i) {
    t.addFieldInt8(8, i, union_talk_option_pre_condition_js_1.UnionTalkOptionPreCondition.NONE);
  }
  static addPreCondition(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addFolded(t, i) {
    t.addFieldInt8(10, +i, 0);
  }
  static addEditFlag(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addOptionLockTip(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addTypeParamsType(t, i) {
    t.addFieldInt8(13, i, union_talk_option_param_js_1.UnionTalkOptionParam.NONE);
  }
  static addTypeParams(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static endTalkOption(t) {
    return t.endObject();
  }
}
exports.TalkOption = TalkOption;
//# sourceMappingURL=talk-option.js.map