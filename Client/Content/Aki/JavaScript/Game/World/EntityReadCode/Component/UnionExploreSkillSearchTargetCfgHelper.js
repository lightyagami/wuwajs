"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionExploreSkillSearchTargetCfgHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAngleWeight_1 = require("./FbAngleWeight");
const FbEnterScreenWeight_1 = require("./FbEnterScreenWeight");
class UnionExploreSkillSearchTargetCfgHelper {
  static GetUnionExploreSkillSearchTargetCfgObject(e) {
    switch (e) {
      case fb_component_1.UnionExploreSkillSearchTargetCfg.AngleWeight:
        return new fb_component_1.AngleWeight();
      case fb_component_1.UnionExploreSkillSearchTargetCfg.EnterScreenWeight:
        return new fb_component_1.EnterScreenWeight();
      default:
        return;
    }
  }
  static ReadUnionExploreSkillSearchTargetCfg(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionExploreSkillSearchTargetCfg.AngleWeight:
          return FbAngleWeight_1.FbAngleWeight.Create(t);
        case fb_component_1.UnionExploreSkillSearchTargetCfg.EnterScreenWeight:
          return FbEnterScreenWeight_1.FbEnterScreenWeight.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionExploreSkillSearchTargetCfgHelper = UnionExploreSkillSearchTargetCfgHelper;
//# sourceMappingURL=UnionExploreSkillSearchTargetCfgHelper.js.map