"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerDailyQuestBuffOrDeTermItem = undefined;
const UE = require("ue");
const BabelTowerBuffById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerBuffById");
const BabelTowerDeTermById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerDailyQuestBuffOrDeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.GQ1 = false;
    this.YP = () => {
      let e = false;
      e = this.GQ1 ? BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetDeTermIsLock(this.Mne) : BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetBuffIsLock(this.Mne);
      var r = {
        IsDeTerm: this.GQ1,
        ConfigId: this.Mne,
        ShowWays: e
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", r);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.YP]];
  }
  Refresh(e, r, t) {
    this.Mne = e.ConfigId;
    this.GQ1 = e.IsDeTerm;
    let i = undefined;
    i = (e.IsDeTerm ? BabelTowerDeTermById_1.configBabelTowerDeTermById : BabelTowerBuffById_1.configBabelTowerBuffById).GetConfig(this.Mne);
    this.SetTextureByPath(i.Texture, this.GetTexture(0));
  }
}
exports.BabelTowerDailyQuestBuffOrDeTermItem = BabelTowerDailyQuestBuffOrDeTermItem;
//# sourceMappingURL=BabelTowerDailyQuestBuffOrDeTermItem.js.map