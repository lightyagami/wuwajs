"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueShopDetail = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
const WeeklyRogueTagItem_1 = require("./WeeklyRogueTagItem");
class WeeklyRogueShopDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ESc = undefined;
    this.ilo = () => {
      this.GetButton(7)?.SetSelfInteractive(false);
      WeeklyRogueController_1.WeeklyRogueController.Instance?.SelectOptionRequest(e => {
        this.GetButton(7)?.SetSelfInteractive(true);
        if (e) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WeRogueStorePurchaseSuccessText");
        }
      });
    };
    this.$$c = () => {
      return new WeeklyRogueTagItem_1.WeeklyRogueTagItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIHorizontalLayout], [12, UE.UIHorizontalLayout], [13, UE.UIItem]];
    this.BtnBindInfo = [[7, this.ilo]];
  }
  OnStart() {
    this.ESc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(12), this.$$c);
  }
  Refresh(e) {
    var i;
    var t;
    var r;
    var o = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e.v9n);
    if (o !== undefined && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.BuffName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), o.BuffDesc, ...o.BuffDescParam), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "WeeklyRoguelikeShopItemType" + e.h5n.toString()), i = (o = e.BN_.qN_ !== e.BN_.kN_) ? e.BN_.qN_ : e.BN_.kN_, t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(RoguelikeDefine_1.INSIDE_CURRENCY_ID), r = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(RoguelikeDefine_1.INSIDE_CURRENCY_ID), o ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RogueShopOriginPriceDiscount", e.BN_.kN_.toString()) : this.GetText(10)?.SetText(""), this.GetText(9)?.SetText(i.toString()), this.GetText(9).useChangeColor = r < i, this.SetTextureByPath(t?.IconSmall ?? "", this.GetTexture(8)), this.GetItem(6)?.SetUIActive(!e.BN_.O2s), this.GetButton(7)?.SetSelfInteractive(true), this.GetButton(7)?.RootUIComp.SetUIActive(!e.BN_.O2s), this.GetHorizontalLayout(11)?.RootUIComp.SetUIActive(false), o = ModelManager_1.ModelManager.WeeklyRogueModel.GetRogueWeeklyBuffTagIdList(e.v9n), this.ESc.SetActive(o.length > 0), o.length > 0)) {
      this.ESc.RefreshByData(o);
    }
  }
}
exports.WeeklyRogueShopDetail = WeeklyRogueShopDetail;
//# sourceMappingURL=WeeklyRogueShopDetail.js.map