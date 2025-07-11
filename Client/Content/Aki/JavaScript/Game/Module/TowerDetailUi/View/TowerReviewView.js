"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerReviewView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TowerData_1 = require("../TowerData");
const TowerReviewItem_1 = require("./TowerReviewItem");
class TowerReviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.HDo = undefined;
    this.sbi = () => {
      return new TowerReviewItem_1.TowerReviewItem();
    };
    this.aRo = () => {
      ModelManager_1.ModelManager.TowerModel.ClearHandleData();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.aRo]];
  }
  OnStart() {
    this.HDo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.sbi);
    this.Og();
  }
  OnBeforeDestroy() {
    this.HDo = undefined;
  }
  Og() {
    var e = TowerData_1.VARIATION_RISK_DIFFICULTY;
    var r = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(e, true);
    if (r) {
      this.HDo.RefreshByData(r);
      this.GetText(2).SetText(ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e, true) + "/" + ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e, true));
    }
  }
}
exports.TowerReviewView = TowerReviewView;
//# sourceMappingURL=TowerReviewView.js.map