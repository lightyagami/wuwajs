"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopCheckBuffItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseShopCheckBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Jtd = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewBdSum();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite]];
    this.BtnBindInfo = [[3, this.Jtd]];
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconTowerDefense6");
    await this.SetSpriteAsync(e, this.GetSprite(7), false);
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetTexture(0).SetUIActive(false);
    this.GetSprite(7).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TrapDefenseShopBuffViewEntry");
  }
}
exports.TrapDefenseShopCheckBuffItem = TrapDefenseShopCheckBuffItem;
//# sourceMappingURL=TrapDefenseShopCheckBuffItem.js.map