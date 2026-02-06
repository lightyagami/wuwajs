"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PayShopGoods_1 = require("../../PayShopData/PayShopGoods");
const PayShopDefine_1 = require("../../PayShopDefine");
const PayShopItemBase_1 = require("./PayShopItemBase");
const PayShopTagItem_1 = require("./PayShopTagItem");
class PayShopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.d3i = false;
    this.C3i = false;
    this.Pe = undefined;
    this.g3i = undefined;
    this.f3i = false;
    this.p3i = 0;
    this.v3i = false;
    this.M3i = "";
    this.E3i = 0;
    this.S3i = false;
    this.y3i = false;
    this.I3i = false;
    this.T3i = false;
    this.L3i = false;
    this.D3i = true;
    this.K71 = false;
    this.RMa = undefined;
    this.WIf = undefined;
    this.jbe = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 10, "PayShop:ShopItem 点击商品", ["Id", this.Pe.GetGoodsData().Id]);
      }
      ControllerHolder_1.ControllerHolder.PayShopController.OpenBuyViewByGoodsId(this.Pe, this.WIf);
      if (this.RMa) {
        this.RMa(this, this.Pe);
      }
    };
    this.R3i = () => {
      if (this.Pe && this.IsUiActiveInHierarchy()) {
        let t = false;
        if (this.U3i()) {
          t = true;
        }
        if (this.B2t()) {
          t = true;
        }
        this.A3i();
        this.P3i();
        this.x3i();
        this.Svt();
        this.w3i();
        this.B3i();
        this.g3i.OnTimerRefresh(this.Pe.ConvertToPayShopBaseSt(), false, 0);
        if (t) {
          this.TryEmitRefreshTips();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem]];
    this.BtnBindInfo = [[8, this.jbe]];
  }
  HideExchangePopViewElement() {
    this.SetRaycastState(false);
    this.SetDownPriceShowState(false);
    this.SetForceHideReUpTextState(true);
    this.SetResellShowState(true);
    this.SetDisableSelfInteractiveState(true);
    this.SetLeftTimeTextShowState(false);
    this.SetRedDotState(false);
  }
  HidePackageViewElement() {
    this.SetRaycastState(false);
    this.SetForceHideReUpTextState(true);
    this.SetResellShowState(true);
    this.SetDisableSelfInteractiveState(true);
    this.SetLeftTimeTextShowState(false);
    this.g3i.SetDownPriceOnlyShow(true);
    this.SetRedDotState(false);
  }
  SetRaycastState(t) {
    this.RootItem.SetRaycastTarget(t);
    this.g3i.GetRootItem().SetRaycastTarget(t);
    this.GetButton(8).SetCanClickWhenDisable(t);
  }
  SetResellShowState(t) {
    this.I3i = t;
  }
  SetDisableSelfInteractiveState(t) {
    this.T3i = t;
  }
  SetForceHideReUpTextState(t) {
    this.L3i = t;
  }
  SetDownPriceShowState(t) {
    this.g3i.SetDownPriceShowState(t);
  }
  OnStart() {
    this.GetItem(12).SetUIActive(false);
    this.g3i = new PayShopItemBase_1.PayShopItemBase(this.GetItem(0));
    this.g3i.Init();
    this.d3i = this.GetItem(5).bIsUIActive;
    this.C3i = this.GetItem(1).bIsUIActive;
    this.f3i = this.GetItem(4).bIsUIActive;
    this.v3i = this.GetText(7).bIsUIActive;
    this.S3i = false;
    this.y3i = false;
    this.D3i = this.GetItem(12).bIsActive;
    this.GetButton(8).SetCanClickWhenDisable(true);
    this.SetNewFlagState(false);
    this.dde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
  }
  Refresh(t, i, s) {
    if (t instanceof PayShopGoods_1.PayShopGoods) {
      this.Pe = t;
      this.g3i.Refresh(t.ConvertToPayShopBaseSt(), i, s);
      this.Z9e();
      this.U3i();
      this.B2t();
      this.A3i();
      this.P3i();
      this.x3i();
      this.Svt();
      this.b3i();
      this.w3i();
      this.B3i();
    }
  }
  Z9e() {
    this.GetItem(15).SetUIActive(false);
    this.y3i = false;
  }
  B3i() {
    let t = !this.Pe.IfCanBuy();
    if (t && this.T3i) {
      t = false;
    }
    var i = undefined;
    var s = undefined;
    if (this.y3i !== t && (i = this.GetItem(15), s = this.GetText(16), this.y3i = t, i.SetUIActive(t), t)) {
      s.SetText(this.Pe.GetConditionLimitText());
    }
  }
  Svt() {
    var t = this.Pe.IsSoldOut();
    let i = this.Pe.IsLimitGoods() && t;
    if (i && this.T3i) {
      i = false;
    }
    if (this.S3i !== i && (this.S3i = i, this.GetItem(13)?.SetUIActive(i), t)) {
      this.GetText(14)?.SetText(this.Pe.GetDownTipsText());
    }
  }
  x3i() {
    var t = this.Pe.GetDiscountLabel();
    let i = false;
    i = t > 0 && (!!this.Pe.InLabelShowTime() || (this.Pe.InLabelShowTime(), false));
    if (this.f3i !== i) {
      this.GetItem(4).SetUIActive(i);
      this.f3i = i;
    }
  }
  w3i() {
    var t = this.f3i || this.C3i;
    if (this.D3i !== t) {
      this.D3i = t;
      this.GetItem(12).SetUIActive(t);
    }
  }
  A3i() {
    var t = this.Pe.GetDiscountLabel();
    if (t > 0 && this.Pe.InLabelShowTime() && this.p3i !== t) {
      this.p3i = t;
      const i = ConfigManager_1.ConfigManager.PayShopConfig.GetShopDiscountLabel(t);
      if (this.Pe.PayShopId === 3) {
        this.GetItem(4).SetUIActive(false);
        const s = new PayShopTagItem_1.PayShopTagItem();
        t = PayShopDefine_1.payShopTagTypeToResourceId[t];
        s.CreateThenShowByResourceIdAsync(t, this.GetItem(18)).then(() => {
          s.SetTextByTextId(i);
        });
      } else {
        this.GetText(11).ShowTextNew(i);
      }
    }
  }
  B2t() {
    var i = this.Pe.GetCountDownData();
    let s = false;
    if (i[2] === 0) {
      if (this.d3i) {
        this.GetItem(5).SetUIActive(false);
        this.d3i = false;
        s = true;
      }
    } else {
      let t = i[1];
      i = i[0];
      if ((t = this.I3i ? undefined : t) && i !== 2) {
        if (!this.d3i) {
          this.GetItem(5).SetUIActive(true);
          this.d3i = true;
          s = true;
        }
        i = this.GetText(6);
        if (typeof t == "string") {
          i.SetText(t);
          return s;
        }
        LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue);
      } else if (this.d3i) {
        this.GetItem(5).SetUIActive(false);
        this.d3i = false;
        s = true;
      }
    }
    return s;
  }
  P3i() {
    var t = this.Pe.GetResellText();
    let i = !StringUtils_1.StringUtils.IsEmpty(t);
    if (this.I3i) {
      i = false;
    }
    if (this.M3i !== t && (this.M3i = t, i)) {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(t);
      this.GetText(7).SetText(t);
    }
    if (this.v3i !== i) {
      this.v3i = i;
      this.GetText(7).SetUIActive(i);
    }
  }
  U3i() {
    var t = this.GetItem(1);
    var i = this.Pe.HasDiscount();
    if (i && this.Pe.PayShopId === 3) {
      t?.SetUIActive(false);
      var s = this.Pe.GetDiscountLabel() !== 0;
      if (!this.K71 && !s) {
        const h = new PayShopTagItem_1.PayShopTagItem();
        h.CreateThenShowByResourceIdAsync("ShopItemDiscountLabel", this.GetItem(12)).then(() => {
          var t = this.Pe.GetDiscountNew();
          h.SetText(StringUtils_1.StringUtils.Format("+{0}%", t.toString()));
        });
        this.K71 = true;
      }
      return false;
    }
    let e = false;
    if (this.C3i !== i) {
      t.SetUIActive(i);
      this.C3i = i;
      e = true;
    }
    if (this.C3i && (s = this.Pe.GetDiscount()) !== this.E3i) {
      this.E3i = s;
      this.GetText(2).SetText(StringUtils_1.StringUtils.Format("-{0}%", s.toString()));
      e = true;
    }
    return e;
  }
  b3i() {
    var t;
    var i;
    if (this.L3i) {
      this.GetItem(5).SetUIActive(false);
    } else if (!this.d3i) {
      if ((t = this.Pe.GetCountDownData())[0] === 2) {
        t = t[1];
        this.GetItem(5).SetUIActive(true);
        this.g3i.SetLeftTimeTextShowState(false);
        i = this.GetText(6);
        if (typeof t == "string") {
          i.SetText(t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalText(i, t.TextId, t.TimeValue);
        }
      } else {
        this.GetItem(5).SetUIActive(false);
        this.g3i.SetLeftTimeTextShowState(true);
      }
    }
  }
  SetLeftTimeTextShowState(t) {
    this.g3i.SetLeftTimeTextShowState(t);
  }
  SetNameTextShowState(t) {
    this.g3i.SetNameTextShowState(t);
  }
  SetRedDotState(t) {
    this.g3i.RefreshRedDotState = t;
    this.g3i.SetRedDotVisible(t);
  }
  SetNewFlagState(t) {
    this.GetItem(17).SetUIActive(t);
  }
  SetExchangeExtraData(t) {
    this.WIf = t;
  }
  SetExtraFunction(t) {
    this.RMa = t;
  }
  TryEmitRefreshTips() {
    ControllerHolder_1.ControllerHolder.PayShopController.ClosePayShopGoodDetailPopView();
    if (!ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShop, this.Pe.PayShopId, true);
    }
  }
  OnBeforeDestroy() {
    this.Cde();
  }
}
exports.PayShopItem = PayShopItem;
//# sourceMappingURL=PayShopItem.js.map