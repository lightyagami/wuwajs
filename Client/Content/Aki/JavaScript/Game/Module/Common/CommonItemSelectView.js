"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemSelectView = exports.CommonItemSelectViewOpenViewData = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
const SelectableComponent_1 = require("./PropItem/SelectablePropItem/SelectableComponent");
const VisionRecoverySelectableComponent_1 = require("./PropItem/SelectablePropItem/VisionRecoverySelectableComponent");
class CommonItemSelectViewOpenViewData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments);
    this.ItemDataBaseList = undefined;
    this.SelectedDataList = undefined;
    this.SelectableComponentData = undefined;
    this.ExpData = undefined;
    this.SelectableComponentType = 0;
    this.UseWayId = 0;
    this.InitSortToggleState = false;
  }
}
exports.CommonItemSelectViewOpenViewData = CommonItemSelectViewOpenViewData;
class CommonItemSelectView extends UiPanelBase_1.UiPanelBase {
  constructor(e = undefined) {
    super();
    this.jTt = undefined;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  WTt(e) {
    this.GetItem(3).SetUIActive(e?.length <= 0);
  }
  UpdateSelectableComponent(e, t, i, o, s = undefined) {
    if (!this.jTt) {
      this.jTt = new (e === 0 ? SelectableComponent_1.SelectableComponent : VisionRecoverySelectableComponent_1.VisionRecoverySelectableComponent)();
      this.jTt.InitLoopScroller(this.GetLoopScrollViewComponent(0), this.GetItem(1), o);
    }
    this.SetMaxSize(o.MaxSelectedGridNum);
    this.WTt(t);
    this.jTt.UpdateComponent(t, i, s);
  }
  GetCurrentSelectedData() {
    return this.jTt.GetCurrentSelectedData();
  }
  UpdateByDataList(e) {
    this.jTt.UpdateDataList(e);
    this.WTt(e);
  }
  RefreshPartByIndex(e) {
    this.jTt.RefreshPartByIndex(e);
  }
  UpdateChangeItemSelectList() {
    this.jTt.UpdateChangeItemSelectList();
  }
  SetMaxSize(e) {
    this.jTt.SetMaxSize(e);
  }
  OnBeforeDestroy() {
    this.jTt?.Destroy();
  }
}
exports.CommonItemSelectView = CommonItemSelectView;
//# sourceMappingURL=CommonItemSelectView.js.map