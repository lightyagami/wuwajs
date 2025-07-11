"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTabSwitchItemPanel = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase");
const UiTabSequence_1 = require("../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRegressTabSwitchItemPanel extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.hHe = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem]];
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
  UpdateView(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title);
  }
}
exports.ActivityRegressTabSwitchItemPanel = ActivityRegressTabSwitchItemPanel;
//# sourceMappingURL=ActivityRegressTabSwitchItemPanel.js.map