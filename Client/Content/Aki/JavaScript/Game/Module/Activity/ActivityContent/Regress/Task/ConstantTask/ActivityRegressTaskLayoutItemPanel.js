"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskLayoutItemPanel = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const SmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/SmallItemGrid");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const ActivityRegressHelper_1 = require("../../Misc/ActivityRegressHelper");
class ActivityRegressTaskLayoutItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.dma = undefined;
    this.mma = undefined;
    this.Cma = undefined;
    this.HIa = () => {
      var e;
      if (this.dma.RewardState === 1) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards();
      } else {
        e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressScoreRewardInfoList(this.dma.Config)[0].ItemInfo.Id;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
      }
    };
    this.jIa = () => {
      var e;
      if (this.dma.RewardState === 1) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards();
      } else {
        e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressScoreRewardInfoList(this.dma.Config)[1].ItemInfo.Id;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
      }
    };
    this.FKa = () => {
      if (this.dma.RewardState === 1) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.FKa]];
  }
  OnStart() {
    this.mma = new SmallItemGrid_1.SmallItemGrid();
    this.mma.Initialize(this.GetItem(6).GetOwner());
    this.mma.BindOnCanExecuteChange(() => false);
    this.mma.BindOnExtendToggleClicked(this.HIa);
    this.Cma = new SmallItemGrid_1.SmallItemGrid();
    this.Cma.Initialize(this.GetItem(7).GetOwner());
    this.Cma.BindOnCanExecuteChange(() => false);
    this.Cma.BindOnExtendToggleClicked(this.jIa);
  }
  Refresh(e, t, i) {
    this.dma = e;
    this.GridIndex = i;
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressScoreRewardInfoList(e.Config);
    var r = e.RewardState;
    var s = i[0];
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(this.mma, s);
    var s = i.length > 1;
    this.Cma.SetUiActive(s);
    if (s) {
      s = i[1];
      ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(this.Cma, s);
    }
    var i = this.GetText(3);
    var s = e.Config.NeedScore;
    i.SetText("" + s);
    i.useChangeColor = r === 2;
    if (i.useChangeColor) {
      i.SetColor(i.changeColor);
    }
    var s = this.GetSprite(0);
    var [i, e] = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskRelativeScore(e.Config);
    s.SetFillAmount(i / e);
    this.GetItem(5).SetUIActive(r === 1);
    this.GetItem(1).SetUIActive(r !== 2);
    this.GetItem(2).SetUIActive(r === 1);
    this.GetItem(8).SetUIActive(r === 2);
  }
  Clear() {
    this.dma = undefined;
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.ActivityRegressTaskLayoutItemPanel = ActivityRegressTaskLayoutItemPanel;
//# sourceMappingURL=ActivityRegressTaskLayoutItemPanel.js.map