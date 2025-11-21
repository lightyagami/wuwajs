"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerTeamTabItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
const UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class ShipTowerTeamTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.hHe = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hHe]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetTabToggle().SetToggleStateForce(0, false);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  OnSetToggleState(e, t) {
    this.GetTabToggle().SetToggleStateForce(e, t);
  }
  OnRefresh(e, t, i) {
    if (e.Data) {
      this.UpdateTabIcon(e.Data.GetIcon());
    }
  }
  OnUpdateTabIcon(e) {}
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  UpdateName(e) {
    this.GetText(1).ShowTextNew(e);
  }
  UpdateNameText(e) {
    this.GetText(1).SetText(e);
  }
  UpdateRedDotVisible(e) {
    this.Nod().SetUIActive(e);
  }
  Nod() {
    return this.GetItem(2);
  }
  BindRedDot(e, t = 0) {
    this.UnBindRedDot();
    this.l4e = e;
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(e, this.Nod(), undefined, t);
    }
  }
  BindGivenUid(e, t) {
    this.l4e = e;
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(e, this.Nod(), undefined, t);
    }
  }
  UnBindGivenUid(e) {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.Nod(), e);
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
    }
  }
  OnBeforeDestroy() {
    this.UnBindGivenUid(0);
  }
}
exports.ShipTowerTeamTabItem = ShipTowerTeamTabItem;
//# sourceMappingURL=ShipTowerTeamTabItem.js.map