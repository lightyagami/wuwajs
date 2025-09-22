"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopSwitchItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class PayShopSwitchItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.bD = 0;
    this.hHe = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIExtendToggle], [0, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.hHe]];
  }
  Refresh(e, t, i) {
    this.CurrentData = e;
    this.OnRefresh(e, t, i);
    this.GetTabToggle().RootUIComp.SetUIActive(false);
    this.GetTabToggle().RootUIComp.SetUIActive(true);
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(1).SetToggleState(0);
  }
  OnBeforeHide() {
    this.UnBindRedDot();
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleStateForce(e, t);
  }
  OnRefresh(e, t, i) {
    if (e.Data) {
      this.UpdateTabIcon(e.Data.GetIcon());
    }
  }
  OnUpdateTabIcon(e) {}
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  UpdateView(e, t) {
    e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabDataByPayShopIdAndTabId(e, t);
    this.GetText(0).SetText(e ? e.Name : "");
    this.RootItem.SetUIActive(!!e && e.Enable);
  }
  UpdateTitle(e) {
    this.GetText(0).SetText(e);
  }
  BindRedDot(e, t = 0) {
    this.UnBindRedDot();
    var i = this.GetItem(2);
    this.l4e = e;
    this.bD = t;
    RedDotController_1.RedDotController.BindRedDot(e, i, undefined, t);
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(2), this.bD);
      this.l4e = undefined;
      this.bD = 0;
    }
  }
}
exports.PayShopSwitchItem = PayShopSwitchItem;
//# sourceMappingURL=PayShopSwitchItem.js.map