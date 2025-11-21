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
      var t;
      var e = this.Goods.GetGoodsData();
      if (this.IsEnoughMoney()) {
        if (!(t = this.OpenParam).CheckIfCanBuy || !!t.CheckIfCanBuy()) {
          ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(e.Id, this.s4i);
        }
      } else {
        t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.Price.Id);
        e = new LguiUtil_1.TableTextArgNew(t.Name);
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ShopResourceNotEnough", e);
      }
    };
    this.R3i = () => {
      this.Og();
    };
    this.KGe = t => {
      var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("BugCount");
      return new LguiUtil_1.TableTextArgNew(e, t);
    };
    this.QGe = t => {
      this.SetPrice();
    };
    this.Pgi = () => {
      this.CloseMe();
    };
    this.SetEndTime = () => {
      var t;
      var e = this.Goods.GetCountDownData();
      if (e[2] !== 0 && (t = this.Goods.GetCountDownData()[1], this.GetText(14).SetUIActive(e[0] === 3), e[0] === 3 ? this.GetText(14).ShowTextNew("DownShopItem") : e[0] === 2 ? this.GetText(14).ShowTextNew("ReUpShopItem") : e[0] === 1 && this.GetText(14).ShowTextNew("DiscountItem"), t)) {
        this.GetItem(15).SetUIActive(true);
        this.o4i = true;
        e = this.GetText(1);
        if (typeof t == "string") {
          e.SetText(t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(e, t.TextId, t.TimeValue);
        }
      } else {
        this.GetItem(15).SetUIActive(false);
        this.o4i = false;
      }
    };
    this.P3i = () => {
      this.RemoveResellTimer();
      var t = this.Goods.GetExchangePopViewResellText();
      if (this.Goods.GetIfNeedExtraLimitText()) {
        if (i = this.Goods.GetExtraLimitText()) {
          this.GetItem(11).SetUIActive(true);
          this.GetText(12).ShowTextNew(i);
        }
      } else if (this.Goods.GetPriceData().Enough) {
        var e;
        var i = this.Goods.GetCountDownData();
        if (i[0] !== 2) {
          if (!this.Goods.GetPriceData().Enough) {
            this.GetItem(11).SetUIActive(true);
            e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.Goods.GetPriceData().CurrencyId);
            e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
            LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "CurrencyNotEnough", e);
            return;
          }
        }
        if (i[1]) {
          if (StringUtils_1.StringUtils.IsEmpty(t)) {
            this.GetItem(11).SetUIActive(false);
          } else {
            this.GetItem(11).SetUIActive(true);
            this.GetText(12).ShowTextNew(t);
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
        if (StringUtils_1.StringUtils.IsEmpty(t)) {
          e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Goods.GetPriceData().CurrencyId);
          i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "CurrencyNotEnough", i);
        } else {
          this.GetText(12).ShowTextNew(t);
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
    var t = this.OpenParam;
    this.Goods = t.PayShopGoods;
  }
  async OnCreateAsync() {
    var t = this.OpenParam;
    const e = new CustomPromise_1.CustomPromise();
    LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(t.ShopItemResource, undefined, t => {
      this.i4i = new PayShopItem_1.PayShopItem();
      this.i4i.CreateThenShowByActor(t);
      e.SetResult(true);
    });
    await e.Promise;
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
    var t = {
      MaxNumber: this.n4i,
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe
    };
    this.WGe.Init(t);
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
    var t = this.GetItem(2);
    this.i4i.GetOriginalItem().SetUIParent(t);
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
    var t = [this.Goods.GetPriceData().CurrencyId];
    var e = this.ChildPopView.PopItem;
    await e.SetCurrencyItemList(t);
    var t = e.GetCurrencyComponent().GetCurrencyItemList()[0];
    t.SetBeforeButtonFunction(this.Pgi);
    t.SetToPayShopFunction();
  }
  OnBeforeDestroy() {
    this.WGe.Destroy();
    this.i4i.Destroy();
    this.RemoveResellTimer();
  }
  SetMaxCanBuyCount() {
    var t;
    var e;
    var i = this.OpenParam;
    if (i.GetMaxBuyCount) {
      this.n4i = i.GetMaxBuyCount();
    } else {
      e = (i = this.Goods.GetGoodsData()).Price.Id;
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
      e = Math.trunc(e / i.GetNowPrice());
      if (i.HasBuyLimit()) {
        this.n4i = Math.min(i.GetRemainingCount(), e);
      } else {
        this.n4i = e;
      }
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i.ItemId);
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(i.ItemId);
      if (e && t === 1 && e.ShowTypes.includes(30)) {
        this.n4i = 1;
      }
      if (e.ShowTypes.includes(30)) {
        t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(i.ItemId);
        e = ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(t[0]);
        this.n4i = this.n4i > (e = e === 0 ? 1 : e) ? e : this.n4i;
      }
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
    var t = this.Goods.GetGoodsData();
    var e = this.GetTexture(3);
    this.SetItemIcon(e, t.Price.Id);
    var e = this.GetText(4);
    var t = this.s4i * t.GetNowPrice();
    e.SetText(t.toString());
  }
  SetPrice() {
    var t = this.Goods.GetGoodsData();
    var e = this.GetText(4);
    var t = this.s4i * t.GetNowPrice();
    var i = this.IsEnoughMoney();
    e.SetChangeColor(!i, e.changeColor);
    e.SetText(t.toString());
  }
  SetNameAndDescribe() {
    var t = this.Goods.GetGoodsData();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t.ItemId);
    let i = "";
    i = e === 1 ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.ItemId).Introduction : ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId).AttributesDescription;
    this.GetText(5).ShowTextNew(i);
  }
  IsEnoughMoney() {
    var t = this.Goods.GetGoodsData().GetItemConfig();
    if (t && t.ShowTypes?.includes(30)) {
      t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.Goods.GetGoodsData().ItemId)[0];
      t = ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(t);
      if (this.s4i > t) {
        return false;
      }
    }
    var t = this.Goods.GetGoodsData();
    var e = t.Price.Id;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >= t.GetNowPrice() * this.s4i;
  }
  h4i() {
    var t = this.Goods.GetBuyLimitText();
    var t = this.o4i || !StringUtils_1.StringUtils.IsEmpty(t);
    this.GetItem(8).SetUIActive(t);
  }
  K3i() {
    var t = this.Goods.GetExchangeViewShopTipsText();
    let e = undefined;
    (e = this.o4i ? this.GetText(10) : this.GetText(16)).SetUIActive(t !== "");
    e.SetText(t);
    e?.SetColor(UE.Color.FromHex(COLOR));
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