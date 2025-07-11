"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightMusicSwitchByTag = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FightMusicSwitchByTag {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFightMusicSwitchByTag(t, i) {
    return (i || new FightMusicSwitchByTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFightMusicSwitchByTag(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FightMusicSwitchByTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  fightMusic(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  activateTag(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startFightMusicSwitchByTag(t) {
    t.startObject(2);
  }
  static addFightMusic(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addActivateTag(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endFightMusicSwitchByTag(t) {
    return t.endObject();
  }
  static createFightMusicSwitchByTag(t, i, s) {
    FightMusicSwitchByTag.startFightMusicSwitchByTag(t);
    FightMusicSwitchByTag.addFightMusic(t, i);
    FightMusicSwitchByTag.addActivateTag(t, s);
    return FightMusicSwitchByTag.endFightMusicSwitchByTag(t);
  }
}
exports.FightMusicSwitchByTag = FightMusicSwitchByTag;
//# sourceMappingURL=fight-music-switch-by-tag.js.map