"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamPlayerSelectionComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class TeamPlayerSelectionComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.dFe = undefined;
    this.$bt = undefined;
    this.IsSet = false;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite]];
  }
  OnBeforeDestroy() {
    this.dFe = undefined;
    this.$bt = undefined;
    this.IsSet = false;
  }
  SetRoleId(e) {
    this.dFe = e;
  }
  SetTeamNumber(e) {
    this.$bt = e;
  }
  RefreshItem() {
    var e = this.GetTexture(0);
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe).RoleHeadIconBig;
    this.SetTextureByPath(i, e);
    var i = this.GetSprite(1);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(`SP_Online${this.$bt}PIcon`);
    this.SetSpriteByPath(e, i, false);
    this.IsSet = true;
  }
}
exports.TeamPlayerSelectionComponent = TeamPlayerSelectionComponent;
//# sourceMappingURL=TeamPlayerSelectionComponent.js.map