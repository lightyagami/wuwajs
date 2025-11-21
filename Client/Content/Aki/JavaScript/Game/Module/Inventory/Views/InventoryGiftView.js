"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryGiftView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiBlurLogic_1 = require("../../../Ui/Base/UiBlur/UiBlurLogic");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const InventoryGiftController_1 = require("../InventoryGiftController");
const InventoryGiftItem_1 = require("./InventoryGiftItem");
class InventoryGiftView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.vVt = undefined;
    this.x5e = [];
    this.zmi = [];
    this.Zmi = undefined;
    this.edi = undefined;
    this.ZAt = undefined;
    this.tdi = undefined;
    this.ts = undefined;
    this.HGe = undefined;
    this.WGe = undefined;
    this.ClickClose = () => {
      UiManager_1.UiManager.CloseView("InventoryGiftView");
    };
    this.OnClickConfirm = () => {
      var t = [];
      var e = this.zmi.length;
      for (let i = 0; i < e; i++) {
        t.push(this.zmi[i].ItemId);
      }
      InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(this.Zmi.ConfigId, this.WGe?.GetSelectNumber() ?? 1, t);
    };
    this.OnClickErrorConfirm = () => {
      var i = this.Zmi.GiftPackage.AvailableNum;
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SelectGiftItem", i);
    };
    this.KGe = i => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ItemUseCount");
      return new LguiUtil_1.TableTextArgNew(t, i);
    };
    this.sGe = () => {
      var i = new InventoryGiftItem_1.InventoryGiftItem();
      i.Initialize();
      i.SetOnToggleStateChangeFunction(this.OnToggleStateChangeFunction);
      i.SetOnReduceFunction(this.OnReduceFunction);
      i.SetIsSelectOn(this.OnIsSelectOnFunction);
      return i;
    };
    this.idi = i => {
      return this.x5e[i];
    };
    this.OnToggleStateChangeFunction = (i, t, e, s) => {
      var r = this.Zmi.GiftPackage.AvailableNum;
      if (e) {
        if (this.zmi.length === r) {
          i.SetToggleState(0, false);
          t.RootUIComp.SetUIActive(false);
          return;
        }
        this.zmi.push(s);
      } else {
        e = this.zmi.indexOf(s);
        this.zmi.splice(e, 1);
      }
      this.RefreshSelectCountInfo();
    };
    this.OnReduceFunction = i => {
      i = this.zmi.indexOf(i);
      if (i !== -1) {
        this.zmi.splice(i, 1);
        this.RefreshSelectCountInfo();
      }
    };
    this.OnIsSelectOnFunction = i => this.zmi.includes(i);
    this.RefreshSelectCountInfo = () => {
      var i = this.Zmi.GiftPackage.AvailableNum;
      var t = this.zmi.length;
      LguiUtil_1.LguiUtil.SetLocalText(this.ts, "SelectRewardFromPool", i, t, i);
      var t = t === i;
      this.odi(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.OnClickConfirm], [2, this.OnClickErrorConfirm], [6, this.ClickClose]];
  }
  OnStart() {
    this.Zmi = this.OpenParam;
    this.x5e = this.Zmi.ItemList;
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.sGe);
    this.vVt.ReloadProxyData(this.idi, this.x5e.length, false);
    this.ZAt = this.GetButton(1);
    this.tdi = this.GetButton(2);
    this.edi = this.ZAt.GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    this.ts = this.GetText(5);
    this.HGe = this.GetText(0);
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Zmi.ConfigId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.HGe, i.Name);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(7));
    var i = {
      MaxNumber: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.Zmi.ConfigId),
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: () => {}
    };
    if (this.frm()) {
      this.WGe.SetLimitMaxValue(ConfigManager_1.ConfigManager.CommonConfig.GetGiftMaxNineNineNine());
    }
    this.WGe.Init(i);
    if (this.Zmi.InitializedSelectedId) {
      for (let i = 0; i < this.x5e.length; i++) {
        var t = this.x5e[i];
        if (t.ItemId === this.Zmi.InitializedSelectedId) {
          this.zmi.push(t);
          this.vVt.ScrollToGridIndex(i, false);
          this.vVt.SelectGridProxy(i, true);
          break;
        }
      }
    }
    if (this.Zmi.SelectedCount) {
      this.WGe.ChangeValue(this.Zmi.SelectedCount);
    }
    this.RefreshSelectCountInfo();
  }
  frm() {
    var i = this.Zmi.ConfigId;
    return i !== 0 && ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i).ItemType === 11;
  }
  OnAfterShow() {
    var i;
    var t;
    if (this.Zmi) {
      i = this.Zmi.GiftPackage.AvailableNum;
      t = this.zmi.length;
      this.odi(t === i);
    } else {
      this.odi(false);
    }
  }
  OnAfterHide() {
    UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
  }
  OnBeforeDestroy() {
    this.vVt = undefined;
    this.x5e = [];
    this.zmi = [];
    this.Zmi = undefined;
    this.edi = undefined;
    this.ZAt = undefined;
    this.tdi = undefined;
    this.ts = undefined;
    this.HGe = undefined;
    this.WGe?.Destroy();
    this.WGe = undefined;
  }
  odi(i) {
    this.edi.SetInteractable(i);
    this.tdi.RootUIComp.SetUIActive(!i);
  }
}
exports.InventoryGiftView = InventoryGiftView;
//# sourceMappingURL=InventoryGiftView.js.map