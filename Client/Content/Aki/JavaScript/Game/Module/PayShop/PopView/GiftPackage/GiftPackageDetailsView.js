"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftPackageDetailsView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiResourceManager_1 = require("../../../../Ui/LguiResourceManager");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PayShopFlySkinItem_1 = require("../../PayShopTab/TabItem/PayShopFlySkinItem");
const PayShopItem_1 = require("../../PayShopTab/TabItem/PayShopItem");
const PayShopSkinItem_1 = require("../../PayShopTab/TabItem/PayShopSkinItem");
const GiftPackageMonthlyCardItem_1 = require("./GiftPackageMonthlyCardItem");
const GiftPackageSupplyPackItem_1 = require("./GiftPackageSupplyPackItem");
class GiftPackageDetailsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this._yl = undefined;
    this.uyl = undefined;
    this.Goods = undefined;
    this.GoodsData = undefined;
    this.ResellTimerId = undefined;
    this.l4i = ItemDefines_1.EItemFunctionType.ManualOpenGift;
    this._4i = undefined;
    this.xe = undefined;
    this.bAt = () => {
      this.CloseMe();
    };
    this.qAt = () => {
      var i;
      if (this.IsEnoughMoney() && this.GoodsData.IfPayGift()) {
        ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(this.GoodsData.Id);
        this.CloseMe();
      } else if (this.IsEnoughMoney() && !this.GoodsData.IfPayGift()) {
        ControllerHolder_1.ControllerHolder.PayShopController.SendRequestPayShopBuy(this.GoodsData.Id);
        this.CloseMe();
      } else {
        i = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency();
        if (this.GoodsData.Price.Id === i) {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowFirstCurrencyConfirm();
          this.CloseMe();
        } else {
          i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(this.GoodsData.Price.Id);
          i = new LguiUtil_1.TableTextArgNew(i.Name);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ShopResourceNotEnough", i);
        }
      }
    };
    this.Pgi = () => {
      this.CloseMe();
    };
    this.P3i = () => {
      this.RemoveResellTimer();
      var i;
      var e = this.Goods.GetExchangePopViewResellText();
      if (this.Goods.GetIfNeedExtraLimitText()) {
        if (i = this.Goods.GetExtraLimitText()) {
          this.ndm(true);
          this.GetText(8).ShowTextNew(i);
        }
      } else if (this.Goods.GetPriceData().Enough) {
        if ((i = this.Goods.GetCountDownData())[0] !== 2) {
          this.ndm(false);
          this.GetText(8).SetUIActive(false);
        } else {
          this.ndm(true);
          if (!StringUtils_1.StringUtils.IsEmpty(e)) {
            this.GetText(8).ShowTextNew(e);
          }
          this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(this.P3i, i[2] * CommonDefine_1.MILLIONSECOND_PER_SECOND);
        }
      } else if (StringUtils_1.StringUtils.IsEmpty(e)) {
        this.ndm(true);
        if (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Goods.GetPriceData().CurrencyId)) {
          i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "CurrencyNotEnough", i);
        }
      } else {
        this.GetText(8).ShowTextNew(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIInteractionGroup], [8, UE.UIText], [7, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [12, UE.UITexture], [11, UE.UIText], [13, UE.UIItem], [14, UE.UIText]];
    this.BtnBindInfo = [[4, this.bAt], [5, this.qAt]];
  }
  OnBeforeCreate() {
    var i;
    var e;
    var t = this.OpenParam;
    this.Goods = t.PayShopGoods;
    this.GoodsData = this.Goods.GetGoodsData();
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.GoodsData.ItemId);
    this.xe = undefined;
    for ([i, e] of t.Parameters) {
      var s = ItemDefines_1.EItemFunctionType[i];
      if (!StringUtils_1.StringUtils.IsEmpty(s)) {
        this.l4i = i;
        this.xe = e;
        break;
      }
    }
    if (!this.xe) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 43, "检查道具ID的参数（Parameters）字段 是否 表示为正确的指向道具id的参数", ["道具ID", this.GoodsData.ItemId]);
      }
    }
  }
  async OnCreateAsync() {
    await this.sGe(this.Goods);
  }
  async sGe(i) {
    const e = new CustomPromise_1.CustomPromise();
    var t = i.CheckIfRoleSkinGoods();
    var s = i.CheckIfFlySkinGoods();
    var i = this.cyl(i);
    if (t || s) {
      if (t) {
        LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(i, undefined, i => {
          this.uyl = new PayShopSkinItem_1.PayShopSkinItem();
          this.uyl.CreateByActorAsync(i).finally(() => {
            e.SetResult(true);
          });
        });
      } else if (s) {
        LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(i, undefined, i => {
          this.uyl = new PayShopFlySkinItem_1.PayShopFlySkinItem();
          this.uyl.CreateByActorAsync(i).finally(() => {
            e.SetResult(true);
          });
        });
      }
    } else {
      LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(i, undefined, i => {
        this._yl = new PayShopItem_1.PayShopItem();
        this._yl.CreateByActorAsync(i).finally(() => {
          e.SetResult(true);
        });
      });
    }
    await e.Promise;
  }
  cyl(i) {
    var e = i.CheckIfRoleSkinGoods();
    var i = i.CheckIfFlySkinGoods();
    if (e || i) {
      return "UiItem_ShopSkinItem";
    } else {
      return "UiItem_ShopItem";
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PayShopGoodsBuy, this.bAt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PayShopGoodsBuy, this.bAt);
  }
  OnStart() {
    var i;
    if (this.xe) {
      i = this.GetItem(1);
      if (this.l4i === ItemDefines_1.EItemFunctionType.AutoOpenMonthCard) {
        this._4i = new GiftPackageMonthlyCardItem_1.GiftPackageMonthlyCardItem(this.xe, i);
      } else if (this.l4i === ItemDefines_1.EItemFunctionType.AutoOpenGift || this.l4i === ItemDefines_1.EItemFunctionType.ManualOpenGift) {
        this._4i = new GiftPackageSupplyPackItem_1.GiftPackageSupplyPackItem(this.xe, i, this.Goods);
      }
      this._yl?.GetOriginalItem()?.SetUIParent(this.GetItem(0), false);
      this.uyl?.GetOriginalItem()?.SetUIParent(this.GetItem(0), false);
      this._yl?.SetActive(true);
      this.uyl?.SetActive(true);
    }
  }
  OnBeforeShow() {
    this._yl?.HidePackageViewElement();
    this.myl();
    this._yl?.Refresh(this.Goods, false, 0);
    this.uyl?.Refresh(this.Goods, false, 0);
    this.SetInteractionGroup();
    this.P3i();
    this.ITt();
    this.kV_();
    this.pK1();
  }
  myl() {
    var i = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
    if (this.Goods?.GetGoodsId() === i) {
      this._yl?.SetLeftTimeTextShowState(true);
    }
  }
  async ITt() {
    var i;
    if (!this.Goods.IsDirect()) {
      if (this.GoodsData.GetNowPrice() !== 0) {
        if (this.Goods.GetPriceData().CurrencyId > 0) {
          (i = new Array()).push(this.Goods.GetPriceData().CurrencyId);
          await this.ChildPopView?.PopItem.SetCurrencyItemList(i);
        }
        (this.ChildPopView?.PopItem.GetCurrencyComponent().GetCurrencyItemList()).forEach(i => {
          i.SetBeforeButtonFunction(this.Pgi);
          i.SetToPayShopFunction();
        });
      }
    }
  }
  kV_() {
    this.GetItem(9).SetUIActive(this.Goods.HasCloudGameInfo() && !this.Goods.GetIfNeedExtraLimitText());
  }
  pK1() {
    var i;
    var e = this.GetItem(10);
    var t = this.GetTexture(12);
    var s = this.GetText(11);
    var r = this.Goods.GetAvailableCouponItem();
    if (!r || this.Goods.IsDirect() || !this.Goods.GetPriceData().Enough || this.Goods.GetIfNeedExtraLimitText()) {
      e.SetUIActive(false);
    } else {
      e.SetUIActive(true);
      e = this.Goods.GetAvailableCouponDiscount();
      i = this.Goods.GetPriceData().CurrencyId;
      i = `<texture=${ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i)?.IconSmall ?? ""},0.6/>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "ItemInfo_50020_Tip", e, i);
      this.SetTextureByPath(r.GetConfig().IconSmall, t);
    }
  }
  OnBeforeDestroy() {
    if (this._4i) {
      this._4i.Destroy();
    }
    this.RemoveResellTimer();
  }
  RemoveResellTimer() {
    if (this.ResellTimerId !== undefined) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId);
      this.ResellTimerId = undefined;
    }
  }
  ndm(i) {
    this.GetItem(7).SetUIActive(i);
    this.vJd(i);
  }
  vJd(i) {
    var e = this.GoodsData?.DisclaimerText;
    var i = !StringUtils_1.StringUtils.IsEmpty(e) && !i;
    this.GetItem(13).SetUIActive(i);
    if (i) {
      this.GetText(14).SetText(e);
    }
  }
  IsEnoughMoney() {
    return !!this.GoodsData.IsDirect() || this.Goods.GetPriceData().Enough;
  }
  SetInteractionGroup() {
    var i = this.GetInteractionGroup(6);
    if (this.Goods.IsLocked() || this.Goods.IsSoldOut() || !this.Goods.IfCanBuy() || !this.Goods.GetPriceData().Enough) {
      i.SetInteractable(false);
    } else {
      i.SetInteractable(true);
    }
  }
}
exports.GiftPackageDetailsView = GiftPackageDetailsView;
//# sourceMappingURL=GiftPackageDetailsView.js.map