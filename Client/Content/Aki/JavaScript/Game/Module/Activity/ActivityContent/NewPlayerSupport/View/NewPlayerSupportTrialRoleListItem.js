"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportTrialRoleListItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class NewPlayerSupportTrialRoleListItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.UIi = undefined;
    this.nCg = undefined;
    this.sOf = undefined;
    this.$Ve = undefined;
    this.Wvt = () => {
      if (this.UIi) {
        this.UIi(this, this.sOf.TrialRoleGroupId);
      }
    };
    this.Lke = () => !this.nCg || this.nCg();
    this.sOf = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Wvt]];
  }
  OnStart() {
    this.$Ve = this.GetExtendToggle(0);
    this.$Ve.CanExecuteChange.Bind(this.Lke);
    this.Og();
    RedDotController_1.RedDotController.BindRedDot("RedDotTrialRoleGroup", this.GetItem(6), undefined, this.sOf.TrialRoleGroupId);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotTrialRoleGroup", this.GetItem(6), this.sOf.TrialRoleGroupId);
  }
  Og() {
    var e = this.sOf.IsLocked();
    this.GetItem(1)?.SetUIActive(!e);
    this.GetItem(4)?.SetUIActive(!e);
    this.GetItem(2)?.SetUIActive(e);
    this.GetItem(5)?.SetUIActive(e);
    var t = this.GetTexture(3);
    t.SetChangeColor(e, t.changeColor);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.sOf.RealRoleId);
    var e = e.FormationRoleCard;
    this.SetTextureByPath(e, t);
  }
  SetSelectCallback(e) {
    this.UIi = e;
  }
  SetSelected(e) {
    this.$Ve?.SetToggleState(e ? 1 : 0);
    if (e) {
      ModelManager_1.ModelManager.TrialRoleModel.SaveTrialRoleUnlockRedDotById(this.sOf.TrialRoleGroupId, false);
    }
  }
  SelectItem() {
    this.Wvt();
  }
  SetCanSelectCallback(e) {
    this.nCg = e;
  }
}
exports.NewPlayerSupportTrialRoleListItem = NewPlayerSupportTrialRoleListItem;
//# sourceMappingURL=NewPlayerSupportTrialRoleListItem.js.map