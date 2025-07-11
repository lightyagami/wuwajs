"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapAreaShowTabItem = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
const UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class MapAreaShowTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
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
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleStateForce(e, t);
  }
  OnRefresh(e, t, s) {
    if (e.Data) {
      this.UpdateTabIcon(e.Data.GetIcon());
    }
  }
  OnUpdateTabIcon(e) {}
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  UpdateView(e) {
    this.GetText(1).ShowTextNew(e.StateNameKey);
    this.RootItem.SetUIActive(!e.IsNoneState);
    this.UpdateTabRedDot(e);
  }
  UpdateTabRedDot(e) {
    if (!e.IsNoneState) {
      e = e.HasCanTakeStageReward();
      this.GetItem(2)?.SetUIActive(e);
    }
  }
}
exports.MapAreaShowTabItem = MapAreaShowTabItem;
//# sourceMappingURL=MapAreaShowTabItem.js.map