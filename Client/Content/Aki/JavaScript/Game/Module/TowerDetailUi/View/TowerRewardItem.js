"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TowerController_1 = require("../TowerController");
class TowerRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.QSi = false;
    this.hRo = 0;
    this.bOe = undefined;
    this.jWt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.lRo = () => {
      var e = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
      const r = ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e);
      var t = ModelManager_1.ModelManager.TowerModel.GetDifficultyReward(e)?.filter(e => !e.IsReceived && r >= e.Target)?.map(e => e.Index) ?? [];
      TowerController_1.TowerController.TowerRewardRequest(e, this.hRo, t);
      this.GetItem(3).SetUIActive(true);
      this.GetItem(5).SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.lRo]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.jWt);
  }
  OnBeforeDestroy() {
    this.bOe = undefined;
  }
  Refresh(e) {
    this.QSi = e.IsReceived;
    this.hRo = e.Index;
    var r = this._Ro(e.RewardId);
    this.bOe.RefreshByData(r, () => {
      for (const e of this.bOe.GetScrollItemList()) {
        e.SetReceivedVisible(this.QSi);
      }
    });
    var r = ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties);
    this.GetText(1).SetText("" + e.Target);
    this.GetItem(3).SetUIActive(this.QSi);
    this.GetItem(4).SetUIActive(r < e.Target);
    this.GetItem(5).SetUIActive(r >= e.Target && !this.QSi);
  }
  _Ro(e) {
    var r;
    var t;
    var i = [];
    for ([r, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview) {
      var o = [{
        IncId: 0,
        ItemId: r
      }, t];
      i.push(o);
    }
    return i;
  }
}
exports.TowerRewardItem = TowerRewardItem;
//# sourceMappingURL=TowerRewardItem.js.map