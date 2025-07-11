"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopItemInfoDetailPanel = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const AttributeItem_1 = require("../../Common/AttributeItem");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const CommonTipsComponentsUtil_1 = require("../../Common/Tips/CommonTipsComponentsUtil");
const TipsWeaponItem_1 = require("../../Common/Tips/TipsWeaponItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const soldOutColor = UE.Color.FromHex("FFFFFFFF");
const coinNotEnoughColor = UE.Color.FromHex("9D2437FF");
const SECONDS_PER_DAY = 86400;
class ShopItemInfoDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IMo = undefined;
    this.CommonTipsData = undefined;
    this.t6 = 0;
    this.TMo = undefined;
    this.AttributeVertical = undefined;
    this.LMo = undefined;
    this.DMo = undefined;
    this.WGe = undefined;
    this.n4i = 0;
    this.QGe = t => {
      this.s4i = t;
    };
    this.hPe = () => new AttributeItem_1.AttributeItem();
    this.Tct = (t, i) => {
      if (i === "CloseEvent") {
        this.SetActive(false);
      } else if (i === "SleEvent") {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseItemInfo);
      }
    };
    this.RMo = () => {
      var t;
      var i;
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.IMo.CurrencyId) < this.IMo.SingleBuyPrice * this.t6) {
        i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopResourceNotEnough");
        t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.IMo.CurrencyId);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubmitItemFail);
        if (t) {
          t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
          i = StringUtils_1.StringUtils.Format(i, t);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i);
        }
      } else {
        this.IMo.BuySuccessFunction(this.IMo.ItemId, this.s4i, this.IMo.CurrencyId, this.IMo.ParamData);
      }
    };
    this.UMo = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.IMo.CurrencyId);
    };
  }
  get s4i() {
    return this.t6;
  }
  set s4i(t) {
    this.t6 = Math.max(1, Math.min(t, this.n4i));
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.IMo.CurrencyId) >= this.IMo.SingleBuyPrice * this.t6;
    var i = this.GetText(6);
    i.SetColor(t ? this.DMo : coinNotEnoughColor);
    i.SetText("" + this.IMo.SingleBuyPrice * this.t6);
    var t = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
    this.GetText(23).SetText(`<s>${t.GetOriginalPrice() * this.t6}</s>`);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(27), "Text_ItemSelectShopQuantityTip_text", this.t6);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIButtonComponent], [9, UE.UIItem], [8, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIButtonComponent], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIVerticalLayout], [21, UE.UIScrollViewWithScrollbarComponent], [22, UE.UIItem], [23, UE.UIText], [24, UE.UIItem], [25, UE.UIText], [26, UE.UIItem], [27, UE.UIText], [28, UE.UIItem], [29, UE.UIItem]];
    this.BtnBindInfo = [[7, this.RMo], [15, this.UMo]];
  }
  async OnBeforeStartAsync() {
    this.TMo = new TipsWeaponItem_1.TipsWeaponItem();
    await this.TMo.CreateThenShowByActorAsync(this.GetItem(17).GetOwner());
  }
  OnStart() {
    this.RootActor.OnSequencePlayEvent.Bind(this.Tct);
    this.DMo = this.GetText(6).GetColor();
    this.AttributeVertical = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(20), this.hPe);
    this.GetButton(15)?.RootUIComp.SetUIActive(true);
    var t = this.GetItem(10);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(t);
    this.WGe.SetNumberSelectTipsVisible(false);
    this.LMo = this.GetButton(7).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    this.GetItem(28).SetUIActive(false);
    this.GetItem(29).SetUIActive(false);
  }
  k1o() {
    this.AttributeVertical.RefreshByData(this.CommonTipsData.AttributeList);
  }
  OnBeforeDestroy() {
    this.RootActor.OnSequencePlayEvent.Unbind();
    if (this.TMo) {
      this.TMo.Destroy();
      this.TMo = undefined;
    }
  }
  UpdatePanel(t) {
    this.IMo = t || this.IMo;
    this.CommonTipsData = CommonTipsComponentsUtil_1.CommonTipsComponentUtil.GetTipsDataByItemId(t.ItemId);
    this.n4i = this.GetMaxCanBuyCount();
    this.s4i = 1;
    var i = {
      MaxNumber: this.n4i,
      ValueChangeFunction: this.QGe
    };
    this.WGe.Init(i);
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetAddReduceButtonInteractive(this.n4i >= this.s4i);
    this.WGe.SetReduceButtonInteractive(this.s4i > 1);
    var i = ModelManager_1.ModelManager.ShopModel.OpenItemInfo;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "GoodsName", new LguiUtil_1.TableTextArgNew(e.Name), i.StackSize);
    var s = e.AttributesDescription;
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s);
    var h = e.TypeDescription;
    var h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h);
    var s = s.replace(/<.*?>/g, "");
    var h = this.CommonTipsData?.Type ?? h;
    this.GetText(1).SetText(h);
    this.GetText(2).SetText(s);
    this.SetItemIcon(this.GetTexture(5), t.CurrencyId);
    var h = e.ItemType === 60000 || e.ItemType === 60002 || e.ItemType === 60003;
    this.GetText(16).SetUIActive(!h);
    if (!h) {
      s = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "Text_Have_Text", s);
    }
    this.GetText(23).SetText(`<s>${i.GetOriginalPrice() * this.s4i}</s>`);
    this.GetText(23).SetUIActive(i.GetOriginalPrice() !== -1);
    this.GetItem(24).SetUIActive(i.EndTime !== 0);
    if (i.EndTime !== 0) {
      e = i.EndTime - TimeUtil_1.TimeUtil.GetServerTime();
      if ((h = Math.trunc(e / SECONDS_PER_DAY)) > 0) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(25), "ShopItemLimitTime1", h);
      } else if (h === 0) {
        s = Math.trunc(e / 3600);
        i = Math.trunc(e / 60) % 60;
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(25), "ShopItemLimitTime2", s, i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(25), "ShopItemLimitTimeOut");
      }
    }
    this.UpdateLockState(t);
    this.LMo.SetInteractable(true);
    var h = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t.ItemId);
    this.UpdateItemTips(h);
  }
  GetMaxCanBuyCount() {
    var t;
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.IMo.CurrencyId);
    var i = Math.trunc(i / this.IMo.SingleBuyPrice);
    if (this.IMo.BuyLimit > 0) {
      t = Math.max(0, this.IMo.BuyLimit - this.IMo.BoughtCount);
      return Math.min(t, i);
    } else {
      return i;
    }
  }
  UpdateItemTips(t) {
    this.CloseUiItem();
    if (t === 2) {
      this.SetWeaponTips();
      this.k1o();
    } else {
      this.GetItem(22).SetUIActive(true);
    }
    var i = this.GetText(18);
    if (this.CommonTipsData?.LevelText) {
      i.SetUIActive(true);
      if (t !== 2) {
        i.SetText(this.CommonTipsData.LevelText);
      }
    } else {
      i.SetUIActive(false);
    }
  }
  CloseUiItem() {
    this.GetVerticalLayout(20).GetRootComponent().SetUIActive(false);
    this.GetItem(17).SetUIActive(false);
  }
  UpdateLockState(t) {
    var i = t.IsInteractive();
    this.GetItem(9).SetUIActive(i);
    this.GetItem(10).SetUIActive(i);
    this.GetItem(11).SetUIActive(t.IsLock || t.IsSoldOut());
    this.GetItem(12).SetUIActive(t.IsLock);
    this.GetItem(8).SetUIActive(false);
    if (t.IsLock) {
      if (typeof t.LockText == "number") {
        if (t.LockText > 0) {
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(13), "ShopFixed", t.LockText);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), t.LockText);
      }
    } else if (t.IsSoldOut()) {
      this.GetItem(11).SetColor(soldOutColor);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(13), "ShopItemSoldOut");
      this.GetItem(14).SetUIActive(true);
      this.GetItem(26).SetUIActive(false);
    } else {
      this.GetItem(26).SetUIActive(true);
      if (t.BuyLimit > 0) {
        i = Math.max(0, t.BuyLimit - t.BoughtCount);
        this.GetItem(8).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "ShopItemLimitCount", i, t.BuyLimit);
      }
    }
  }
  SetWeaponTips() {
    this.GetItem(17).SetUIActive(true);
    this.GetVerticalLayout(20).GetRootComponent().SetUIActive(true);
    var t = this.CommonTipsData;
    var i = t.ConfigId;
    var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(i);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.BgDescription);
    this.TMo.UpdateItem(i, t.ResonanceLevel, e);
  }
  GetParams() {
    return this.IMo?.ParamData;
  }
}
exports.ShopItemInfoDetailPanel = ShopItemInfoDetailPanel;
//# sourceMappingURL=ShopItemInfoDetailPanel.js.map