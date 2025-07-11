"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopButton = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const ShopController_1 = require("../../Shop/ShopController");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ShopButton extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Omt = () => {
      var e = CommonParamById_1.configCommonParamById.GetIntConfig("BattleViewShopId");
      if (e !== undefined) {
        ShopController_1.ShopController.OpenShop(e);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenShop, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Omt]];
  }
  Initialize(e) {
    super.Initialize(e);
    RedDotController_1.RedDotController.BindRedDot("BattleViewShopButton", this.GetItem(1));
  }
  Reset() {
    RedDotController_1.RedDotController.UnBindRedDot("BattleViewShopButton");
    super.Reset();
  }
}
exports.ShopButton = ShopButton;
//# sourceMappingURL=ShopButton.js.map