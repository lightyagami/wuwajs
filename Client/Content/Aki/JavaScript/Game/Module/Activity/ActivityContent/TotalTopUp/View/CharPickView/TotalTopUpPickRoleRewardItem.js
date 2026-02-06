"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPickRoleRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class TotalTopUpPickRoleRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = t;
    this.UIi = undefined;
    this.$Ve = undefined;
    this.Wvt = () => {
      if (this.UIi) {
        this.UIi(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UITexture]];
    this.BtnBindInfo = [[0, this.Wvt]];
  }
  OnStart() {
    this.Og();
    this.$Ve = this.GetExtendToggle(0);
  }
  Og() {
    var t;
    var e;
    var i;
    var s;
    if (this.Pe) {
      t = !this.Pe.CanClaim;
      this.GetItem(1)?.SetUIActive(!t);
      this.GetItem(4)?.SetUIActive(!t);
      this.GetItem(2)?.SetUIActive(t);
      this.GetItem(5)?.SetUIActive(t);
      (e = this.GetTexture(3)).SetChangeColor(t, e.changeColor);
      if (i = this.Pe.RoleId > 0) {
        s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Pe.RoleId).FormationRoleCard;
        this.SetTextureByPath(s, e);
        e.SetChangeColor(t, e.changeColor);
      } else {
        this.GetText(7)?.SetText("x" + this.Pe.ItemCount);
      }
      this.GetTexture(8)?.SetUIActive(!i);
      this.GetTexture(3)?.SetUIActive(i);
      this.GetText(7)?.SetUIActive(!i);
      this.GetItem(5)?.SetUIActive(!this.Pe.CanClaim);
    }
  }
  SetSelectCallback(t) {
    this.UIi = t;
  }
  SetSelected(t) {
    this.$Ve?.SetToggleState(t ? 1 : 0);
  }
  SelectItem() {
    this.Wvt();
  }
}
exports.TotalTopUpPickRoleRewardItem = TotalTopUpPickRoleRewardItem;
//# sourceMappingURL=TotalTopUpPickRoleRewardItem.js.map