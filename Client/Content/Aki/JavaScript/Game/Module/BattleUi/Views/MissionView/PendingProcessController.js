"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PendingProcessController = exports.StepConditionIndexChangeProcess = exports.ShowQuestUpdateTipsProcess = exports.MissionItemViewRefreshProcess = exports.MissionItemViewEndTrackProcess = exports.MissionItemViewStartTrackProcess = exports.PendingProcess = undefined;
const Queue_1 = require("../../../../../Core/Container/Queue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const MissionPanelControllerBase_1 = require("./MissionPanelControllerBase");
class PendingProcess {
  constructor(e, s) {
    this.ProcessType = e;
    this.IsSkipAnim = s;
    this.ProcessId = 0;
    this.ProcessId = ++PendingProcess.Id;
  }
}
(exports.PendingProcess = PendingProcess).Id = 0;
class MissionItemViewStartTrackProcess extends PendingProcess {
  constructor(e, s, t) {
    super(0, t);
    this.ShowData = e;
    this.Reason = s;
    this.IsSkipAnim = t;
  }
}
exports.MissionItemViewStartTrackProcess = MissionItemViewStartTrackProcess;
class MissionItemViewEndTrackProcess extends PendingProcess {
  constructor(e, s, t) {
    super(1, t);
    this.Id = e;
    this.Reason = s;
    this.IsSkipAnim = t;
  }
}
exports.MissionItemViewEndTrackProcess = MissionItemViewEndTrackProcess;
class MissionItemViewRefreshProcess extends PendingProcess {
  constructor(e, s) {
    super(2, s);
    this.ShowData = e;
    this.IsSkipAnim = s;
  }
}
exports.MissionItemViewRefreshProcess = MissionItemViewRefreshProcess;
class ShowQuestUpdateTipsProcess extends PendingProcess {
  constructor(e) {
    super(3, e.IsSkipAnim);
    this.Info = e;
  }
}
exports.ShowQuestUpdateTipsProcess = ShowQuestUpdateTipsProcess;
class StepConditionIndexChangeProcess extends PendingProcess {
  constructor(e, s, t) {
    super(4, false);
    this.ViewId = e;
    this.StepId = s;
    this.CurConditionTextIndex = t;
  }
}
exports.StepConditionIndexChangeProcess = StepConditionIndexChangeProcess;
class PendingProcessController extends MissionPanelControllerBase_1.MissionPanelControllerBase {
  constructor(e, s, t, i, n, r) {
    super();
    this.CheckDeleteSameTreeHandle = e;
    this.MissionItemViewStartTrackHandle = s;
    this.MissionItemViewEndTrackHandle = t;
    this.MissionItemViewRefreshHandle = i;
    this.ShowQuestUpdateTipsHandle = n;
    this.StepConditionIndexChange = r;
    this.ControllerType = 0;
    this.KZe = [];
    this.Qfc = new Queue_1.Queue();
    this.QZe = undefined;
    this.aO_ = 0;
    this.Gd_ = e => {
      if (e) {
        ModelManager_1.ModelManager.FishingQuestModel.StartShowTrackText(ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust, 5);
      } else {
        this.YU_(this.aO_, 5);
      }
    };
    this.toc = e => {
      this.YU_(this.aO_, 6);
      if (e) {
        ModelManager_1.ModelManager.FishingQuestModel.StartShowTrackText(e, 6);
      }
    };
    this.FishingEntrustStartShow = (e, s) => {
      if (ModelManager_1.ModelManager.FishingModel.GetShipData().IsShipDriving()) {
        switch (s) {
          case 5:
          case 6:
            break;
          default:
            if (UiManager_1.UiManager.GetViewByName("FishingDockView")) {
              return;
            }
        }
        var t = ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
        if (this.aO_ === e.Id) {
          this.YZe(new MissionItemViewRefreshProcess(e, t));
        } else {
          this.YZe(new MissionItemViewStartTrackProcess(e, s, t));
        }
        this.aO_ = e.Id;
      }
    };
    this.YU_ = (e, s) => {
      let t = ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
      switch (s) {
        case 5:
          break;
        case 6:
          t = true;
          break;
        default:
          if (UiManager_1.UiManager.GetViewByName("FishingDockView")) {
            return;
          }
      }
      this.YZe(new MissionItemViewEndTrackProcess(e, s, t));
      this.aO_ = 0;
    };
    this.BehaviorTreeStartShow = (e, s, t) => {
      if (this.CheckDeleteSameTreeHandle()) {
        this.$Ze(e.Id);
      }
      this.YZe(new MissionItemViewStartTrackProcess(e, s, t));
    };
    this.JZe = (e, s, t) => {
      if (this.CheckDeleteSameTreeHandle()) {
        this.$Ze(e);
      }
      this.YZe(new MissionItemViewEndTrackProcess(e, s, t));
    };
    this.zZe = (e, s) => {
      this.YZe(new MissionItemViewRefreshProcess(e, s));
    };
    this.ZZe = e => {
      this.YZe(new ShowQuestUpdateTipsProcess(e));
    };
    this.Kfc = (e, s, t) => {
      this.KOn(new StepConditionIndexChangeProcess(e, s, t));
    };
    this.vH1 = s => {
      if (s && this.KZe.length !== 0) {
        for (let e = this.KZe.length - 1; e >= 0; e--) {
          var t = this.KZe[e];
          if (t.ProcessType === 3 && s !== t.Info.QuestId && this.QZe !== t) {
            this.KZe.splice(e, 1);
          }
        }
      }
    };
  }
  OnDestroy() {
    this.QZe = undefined;
    this.KZe.length = 0;
    this.Qfc.Clear();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.BehaviorTreeStartShow);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingEntrustStartShowTrackText, this.FishingEntrustStartShow);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingEntrustEndShowTrackText, this.YU_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.zZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestUpdateInfoAdd, this.ZZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFishingSailing, this.toc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.Kfc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FocusQuestChange, this.vH1);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.BehaviorTreeStartShow);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingEntrustStartShowTrackText, this.FishingEntrustStartShow);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingEntrustEndShowTrackText, this.YU_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.JZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.zZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestUpdateInfoAdd, this.ZZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFishingSailing, this.toc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MissionPanelStepConditionIndexChange, this.Kfc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FocusQuestChange, this.vH1);
  }
  $Ze(t) {
    if (this.KZe.length !== 0) {
      for (let s = 0; s < this.KZe.length; s++) {
        var i = this.KZe[s];
        let e = false;
        switch (i.ProcessType) {
          case 0:
          case 2:
            e = i.ShowData.Id === t;
            break;
          case 1:
            e = i.Id === t;
            break;
          case 3:
            e = i.Info.MissionViewShowData.Id === t;
        }
        var n = this.QZe && this.QZe.ProcessId === i.ProcessId;
        if (e && !n) {
          this.KZe.splice(s, 1);
        }
      }
    }
  }
  YZe(e) {
    this.KZe.push(e);
  }
  KOn(e) {
    if (this.QZe) {
      this.Qfc.Push(e);
    } else {
      this.KZe.unshift(e);
    }
  }
  async ProcessCacheList() {
    if (this.KZe.length !== 0 && !this.QZe) {
      this.QZe = this.KZe[0];
      let e = false;
      switch (this.QZe.ProcessType) {
        case 0:
          e = await this.MissionItemViewStartTrackHandle(this.QZe);
          break;
        case 1:
          e = await this.MissionItemViewEndTrackHandle(this.QZe);
          break;
        case 2:
          e = await this.MissionItemViewRefreshHandle(this.QZe);
          break;
        case 3:
          e = await this.ShowQuestUpdateTipsHandle(this.QZe);
          break;
        case 4:
          e = await this.StepConditionIndexChange(this.QZe);
      }
      if (e && this.KZe[0].ProcessId === this.QZe.ProcessId) {
        this.KZe.shift();
      }
      if (this.QZe.ProcessType === 3) {
        this.KOn(new MissionItemViewRefreshProcess(this.QZe.Info.MissionViewShowData, this.QZe.Info.IsSkipAnim));
      }
      while (!this.Qfc.Empty) {
        this.KZe.unshift(this.Qfc.Pop());
      }
      this.QZe = undefined;
    }
  }
  GetCurrentProcess() {
    return this.QZe;
  }
}
exports.PendingProcessController = PendingProcessController;
//# sourceMappingURL=PendingProcessController.js.map