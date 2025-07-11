"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFightMusicSwitchByTag = undefined;
class FbFightMusicSwitchByTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.pwh = false;
    this.vwh = undefined;
    this.Iwh = false;
    this.Twh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFightMusicSwitchByTag(t);
    }
  }
  get FightMusic() {
    if (!this.pwh) {
      this.pwh = true;
      this.vwh = this.FbDataInternal.fightMusic();
    }
    return this.vwh;
  }
  get ActivateTag() {
    if (!this.Iwh) {
      this.Iwh = true;
      this.Twh = this.FbDataInternal.activateTag();
    }
    return this.Twh;
  }
}
exports.FbFightMusicSwitchByTag = FbFightMusicSwitchByTag;
//# sourceMappingURL=FbFightMusicSwitchByTag.js.map