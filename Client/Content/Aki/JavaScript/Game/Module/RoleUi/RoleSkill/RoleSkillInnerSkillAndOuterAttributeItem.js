"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillInnerSkillAndOuterAttributeItem = undefined;
const UE = require("ue");
const RoleSkillChainItem_1 = require("./RoleSkillChainItem");
const RoleSkillInnerSkillItem_1 = require("./RoleSkillInnerSkillItem");
const RoleSkillOuterAttributeSkillItem_1 = require("./RoleSkillOuterAttributeSkillItem");
class RoleSkillInnerSkillAndOuterAttributeItem extends RoleSkillChainItem_1.RoleSkillChainItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    var e = new RoleSkillInnerSkillItem_1.RoleSkillInnerSkillItem();
    e.SetSkillBranchEnable(this.IsSkillBranchEnable);
    e.CreateThenShowByActor(this.GetItem(0).GetOwner());
    this.SkillNodeItemList.push(e);
    for (const r of [1, 2]) {
      var t = this.GetItem(r);
      var l = new RoleSkillOuterAttributeSkillItem_1.RoleSkillOuterAttributeSkillItem();
      l.SetSkillBranchEnable(this.IsSkillBranchEnable);
      l.CreateThenShowByActor(t.GetOwner());
      this.SkillNodeItemList.push(l);
    }
    for (const n of [3, 4]) {
      var i = this.GetItem(n);
      this.LineItemList.push(i);
    }
  }
}
exports.RoleSkillInnerSkillAndOuterAttributeItem = RoleSkillInnerSkillAndOuterAttributeItem;
//# sourceMappingURL=RoleSkillInnerSkillAndOuterAttributeItem.js.map