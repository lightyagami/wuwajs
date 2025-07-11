"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueShopDetail = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueShopDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ilo = () => {
      this.GetButton(7)?.SetSelfInteractive(false);
      WeeklyRogueController_1.WeeklyRogueController.Instance?.SelectOptionRequest(() => {
        this.GetButton(7)?.SetSelfInteractive(true);
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[7, this.ilo]];
  }
  Refresh(e) {
    var i;
    var t;
    var o;
    var r = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e.v9n);
    if (r !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r.BuffName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.BuffDesc, ...r.BuffDescParam);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "WeeklyRoguelikeShopItemType" + e.h5n.toString());
      i = (r = e.BN_.qN_ !== e.BN_.kN_) ? e.BN_.qN_ : e.BN_.kN_;
      t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(RoguelikeDefine_1.INSIDE_CURRENCY_ID);
      o = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(RoguelikeDefine_1.INSIDE_CURRENCY_ID);
      if (r) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RogueShopOriginPriceDiscount", e.BN_.kN_.toString());
      } else {
        this.GetText(10)?.SetText("");
      }
      this.GetText(9)?.SetText(i.toString());
      this.GetText(9).useChangeColor = o < i;
      this.SetTextureByPath(t?.IconSmall ?? "", this.GetTexture(8));
      this.GetItem(6)?.SetUIActive(!e.BN_.O2s);
      this.GetButton(7)?.SetSelfInteractive(true);
      this.GetButton(7)?.RootUIComp.SetUIActive(!e.BN_.O2s);
      this.GetHorizontalLayout(11)?.RootUIComp.SetUIActive(false);
    }
  }
}
exports.WeeklyRogueShopDetail = WeeklyRogueShopDetail;
//# sourceMappingURL=WeeklyRogueShopDetail.js.map