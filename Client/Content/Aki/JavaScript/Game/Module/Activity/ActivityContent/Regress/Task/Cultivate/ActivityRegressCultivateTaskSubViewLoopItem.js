"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressCultivateTaskSubViewLoopItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
class ActivityRegressCultivateTaskSubViewLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.bOe = undefined;
    this.w_1 = undefined;
    this.uPa = undefined;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.tWt = () => {
      var e = this.Pe.Config;
      var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(e.Id);
      if (t === 0) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.AccessPathId);
      } else if (t === 1) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimTaskReward(e.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.JGe);
    var e = this.GetItem(4);
    this.w_1 = new ButtonItem_1.ButtonItem(e);
    this.w_1.SetFunction(this.tWt);
    this.w_1.SetShowText("RecallActivity_Go");
    var e = this.GetItem(6);
    this.uPa = new ButtonItem_1.ButtonItem(e);
    this.uPa.SetShowText("CollectActivity_state_CanRecive");
    this.uPa.SetFunction(this.tWt);
  }
  Refresh(e, t, i) {
    this.Pe = e;
    this.P5e();
    this.Nqe();
    this._Oe();
    this.Z3e();
  }
  P5e() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.Pe.Config.TargetName);
  }
  Nqe() {
    var e = this.Pe.Config.Id;
    var [e, t] = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(e);
    this.GetText(1).SetText(e + "/" + t);
  }
  _Oe() {
    var e = this.Pe.Config.Id;
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(e);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(5).SetUIActive(e === 2);
    this.w_1.SetUiActive(e === 0);
    this.uPa.SetUiActive(e === 1);
  }
  Z3e() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(this.Pe.Config.TargetReward);
    this.bOe.RefreshByData(e);
  }
}
exports.ActivityRegressCultivateTaskSubViewLoopItem = ActivityRegressCultivateTaskSubViewLoopItem;
//# sourceMappingURL=ActivityRegressCultivateTaskSubViewLoopItem.js.map