"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTrickTextureItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillTrickTextureItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async SetTexture(e) {
    await this.SetTextureAsync(e, this.GetTexture(0));
  }
}
exports.RoleSkillTrickTextureItem = RoleSkillTrickTextureItem;
//# sourceMappingURL=RoleSkillTrickTextureItem.js.map