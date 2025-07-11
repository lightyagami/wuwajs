"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskSubView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ExploreProgressController_1 = require("../../../../../ExploreProgress/ExploreProgressController");
const DynScrollView_1 = require("../../../../../Util/ScrollView/DynScrollView");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRegressTaskSubViewBase_1 = require("../ActivityRegressTaskSubViewBase");
const ActivityRegressTaskDynamicItem_1 = require("./ActivityRegressTaskDynamicItem");
const ActivityRegressTaskDynamicScrollItem_1 = require("./ActivityRegressTaskDynamicScrollItem");
const ActivityRegressTaskLayoutItemPanel_1 = require("./ActivityRegressTaskLayoutItemPanel");
class ActivityRegressTaskSubView extends ActivityRegressTaskSubViewBase_1.ActivityRegressTaskSubViewBase {
  constructor() {
    super(...arguments);
    this.VZt = undefined;
    this.fma = undefined;
    this.sma = undefined;
    this.pma = undefined;
    this.up1 = [undefined, undefined];
    this.Mma = (e, i, s) => {
      var t = new ActivityRegressTaskDynamicScrollItem_1.ActivityRegressTaskDynamicScrollItem();
      this.fma.push(t);
      return t;
    };
    this.Sma = () => {
      return new ActivityRegressTaskLayoutItemPanel_1.ActivityRegressTaskLayoutItemPanel();
    };
    this.Og = () => {
      this.Ema();
      this.D_1();
      this.GetItem(4).SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.Grade === 1);
      this.GetItem(5).SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.Grade === 2);
      this.GetTexture(6).SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.Grade === 2);
    };
    this.$Y_ = () => {
      var e;
      var i;
      var s;
      var t;
      if (this.up1[0] === undefined && this.up1[1] === undefined) {
        this.GetItem(7).SetUIActive(false);
        this.GetItem(8).SetUIActive(false);
      } else {
        e = this.VZt.GetDisplayGridStartIndex();
        i = this.VZt.GetDisplayGridEndIndex();
        s = this.up1[0] ?? e;
        t = this.up1[1] ?? i;
        this.GetItem(7).SetUIActive(s < e);
        this.GetItem(8).SetUIActive(i < t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.fma = [];
    this.VZt = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(2), new ActivityRegressTaskDynamicItem_1.ActivityRegressTaskDynamicItem(), this.Mma);
    await ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest();
    await this.VZt.Init();
    this.GetUIDynScrollViewComponent(0).OnScrollValueChange.Bind(this.$Y_);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.Og();
  }
  OnUpdate() {
    this.Og();
  }
  OnAfterHide() {
    super.OnAfterHide();
    this.jm();
  }
  OnBeforeDestroy() {
    if (this.VZt) {
      this.VZt.ClearChildren();
      this.VZt = undefined;
    }
    this.fma = undefined;
  }
  jm() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.sma)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.sma);
      this.sma = undefined;
    }
  }
  OnStart() {
    super.OnStart();
    this.pma = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Sma);
  }
  Ema() {
    var e = this.GetText(3);
    var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScore();
    e.SetText("x" + i);
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressMainTaskScoreRewardGridDataArr();
    let s = e.findIndex(e => e.RewardState === 1);
    s = (s = s === -1 ? e.findIndex(e => e.RewardState === 0) : s) !== -1 ? s : 0;
    this.pma.RefreshByData(e, () => {
      var e = this.pma.GetItemByIndex(s);
      this.pma.LateScrollTo(e);
    });
    this.dp1(e);
  }
  D_1() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressMainTaskGridDataGroupByTypeAndSortedArr();
    this.VZt.RefreshByData(e);
  }
  dp1(t) {
    if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.CheckRegressScoreRewardReached()) {
      let i = t.length;
      let s = -1;
      for (let e = 0; e < t.length; e++) {
        if (t[e].RewardState === 1) {
          i = Math.min(i, e);
          s = Math.max(s, e);
        }
      }
      this.up1 = [i, s];
    } else {
      this.up1 = [undefined, undefined];
    }
  }
}
exports.ActivityRegressTaskSubView = ActivityRegressTaskSubView;
//# sourceMappingURL=ActivityRegressTaskSubView.js.map