"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponViewItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const RoleDevWeaponDevItem_1 = require("./RoleDevWeaponDevItem");
const RoleDevWeaponRecommendItem_1 = require("./RoleDevWeaponRecommendItem");
class RoleDevWeaponViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiViewSequence = undefined;
    this.Xpd = undefined;
    this.Ypd = undefined;
    this.Pe = undefined;
    this.SetType = e => {
      if ((this.Pe.TabType = e) === 2) {
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 2, 10);
      }
      this.Refresh();
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
      this.SetType(2);
    };
    this.Ypd.OnClickBtnSwitch = () => {
      this.SetType(1);
    };
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  RefreshByData(e) {
    this.Pe = e;
    this.Refresh();
  }
  Refresh() {
    var e = this.Pe.TabType;
    if (e === 1) {
      this.Xpd.Refresh(this.Pe.DevItemData);
      this.GetItem(0).SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
    }
    if (e === 2) {
      this.Ypd.Refresh(this.Pe.RecommendItemData);
      this.GetItem(0).SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
    }
  }
}
exports.RoleDevWeaponViewItem = RoleDevWeaponViewItem;
//# sourceMappingURL=RoleDevWeaponViewItem.js.map