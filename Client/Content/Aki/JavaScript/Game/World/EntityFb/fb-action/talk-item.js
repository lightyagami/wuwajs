"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const actor_look_at_js_1 = require("../fb-action/actor-look-at.js");
const actor_turn_to_js_1 = require("../fb-action/actor-turn-to.js");
const camera_data_js_1 = require("../fb-action/camera-data.js");
const caption_param_js_1 = require("../fb-action/caption-param.js");
const montage_data_js_1 = require("../fb-action/montage-data.js");
const play_montage_js_1 = require("../fb-action/play-montage.js");
const set_flow_template_js_1 = require("../fb-action/set-flow-template.js");
const talk_option_js_1 = require("../fb-action/talk-option.js");
const union_post_ak_event_js_1 = require("../fb-action/union-post-ak-event.js");
const union_talk_background_js_1 = require("../fb-action/union-talk-background.js");
const universal_tone_js_1 = require("../fb-action/universal-tone.js");
class TalkItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTalkItem(t, i) {
    return (i || new TalkItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTalkItem(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TalkItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  id() {
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
  name(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  editFlag(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  whoId() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  textId() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tidTalk(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  waitTime() {
    var t = this.bb.__offset(this.bb_pos, 24);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  captionParams(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    if (i) {
      return (t || new caption_param_js_1.CaptionParam()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  actions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 28);
    if (s) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actionsLength() {
    var t = this.bb.__offset(this.bb_pos, 28);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  options(t, i) {
    var s = this.bb.__offset(this.bb_pos, 30);
    if (s) {
      return (i || new talk_option_js_1.TalkOption()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  optionsLength() {
    var t = this.bb.__offset(this.bb_pos, 30);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  montage(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    if (i) {
      return (t || new play_montage_js_1.PlayMontage()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  cameraData(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    if (i) {
      return (t || new camera_data_js_1.CameraData()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  flowTemplate(t) {
    var i = this.bb.__offset(this.bb_pos, 36);
    if (i) {
      return (t || new set_flow_template_js_1.SetFlowTemplate()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  flowTemplateList(t, i) {
    var s = this.bb.__offset(this.bb_pos, 38);
    if (s) {
      return (i || new set_flow_template_js_1.SetFlowTemplate()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  flowTemplateListLength() {
    var t = this.bb.__offset(this.bb_pos, 38);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actorMontageArray(t, i) {
    var s = this.bb.__offset(this.bb_pos, 40);
    if (s) {
      return (i || new montage_data_js_1.MontageData()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actorMontageArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 40);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actorLookAtArray(t, i) {
    var s = this.bb.__offset(this.bb_pos, 42);
    if (s) {
      return (i || new actor_look_at_js_1.ActorLookAt()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actorLookAtArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 42);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actorTurnToArray(t, i) {
    var s = this.bb.__offset(this.bb_pos, 44);
    if (s) {
      return (i || new actor_turn_to_js_1.ActorTurnTo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  actorTurnToArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 44);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  talkAkEventType() {
    var t = this.bb.__offset(this.bb_pos, 46);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_post_ak_event_js_1.UnionPostAkEvent.NONE;
    }
  }
  talkAkEvent(t) {
    var i = this.bb.__offset(this.bb_pos, 48);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  universalTone(t) {
    var i = this.bb.__offset(this.bb_pos, 50);
    if (i) {
      return (t || new universal_tone_js_1.UniversalTone()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  backgroundConfigType() {
    var t = this.bb.__offset(this.bb_pos, 52);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_talk_background_js_1.UnionTalkBackground.NONE;
    }
  }
  backgroundConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 54);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  playVoice() {
    var t = this.bb.__offset(this.bb_pos, 56);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTalkItem(t) {
    t.startObject(27);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPlotLineId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addPlotLineKey(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addName(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addFolded(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addEditFlag(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addWhoId(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addTextId(t, i) {
    t.addFieldInt32(8, i, 0);
  }
  static addTidTalk(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addWaitTime(t, i) {
    t.addFieldFloat32(10, i, 0);
  }
  static addCaptionParams(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addActions(t, i) {
    t.addFieldOffset(12, i, 0);
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
  static addOptions(t, i) {
    t.addFieldOffset(13, i, 0);
  }
  static createOptionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startOptionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addMontage(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addCameraData(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static addFlowTemplate(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static addFlowTemplateList(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static createFlowTemplateListVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startFlowTemplateListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addActorMontageArray(t, i) {
    t.addFieldOffset(18, i, 0);
  }
  static createActorMontageArrayVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startActorMontageArrayVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addActorLookAtArray(t, i) {
    t.addFieldOffset(19, i, 0);
  }
  static createActorLookAtArrayVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startActorLookAtArrayVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addActorTurnToArray(t, i) {
    t.addFieldOffset(20, i, 0);
  }
  static createActorTurnToArrayVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startActorTurnToArrayVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addTalkAkEventType(t, i) {
    t.addFieldInt8(21, i, union_post_ak_event_js_1.UnionPostAkEvent.NONE);
  }
  static addTalkAkEvent(t, i) {
    t.addFieldOffset(22, i, 0);
  }
  static addUniversalTone(t, i) {
    t.addFieldOffset(23, i, 0);
  }
  static addBackgroundConfigType(t, i) {
    t.addFieldInt8(24, i, union_talk_background_js_1.UnionTalkBackground.NONE);
  }
  static addBackgroundConfig(t, i) {
    t.addFieldOffset(25, i, 0);
  }
  static addPlayVoice(t, i) {
    t.addFieldInt8(26, +i, 0);
  }
  static endTalkItem(t) {
    return t.endObject();
  }
}
exports.TalkItem = TalkItem;
//# sourceMappingURL=talk-item.js.map