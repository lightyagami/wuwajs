"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonCurrencyItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
class CommonCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemId = 0;
    this.SkipAutoAddEvent = false;
    this._Y_ = undefined;
    this.STt = undefined;
    this.cX_ = undefined;
    this.ije = () => {
      var e;
      this.STt?.();
      this._Y_?.(this.ItemId);
      if (this.ItemId === ItemDefines_1.EItemId.PayGold || this.ItemId === ItemDefines_1.EItemId.BlackCard || this.ItemId === ItemDefines_1.GACHAITEM) {
        (e = new LogReportDefine_1.OnClickAddCurrencyLogEvent()).i_id = this.ItemId;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      }
    };
    this.yTt = () => {
      if (!this.cX_ || !!this.cX_(this.ItemId)) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ItemId);
      }
    };
    this.ITt = () => {
      this.RefreshCountText();
    };
    this.TTt = e => {
      for (const t of e) {
        if (this.ItemId === t.s5n) {
          this.RefreshCountText();
          return;
        }
      }
    };
    this.LTt = e => {
      if (e.includes(this.ItemId)) {
        this.RefreshCountText();
      }
    };
    this.DTt = (e, t, i) => {
      if (this.ItemId === e.s5n) {
        this.RefreshCountText();
      }
    };
    this.RTt = e => {
      if (e === ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency()) {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge();
      } else if (e === ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency()) {
        ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByItemId(e);
      }
    };
  }
  set ButtonFunction(e) {
    if (e !== this._Y_ && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("WeeklyRogue", 34, "Test");
    }
    this._Y_ = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UITextureTransitionComponent], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[2, this.ije], [3, this.yTt]];
  }
  OnStart() {
    if (!this.SkipAutoAddEvent) {
      this.AddEventListener();
    }
  }
  OnBeforeDestroy() {
    if (!this.SkipAutoAddEvent) {
      this.RemoveEventListener();
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PayShopGoodsBuy, this.ITt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.ITt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveCommonItem, this.LTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.DTt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PayShopGoodsBuy, this.ITt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.ITt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveCommonItem, this.LTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.DTt);
  }
  UTt() {
    const e = this.GetTexture(0);
    e.SetUIActive(false);
    this.SetItemIcon(this.GetTexture(0), this.ItemId, undefined, () => {
      this.ATt();
      e.SetUIActive(true);
    });
  }
  ATt() {
    var e = this.GetUiTextureTransitionComponent(4);
    if (e) {
      e.SetAllStateTexture(this.GetTexture(0).GetTexture());
    }
  }
  RefreshTemp(e, t) {
    this.ShowWithoutText(e);
    this.RefreshCountText(t);
  }
  ShowWithoutText(e) {
    this.ItemId = e;
    this.UTt();
  }
  RefreshCountText(e) {
    var t = this.GetText(1);
    var e = e ?? ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ItemId);
    t?.SetText(e.toString());
  }
  SetCountText(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e, ...t);
  }
  SetCountTextNew(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...t);
  }
  SetCount(e) {
    this.GetText(1).SetText(e.toString());
  }
  SetButtonFunction(e) {
    this.ButtonFunction = e;
  }
  SetBeforeButtonFunction(e) {
    this.STt = e;
  }
  SetTextureClickCheckFunction(e) {
    this.cX_ = e;
  }
  SetButtonActive(e) {
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  RefreshMaxItem(e) {
    this.GetItem(8).SetUIActive(e);
  }
  SetToPayShopFunction() {
    this.ButtonFunction = this.RTt;
  }
  RefreshAddButtonActive() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency();
    var t = ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency();
    var i = this.GetButton(2);
    if (this.ItemId !== e && this.ItemId !== t) {
      i.RootUIComp.SetUIActive(false);
    } else {
      i.RootUIComp.SetUIActive(true);
    }
  }
}
exports.CommonCurrencyItem = CommonCurrencyItem;
//# sourceMappingURL=CommonCurrencyItem.js.map