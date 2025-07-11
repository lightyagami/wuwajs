"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleShopDetail = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleShopDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ilo = () => {
      this.GetButton(7)?.SetSelfInteractive(false);
      var e = ModelManager_1.ModelManager.RogueBattleModel.SelectGainData;
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.RogueBattleController.SelectTokenRequest(e._Ic.c5n);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[7, this.ilo]];
  }
  Refresh(e) {
    var i;
    var r;
    var t;
    var o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBuffPoolById(e._Ic.v9n);
    if (o !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.BuffName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), o.BuffDesc, ...o.BuffDescParam);
      i = (o = e._Ic.qN_ !== e._Ic.kN_) ? e._Ic.qN_ : e._Ic.kN_;
      r = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(RoguelikeDefine_1.INSIDE_CURRENCY_ID);
      t = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(RoguelikeDefine_1.INSIDE_CURRENCY_ID);
      if (o) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "RogueShopOriginPriceDiscount", e._Ic.kN_.toString());
      } else {
        this.GetText(10)?.SetText("");
      }
      this.GetText(9)?.SetText(i.toString());
      this.GetText(9).useChangeColor = t < i;
      this.SetTextureByPath(r?.IconSmall ?? "", this.GetTexture(8));
      this.GetItem(6)?.SetUIActive(!e._Ic.O2s);
      this.GetButton(7)?.SetSelfInteractive(true);
      this.GetButton(7)?.RootUIComp.SetUIActive(!e._Ic.O2s);
      this.GetHorizontalLayout(11)?.RootUIComp.SetUIActive(false);
    }
  }
}
exports.RogueBattleShopDetail = RogueBattleShopDetail;
//# sourceMappingURL=RogueBattleShopDetail.js.map