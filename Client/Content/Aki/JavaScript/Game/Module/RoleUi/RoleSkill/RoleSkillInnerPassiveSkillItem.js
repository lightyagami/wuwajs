"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillInnerPassiveSkillItem = undefined;
const UE = require("ue");
const RoleSkillTreeSkillItemBase_1 = require("./RoleSkillTreeSkillItemBase");
class RoleSkillInnerPassiveSkillItem extends RoleSkillTreeSkillItemBase_1.RoleSkillTreeSkillItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UISprite]];
  }
  GetSkillIconItem() {
    return this.GetItem(0);
  }
  GetLevelText() {
    return this.GetText(1);
  }
  GetNameText() {
    return this.GetText(2);
  }
  GetStrongArrowUpItem() {
    return this.GetItem(3);
  }
  GetType() {
    return 1;
  }
  GetLeftBranchItem() {
    return this.GetItem(4);
  }
  GetLeftBranchIcon() {
    return this.GetSprite(5);
  }
  GetRightBranchItem() {
    return this.GetItem(6);
  }
  GetRightBranchIcon() {
    return this.GetSprite(7);
  }
}
exports.RoleSkillInnerPassiveSkillItem = RoleSkillInnerPassiveSkillItem;
//# sourceMappingURL=RoleSkillInnerPassiveSkillItem.js.map