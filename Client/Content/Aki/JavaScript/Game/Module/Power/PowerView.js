"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
const PowerController_1 = require("./PowerController");
const COUN_NOT_ENOUGH_COLOR = "9D2437FF";
const WHITECOLOR = "FFFFFFFF";
class PowerView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Soo = undefined;
    this.yoo = undefined;
    this.Ioo = undefined;
    this.Too = undefined;
    this.roo = undefined;
    this.Doo = 0;
    this.Roo = 0;
    this.OFt = undefined;
    this.Aoo = -1;
    this.bAt = () => {
      this.CloseMe();
    };
    this.qAt = () => {
      var e;
      if (this.Ioo.Type === 1) {
        this.CloseMe();
        PowerController_1.PowerController.OpenPowerView();
      } else if (this.Ioo.Type === 2) {
        if (ModelManager_1.ModelManager.PowerModel.PowerCount + this.Too.RenewValue > this.Roo) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBound");
        } else if (this.Too.RemainCount === 0 && this.Too.ItemId !== ItemDefines_1.EItemId.OverPower) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_PowerDescribe_Astrite_Not"));
        } else if (this.Too.CostValue > this.Too.StackValue) {
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Too.ItemName);
          e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PowerPropsCannotExchange"), e);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
        } else {
          PowerController_1.PowerController.ExchangePower(this.Too, 1);
        }
      } else {
        this.CloseMe();
      }
    };
    this.xoo = e => {
      var t = e.Data;
      var e = e.MediumItemGrid;
      this.OFt?.SetSelected(false);
      this.OFt = e;
      this.Too = t;
      this.woo(t);
    };
    this.pqt = () => {
      var e = ModelManager_1.ModelManager.PowerModel.PowerCount / this.Doo;
      this.GetSlider(14).SetValue(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PowerModule", 49, `补充时打印体力${ModelManager_1.ModelManager.PowerModel.PowerCount}/${this.Doo}`);
      }
      this.roo = this.jXs();
      this.Soo.RefreshByData(this.roo);
      if (this.Ioo) {
        if ((e = this.Ioo.AutoClosePowerCount) > 0 && ModelManager_1.ModelManager.PowerModel.PowerCount >= e) {
          this.CloseMe();
        } else {
          if (this.Ioo.UpdateCurrentNeedPower) {
            e = ModelManager_1.ModelManager.PowerModel.PowerCount - this.Ioo.PowerCount;
            ModelManager_1.ModelManager.PowerModel.CurrentNeedPower = Math.max(ModelManager_1.ModelManager.PowerModel.CurrentNeedPower - e, 0);
          }
          this.Ioo.PowerCount = ModelManager_1.ModelManager.PowerModel.PowerCount;
        }
      }
    };
    this.Boo = e => {
      if (e === ItemDefines_1.EItemId.BlackCard) {
        this.roo = this.jXs();
        this.Soo.RefreshByData(this.roo);
      }
      if (this.Too) {
        this.woo(this.Too);
      }
      this.yoo?.SetBottomText(ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(ItemDefines_1.EItemId.BlackCard).toString());
    };
    this.xdi = (e, t) => {
      if (e && t && (this.Soo && this.Too?.ItemId !== ItemDefines_1.EItemId.OverPower && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PowerBuySucceed", this.Too.RenewValue), this.roo = this.jXs(), this.Soo.RefreshByData(this.roo), this.Too)) {
        this.woo(this.Too);
      }
    };
    this.qoo = () => {
      this.roo = this.jXs();
      this.Soo.RefreshByData(this.roo);
    };
    this.Esi = (e, t, i) => {
      var s = new MediumItemGrid_1.MediumItemGrid();
      s.Initialize(t.GetOwner());
      var t = {
        Data: e,
        Type: 4,
        ItemConfigId: e.ItemId,
        BottomText: e.StackValue.toString()
      };
      s.Apply(t);
      s.BindOnExtendToggleClicked(this.xoo);
      if (e.CostValue > e.StackValue || e.RemainCount === 0) {
        s.SetBottomTextColor(COUN_NOT_ENOUGH_COLOR);
      } else {
        s.SetBottomTextColor(WHITECOLOR);
      }
      if (e.ItemId === ItemDefines_1.EItemId.BlackCard) {
        this.yoo = s;
      }
      return {
        Key: i,
        Value: s
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIText], [9, UE.UIVerticalLayout], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UISliderComponent], [15, UE.UIItem]];
    this.BtnBindInfo = [[0, this.bAt], [2, this.qAt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPowerChanged, this.pqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BoughtItem, this.xdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGoodUnlock, this.qoo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.Boo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPowerChanged, this.pqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BoughtItem, this.xdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGoodUnlock, this.qoo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.Boo);
  }
  OnBeforeShow() {
    this.ITt();
  }
  async ITt() {
    var e = this.ChildPopView.PopItem;
    let t = [ItemDefines_1.EItemId.BlackCard];
    t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10066) ? [ItemDefines_1.EItemId.OverPower, ItemDefines_1.EItemId.Power, ItemDefines_1.EItemId.BlackCard] : [ItemDefines_1.EItemId.Power, ItemDefines_1.EItemId.BlackCard];
    e.GetCostParent()?.SetUIActive(false);
    await e.SetCurrencyItemList(t);
    var i = e.GetCurrencyComponent()?.GetCurrencyItemList();
    if (i) {
      for (let e = 0; e < i.length; e++) {
        if (t[e] === ItemDefines_1.EItemId.BlackCard) {
          i[e].SetButtonActive(true);
          i[e].SetToPayShopFunction();
        } else {
          t[e];
          ItemDefines_1.EItemId.Power;
          i[e].SetButtonActive(false);
        }
      }
    }
    e.GetCostParent()?.SetUIActive(true);
    return Promise.resolve();
  }
  OnStart() {
    var e;
    this.GetItem(11).SetUIActive(false);
    this.GetButton(13).RootUIComp.SetUIActive(false);
    PowerController_1.PowerController.SendUpdatePowerRequest([ItemDefines_1.EItemId.Power, ItemDefines_1.EItemId.OverPower]);
    this.Doo = ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit();
    this.Roo = ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit();
    this.Ioo = this.OpenParam;
    this.Noo();
    this.Soo = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(7), this.Esi);
    this.roo = this.jXs();
    this.Soo.RefreshByData(this.roo);
    if ((this.Aoo = 0) === ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.OverPower).GetCurrentPower()) {
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(10800);
      this.Aoo = e === 0 ? this.roo.findIndex(e => e.ItemId === ItemDefines_1.EItemId.BlackCard) : this.roo.findIndex(e => e.ItemId === 10800);
    } else {
      this.Aoo = this.roo.findIndex(e => e.ItemId === ItemDefines_1.EItemId.OverPower);
    }
    this.Too = this.roo[this.Aoo];
    this.OFt = this.Soo.GetScrollItemList()[this.Aoo];
    this.OFt.SetSelected(true);
    this.woo(this.Too);
  }
  jXs() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.PowerModel.PowerItemInfoList) {
      if (!(t.StackValue <= 0) || !t.IsHideWhenZero) {
        e.push(t);
      }
    }
    return e;
  }
  OnBeforeDestroy() {
    if (this.Soo) {
      this.Soo.ClearChildren();
      this.Soo = undefined;
    }
  }
  OnTick(e) {
    this.WXs();
    this.QXs(this.Too?.ItemId);
  }
  PYt(e, t) {
    this.GetText(5).SetText(e);
    this.GetText(4).SetText(t);
  }
  Noo() {
    switch (this.Ioo.Type) {
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerTitle");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "PowerConfirm");
        break;
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerGetReward");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "PowerRewardCost");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "PowerCostAndReward");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel");
        this.GetVerticalLayout(9).GetRootComponent().SetUIActive(false);
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "PowerGetReward");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "PowerRewardCostFail");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "PowerCostAndReward");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "PowerCancel");
        this.GetVerticalLayout(9).GetRootComponent().SetUIActive(false);
    }
  }
  woo(e) {
    this.Wbe(e);
    this.$Xs(e.ItemId);
  }
  Wbe(e) {
    var t;
    var i;
    var s;
    if (e.ItemId !== ItemDefines_1.EItemId.OverPower) {
      t = e.ItemId === ItemDefines_1.EItemId.BlackCard ? "Text_PowerDescribe_Astrite_Text" : "Text_PowerDescribe_Text";
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.ItemName);
      s = e.RemainCount < 0 ? 0 : e.RemainCount;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t, e.CostValue, i, e.RenewValue, s);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "GetOverPower");
    }
  }
  $Xs(e) {
    this.QXs(e);
  }
  QXs(e) {
    if (e) {
      this.YXs();
      e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power);
      this.GetItem(11).SetUIActive(e.GetPowerRecoveryMode() === 0);
    }
  }
  WXs() {
    var e = this.Too?.ItemId;
    if (e === ItemDefines_1.EItemId.BlackCard || e === ItemDefines_1.EItemId.Power || e === ItemDefines_1.EItemId.OverPower || e === 10800) {
      e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power);
      this.PYt(e.GetFullRecoverText(), e.GetNextTimerRecoverText());
    }
  }
  YXs() {
    var e = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(ItemDefines_1.EItemId.Power);
    this.GetItem(15).SetUIActive(e.CheckPowerIfMax());
  }
}
exports.PowerView = PowerView;
//# sourceMappingURL=PowerView.js.map