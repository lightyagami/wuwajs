"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExploreSkillInteractComponent = undefined;
const FbIgnoresCollisionCfg_1 = require("./FbIgnoresCollisionCfg");
const UnionExploreSkillInteractOptionHelper_1 = require("./UnionExploreSkillInteractOptionHelper");
const UnionExploreSkillSearchTargetCfgHelper_1 = require("./UnionExploreSkillSearchTargetCfgHelper");
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbExploreSkillInteractComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.J9l = false;
    this.Z9l = undefined;
    this.s_h = false;
    this.Hye = undefined;
    this.fGh = false;
    this.pGh = 0;
    this.qDh = false;
    this.PAe = undefined;
    this.$Nh = false;
    this.XNh = undefined;
    this.qWh = false;
    this.kWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbExploreSkillInteractComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ExploreSkillUiResource() {
    if (!this.J9l) {
      this.J9l = true;
      this.Z9l = this.FbDataInternal.exploreSkillUiResource();
    }
    return this.Z9l;
  }
  get Option() {
    var t;
    var i;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), i = UnionExploreSkillInteractOptionHelper_1.UnionExploreSkillInteractOptionHelper.GetUnionExploreSkillInteractOptionObject(t))) {
      this.Hye = UnionExploreSkillInteractOptionHelper_1.UnionExploreSkillInteractOptionHelper.ReadUnionExploreSkillInteractOption(t, this.FbDataInternal.option(i));
    }
    return this.Hye;
  }
  get PlayerStateRestritionId() {
    if (!this.fGh) {
      this.fGh = true;
      this.pGh = this.FbDataInternal.playerStateRestritionId();
    }
    return this.pGh;
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      this.qDh = true;
      this.PAe = new Array();
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t);
          var r = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(e);
          if (r && (e = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(e, this.FbDataInternal.matchRoleOption(t, r))) !== undefined) {
            this.PAe.push(e);
          }
        }
      }
    }
    return this.PAe;
  }
  get SearchTargetCfg() {
    var t;
    var i;
    if (!this.$Nh && (this.$Nh = true, t = this.FbDataInternal.searchTargetCfgType(), i = UnionExploreSkillSearchTargetCfgHelper_1.UnionExploreSkillSearchTargetCfgHelper.GetUnionExploreSkillSearchTargetCfgObject(t))) {
      this.XNh = UnionExploreSkillSearchTargetCfgHelper_1.UnionExploreSkillSearchTargetCfgHelper.ReadUnionExploreSkillSearchTargetCfg(t, this.FbDataInternal.searchTargetCfg(i));
    }
    return this.XNh;
  }
  get IgnoresCollisionCfg() {
    if (!this.qWh) {
      this.qWh = true;
      this.kWh = FbIgnoresCollisionCfg_1.FbIgnoresCollisionCfg.Create(this.FbDataInternal.ignoresCollisionCfg());
    }
    return this.kWh;
  }
}
exports.FbExploreSkillInteractComponent = FbExploreSkillInteractComponent;
//# sourceMappingURL=FbExploreSkillInteractComponent.js.map