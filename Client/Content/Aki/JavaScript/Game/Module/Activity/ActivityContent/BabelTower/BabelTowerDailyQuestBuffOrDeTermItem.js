"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerDailyQuestBuffOrDeTermItem = void 0;
const UE = require("ue"),
  BabelTowerBuffById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerBuffById"),
  BabelTowerDeTermById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerDailyQuestBuffOrDeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Mne = 0, this.iQ1 = !1, this.YP = () => {
      let e = !1;
      e = this.iQ1 ? BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetDeTermIsLock(this.Mne) : BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetBuffIsLock(this.Mne);
      var r = {
        IsDeTerm: this.iQ1,
        ConfigId: this.Mne,
        ShowWays: e
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", r)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [3, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [3, this.YP]
    ]
  }
  Refresh(e, r, t) {
    this.Mne = e.ConfigId, this.iQ1 = e.IsDeTerm;
    let i = void 0;
    i = (e.IsDeTerm ? BabelTowerDeTermById_1.configBabelTowerDeTermById : BabelTowerBuffById_1.configBabelTowerBuffById).GetConfig(this.Mne), this.SetTextureByPath(i.Texture, this.GetTexture(0))
  }
}
exports.BabelTowerDailyQuestBuffOrDeTermItem = BabelTowerDailyQuestBuffOrDeTermItem;
//# sourceMappingURL=BabelTowerDailyQuestBuffOrDeTermItem.js.map