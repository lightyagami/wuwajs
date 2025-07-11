"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFightMusicsSwitchByTagList = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFightMusicSwitchByTag_1 = require("./FbFightMusicSwitchByTag");
class FbFightMusicsSwitchByTagList {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Mwh = false;
    this.Ewh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFightMusicsSwitchByTagList(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Element() {
    if (!this.Mwh) {
      this.Mwh = true;
      this.Ewh = new Array();
      var i = this.FbDataInternal.elementLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.element(t, new fb_component_1.FightMusicSwitchByTag());
          this.Ewh.push(FbFightMusicSwitchByTag_1.FbFightMusicSwitchByTag.Create(s));
        }
      }
    }
    return this.Ewh;
  }
}
exports.FbFightMusicsSwitchByTagList = FbFightMusicsSwitchByTagList;
//# sourceMappingURL=FbFightMusicsSwitchByTagList.js.map