"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillBranchTipsContentItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleSkillBranchTipsContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText]];
  }
  Refresh(t, e, s) {
    this.GetSprite(0).SetUIActive(t.IsHighlight);
    this.GetSprite(1).SetUIActive(t.IsHighlight);
    this.SetSpriteByPath(t.IconPath, this.GetSprite(2), false);
    this.GetText(3).ShowTextNew(t.TitleKey);
    this.GetText(4).ShowTextNew(t.DescKey);
  }
}
exports.RoleSkillBranchTipsContentItem = RoleSkillBranchTipsContentItem;
//# sourceMappingURL=RoleSkillBranchTipsContentItem.js.map