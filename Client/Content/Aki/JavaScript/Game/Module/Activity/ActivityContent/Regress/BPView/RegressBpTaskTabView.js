"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressBpTaskTabView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const regressTaskTypeSortRecord = {
  [0]: 1,
  1: 0,
  2: 2,
  6: 3
};
const regressTaskRewardStateSortRecord = {
  [0]: 1,
  1: 0,
  2: 2
};
class RegressBpTaskTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.VMf = undefined;
    this.kou = () => new RegressBpTaskItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.VMf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.kou);
    this.RefreshView();
  }
  OnClickBtnClaimAll() {
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimAllTaskReward();
  }
  RefreshBtnClaimVisible(e) {
    e.SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.HasReachableConstantTask());
  }
  OnBeforeShow() {
    this.RefreshView(true);
  }
  RefreshView(e) {
    const i = ModelManager_1.ModelManager.ActivityRegressModel?.ActivityData;
    var r;
    if (this.VMf && i && (r = [0, 1, 6].reduce((e, r) => {
      r = i.GetRegressTaskListByType(r);
      if (r?.length) {
        e.push(...r);
      }
      return e;
    }, [])).length !== 0) {
      this.OBf(r);
      this.VMf.RefreshByData(r, undefined, undefined, e);
    }
  }
  OBf(e) {
    e.sort((e, r) => {
      var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(e.Id);
      var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(r.Id);
      if (i !== t) {
        return regressTaskRewardStateSortRecord[i] - regressTaskRewardStateSortRecord[t];
      } else if ((i = e.TaskType) !== (t = r.TaskType)) {
        return regressTaskTypeSortRecord[i] - regressTaskTypeSortRecord[t];
      } else {
        return e.Id - r.Id;
      }
    });
  }
}
exports.RegressBpTaskTabView = RegressBpTaskTabView;
class RegressBpTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.GBf = undefined;
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.YP = () => {
      var e = this.Pe;
      var r = e.Id;
      var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(r);
      if (i === 0) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.JumpByQuestConfig(e);
      } else if (i === 1) {
        if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsRegressTaskScoreOverExp()) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Task_Max");
        }
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimTaskReward(r);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIText]];
    this.BtnBindInfo = [[4, this.YP], [6, this.YP]];
  }
  OnStart() {
    this.GBf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.rOe);
  }
  Refresh(e, r, i) {
    this.Pe = e;
    this.GridIndex = i;
    var i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.TargetName);
    var i = e.Id;
    var [t, s] = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(i);
    var o = this.GetText(1);
    if (this.s7f() && e.TaskType === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(o, "Recall_BP_Task_Repeat", t, s);
    } else {
      o.SetText(t + "/" + s);
    }
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(i);
    this.Z3e();
    this.GetButton(4).RootUIComp.SetUIActive(e === 0);
    this.GetButton(6).RootUIComp.SetUIActive(e === 1);
    this.GetSprite(5).SetUIActive(e === 2);
    this.qSo();
  }
  Z3e() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(this.Pe.TargetReward);
    this.GBf.RefreshByData(e);
  }
  s7f() {
    var e = this.Pe;
    var r = e.TaskType;
    var e = e.TaskSubType;
    let i = r === 0 && e !== 2 && e !== 1 ? true : r === 2 || r === 6;
    return !i;
  }
  qSo() {
    var e;
    var r;
    var i;
    var t = this.Pe;
    var s = this.GetItem(8);
    var t = t.TaskType;
    if (this.s7f()) {
      s.SetUIActive(true);
      e = this.GetSprite(9);
      r = this.GetSprite(10);
      i = this.GetText(11);
      if (t === 0) {
        e.SetUIActive(true);
        r.SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Recall_BP_Task_Type_2");
      } else if (t === 1) {
        e.SetUIActive(false);
        r.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Recall_BP_Task_Type_1");
      }
    } else {
      s.SetUIActive(false);
    }
  }
}
//# sourceMappingURL=RegressBpTaskTabView.js.map