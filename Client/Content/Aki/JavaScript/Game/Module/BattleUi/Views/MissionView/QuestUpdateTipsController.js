"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestUpdateTipsController = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const MissionPanelControllerBase_1 = require("./MissionPanelControllerBase");
class QuestUpdateTipsController extends MissionPanelControllerBase_1.MissionPanelControllerBase {
  constructor(s, t, e, i) {
    super();
    this.$pt = s;
    this.jZe = t;
    this.DU_ = e;
    this.JU_ = i;
    this.ControllerType = 1;
    this.oxn = 0;
    this.rct = undefined;
    this.QG_ = undefined;
    this.KG_ = undefined;
    this.XG_ = undefined;
    this.YG_ = undefined;
    this.zG_ = undefined;
    this.JG_ = false;
    this.yct = s => {
      switch (s) {
        case "MissionIn":
          if (this.oxn === 1) {
            if (this.KG_?.IsPending()) {
              this.KG_.SetResult(true);
            }
          } else if (this.oxn === 3 && this.zG_?.IsPending()) {
            this.zG_.SetResult(true);
          }
          break;
        case "MissionOut":
          if (this.oxn === 1) {
            if (this.QG_?.IsPending()) {
              this.QG_.SetResult(true);
            }
          } else if (this.oxn === 3 && this.YG_?.IsPending()) {
            this.YG_.SetResult(true);
          }
      }
    };
    this.fqn = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Log", 18, "MissionPanel:Press Track");
      }
      switch (this.oxn) {
        case 1:
          this.$pt.StopCurrentSequence(true, true);
          break;
        case 2:
          if (TimerSystem_1.TimerSystem.Has(this.rct)) {
            TimerSystem_1.TimerSystem.Remove(this.rct);
          }
          this.XG_?.SetResult(true);
      }
      this.JG_ = true;
    };
    this.$pt.BindSequenceCloseEvent(this.yct);
  }
  OnDestroy() {
    this.$pt.Clear();
    this.jZe.Destroy();
    this.rct?.Remove();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestUpdateTipsClickTrack, this.fqn);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestUpdateTipsClickTrack, this.fqn);
  }
  OnPanelShow() {
    this.$pt.ResumeSequence();
    if (TimerSystem_1.TimerSystem.Has(this.rct) && TimerSystem_1.TimerSystem.IsPause(this.rct)) {
      TimerSystem_1.TimerSystem.Resume(this.rct);
    }
  }
  OnPanelHide() {
    this.$pt.PauseSequence();
    if (TimerSystem_1.TimerSystem.Has(this.rct)) {
      TimerSystem_1.TimerSystem.Pause(this.rct);
    }
  }
  async ShowQuestUpdateTipsHandle(t) {
    var e = t.Info;
    if (e) {
      var i = e.QuestId;
      let s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
      if (s) {
        s.IsNewQuest = false;
        if (e.IsSkipAnim) {
          QuestController_1.QuestNewController.RequestTrackQuest(i, true, 0);
          this.axn(t);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Log", 18, "MissionPanel: 开始执行任务更新提示流程", ["questId", i]);
          }
          this.oxn = 1;
          if (!this.DU_()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateStart - MissionOut开始播放", ["questId", i]);
            }
            this.ZG_(false);
            this.QG_ = new CustomPromise_1.CustomPromise();
            this.$pt.PlayLevelSequenceByName("MissionOut");
            await this.QG_.Promise;
          }
          if (s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateStart - MISSION_IN开始播放", ["questId", i]);
            }
            this.jZe.OnBeforePlayShowSequence(e);
            this.ZG_(true);
            this.KG_ = new CustomPromise_1.CustomPromise();
            this.$pt.PlayLevelSequenceByName("MissionIn");
            await this.KG_.Promise;
            if (!this.JG_) {
              this.oxn = 2;
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateStay", ["questId", i]);
              }
              e = this.e2_(e.QuestId);
              this.XG_ = new CustomPromise_1.CustomPromise();
              this.rct = TimerSystem_1.TimerSystem.Delay(() => {
                this.XG_?.SetResult(true);
              }, e);
              await this.XG_.Promise;
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateEnd - MISSION_OUT开始播放", ["questId", i]);
            }
            this.oxn = 3;
            this.ZG_(true);
            this.jZe.OnBeforePlayHideSequence();
            this.YG_ = new CustomPromise_1.CustomPromise();
            this.$pt.PlayLevelSequenceByName("MissionOut");
            await this.YG_.Promise;
          } else {
            this.oxn = 3;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateEnd - MISSION_IN开始播放", ["questId", i]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart);
          this.ZG_(false);
          e = this.DU_();
          this.$pt.PlayLevelSequenceByName("MissionIn");
          if (e) {
            this.$pt.EndSequenceLastFrame("MissionIn");
          } else {
            this.zG_ = new CustomPromise_1.CustomPromise();
            await this.zG_.Promise;
          }
          this.axn(t);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Log", 18, "MissionPanel: 任务更新提示流程执行结束", ["questId", i]);
          }
        }
      }
    }
    return true;
  }
  ZG_(s) {
    this.jZe.SetUiActive(s);
    this.JU_.SetUIActive(!s);
  }
  e2_(s) {
    var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(s);
    if (s = s && ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestUpdateShowTime(s.Type)) {
      return s * 1000;
    } else {
      return TimerSystem_1.MIN_TIME;
    }
  }
  axn(s) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Log", 18, "MissionPanel:QuestUpdateTipsEnd - AllOver", ["processId", s.Info.QuestId]);
    }
    this.jZe.OnAfterPlayHideSequence();
    this.oxn = 0;
    this.JG_ = false;
  }
}
exports.QuestUpdateTipsController = QuestUpdateTipsController;
//# sourceMappingURL=QuestUpdateTipsController.js.map