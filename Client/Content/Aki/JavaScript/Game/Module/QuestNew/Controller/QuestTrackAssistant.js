"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTrackAssistant = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventCSharpBridge_1 = require("../../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class QuestTrackAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.Hro = e => {
      if (e.B5n !== 0) {
        ModelManager_1.ModelManager.QuestNewModel.SetQuestTrackState(e.B5n, true);
      }
    };
    this.bMe = (e, r) => {
      if (r === 1) {
        r = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest, r?.TreeId);
      }
    };
    this.jro = (e, r, t) => {
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      if (o && o.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        var n = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
        if (n && n.TreeId === e) {
          switch (t) {
            case 1:
              this.RequestTrackQuest(n.Id, false, 2);
              break;
            case 2:
              n.SetTrack(false);
          }
        }
      }
    };
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(20346, this.Hro);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20346);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.jro);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.jro);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.任务追踪, this.bMe);
  }
  RefreshCurTrackQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
    ModelManager_1.ModelManager.QuestNewModel.RefreshResidentQuestMapMark();
    e?.SetTrack(false);
    e?.SetTrack(true);
    var e = ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest;
    if (e) {
      this.TryChangeTrackedQuest(e);
    }
  }
  RequestTrackQuest(e, r, t, o = 0, n) {
    var i = ModelManager_1.ModelManager.QuestNewModel;
    if (r) {
      var s = i.GetQuest(e);
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "QuestTrackAssistant.RequestTrackQuest:找不到任务", ["任务Id", e]);
        }
        n?.();
        return 1;
      }
      if (s.IsSuspend()) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("QuestTrackOccupiedTip");
        n?.();
        return 2;
      }
      if (i.IsInFocusMode()) {
        if (!i.IsInFocusOnQuest(e)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FocusModeCanNotTrackOtherQuest");
          n?.();
          return 4;
        }
      } else if (!s.CanShowTrackExpression()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Quest", 18, "QuestTrackAssistant.RequestTrackQuest,任务不可显示追踪表现", ["questId", e]);
        }
        n?.();
        return 3;
      }
    }
    ModelManager_1.ModelManager.QuestNewModel.SetQuestTrackState(e, r, o);
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyQuestTrackState, e, r, o);
    i = Protocol_1.Aki.Protocol.l1s.create({
      B5n: e,
      fHn: r ? 1 : 2,
      gHn: t
    });
    Net_1.Net.Call(21924, i, e => {
      if (e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 25802);
      }
      n?.();
    });
    return 0;
  }
  TryChangeTrackedQuest(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel;
    if (r.IsInFocusMode()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Quest", 18, "QuestTrackAssistant.专注模式下不允许切换任务追踪", ["newQuestId", e]);
      }
      return false;
    }
    var t = r.GetQuest(e);
    if (!t || !t.IsProgressing) {
      return false;
    }
    r = r.GetCurTrackedQuest();
    if (r?.Id === e) {
      return false;
    }
    if (!t.AutoCoverCurTrack) {
      if (r?.AutoTrack) {
        return false;
      }
      if (!t.AutoTrack) {
        return false;
      }
    }
    this.RequestTrackQuest(e, true, 2);
    return true;
  }
  TryChangeTrackedQuest2(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel;
    if (r.IsInFocusMode()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Quest", 18, "QuestTrackAssistant.专注模式下不允许切换任务追踪2", ["newQuestId", e]);
      }
    } else {
      var t = r.GetCurTrackedQuest();
      if (t === undefined || ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t.Id)) {
        if (e !== undefined) {
          const o = r.GetSuccessiveQuestId(e);
          if (o !== undefined) {
            this.RequestTrackQuest(o, true, 2);
            return true;
          }
        }
        const o = r.GetHighestPriorityProcessingQuestId();
        if (o !== undefined) {
          if (e !== undefined) {
            this.RequestTrackQuest(o, true, 2);
            return true;
          }
          t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AuToTrackQuestTime);
          r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
          if (!t || t < r) {
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AuToTrackQuestTime, TimeUtil_1.TimeUtil.GetNextDayTimeStamp());
            this.RequestTrackQuest(o, true, 2);
            return true;
          }
        }
      }
    }
    return false;
  }
}
exports.QuestTrackAssistant = QuestTrackAssistant;
//# sourceMappingURL=QuestTrackAssistant.js.map