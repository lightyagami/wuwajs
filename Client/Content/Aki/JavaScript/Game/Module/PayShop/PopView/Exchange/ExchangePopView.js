"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangePopView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem");
const COLOR = "FED12E";
class ExchangePopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.i4i = undefined;
    this.Goods = undefined;
    this.o4i = true;
    this.r4i = undefined;
    this.ResellTimerId = undefined;
    this.n4i = 0;
    this.WGe = undefined;
    this.bAt = () => {
      this.CloseMe();
    };
    this.qAt = () => {
      var e = this.Goods.GetGoodsData();
      if (this.IsEnoughMoney()) {
        ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(e.Id, this.s4i);
      } else {
        e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.Price.Id);
        e = new LguiUtil_1.TableTextArgNew(e.Name);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ShopResourceNotEnough", e);
      }
    };
    this.R3i = () => {
      this.Og();
    };
    this.KGe = e => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("BugCount");
      return new LguiUtil_1.TableTextArgNew(t, e);
    };
    this.QGe = e => {
      this.SetPrice();
    };
    this.Pgi = () => {
      this.CloseMe();
    };
    this.SetEndTime = () => {
      var e;
      var t = this.Goods.GetCountDownData();
      if (t[2] !== 0 && (e = this.Goods.GetCountDownData()[1], this.GetText(14).SetUIActive(t[0] === 3), t[0] === 3 ? this.GetText(14).ShowTextNew("DownShopItem") : t[0] === 2 ? this.GetText(14).ShowTextNew("ReUpShopItem") : t[0] === 1 && this.GetText(14).ShowTextNew("DiscountItem"), e)) {
        this.GetItem(15).SetUIActive(true);
        this.o4i = true;
        t = this.GetText(1);
        if (typeof e == "string") {
          t.SetText(e);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.TimeValue);
        }
      } else {
        this.GetItem(15).SetUIActive(false);
        this.o4i = false;
      }
    };
    this.P3i = () => {
      this.RemoveResellTimer();
      var e = this.Goods.GetExchangePopViewResellText();
      if (this.Goods.GetIfNeedExtraLimitText()) {
        if (i = this.Goods.GetExtraLimitText()) {
          this.GetItem(11).SetUIActive(true);
          this.GetText(12).ShowTextNew(i);
        }
      } else if (this.Goods.GetPriceData().Enough) {
        var t;
        var i = this.Goods.GetCountDownData();
        if (i[0] !== 2) {
          if (!this.Goods.GetPriceData().Enough) {
            this.GetItem(11).SetUIActive(true);
            t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.Goods.GetPriceData().CurrencyId);
            t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
            LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "CurrencyNotEnough", t);
            return;
          }
        }
        if (i[1]) {
          if (StringUtils_1.StringUtils.IsEmpty(e)) {
            this.GetItem(11).SetUIActive(false);
          } else {
            this.GetItem(11).SetUIActive(true);
            this.GetText(12).ShowTextNew(e);
          }
          if (i[2] > 0) {
            this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(this.P3i, i[2] * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          }
        } else {
          this.GetItem(11).SetUIActive(false);
          this.GetText(12).SetUIActive(false);
        }
      } else {
        this.GetItem(11).SetUIActive(true);
        if (StringUtils_1.StringUtils.IsEmpty(e)) {
          t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Goods.GetPriceData().CurrencyId);
          i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "CurrencyNotEnough", i);
        } else {
          this.GetText(12).ShowTextNew(e);
        }
      }
    };
  }
  get s4i() {
    return this.WGe.GetSelectNumber();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIText]];
    this.BtnBindInfo = [[6, this.bAt], [7, this.qAt]];
  }
  OnBeforeCreate() {
    var e = this.OpenParam;
    this.Goods = e.PayShopGoods;
  }
  async OnCreateAsync() {
    var e = this.OpenParam;
    const t = new CustomPromise_1.CustomPromise();
    LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(e.ShopItemResource, undefined, e => {
      this.i4i = new PayShopItem_1.PayShopItem();
      this.i4i.CreateThenShowByActor(e);
      t.SetResult(true);
    });
    await t.Promise;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PayShopGoodsBuy, this.bAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PayShopGoodsBuy, this.bAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
  }
  OnStart() {
    this.SetMaxCanBuyCount();
    this.r4i = this.GetButton(7).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(9));
    var e = {
      MaxNumber: this.n4i,
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe
    };
    this.WGe.Init(e);
    this.a4i();
    this.GetItem(13).SetUIActive(true);
  }
  a4i() {
    if (this.WGe.GetIfLimit()) {
      this.WGe.SetAddReduceButtonActive(true);
      this.WGe.SetAddReduceButtonInteractive(false);
    }
  }
  OnBeforeShow() {
    this.GetText(10).SetUIActive(false);
    this.GetText(16).SetUIActive(false);
    this.Og();
    this.SetPriceIcon();
    this.ITt();
  }
  Og() {
    var e = this.GetItem(2);
    this.i4i.GetOriginalItem().SetUIParent(e);
    this.i4i.HideExchangePopViewElement();
    this.i4i.Refresh(this.Goods, false, 0);
    this.SetEndTime();
    this.SetInteractionGroup();
    this.SetNameAndDescribe();
    this.P3i();
    this.K3i();
    this.h4i();
  }
  async ITt() {
    var e = [this.Goods.GetPriceData().CurrencyId];
    var t = this.ChildPopView.PopItem;
    await t.SetCurrencyItemList(e);
    var e = t.GetCurrencyComponent().GetCurrencyItemList()[0];
    e.SetBeforeButtonFunction(this.Pgi);
    e.SetToPayShopFunction();
  }
  OnBeforeDestroy() {
    this.WGe.Destroy();
    this.i4i.Destroy();
    this.RemoveResellTimer();
  }
  SetMaxCanBuyCount() {
    var e = this.Goods.GetGoodsData();
    var t = e.Price.Id;
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
    var t = Math.trunc(t / e.GetNowPrice());
    if (e.HasBuyLimit()) {
      this.n4i = Math.min(e.GetRemainingCount(), t);
    } else {
      this.n4i = t;
    }
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId);
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e.ItemId);
    if (t && i === 1 && t.ShowTypes.includes(30)) {
      this.n4i = 1;
    }
    if (t.ShowTypes.includes(30)) {
      i = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(e.ItemId);
      t = ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(i[0]);
      this.n4i = this.n4i > (t = t === 0 ? 1 : t) ? t : this.n4i;
    }
  }
  SetInteractionGroup() {
    if (this.Goods.IsLocked() || this.Goods.IsSoldOut() || !this.Goods.IfCanBuy() || !this.Goods.GetPriceData().Enough) {
      this.r4i.SetInteractable(false);
    } else {
      this.r4i.SetInteractable(true);
    }
  }
  SetPriceIcon() {
    var e = this.Goods.GetGoodsData();
    var t = this.GetTexture(3);
    this.SetItemIcon(t, e.Price.Id);
    var t = this.GetText(4);
    var e = this.s4i * e.GetNowPrice();
    t.SetText(e.toString());
  }
  SetPrice() {
    var e = this.Goods.GetGoodsData();
    var t = this.GetText(4);
    var e = this.s4i * e.GetNowPrice();
    var i = this.IsEnoughMoney();
    t.SetChangeColor(!i, t.changeColor);
    t.SetText(e.toString());
  }
  SetNameAndDescribe() {
    var e = this.Goods.GetGoodsData();
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e.ItemId);
    let i = "";
    i = t === 1 ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ItemId).Introduction : ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId).AttributesDescription;
    this.GetText(5).ShowTextNew(i);
  }
  IsEnoughMoney() {
    var e = this.Goods.GetGoodsData().GetItemConfig();
    if (e && e.ShowTypes?.includes(30)) {
      e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.Goods.GetGoodsData().ItemId)[0];
      e = ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(e);
      if (this.s4i > e) {
        return false;
      }
    }
    var e = this.Goods.GetGoodsData();
    var t = e.Price.Id;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) >= e.GetNowPrice() * this.s4i;
  }
  h4i() {
    var e = this.Goods.GetBuyLimitText();
    var e = this.o4i || !StringUtils_1.StringUtils.IsEmpty(e);
    this.GetItem(8).SetUIActive(e);
  }
  K3i() {
    var e = this.Goods.GetExchangeViewShopTipsText();
    let t = undefined;
    (t = this.o4i ? this.GetText(10) : this.GetText(16)).SetUIActive(e !== "");
    t.SetText(e);
    t?.SetColor(UE.Color.FromHex(COLOR));
  }
  RemoveResellTimer() {
    if (this.ResellTimerId !== undefined) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId);
      this.ResellTimerId = undefined;
    }
  }
}
exports.ExchangePopView = ExchangePopView;
//# sourceMappingURL=ExchangePopView.js.map