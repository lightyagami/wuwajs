"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskScrollItemPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const SmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/SmallItemGrid");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const ActivityRegressHelper_1 = require("../../Misc/ActivityRegressHelper");
class ActivityRegressTaskScrollItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.sft = undefined;
    this.Pe = undefined;
    this.w_1 = undefined;
    this.uPa = undefined;
    this.tWt = () => {
      var e = this.Pe.Config;
      var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(e.Id);
      if (i === 0) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.JumpByQuestConfig(this.Pe.Config);
      } else if (i === 1) {
        if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsRegressTaskScoreOverExp()) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Task_Max");
        }
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimTaskReward(e.Id);
      }
    };
    this.q3e = () => {
      var e = this.Pe.Config;
      var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressTaskRewardItemInfo(e).ItemInfo.Id;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(4).GetOwner());
    this.sft.BindOnCanExecuteChange(() => false);
    this.sft.BindOnExtendToggleClicked(this.q3e);
    var e = this.GetItem(7);
    this.w_1 = new ButtonItem_1.ButtonItem(e);
    this.w_1.SetFunction(this.tWt);
    this.w_1.SetShowText("RecallActivity_Go");
    var e = this.GetItem(10);
    this.uPa = new ButtonItem_1.ButtonItem(e);
    this.uPa.SetFunction(this.tWt);
  }
  RefreshByData(e) {
    var i = (this.Pe = e).Config;
    var t = this.A_1();
    var r = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, i.TargetName);
    var r = this.GetText(8);
    if (e.TaskType === 0) {
      this.P_1();
    } else {
      this.x_1();
    }
    if (t === 2) {
      r.SetText("");
    }
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressTaskRewardItemInfo(i);
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(this.sft, e);
    var r = e.ItemInfo;
    var i = e.ItemCount;
    var l = e.RewardState === 0;
    var e = e.RewardState === 2;
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGrid(this.sft, r, i, [l, false, e]);
    this.w_1.SetUiActive(t === 0);
    this.uPa.SetUiActive(t === 1);
    this.GetText(6).SetUIActive(false);
    this.GetItem(5).SetUIActive(t === 2);
    this.GetItem(9).SetUIActive(t === 2);
  }
  P_1() {
    var e = this.Pe.Config;
    var i = e.Id;
    var [t, r] = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(i);
    var l = this.GetText(3);
    l.SetUIActive(true);
    l.SetText(t + "/" + r);
    var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(l, "RecallActivity_Task_Tips", t, r);
    this.GetItem(2).SetUIActive(true);
    var t = e.TaskSubType;
    if (t === 1) {
      r = ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1);
      e = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest();
      if (r === undefined && e === undefined && i !== 1) {
        this.GetItem(2).SetUIActive(false);
        l.SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Recall_task_new_Finish01");
        this.GetText(8).SetText("");
      } else if (r !== undefined) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RecallActivity_Recommended_Role", r.Name);
      } else if (e !== undefined) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RecallActivity_Recommended_Role", e.Name);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RecallActivity_Recommended_Role_Lock");
      }
    }
    if (t === 2 && ((r = ModelManager_1.ModelManager.ExploreProgressModel.IsCollectAllStageReward()) && i !== 1 ? (this.GetItem(2).SetUIActive(false), l.SetUIActive(false), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Recall_task_new_Finish02")) : (e = ActivityRegressHelper_1.ActivityRegressHelper.GetMinExploreAreaInfo()) !== undefined && (t = e.DeliveryMarkId, i = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t), l = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(i.MarkTitle), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RecallActivity_Recommended_Area", l)), r)) {
      this.GetText(8).SetText("");
    }
  }
  x_1() {
    var e = this.Pe.Config.Id;
    var [e, i] = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(e);
    var t = this.GetText(3);
    t.SetUIActive(true);
    t.SetText(`(${e}/${i})`);
    this.GetText(8).SetText("");
  }
  A_1() {
    var e;
    var i = this.Pe.Config;
    var t = i.Id;
    var i = i.TaskType;
    let r = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(t);
    return r = i === 0 && ((t = this.Pe.Config.TaskSubType) === 1 && (i = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId(), e = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest(), i === undefined) && e === undefined && r !== 1 && (r = 2), t === 2 && ModelManager_1.ModelManager.ExploreProgressModel.IsCollectAllStageReward() && r !== 1) ? 2 : r;
  }
}
exports.ActivityRegressTaskScrollItemPanel = ActivityRegressTaskScrollItemPanel;
//# sourceMappingURL=ActivityRegressTaskScrollItemPanel.js.map