"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepWithStatusItem = undefined;
const ue_1 = require("ue");
const IQuest_1 = require("../../../../../../UniverseEditor/Interface/IQuest");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GeneralLogicTreeController_1 = require("../../../../GeneralLogicTree/GeneralLogicTreeController");
const MissionViewStepTextUtil_1 = require("../MissionViewStepTextUtil");
const StepBaseItem_1 = require("./StepBaseItem");
class StepWithStatusItem extends StepBaseItem_1.StepBaseItem {
  constructor() {
    super(...arguments);
    this.StepStatusNode = undefined;
    this.StepSuccess = undefined;
    this.StepLose = undefined;
    this.StatusNodeVisible = false;
    this.Ghc = false;
    this.CurrentStatusType = 0;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, ue_1.UISprite], [3, ue_1.UISprite], [4, ue_1.UISprite]);
  }
  OnStart() {
    super.OnStart();
    this.StepStatusNode = this.GetSprite(4);
    this.StepSuccess = this.GetSprite(2);
    this.StepLose = this.GetSprite(3);
  }
  async OnReset() {
    this.CurrentStatusType = 0;
    this.Nj_(this.CurrentStatusType, 0);
    await super.OnReset();
  }
  UpdateStepInfo() {
    super.UpdateStepInfo();
    this.StatusNodeVisible = this.UpdateStepStatusNode();
    this.StepStatusNode.SetUIActive(this.StatusNodeVisible);
  }
  async OnConfigRefresh(e, t) {
    await super.OnConfigRefresh(e, t);
    this.Ghc = true;
    this.CurrentStatusType = 0;
    this.Nj_(this.CurrentStatusType, 2);
  }
  UpdateStepStatusNode() {
    var e;
    var t = this.CheckCanShowStatusRoot();
    return !!t && (this.CheckCanUpdateStatusNode() && (e = this.Vj_(), this.CurrentStatusType !== e) && (this.CurrentStatusType = e, this.Nj_(this.CurrentStatusType, this.Ghc ? 1 : 3), this.Ghc = false), t);
  }
  Nj_(e, t) {
    switch (e) {
      case 0:
        this.FYt(false);
        this.VYt(false);
        break;
      case 1:
        this.FYt(true);
        this.VYt(false);
        break;
      case 2:
        this.FYt(false);
        this.VYt(true);
    }
    this.OnStatusChanged(this.CurrentStatusType, t);
  }
  Vj_() {
    if (this.Config && this.ShowData && this.Config.ShowSource !== 2) {
      var e;
      var t;
      if (this.Config.ShowSource === 1) {
        e = this.Config;
        t = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e.ProgressTargetId);
        if (MissionViewStepTextUtil_1.MissionViewStepTextUtil.GetEntrustProgressTotalCount(e.ProgressTargetId) <= t) {
          return 1;
        } else {
          return 0;
        }
      }
      var s = this.Config.QuestScheduleType;
      switch (s.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
          if (i) {
            if (!(i = i.GetNode(s.ChildQuestId)) || i.IsProcessing) {
              return 0;
            } else if (i.IsSuccess) {
              return 1;
            } else {
              return 2;
            }
          } else {
            return 0;
          }
        case IQuest_1.EQuestScheduleType.TimeLeft:
          var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
          if (i) {
            r = s.TimerType;
            if (i = i.GetChallengeRemainTime(r)) {
              if (s.TimeLeft <= i) {
                return 1;
              } else {
                return 2;
              }
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        case IQuest_1.EQuestScheduleType.Condition:
          var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData.Id);
          if (r) {
            if (i = s.Condition) {
              r = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(r.BtType, r.TreeIncId, r.TreeConfigId);
              if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(i, undefined, r)) {
                return 1;
              } else {
                return 2;
              }
            } else {
              return 0;
            }
          } else {
            return 0;
          }
      }
    }
    return 0;
  }
  FYt(e) {
    if ((this.StepSuccess.IsUIActiveSelf() && this.StepSuccess.Alpha === 1) !== e) {
      this.StepSuccess.SetUIActive(e);
    }
  }
  VYt(e) {
    if (this.StepLose.IsUIActiveSelf() !== e) {
      this.StepLose.SetUIActive(e);
    }
  }
  CheckCanShowStatusRoot() {
    if (this.Config && this.Config.QuestScheduleType) {
      switch (this.Config.ShowSource) {
        case 0:
          return GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeStatus(this.Config.QuestScheduleType);
        case 1:
          return true;
      }
    }
    return false;
  }
  CheckCanUpdateStatusNode() {
    return true;
  }
  OnStatusChanged(e, t) {}
}
exports.StepWithStatusItem = StepWithStatusItem;
//# sourceMappingURL=StepWithStatusItem.js.map