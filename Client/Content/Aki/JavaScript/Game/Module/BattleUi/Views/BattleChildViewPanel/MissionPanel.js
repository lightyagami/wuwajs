"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const DangoAbyssBattlePanel_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssBattlePanel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleQuestUpdateTipsView_1 = require("../MissionView/BattleQuestUpdateTipsView");
const MissionViewItem_1 = require("../MissionView/MissionViewItem");
const PendingProcessController_1 = require("../MissionView/PendingProcessController");
const QuestUpdateTipsController_1 = require("../MissionView/QuestUpdateTipsController");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class MissionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.ILr = new Map();
    this.LU_ = new Map();
    this.WZe = [];
    this.PFc = undefined;
    this.wU_ = () => !this.GetActive();
    this.RU_ = async e => {
      var i = e.ShowData;
      let t = undefined;
      switch (i.DataSource) {
        case 0:
          var s = i.Id;
          var s = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(s);
          if (!s || s.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid) {
            return true;
          }
          t = s.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || e.Reason === 1 ? 1 : 0;
          break;
        case 1:
          t = 1;
      }
      if (t !== undefined) {
        switch (t) {
          case 0:
            if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
              break;
            }
            return this.LU_.get(t).StartShow(e.ProcessId, i, e.IsSkipAnim);
          case 1:
            return this.iet(e.ProcessId, i, e.IsSkipAnim);
        }
      }
      return true;
    };
    this.AU_ = async e => {
      for (var [, i] of this.LU_) {
        if (i.ShowDataId === e.ShowData.Id) {
          return i.OnLogicTreeUpdateShow(e.ProcessId, e.ShowData, e.IsSkipAnim);
        }
      }
      this.aet(e.ShowData);
      return true;
    };
    this.PU_ = async e => {
      var i = this.LU_.get(0);
      var t = e.Id;
      if (t === i.ShowDataId) {
        return i.EndShow(e.ProcessId, e.IsSkipAnim, e.Reason);
      } else {
        return (i = this.ret(t)) < 0 || (t = this.LU_.get(1), this.WZe.splice(i, 1), await t.EndShow(e.ProcessId, e.IsSkipAnim), this.WZe.length === 0) || this.net(e.ProcessId, e.IsSkipAnim);
      }
    };
    this.xU_ = async e => this.UU_(1).ShowQuestUpdateTipsHandle(e);
    this.$fc = async e => {
      await this.LU_.get(e.ViewId).ChildStepConditionIndexChange(e.StepId, e.CurConditionTextIndex);
      return true;
    };
    this.DU_ = () => {
      for (var [, e] of this.LU_) {
        if (ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.get(e.ViewType) && e.CheckVisible()) {
          return false;
        }
      }
      return true;
    };
    this.BU_ = () => {
      var e = this.UU_(0).GetCurrentProcess();
      if (e) {
        if (e.ProcessType !== 3) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Quest", 18, "MissionPanel:任务更新提示结束动画开始时当前正在处理的操作类型异常", ["processType", e.ProcessType]);
          }
        } else {
          this.aet(e.Info.MissionViewShowData);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "MissionPanel:任务更新提示结束动画开始时找不到当前正在处理的操作");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async InitializeAsync() {
    await this.kU_();
    await Promise.all([this.xFc()]);
    var e = this.GetItem(0);
    var i = LguiUtil_1.LguiUtil.CopyItem(e, e.GetParentAsUIItem());
    var e = await this.NewDynamicChildViewAsync(e.GetOwner(), MissionViewItem_1.MissionViewItem, 0);
    await e.HideAsync();
    this.LU_.set(0, e);
    var e = await this.NewDynamicChildViewAsync(i.GetOwner(), MissionViewItem_1.MissionViewItem, 1);
    await e.HideAsync();
    this.LU_.set(1, e);
    this.sY_();
    this.RootItem.SetAnchorOffsetX(0);
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(2).SetUIActive(true);
  }
  sY_() {
    var e = ModelManager_1.ModelManager.BattleUiModel.GetAllMissionViewData();
    var i = this.UU_(0);
    if (e) {
      for (var [, t] of e) {
        if (t) {
          switch (t.DataSource) {
            case 0:
              i.BehaviorTreeStartShow(t, 0, true);
              break;
            case 1:
              i.FishingEntrustStartShow(t, 0);
          }
        }
      }
    }
  }
  async kU_() {
    var e = new PendingProcessController_1.PendingProcessController(this.wU_, this.RU_, this.PU_, this.AU_, this.xU_, this.$fc);
    this.ILr.set(0, e);
    var e = this.GetItem(1);
    var i = this.GetItem(2);
    var e = await this.NewDynamicChildViewAsync(e.GetOwner(), BattleQuestUpdateTipsView_1.BattleQuestUpdateTipsView);
    var e = new QuestUpdateTipsController_1.QuestUpdateTipsController(new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), e, this.DU_, i);
    this.ILr.set(1, e);
  }
  UU_(e) {
    return this.ILr.get(e);
  }
  Reset() {
    this.WZe.length = 0;
    for (var [, e] of this.LU_) {
      e.Destroy();
    }
    this.LU_.clear();
    for (var [, i] of this.ILr) {
      i.OnDestroy();
    }
    super.Reset();
  }
  OnShowBattleChildViewPanel() {
    for (var [, e] of this.LU_) {
      e.OnPanelShow();
    }
    this.UU_(1).OnPanelShow();
  }
  OnHideBattleChildViewPanel() {
    for (var [, e] of this.LU_) {
      e.OnPanelHide();
    }
    this.UU_(1).OnPanelHide();
  }
  AddEvents() {
    for (var [, e] of this.ILr) {
      e.AddEvents();
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart, this.BU_);
  }
  RemoveEvents() {
    for (var [, e] of this.ILr) {
      e.RemoveEvents();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart, this.BU_);
  }
  OnTickBattleChildViewPanel(e) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
      MissionPanel.vJe.Start();
      this.UU_(0).ProcessCacheList();
      this.XOn(e);
      MissionPanel.vJe.Stop();
    }
  }
  XOn(e) {
    if (this.LU_) {
      var i;
      var t = this.UU_(0).GetCurrentProcess();
      for ([, i] of this.LU_) {
        i.OnRefresh(e, t?.ProcessId ?? 0);
      }
    }
  }
  aet(e) {
    var i = this.ret(e.Id);
    if (!(i < 1)) {
      this.WZe[i] = e;
    }
  }
  ret(i) {
    return this.WZe.findIndex(e => e.Id === i);
  }
  async iet(e, i, t) {
    var s = this.ret(i.Id);
    if (s >= 0) {
      this.WZe[s] = i;
      if (this.LU_.get(1).ShowDataId !== i.Id) {
        return true;
      }
    } else {
      this.WZe.push(i);
    }
    return this.net(e, t);
  }
  async net(e, i) {
    this.WZe.sort((e, i) => e.DataSource !== i.DataSource ? e.DataSource - i.DataSource : e.ShowPriority - i.ShowPriority);
    var t = this.WZe[this.WZe.length - 1];
    return this.LU_.get(1).StartShow(e, t, i);
  }
  async xFc() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 33) {
      e = this.GetItem(3);
      this.PFc = await this.NewDynamicChildViewByResourceId(e, "UiItem_AnniversaryCelebrationMission", DangoAbyssBattlePanel_1.DangoAbyssBattlePanel);
      this.PFc.SetVisible(0, true);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return this.PFc?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
(exports.MissionPanel = MissionPanel).vJe = Stats_1.Stat.Create("[BattleView]MissionPanelTick");
//# sourceMappingURL=MissionPanel.js.map