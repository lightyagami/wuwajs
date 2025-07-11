"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostItemGridComponent = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const CostMediumItemGrid_1 = require("./CostMediumItemGrid");
class CostItemGridComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s = undefined) {
    super();
    this.A1o = e;
    this.P1o = i;
    this.BelongView = s;
    this.ScrollView = undefined;
    this.ypt = undefined;
    this.x1o = 0;
    this.w1o = 0;
    this.p4e = undefined;
    this.B1o = false;
    this.sGe = (t, e, i) => {
      var s = new CostMediumItemGrid_1.CostMediumItemGrid();
      s.Initialize(e.GetOwner());
      s.Refresh(t, false, i);
      s.BindOnCanExecuteChange(() => false);
      s.BindOnExtendToggleRelease(this.Jgt);
      return {
        Key: i,
        Value: s
      };
    };
    this.Jgt = t => {
      t = t.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.ItemId);
      ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = t;
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UITexture], [8, UE.UIText], [4, UE.UIItem], [5, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIButtonComponent], [9, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [15, UE.UIText], [16, UE.UIText], [17, UE.UIButtonComponent]];
    if (this.P1o !== undefined) {
      this.BtnBindInfo.push([17, this.P1o]);
    }
  }
  OnStart() {
    this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(11));
    this.p4e.SetFunction(this.A1o);
    var t = this.GetScrollViewWithScrollbar(5);
    this.ScrollView = new GenericScrollView_1.GenericScrollView(t, this.sGe);
    this.GetButton(17)?.RootUIComp?.SetUIActive(this.P1o !== undefined);
  }
  Update(t, e, i) {
    this.UpdateByDataList(t);
    this.UpdateMoney(e, i);
  }
  UpdateByDataList(t) {
    this.ypt = t;
    this.ScrollView.RefreshByData(this.ypt);
  }
  UpdateMoney(t, e) {
    this.x1o = t;
    this.w1o = e;
    this.SetItemIcon(this.GetTexture(7), this.x1o);
    t = this.GetText(8);
    t.SetText(this.w1o.toString());
    e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.x1o);
    this.B1o = e >= this.w1o;
    t.useChangeColor = !this.B1o;
  }
  GetIsMoneyEnough() {
    return this.B1o;
  }
  GetDataList() {
    return this.ypt;
  }
  SetMaxItemActive(t) {
    this.GetItem(12).SetUIActive(t);
  }
  SetLockItemActive(t) {
    this.GetItem(13).SetUIActive(t);
  }
  SetButtonItemActive(t) {
    this.p4e.SetActive(t);
  }
  SetLockLocalText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), t, e);
  }
  SetButtonItemLocalText(t) {
    this.p4e.SetLocalText(t);
  }
}
exports.CostItemGridComponent = CostItemGridComponent;
//# sourceMappingURL=CostItemGridComponent.js.map