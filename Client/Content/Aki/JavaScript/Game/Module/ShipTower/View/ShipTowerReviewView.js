"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerReviewView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerReviewItem_1 = require("./ShipTowerReviewItem");
class ShipTowerReviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.RD_ = undefined;
    this.AD_ = () => {
      return new ShipTowerReviewItem_1.ShipTowerReviewItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[1, this.CloseMe.bind(this)]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.RD_ = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.AD_, true);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    this.OpenParam?.Promise?.SetResult(true);
  }
  UpdateData() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.ReviewList;
    this.RD_?.RefreshByData(e);
    var e = e.some(e => e.IsQuickPass);
    this.GetText(4)?.SetUIActive(e);
    var e = ModelManager_1.ModelManager.ShipTowerModel.ReviewProgressList;
    var i = ShipTowerDefine_1.shipTowerTextKey.LastReviewProgress;
    var r = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, i, ...e);
  }
}
exports.ShipTowerReviewView = ShipTowerReviewView;
//# sourceMappingURL=ShipTowerReviewView.js.map