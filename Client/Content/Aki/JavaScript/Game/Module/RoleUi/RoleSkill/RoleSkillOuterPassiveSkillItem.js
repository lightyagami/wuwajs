"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillOuterPassiveSkillItem = undefined;
const UE = require("ue");
const RoleSkillTreeSkillItemBase_1 = require("./RoleSkillTreeSkillItemBase");
class RoleSkillOuterPassiveSkillItem extends RoleSkillTreeSkillItemBase_1.RoleSkillTreeSkillItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UISprite]];
  }
  GetSkillIconItem() {
    return this.GetItem(0);
  }
  GetLockItem() {
    return this.GetItem(1);
  }
  GetNameText() {
    return this.GetText(3);
  }
  GetStrongArrowUpItem() {
    return this.GetItem(2);
  }
  GetType() {
    return 3;
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
exports.RoleSkillOuterPassiveSkillItem = RoleSkillOuterPassiveSkillItem;
//# sourceMappingURL=RoleSkillOuterPassiveSkillItem.js.map