"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowHighlightExploreSkillIcon = undefined;
class FbShowHighlightExploreSkillIcon {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.sbh = false;
    this.abh = 0;
    this.I_h = false;
    this.y6o = 0;
    this.UAh = false;
    this.DAh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowHighlightExploreSkillIcon(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SkillType() {
    if (!this.sbh) {
      this.sbh = true;
      this.abh = this.FbDataInternal.skillType();
    }
    return this.abh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
  get IsSwitchBack() {
    if (!this.UAh) {
      this.UAh = true;
      this.DAh = this.FbDataInternal.isSwitchBack();
    }
    return this.DAh;
  }
}
exports.FbShowHighlightExploreSkillIcon = FbShowHighlightExploreSkillIcon;
//# sourceMappingURL=FbShowHighlightExploreSkillIcon.js.map