"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopBigItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HelpController_1 = require("../../../Help/HelpController");
const PayItemController_1 = require("../../../PayItem/PayItemController");
const PayItemDefine_1 = require("../../../PayItem/PayItemDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PayShopGoods_1 = require("../../PayShopData/PayShopGoods");
const PayShopDefine_1 = require("../../PayShopDefine");
const PayShopTagItem_1 = require("./PayShopTagItem");
const NORMALCOLOR = "000000FF";
const REDCOLOR = "BA5C59FF";
class PayShopBigItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.U71 = undefined;
    this.B71 = new Map();
    this.G3i = undefined;
    this.C3i = false;
    this.E3i = 0;
    this.k71 = true;
    this.O71 = 0;
    this.ckn = "";
    this.q71 = 0;
    this.R3i = () => {
      if (this.Pe && this.IsUiActiveInHierarchy() && (this.RefreshCommonItem(), this.RefreshRechargeItem(), this.G71(), this.iFi(), this.pJd(), this.F71(), this.RefreshRedDot(), this.Pe instanceof PayShopGoods_1.PayShopGoods) && (this.N71(this.Pe) || this.V71(this.Pe))) {
        this.TryEmitRefreshTips();
      }
    };
    this.USe = t => {
      if (!(this.Pe instanceof PayShopGoods_1.PayShopGoods) && t.PayItemId === this.Pe.PayItemId) {
        this.Pe.CanSpecialBonus = false;
        this.Refresh(this.Pe, false, 0);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 充值成功,道具到账", ["订单号", t.OrderId], ["道具id", t.ItemId], ["道具数量", t.ItemCount]);
        }
      }
    };
    this.j71 = () => {
      HelpController_1.HelpController.OpenHelpById(PayShopDefine_1.MONTH_CARD_HELP_ID);
    };
    this.jbe = () => {
      if (this.Pe instanceof PayItemDefine_1.PayItemData) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 点击充值", ["Id", this.Pe.PayItemId]);
        }
        PayItemController_1.PayItemController.SdkPay(this.Pe.PayItemId);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 点击商品", ["Id", this.Pe.GetGoodsData().Id]);
        }
        ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [12, UE.UIItem], [11, UE.UIItem], [13, UE.UITexture], [14, UE.UINiagara], [15, UE.UINiagara], [16, UE.UITexture], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIText]];
    this.BtnBindInfo = [[7, this.j71], [0, this.jbe]];
  }
  OnStart() {
    this.GetButton(0).SetCanClickWhenDisable(true);
    this.GetItem(9)?.SetUIActive(false);
    this.GetTexture(16).SetUIActive(false);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  Refresh(t, i, e) {
    var s;
    if (t) {
      if ((this.Pe = t) instanceof PayShopGoods_1.PayShopGoods) {
        this.U71 = t.ConvertToPayShopBaseSt();
        s = t.GetCountDownData();
        this.k71 = s[2] !== 0;
        this.O71 = s[0];
        this.C3i = t.HasDiscount();
        this.E3i = t.GetDiscountNew();
      } else {
        this.U71 = ModelManager_1.ModelManager.PayItemModel.ConvertPayItemDataToPayShopItemBaseSt(t);
      }
      this.GetText(3).SetText(this.U71.ItemName);
      s = this.GetTexture(2);
      if (this.U71.StageImage !== "") {
        t = this.U71.StageImage;
        this.SetTextureByPath(t, s);
      } else {
        this.SetItemIcon(s, this.U71.ItemId);
      }
      t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(this.U71.Quality);
      this.SetTextureByPath(t.PayShopQualityTexture, this.GetTexture(1));
      this.GetUiNiagara(14)?.SetUIActive(this.U71.Quality === PayShopDefine_1.GOLD_QUALITY);
      this.GetUiNiagara(15)?.SetUIActive(this.U71.Quality === PayShopDefine_1.GOLD_QUALITY);
      s = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
      this.GetButton(7).RootUIComp.SetUIActive(this.U71.Id === s);
      t = this.GetTexture(13);
      s = this.U71.PriceData;
      if (this.U71.IsDirect || s.NowPrice === 0) {
        t.SetUIActive(false);
      } else {
        t.SetUIActive(true);
        this.SetItemIcon(t, s.CurrencyId);
      }
      this.G71();
      this.iFi();
      this.pJd();
      this.F71();
      this.RefreshRedDot();
      this.RefreshCommonItem();
      this.RefreshRechargeItem();
    }
  }
  RefreshCommonItem() {
    if (!!this.Pe && !(this.Pe instanceof PayItemDefine_1.PayItemData)) {
      this.$71(this.Pe);
      this.H71(this.Pe);
      this.U3i(this.Pe);
      this.B2t(this.Pe);
    }
  }
  RefreshRechargeItem() {
    if (!!this.Pe && !(this.Pe instanceof PayShopGoods_1.PayShopGoods)) {
      this.W71(this.Pe);
    }
  }
  U3i(e) {
    var t;
    if (this.q71 !== 0) {
      this.B71.get(11)?.SetUiActive(false);
    } else {
      t = e.HasDiscount();
      this.Q71(11, t, () => {
        var t = this.B71.get(11);
        var i = e.GetDiscountNew();
        t?.SetText(StringUtils_1.StringUtils.Format("+{0}%", i.toString()));
        var i = e.IsLimitGoods() && e.IsSoldOut() || !e.IfCanBuy();
        t?.SetMaskVisible(i);
      });
    }
  }
  B2t(t) {
    var t = t.GetCountDownData();
    this.O71 = t[0];
    var i = t[1];
    if (t[2] === 0) {
      this.GetItem(9).SetUIActive(false);
      this.GetTexture(16).SetUIActive(false);
    } else {
      this.w6e(i);
    }
  }
  w6e(t) {
    this.GetItem(9).SetUIActive(true);
    this.GetTexture(16).SetUIActive(true);
    var i = this.GetText(10);
    if (typeof t == "string") {
      i.SetText(t);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue);
    }
  }
  H71(t) {
    var i = t.IsLimitGoods() && t.IsSoldOut();
    this.Q71(9, i, () => {
      this.B71.get(9)?.SetText(t.GetDownTipsText());
    }, false);
    var i = !t.IfCanBuy();
    this.Q71(10, i, () => {
      this.B71.get(10)?.SetText(t.GetDownTipsText());
    }, false);
  }
  $71(e) {
    const s = e.GetDiscountLabel();
    if (this.q71 !== s) {
      this.Q71(this.q71, false, () => {});
      this.q71 = s;
    }
    var t = s > 0 && e.InLabelShowTime();
    this.Q71(this.q71, t, () => {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(s);
      var i = this.B71.get(this.q71);
      i?.SetTextByTextId(t);
      var t = e.IsLimitGoods() && e.IsSoldOut() || !e.IfCanBuy();
      i?.SetMaskVisible(t);
    });
  }
  W71(t) {
    var i = t.CanSpecialBonus;
    this.Q71(8, i, () => {
      this.B71.get(8)?.SetTextByTextId("Text_FirstBonus2_Text", t.SpecialBonusItemCount);
    });
    var i = t.BonusItemCount > 0 && !i;
    this.Q71(7, i, () => {
      this.B71.get(7)?.SetTextByTextId("Text_DefaultBonus_Text", t.BonusItemCount);
    });
  }
  pJd() {
    var t;
    var i;
    if (ModelManager_1.ModelManager.PayShopModel.BusinessCompliance) {
      i = (t = this.U71.GachaAverageCount ? this.U71.GachaAverageCount() : 0) > 0;
      this.GetItem(17).SetUIActive(i);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), "DisclaimerNumText", t.toString());
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "DisclaimerText", this.U71.GachaPrice ? this.U71.GachaPrice() : "");
      }
    } else {
      this.GetItem(17).SetUIActive(false);
    }
  }
  Q71(t, i, e, s = true) {
    var h;
    var r = this.B71.get(t);
    if (i && !r) {
      h = new PayShopTagItem_1.PayShopTagItem();
      this.B71.set(t, h);
      t = PayShopDefine_1.payShopTagTypeToResourceId[t];
      s = s ? this.GetItem(12) : this.GetItem(11);
      h.CreateThenShowByResourceIdAsync(t, s).then(() => {
        e();
      });
    }
    r?.SetUiActive(i);
    e();
  }
  G71() {
    var t = this.GetText(6);
    var i = this.U71.PriceData;
    if (i && i.OriginalPrice && i.InDiscountTime) {
      t.SetUIActive(true);
      t.SetText(`<s>${i.OriginalPrice.toString()}</s>`);
    } else {
      t.SetUIActive(false);
    }
  }
  iFi() {
    let t = NORMALCOLOR;
    var i;
    var e;
    if (!this.U71.IsDirect && this.U71.PriceData.OwnNumber() < this.U71.PriceData.NowPrice) {
      t = REDCOLOR;
    }
    if (!this.G3i || this.G3i !== this.U71.PriceData || this.ckn !== t) {
      this.ckn = t;
      this.G3i = this.U71?.PriceData;
      i = this.GetText(5);
      if (this.U71.IsDirect) {
        if (e = this.U71.GetDirectPriceTextFunc?.()) {
          i.SetText(e);
          i.SetColor(UE.Color.FromHex(t));
        }
      } else {
        if ((e = this.U71.PriceData).NowPrice === 0) {
          i.ShowTextNew("ShopDiscountLabel_4");
        } else {
          i.SetText(e.NowPrice.toString());
        }
        i.SetColor(UE.Color.FromHex(t));
      }
    }
  }
  F71() {
    var t = this.GetText(4);
    var i = this.U71.GetShopTipsText?.();
    if (this.O71 === 2 || StringUtils_1.StringUtils.IsEmpty(i)) {
      t.SetUIActive(false);
    } else {
      t.SetUIActive(true);
      t.SetText(i);
    }
  }
  RefreshRedDot() {
    if (this.U71.RedDotExistFunc) {
      this.GetItem(8).SetUIActive(this.U71.RedDotExistFunc());
    } else {
      this.GetItem(8).SetUIActive(false);
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  N71(t) {
    t = t.GetCountDownData()[2];
    if (t === 0 && this.k71) {
      return !(this.k71 = false);
    } else {
      return t !== 0 && !this.k71 && (this.k71 = true);
    }
  }
  V71(t) {
    var i = t.HasDiscount();
    if (i && !this.C3i) {
      return this.C3i = true;
    } else if (!i && this.C3i) {
      return !(this.C3i = false);
    } else {
      return !!(i = t.GetDiscountNew()) && i !== this.E3i && !(this.E3i = i, 0);
    }
  }
  TryEmitRefreshTips() {
    ControllerHolder_1.ControllerHolder.PayShopController.ClosePayShopGoodDetailPopView();
    if (!ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() && !(this.Pe instanceof PayItemDefine_1.PayItemData)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShop, this.Pe.PayShopId, true);
    }
  }
}
exports.PayShopBigItem = PayShopBigItem;
//# sourceMappingURL=PayShopBigItem.js.map