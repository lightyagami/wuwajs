"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityRegressTaskSubView = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ExploreProgressController_1 = require("../../../../../ExploreProgress/ExploreProgressController"),
  DynScrollView_1 = require("../../../../../Util/ScrollView/DynScrollView"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityRegressTaskSubViewBase_1 = require("../ActivityRegressTaskSubViewBase"),
  ActivityRegressTaskDynamicItem_1 = require("./ActivityRegressTaskDynamicItem"),
  ActivityRegressTaskDynamicScrollItem_1 = require("./ActivityRegressTaskDynamicScrollItem"),
  ActivityRegressTaskLayoutItemPanel_1 = require("./ActivityRegressTaskLayoutItemPanel");
class ActivityRegressTaskSubView extends ActivityRegressTaskSubViewBase_1.ActivityRegressTaskSubViewBase {
  constructor() {
    super(...arguments), this.VZt = void 0, this.fma = void 0, this.sma = void 0, this.pma = void 0, this.V01 = [void 0, void 0], this.Mma = (e, i, s) => {
      var t = new ActivityRegressTaskDynamicScrollItem_1.ActivityRegressTaskDynamicScrollItem;
      return this.fma.push(t), t
    }, this.Sma = () => {
      return new ActivityRegressTaskLayoutItemPanel_1.ActivityRegressTaskLayoutItemPanel
    }, this.Og = () => {
      this.Ema(), this.Ql1(), this.GetItem(4).SetUIActive(1 === ModelManager_1.ModelManager.ActivityRegressModel.Grade), this.GetItem(5).SetUIActive(2 === ModelManager_1.ModelManager.ActivityRegressModel.Grade), this.GetTexture(6).SetUIActive(2 === ModelManager_1.ModelManager.ActivityRegressModel.Grade)
    }, this.$Y_ = () => {
      var e, i, s, t;
      void 0 === this.V01[0] && void 0 === this.V01[1] ? (this.GetItem(7).SetUIActive(!1), this.GetItem(8).SetUIActive(!1)) : (e = this.VZt.GetDisplayGridStartIndex(), i = this.VZt.GetDisplayGridEndIndex(), s = this.V01[0] ?? e, t = this.V01[1] ?? i, this.GetItem(7).SetUIActive(s < e), this.GetItem(8).SetUIActive(i < t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.fma = [], this.VZt = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(2), new ActivityRegressTaskDynamicItem_1.ActivityRegressTaskDynamicItem, this.Mma), await ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(), await this.VZt.Init(), this.GetUIDynScrollViewComponent(0).OnScrollValueChange.Bind(this.$Y_)
  }
  OnBeforeShow() {
    super.OnBeforeShow(), this.Og()
  }
  OnUpdate() {
    this.Og()
  }
  OnAfterHide() {
    super.OnAfterHide(), this.jm()
  }
  OnBeforeDestroy() {
    this.VZt && (this.VZt.ClearChildren(), this.VZt = void 0), this.fma = void 0
  }
  jm() {
    TimerSystem_1.RealTimeTimerSystem.Has(this.sma) && (TimerSystem_1.RealTimeTimerSystem.Remove(this.sma), this.sma = void 0)
  }
  OnStart() {
    super.OnStart(), this.pma = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Sma)
  }
  Ema() {
    var e = this.GetText(3),
      i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScore(),
      e = (e.SetText("x" + i), ModelManager_1.ModelManager.ActivityRegressModel.GetRegressMainTaskScoreRewardGridDataArr());
    let s = e.findIndex(e => 1 === e.RewardState);
    s = -1 !== (s = -1 === s ? e.findIndex(e => 0 === e.RewardState) : s) ? s : 0, this.pma.RefreshByData(e, () => {
      var e = this.pma.GetItemByIndex(s);
      this.pma.LateScrollTo(e)
    }), this.j01(e)
  }
  Ql1() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressMainTaskGridDataGroupByTypeAndSortedArr();
    this.VZt.RefreshByData(e)
  }
  j01(t) {
    if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.CheckRegressScoreRewardReached()) {
      let i = t.length,
        s = -1;
      for (let e = 0; e < t.length; e++) 1 === t[e].RewardState && (i = Math.min(i, e), s = Math.max(s, e));
      this.V01 = [i, s]
    } else this.V01 = [void 0, void 0]
  }
}
exports.ActivityRegressTaskSubView = ActivityRegressTaskSubView;
//# sourceMappingURL=ActivityRegressTaskSubView.js.map