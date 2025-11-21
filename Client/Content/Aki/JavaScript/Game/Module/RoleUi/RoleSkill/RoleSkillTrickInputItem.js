"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTrickInputItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleSkillInputItem_1 = require("./RoleSkillInputItem");
class RoleSkillTrickInputItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.fFe = () => new RoleSkillInputItem_1.RoleSkillInputItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.fFe, this.GetItem(1).GetOwner());
  }
  async RefreshAsync(e) {
    await this.eGe.RefreshByDataAsync(e);
  }
}
exports.RoleSkillTrickInputItem = RoleSkillTrickInputItem;
//# sourceMappingURL=RoleSkillTrickInputItem.js.map