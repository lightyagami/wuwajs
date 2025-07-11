"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionPanelChildStep = undefined;
const ue_1 = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const StepProgressBarController_1 = require("./TreeStep/StepProgressBarController");
const StepWithStatusItem_1 = require("./TreeStep/StepWithStatusItem");
const UNLOCK_ANIM = "Unlock";
class MissionPanelChildStep extends StepWithStatusItem_1.StepWithStatusItem {
  constructor(t, e) {
    super(t, e);
    this.ViewId = t;
    this.StepId = e;
    this.Oct = undefined;
    this.kct = undefined;
    this.Fct = undefined;
    this.LevelSequencePlayer = undefined;
    this.KF_ = undefined;
    this.XF_ = undefined;
    this.kj_ = undefined;
    this.qj_ = undefined;
    this.Vct = undefined;
    this.Hct = undefined;
    this.jct = IQuest_1.EQuestScheduleType.None;
    this.Gr_ = true;
    this.Oj_ = false;
    this.Th_ = false;
    this.g1_ = 0;
    this.yct = t => {
      switch (t) {
        case "Success":
          this.DescribeTextComp?.SetColor(this.Vct);
          break;
        case "Fail":
          this.DescribeTextComp?.SetColor(this.Hct);
          break;
        case "Start":
          if (this.KF_?.IsPending()) {
            this.KF_.SetResult(true);
          }
          break;
        case "Close":
          if (this.XF_?.IsPending()) {
            this.XF_.SetResult(true);
          }
          break;
        case UNLOCK_ANIM:
          if (this.kj_?.IsPending()) {
            this.kj_.SetResult(true);
          }
      }
    };
    this.nJa = t => {
      if (t === UNLOCK_ANIM) {
        if (this.g1_ === MissionPanelChildStep.p1_ && this.qj_?.IsPending()) {
          this.qj_.SetResult(true);
        }
        MissionPanelChildStep.p1_++;
      }
    };
    this.Oct = ue_1.Color.FromHex("ECE5D8FF");
    this.kct = ue_1.Color.FromHex("ADADADFF");
    this.Fct = ue_1.Color.FromHex("C9F797FF");
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([5, ue_1.UIItem]);
    this.ComponentRegisterInfos.push([6, ue_1.UISprite]);
    this.ComponentRegisterInfos.push([7, ue_1.UIItem]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t;
    var e = this.GetItem(7);
    if (e) {
      await (t = new StepProgressBarController_1.StepProgressBarController(e)).CreateByResourceIdAsync("UiItem_MissionBar", e);
      this.StepControllers.set(1, t);
    }
  }
  OnStart() {
    super.OnStart();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
    this.RootActor.OnSequencePlayEvent.Bind(this.nJa);
    this.GetItem(5)?.SetUIActive(false);
    this.GetSprite(6)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
    var t = this.RootActor.GetComponentByClass(ue_1.UISizeControlByOther.StaticClass());
    if (t) {
      t.bSizeZeroWhenNotActive = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 72, "MissionPanelChildStep 无法获取UISizeControlByOther");
    }
    this.YQ_();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.nJa);
  }
  OnAfterShow() {
    this.LevelSequencePlayer?.ResumeSequence();
    this.YQ_();
  }
  OnAfterHide() {
    this.LevelSequencePlayer?.PauseSequence();
  }
  async StartShow(t) {
    await this.ShowAsync();
    this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
    var e = this.CheckVisible();
    this.KF_ = new CustomPromise_1.CustomPromise();
    if (!!t || !e) {
      this.LevelSequencePlayer.EndSequenceLastFrame("Start");
    }
    await this.KF_.Promise;
  }
  async EndShow(t) {
    this.LevelSequencePlayer?.PlayLevelSequenceByName("Close");
    var e = this.CheckVisible();
    this.XF_ = new CustomPromise_1.CustomPromise();
    if (!!t || !e) {
      this.LevelSequencePlayer.EndSequenceLastFrame("Close");
    }
    await this.XF_.Promise;
    await this.Refresh(undefined, undefined);
    await this.HideAsync();
  }
  CheckVisible() {
    var t = super.CheckVisible();
    this.YQ_();
    return t;
  }
  async OnReset() {
    this.LevelSequencePlayer?.StopCurrentSequence(true, true);
    await this.HideAsync();
    this.GetItem(5)?.SetUIActive(false);
    await super.OnReset();
  }
  UpdateStepInfo() {
    this.Wct();
    this.bh_();
    super.UpdateStepInfo();
    this.YQ_();
    this.VBu();
  }
  VBu() {}
  YQ_() {
    this.GetItem(5)?.SetUIActive(this.IsDescribeTextVisible);
  }
  bh_() {
    var t;
    if (!this.Oj_) {
      t = this.CheckMeetPreCondition();
      if (this.Gr_ !== t) {
        if (t) {
          this.PlayUnlockAnim();
        } else {
          this.Gr_ = false;
          this.DescribeTextComp.SetColor(this.kct);
          this.GetSprite(6)?.SetAlpha(1);
          this.GetSprite(6)?.SetUIActive(true);
          if (this.Config?.ShowSource === 0) {
            this.Config.UsePreStateText = true;
          }
        }
      }
    }
  }
  async PlayUnlockAnim() {
    if (this.LevelSequencePlayer) {
      this.Oj_ = true;
      this.g1_ = MissionPanelChildStep.p1_;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.nJa);
      this.LevelSequencePlayer.StopCurrentSequence(true, true);
      this.LevelSequencePlayer.PlayLevelSequenceByName(UNLOCK_ANIM);
      this.qj_ = new CustomPromise_1.CustomPromise();
      await this.qj_.Promise;
      this.Th_ = true;
      this.DescribeTextComp?.SetColor(this.Oct);
      if (this.Config?.ShowSource === 0) {
        this.Config.UsePreStateText = false;
      }
      this.kj_ = new CustomPromise_1.CustomPromise();
      await this.kj_.Promise;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.nJa);
      this.Th_ = false;
      this.Oj_ = false;
      this.Gr_ = true;
      this.GetSprite(6)?.SetUIActive(false);
    }
  }
  CheckCanShowStatusRoot() {
    if (this.Gr_) {
      return super.CheckCanShowStatusRoot();
    } else {
      return this.Th_;
    }
  }
  CheckCanUpdateStatusNode() {
    return this.Gr_;
  }
  CheckMeetPreCondition() {
    if (this.Config?.ShowSource === 0) {
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.ShowData?.Id);
      if (t && t.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        var e = this.Config.QuestScheduleType;
        if (e.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted) {
          e = e?.TitlePreState;
          if (e) {
            t = LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(t.BtType, t.TreeIncId, t.TreeConfigId, undefined, undefined);
            return ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e.SwitchConditions, undefined, t);
          }
        }
      }
    }
    return true;
  }
  Wct() {
    if (this.Config) {
      let e = IQuest_1.EQuestScheduleType.None;
      if (this.Config.ShowSource === 1) {
        e = this.Config.QuestScheduleType;
      } else if (this.Config.ShowSource === 0 && this.Config.QuestScheduleType) {
        e = this.Config.QuestScheduleType.Type;
      }
      if (this.jct !== e) {
        switch (this.jct = e) {
          case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          case "FishingEntrust":
            this.Vct = this.Fct;
            this.Hct = this.kct;
            var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MissionState");
            var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MissionComplete");
            var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MissionLose");
            this.SetSpriteByPath(i, this.StepStatusNode, true);
            this.SetSpriteByPath(s, this.StepSuccess, true);
            this.SetSpriteByPath(h, this.StepLose, true);
            break;
          case IQuest_1.EQuestScheduleType.Condition:
          case IQuest_1.EQuestScheduleType.TimeLeft:
            {
              let t = undefined;
              e;
              IQuest_1.EQuestScheduleType.Condition;
              t = this.Config.QuestScheduleType;
              this.Vct = this.Oct;
              this.Hct = this.kct;
              i = t.IconType === 1 ? "SP_DailyTowerStarBg" : "SP_ComStateOffline";
              s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
              this.SetSpriteByPath(s, this.StepStatusNode, true);
              h = t.IconType === 1 ? "SP_DailyTowerStar" : "SP_ComStateOnline";
              i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(h);
              this.SetSpriteByPath(i, this.StepSuccess, true);
              this.SetSpriteByPath(s, this.StepLose, true);
              break;
            }
        }
      }
    }
  }
  OnStatusChanged(t, e) {
    let i = undefined;
    switch (t) {
      case 0:
        this.DescribeTextComp.SetColor(this.Oct);
        break;
      case 1:
        i = "Success";
        break;
      case 2:
        i = "Fail";
    }
    if (i && (this.LevelSequencePlayer.StopCurrentSequence(true, true), this.LevelSequencePlayer.PlayLevelSequenceByName(i), e !== 3)) {
      this.LevelSequencePlayer.EndSequenceLastFrame(i);
    }
  }
  async OnConfigRefresh(t, e) {
    await super.OnConfigRefresh(t, e);
    this.Gr_ = true;
    this.Th_ = false;
    this.LevelSequencePlayer?.StopCurrentSequence(true, true);
  }
}
(exports.MissionPanelChildStep = MissionPanelChildStep).p1_ = 0;
//# sourceMappingURL=MissionPanelChildStep.js.map