"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTrickDescItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleSkillInputDescItem_1 = require("./RoleSkillInputDescItem");
class RoleSkillTrickDescItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.MPd = () => new RoleSkillInputDescItem_1.RoleSkillInputDescItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.MPd);
  }
  async RefreshAsync(e) {
    await this.eGe.RefreshByDataAsync(e);
  }
}
exports.RoleSkillTrickDescItem = RoleSkillTrickDescItem;
//# sourceMappingURL=RoleSkillTrickDescItem.js.map