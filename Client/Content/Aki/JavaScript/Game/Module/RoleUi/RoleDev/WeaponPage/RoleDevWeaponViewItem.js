"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponViewItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevWeaponDevItem_1 = require("./RoleDevWeaponDevItem");
const RoleDevWeaponRecommendItem_1 = require("./RoleDevWeaponRecommendItem");
class RoleDevWeaponViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiViewSequence = undefined;
    this.Xpd = undefined;
    this.Ypd = undefined;
    this.Pe = undefined;
    this.Cua = 0;
    this.gU = false;
    this.SwitchTab = e => {
      if (e === 0) {
        this.Xpd.Refresh(this.Pe.DevItemData);
        this.GetItem(0).SetUIActive(true);
        this.GetItem(1).SetUIActive(false);
      }
      if (e === 1) {
        this.Ypd.Refresh(this.Pe.RecommendItemData);
        this.GetItem(0).SetUIActive(false);
        this.GetItem(1).SetUIActive(true);
      }
    };
    this.SetType = e => {
      this.Cua = e;
      this.RefreshData(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Xpd = new RoleDevWeaponDevItem_1.RoleDevWeaponDevItem();
    this.Ypd = new RoleDevWeaponRecommendItem_1.RoleDevWeaponRecommendItem();
    await Promise.all([this.Xpd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.Ypd.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
    this.Xpd.OnClickBtnSwitch = () => {
      this.SetType(1);
    };
    this.Ypd.OnClickBtnSwitch = () => {
      this.SetType(0);
    };
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  Refresh(e) {
    if (!this.gU || this.Pe && this.Pe.RoleId !== e.RoleId) {
      this.Pe = e;
      this.Cua = RoleDevUtils_1.RoleDevUtils.GetWeaponDefaultTabType(e.RoleId, e.IsWeaponHighQuality);
      this.gU = true;
    }
    this.SwitchTab(this.Cua);
  }
  RefreshData(e) {
    this.Pe = e;
    this.SwitchTab(this.Cua);
  }
}
exports.RoleDevWeaponViewItem = RoleDevWeaponViewItem;
//# sourceMappingURL=RoleDevWeaponViewItem.js.map