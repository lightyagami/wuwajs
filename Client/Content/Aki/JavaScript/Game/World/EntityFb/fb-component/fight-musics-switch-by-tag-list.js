"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightMusicsSwitchByTagList = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const fight_music_switch_by_tag_js_1 = require("../fb-component/fight-music-switch-by-tag.js");
class FightMusicsSwitchByTagList {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFightMusicsSwitchByTagList(t, i) {
    return (i || new FightMusicsSwitchByTagList()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFightMusicsSwitchByTagList(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FightMusicsSwitchByTagList()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  element(t, i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (i || new fight_music_switch_by_tag_js_1.FightMusicSwitchByTag()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  elementLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFightMusicsSwitchByTagList(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addElement(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createElementVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startElementVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endFightMusicsSwitchByTagList(t) {
    return t.endObject();
  }
  static createFightMusicsSwitchByTagList(t, i, s) {
    FightMusicsSwitchByTagList.startFightMusicsSwitchByTagList(t);
    FightMusicsSwitchByTagList.addType(t, i);
    FightMusicsSwitchByTagList.addElement(t, s);
    return FightMusicsSwitchByTagList.endFightMusicsSwitchByTagList(t);
  }
}
exports.FightMusicsSwitchByTagList = FightMusicsSwitchByTagList;
//# sourceMappingURL=fight-musics-switch-by-tag-list.js.map