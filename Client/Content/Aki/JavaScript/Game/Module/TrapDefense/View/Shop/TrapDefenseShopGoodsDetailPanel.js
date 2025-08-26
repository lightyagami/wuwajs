"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopGoodsDetailPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseShopGoodsDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.e0t = undefined;
    this.xco = () => {};
    this.THc = e => {
      this.RefreshPanel(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [3, UE.UIItem], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.e0t = new ButtonItem_1.ButtonItem();
    this.e0t.SetFunction(this.xco);
    e.push(this.e0t.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.AddOnSelectGoodsDelegate(this.THc);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.RemoveOnSelectGoodsDelegate(this.THc);
  }
  RefreshPanel(e) {
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    }
  }
}
exports.TrapDefenseShopGoodsDetailPanel = TrapDefenseShopGoodsDetailPanel;
//# sourceMappingURL=TrapDefenseShopGoodsDetailPanel.js.map