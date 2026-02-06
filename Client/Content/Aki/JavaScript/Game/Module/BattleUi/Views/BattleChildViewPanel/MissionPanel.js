"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
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
    this.gvg = true;
    this.ILr = new Map();
    this.LU_ = new Map();
    this.wfm = new Map();
    this.PFc = undefined;
    this.wU_ = () => !this.GetActive();
    this.RU_ = async e => {
      var i = e.ShowData;
      var t = e.Reason;
      var s = ModelManager_1.ModelManager.BattleUiModel.CheckMissionViewItem(i, t);
      if (s !== undefined) {
        switch (s) {
          case 0:
            if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
              break;
            }
            return this.LU_.get(s).StartShow(e.ProcessId, i, e.IsSkipAnim);
          case 1:
          case 2:
            return this.Lfm(s, e.ProcessId, i, e.IsSkipAnim);
        }
      }
      return true;
    };
    this.AU_ = async e => {
      for (var [, i] of this.LU_) {
        if (i.ShowDataId === e.ShowData.Id || i.ShowDataId === e.ShowData.ParentId && e.ShowData.ParentId !== undefined || i.ShowData?.ParentId === e.ShowData.ParentId && e.ShowData.ParentId !== undefined) {
          return i.OnLogicTreeUpdateShow(e.ProcessId, e.ShowData, e.IsSkipAnim);
        }
      }
      this.aet(e.ShowData);
      return true;
    };
    this.PU_ = async e => {
      var i = this.LU_.get(0);
      var t = e.Id;
      if (t === i.ShowDataId || t === i.ShowData?.ParentId) {
        return i.EndShow(e.ProcessId, e.IsSkipAnim, e.Reason);
      } else {
        return !(await this.Pfm(1, e)) || this.Pfm(2, e);
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
    this.lpm = () => {
      this.sY_();
    };
    this.FWe = () => {
      ModelManager_1.ModelManager.BattleUiModel.CheckAndUpdateRule();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async InitializeAsync() {
    await this.kU_();
    await Promise.all([this.xFc()]);
    await this.Afm();
    if (this.gvg) {
      this.sY_();
    }
    this.RootItem.SetAnchorOffsetX(0);
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(2).SetUIActive(true);
  }
  async Afm() {
    var e = this.GetItem(0);
    var i = LguiUtil_1.LguiUtil.CopyItem(e, e.GetParentAsUIItem());
    var t = LguiUtil_1.LguiUtil.CopyItem(i, i.GetParentAsUIItem());
    var e = await this.NewDynamicChildViewAsync(e.GetOwner(), MissionViewItem_1.MissionViewItem, 0);
    await e.HideAsync();
    this.LU_.set(0, e);
    var e = await this.NewDynamicChildViewAsync(i.GetOwner(), MissionViewItem_1.MissionViewItem, 1);
    await e.HideAsync();
    this.LU_.set(1, e);
    var i = await this.NewDynamicChildViewAsync(t.GetOwner(), MissionViewItem_1.MissionViewItem, 2);
    await i.HideAsync();
    this.LU_.set(2, i);
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
  SetRestoreWhenInit(e) {
    this.gvg = e;
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
    this.wfm.clear();
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionTrackRuleChange, this.lpm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  RemoveEvents() {
    for (var [, e] of this.ILr) {
      e.RemoveEvents();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart, this.BU_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionTrackRuleChange, this.lpm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
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
  async Pfm(e, i) {
    var t;
    var s;
    var n = this.Dfm(e, i.Id);
    return n < 0 || !(t = this.LU_.get(e)) || !(s = this.wfm.get(e)) || (s.splice(n, 1), await t.EndShow(i.ProcessId, i.IsSkipAnim), s.length === 0) || this.Ufm(e, i.ProcessId, i.IsSkipAnim);
  }
  aet(e) {
    for (var [i, t] of this.wfm) {
      i = this.Dfm(i, e.Id);
      if (i >= 1) {
        t[i] = e;
      }
    }
  }
  Dfm(e, i) {
    e = this.wfm.get(e);
    if (e) {
      return e.findIndex(e => e.Id === i);
    } else {
      return -1;
    }
  }
  async Lfm(e, i, t, s) {
    let n = this.wfm.get(e);
    if (!n) {
      n = [];
      this.wfm.set(e, n);
    }
    var r = this.Dfm(e, t.Id);
    if (r >= 0) {
      n[r] = t;
      if (this.LU_.get(1).ShowDataId !== t.Id) {
        return true;
      }
    } else {
      n.push(t);
    }
    return this.Ufm(e, i, s);
  }
  async Ufm(e, i, t) {
    var s = this.LU_.get(e);
    if (!s) {
      return true;
    }
    e = this.wfm.get(e);
    if (!e) {
      return true;
    }
    ModelManager_1.ModelManager.BattleUiModel.SortMissionViewItem(e);
    e = e[e.length - 1];
    return s.StartShow(i, e, t);
  }
  async xFc() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 33) {
      e = this.GetItem(3);
      this.PFc = await this.NewDynamicChildViewByResourceId(e, "UiItem_AnniversaryCelebrationMission", DangoAbyssBattlePanel_1.DangoAbyssBattlePanel);
      this.PFc.SetVisible(0, true);
    }
  }
  OnCheckBattleChildViewPanelShowCondition() {
    return ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      return this.PFc?.GetGuideUiItemAndUiItemForShowEx(e);
    }
  }
}
(exports.MissionPanel = MissionPanel).vJe = Stats_1.Stat.Create("[BattleView]MissionPanelTick");
//# sourceMappingURL=MissionPanel.js.map