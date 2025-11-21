"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleExpItemGridComponent = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RoleLevelUpCostMediumItemGrid_1 = require("./RoleLevelUpCostMediumItemGrid");
class RoleExpItemGridComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i, s, h, o, r = undefined) {
    super();
    this.A1o = t;
    this.Tuo = e;
    this.Luo = i;
    this.Duo = s;
    this.Ruo = h;
    this.Uuo = o;
    this.BelongView = r;
    this.ScrollView = undefined;
    this.ypt = undefined;
    this.x1o = 0;
    this.w1o = 0;
    this.p4e = undefined;
    this.Auo = 0;
    this.B1o = false;
    this.sGe = () => {
      var t = new RoleLevelUpCostMediumItemGrid_1.RoleLevelUpCostMediumItemGrid();
      t.BindLongPress(1, this.Jgt);
      t.BindOnCanExecuteChange(() => false);
      t.BindReduceLongPress(this.Puo);
      return t;
    };
    this.Jgt = (t, e, i) => {
      i = i.ItemId;
      if (t || this.Ruo(i)) {
        this.Luo(i);
      }
    };
    this.Puo = (t, e, i) => {
      i = i.ItemId;
      if (this.Uuo(i)) {
        this.Duo(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UITexture], [8, UE.UIText], [4, UE.UIItem], [5, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIButtonComponent], [9, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [15, UE.UIText]];
    this.BtnBindInfo = [[3, this.Tuo]];
  }
  OnStart() {
    this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(11));
    this.p4e.SetFunction(this.A1o);
    var t = this.GetScrollViewWithScrollbar(5);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.sGe);
  }
  Update(t, e, i) {
    this.UpdateByDataList(t);
    this.UpdateMoney(e, i);
  }
  UpdateByDataList(t) {
    this.ypt = t;
    this.ScrollView.RefreshByData(this.ypt);
    this.UpdateAutoButtonState();
  }
  UpdateMoney(t, e) {
    this.x1o = t;
    this.w1o = e;
    this.SetItemIcon(this.GetTexture(7), this.x1o);
    t = this.GetText(8);
    t.SetText(this.w1o.toString());
    e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.x1o);
    this.B1o = e >= this.w1o;
    t.SetChangeColor(!this.B1o, t.changeColor);
  }
  GetIsMoneyEnough() {
    return this.B1o;
  }
  UpdateAutoButtonState() {
    for (const t of this.ypt) {
      if (t.SelectedCount > 0) {
        this.Auo = 1;
        return;
      }
    }
    this.Auo = 0;
  }
  GetAutoButtonState() {
    return this.Auo;
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
  SetMaxText(t) {}
  SetLockText(t) {}
  SetButtonItemText(t) {
    this.p4e.SetLocalText(t);
  }
  SetAutoButtonText(t) {
    this.GetText(15).ShowTextNew(t);
  }
  GetGenericScrollView() {
    return this.ScrollView;
  }
}
exports.RoleExpItemGridComponent = RoleExpItemGridComponent;
//# sourceMappingURL=RoleExpItemGridComponent.js.map