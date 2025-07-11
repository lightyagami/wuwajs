"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopGiftItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager");
const HelpController_1 = require("../../../Help/HelpController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SOLDOUT_ALPHA = 0.6;
class PayShopGiftItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i, t = undefined) {
    super();
    this.Data = undefined;
    this.SellTimerId = undefined;
    this.DiscountTimerId = undefined;
    this.ToggleFunction = undefined;
    this.Ybt = undefined;
    this.u3i = false;
    this.t5e = 0;
    this.GTt = undefined;
    this.Bke = () => {
      this.GetExtendToggle(0).SetToggleState(0, false);
      this.ToggleFunction(this.Data.GetGoodsId());
    };
    this.Gsi = () => {
      HelpController_1.HelpController.OpenHelpById(this.t5e);
    };
    this.iFi = i => {
      var t = this.Data.GetGoodsData();
      if (!t.IsDirect()) {
        if (t.Price.Id === i) {
          this.SetPrice();
        }
      }
    };
    this.c3i = () => {
      this.DiscountTimerId = undefined;
      this.SetDiscountTime();
      if (!this.Data.HasDiscount()) {
        this.SetPrice();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsRefreshDiscountTime, this.Data.GetGoodsId());
      }
    };
    this.zbt = LguiResourceManager_1.LguiResourceManager.InvalidId;
    this.m3i = i;
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Bke], [13, this.Gsi]];
  }
  OnStart() {
    this.GetButton(13).RootUIComp.SetUIActive(false);
  }
  AddEventListener() {
    if (!this.u3i) {
      this.u3i = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.iFi);
    }
  }
  RemoveEventListener() {
    if (this.u3i) {
      this.u3i = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.iFi);
    }
  }
  SetBelongViewName(i) {
    this.GTt = i;
  }
  Refresh(i) {
    this.AddEventListener();
    this.RefreshGiftItem(i);
  }
  RefreshGiftItem(i) {
    this.Data = i;
    this.RefreshState();
  }
  Clear() {
    this.RemoveEventListener();
    this.RemoveSellTimer();
    this.RemoveDiscountTimer();
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
    this.RemoveSellTimer();
    this.RemoveDiscountTimer();
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zbt);
  }
  RefreshState() {
    var i = this.Data.GetItemData();
    this.SetQuality(i.Quality);
    this.SetIcon();
    this.SetTips();
    this.SetPrice();
    this.SetDiscountTime();
    this.SetSellTime();
    this.SetName(i.Name);
    this.ShowDebugText();
  }
  SetQuality(i) {
    i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i);
    let t = i.PayShopTexture;
    if (this.m3i === 1) {
      t = i.NewPayShopTexture;
    }
    this.SetTextureByPath(t, this.GetTexture(2));
  }
  SetIcon() {
    var i = this.GetTexture(1);
    this.SetItemIcon(i, this.Data.GetItemData().ItemId, this.GTt);
  }
  SetTips() {
    this.RootItem.SetAlpha(1);
    var i;
    var t = this.GetText(4);
    if (this.Data.IsLocked()) {
      i = this.Data.GetConditionTextId();
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
      t.SetUIActive(true);
      this.RootItem.SetAlpha(SOLDOUT_ALPHA);
    } else if (this.Data.IsLimitGoods()) {
      t.SetUIActive(true);
      if (this.Data.IsSoldOut()) {
        LguiUtil_1.LguiUtil.SetLocalText(t, "SoldoutText");
        this.RootItem.SetAlpha(SOLDOUT_ALPHA);
      } else {
        i = this.Data.GetRemainingData();
        LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.Count);
      }
    } else {
      t.SetUIActive(false);
    }
  }
  SetPrice() {
    var i;
    var t = this.GetText(7);
    var e = this.GetTexture(5);
    var s = this.GetText(6);
    if (this.Data.IsDirect()) {
      t.SetUIActive(false);
      e.SetUIActive(false);
      i = this.Data.GetDirectPriceText();
      s.SetText(i);
    } else {
      e.SetUIActive(true);
      if ((i = this.Data.GetPriceData()).OriginalPrice) {
        t.SetUIActive(true);
        t.SetText(`<s>${i.OriginalPrice.toString()}</s>`);
      } else {
        t.SetUIActive(false);
      }
      s.SetText(i.NowPrice.toString());
      s.SetChangeColor(i.OwnNumber() < i.NowPrice, s.changeColor);
      this.SetItemIcon(e, i.CurrencyId);
    }
  }
  SetDiscountTime() {
    this.RemoveDiscountTimer();
    var i;
    var t = this.GetItem(8);
    var e = this.GetText(10);
    var s = this.GetItem(9);
    if (this.Data.HasDiscount()) {
      t.SetUIActive(true);
      i = this.Data.IsPermanentDiscount();
      s.SetUIActive(!i);
      s = this.Data.GetDiscount();
      e.SetText("-" + s + "%");
      if (!i) {
        e = this.Data.GetDiscountRemainTime();
        this.DiscountTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(this.c3i, e.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
    } else {
      t.SetUIActive(false);
    }
  }
  SetSellTime() {
    this.RemoveSellTimer();
    var i;
    var t;
    var e = this.GetItem(12);
    if (this.Data.IsPermanentSell()) {
      e.SetUIActive(false);
    } else if (this.Data.InSellTime()) {
      i = this.Data.GetEndTimeRemainData();
      t = this.GetText(11);
      e.SetUIActive(true);
      if (typeof i == "string") {
        t.SetText(i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue);
        this.SellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(() => {
          this.SellTimerId = undefined;
          this.SetSellTime();
        }, i.RemainingTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
    }
  }
  SetName(i) {
    var t;
    var e = this.GetText(3);
    var s = this.Data.GetGoodsData();
    if (s.ItemCount > 1) {
      t = new LguiUtil_1.TableTextArgNew(i);
      LguiUtil_1.LguiUtil.SetLocalText(e, "GoodsName", t, s.ItemCount);
    } else {
      e.ShowTextNew(i);
    }
  }
  ShowDebugText() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (this.Ybt) {
        this.Ybt?.SetText(this.Data.GetGoodsId().toString());
      } else {
        LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zbt);
        this.zbt = LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId("UiItem_DebugText_Prefab", this.RootItem, i => {
          this.zbt = LguiResourceManager_1.LguiResourceManager.InvalidId;
          this.Ybt = i.GetComponentByClass(UE.UIText.StaticClass());
          this.Ybt?.SetText(this.Data.GetGoodsId().toString());
        });
      }
    }
  }
  RemoveSellTimer() {
    if (this.SellTimerId !== undefined) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.SellTimerId);
      this.SellTimerId = undefined;
    }
  }
  RemoveDiscountTimer() {
    if (this.DiscountTimerId !== undefined) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.DiscountTimerId);
      this.DiscountTimerId = undefined;
    }
  }
  SetToggleFunction(i) {
    this.ToggleFunction = i;
  }
  SetTipsIdAndShowTipsButton(i) {
    this.GetButton(13).RootUIComp.SetUIActive(true);
    this.t5e = i;
  }
}
exports.PayShopGiftItem = PayShopGiftItem;
//# sourceMappingURL=PayShopGiftItem.js.map