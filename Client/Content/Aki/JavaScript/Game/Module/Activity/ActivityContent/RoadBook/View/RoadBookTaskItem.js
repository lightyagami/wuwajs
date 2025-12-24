"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorChallengeItem = exports.RoadBookTaskLockItem = exports.RoadBookTaskNormalItem = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivitySmallItemGrid_1 = require("../../UniversalComponents/ActivitySmallItemGrid");
const ActivityButtonItem_1 = require("../../UniversalComponents/Functional/ActivityButtonItem");
class RoadBookTaskItemBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.ActivityBaseData = t;
    this.RewardScrollView = undefined;
    this.ButtonItem = undefined;
    this.RewardButtonItem = undefined;
    this.TaskData = undefined;
    this.sGe = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.OnClickedButton = () => {};
    this.OnClickedRewardButton = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(4);
    this.ButtonItem = new ActivityButtonItem_1.ActivityButtonItem();
    await this.ButtonItem.CreateByActorAsync(t.GetOwner());
    this.ButtonItem.SetFunction(this.OnClickedButton);
    var t = this.GetItem(7);
    this.RewardButtonItem = new ActivityButtonItem_1.ActivityButtonItem();
    await this.RewardButtonItem.CreateByActorAsync(t.GetOwner());
    this.RewardButtonItem.SetFunction(this.OnClickedRewardButton);
  }
  OnStart() {
    this.RewardScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.sGe);
    this.ButtonItem.SetLocalTextNew("MapTravelJump_Text");
    this.RewardButtonItem.SetLocalTextNew("MapTravelGetReward_Text");
  }
  Refresh(t) {
    this.TaskData = t;
  }
}
class RoadBookTaskNormalItem extends RoadBookTaskItemBase {
  constructor() {
    super(...arguments);
    this.TaskData = undefined;
    this.D8u = undefined;
    this.OnClickedButton = () => {
      var t = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetRoadBookTaskConfig(this.TaskData.Id);
      if (t.JumpId) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(t.JumpId);
      }
    };
    this.OnClickedRewardButton = () => {
      this.D8u?.();
    };
  }
  Refresh(t) {
    this.TaskData = t;
    var e = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetRoadBookTaskConfig(this.TaskData.Id);
    var i = t.Status === 2;
    var s = e.JumpId > 0 && t.Status === 1;
    var r = t.Status === 0;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    this.GetText(1).SetText(Math.min(t.Current, t.Target) + "/" + t.Target);
    this.SVl(e.TaskReward);
    this.ButtonItem.SetUiActive(s);
    this.RewardButtonItem.SetUiActive(r);
    this.GetItem(6).SetUIActive(e.JumpId === 0 && !i);
    this.GetItem(5).SetUIActive(i);
  }
  SVl(t) {
    var e = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t)) {
      var i = {
        Item: s,
        HasClaimed: this.TaskData.Status === 2
      };
      e.push(i);
    }
    this.RewardScrollView.RefreshByData(e);
  }
  SetBtnClickCallback(t) {
    this.D8u = t;
  }
}
exports.RoadBookTaskNormalItem = RoadBookTaskNormalItem;
class RoadBookTaskLockItem extends RoadBookTaskItemBase {
  constructor() {
    super(...arguments);
    this.TaskData = undefined;
    this.OnClickedButton = () => {
      if (this.TaskData.JumpId) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.TaskData.JumpId);
      }
    };
  }
  Refresh(t) {
    this.TaskData = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t.ConditionGroupId) ?? "");
    this.GetText(1).SetUIActive(false);
    this.ButtonItem.SetUiActive(t.JumpId > 0);
    this.GetItem(6).SetUIActive(t.JumpId === 0);
    this.GetItem(5).SetUIActive(true);
  }
}
exports.RoadBookTaskLockItem = RoadBookTaskLockItem;
class MotorChallengeItem extends RoadBookTaskItemBase {
  constructor() {
    super(...arguments);
    this.TaskData = undefined;
    this.GKc = undefined;
    this.OnClickedRewardButton = () => {
      this.GKc?.();
    };
  }
  Refresh(t) {
    this.TaskData = t;
    var e = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetMotorChallengeConfig(this.TaskData.Id);
    var i = t.Status === 2;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.ScoreText);
    this.GetText(1).SetText(t.Current + "/" + t.Target);
    this.SVl(e.Reward);
    this.RewardButtonItem.SetUiActive(t.Status === 0);
    this.GetItem(6).SetUIActive(t.Status === 1);
    this.GetItem(5).SetUIActive(i);
  }
  SetClickRewardCb(t) {
    this.GKc = t;
  }
  SVl(t) {
    var e = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t)) {
      var i = {
        Item: s,
        HasClaimed: this.TaskData.Status === 2
      };
      e.push(i);
    }
    this.RewardScrollView.RefreshByData(e);
  }
}
exports.MotorChallengeItem = MotorChallengeItem;
//# sourceMappingURL=RoadBookTaskItem.js.map