"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackTextExpressController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LogicNodeBase_1 = require("../../BehaviorNode/LogicNode/LogicNodeBase");
const GeneralLogicTreeDefine_1 = require("../../Define/GeneralLogicTreeDefine");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController");
class TrackTextExpressController {
  constructor(e) {
    this.Yre = e;
    this.fXt = undefined;
    this.pXt = new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo();
    this.vXt = new Map();
    this.MXt = [];
    this.EXt = false;
    this.aec = undefined;
    this.fXt = e.UiTrackTextInfo;
  }
  Clear() {
    this.pXt.Clear();
    this.fXt.Clear();
    this.MXt.length = 0;
    this.vXt.clear();
    ModelManager_1.ModelManager.LevelPlayModel.ChangeLevelPlayTrackRange(this.Yre.TreeConfigId, undefined);
    this.EndTextExpress();
  }
  EnableTrack(e, t = 0) {
    if (e) {
      this.StartTextExpress();
    } else {
      let e = t === 1 ? 2 : 0;
      this.EndTextExpress(e);
    }
  }
  StartTextExpress(e = 0) {
    this.vXt.set(e, true);
    if (!this.Yre.IsOccupied && !this.Yre.IsTrackBoundToParent) {
      this.SXt(e);
    }
  }
  SXt(e) {
    var t;
    if (!this.Yre?.IsTrackBoundToParent && !this.EXt) {
      t = this.Yre.ContainTag(16) || ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.Yre.CreateShowData(), e, t);
      this.EXt = true;
    }
  }
  EndTextExpress(e = 0) {
    if (e === 2) {
      this.vXt.clear();
    } else {
      this.vXt.delete(e);
    }
    if (this.vXt.size === 0) {
      this.yXt(e);
    }
  }
  UpdateOnNodeStatusChange(e, t, i) {
    this.jJ1(e, t);
    e = this.RQt(e, t, i);
    this.HJ1(e);
  }
  OnBtApplyExpressionOccupation(e) {
    if (!e) {
      this.yXt(3);
    }
  }
  OnBtReleaseExpressionOccupation(e) {
    if (!e) {
      if (this.vXt.size !== 0) {
        this.SXt(3);
      }
    }
  }
  OnSuspend(e, t) {
    switch (t) {
      case 1:
        this.LXt(e, t);
        break;
      case 2:
        this.yXt(4);
    }
  }
  OnCancelSuspend() {
    this.DXt();
    if (this.vXt.size !== 0) {
      this.SXt(3);
    }
  }
  yXt(e) {
    var t;
    if (!this.Yre?.IsTrackBoundToParent) {
      if (this.EXt && (t = this.Yre.ContainTag(16) || ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled", EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.Yre.TreeIncId, e, t), GeneralLogicTreeController_1.GeneralLogicTreeController.TryReleaseExpressionOccupation(this.Yre.TreeIncId), this.EXt = false, TimerSystem_1.TimerSystem.Has(this.aec))) {
        TimerSystem_1.TimerSystem.Remove(this.aec);
      }
    }
  }
  HJ1(e) {
    if (!this.Yre?.IsTrackBoundToParent) {
      if (this.EXt && !e) {
        if (TimerSystem_1.TimerSystem.Has(this.aec)) {
          TimerSystem_1.TimerSystem.Remove(this.aec);
        }
        this.aec = this.hec();
      }
    }
  }
  hec() {
    return TimerSystem_1.TimerSystem.Delay(() => {
      var e;
      if (this.EXt) {
        e = this.Yre.ContainTag(16) || ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.Yre.CreateShowData(), e);
      }
    }, 100);
  }
  RQt(e, t, i) {
    return i === 0 && t === Protocol_1.Aki.Protocol.BNs._5n && this.Yre.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && (i = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id, this.Yre.TreeConfigId !== i) && !!e.ContainTag(0) && !e.ContainTag(2) && !(t = GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(this.Yre.TreeIncId, e.NodeId), StringUtils_1.StringUtils.IsEmpty(t)) && !(ModelManager_1.ModelManager.GeneralLogicTreeModel.SaveUpdateInfo(this.Yre.TreeIncId, e.NodeId), 0);
  }
  jJ1(e, t) {
    if (e instanceof LogicNodeBase_1.LogicNodeBase) {
      switch (t) {
        case Protocol_1.Aki.Protocol.BNs._5n:
          if (e.ContainTag(0)) {
            this.IXt(e.NodeId, e.CustomUiConfig);
          }
          break;
        case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
        case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
        case Protocol_1.Aki.Protocol.BNs.Proto_Destroy:
          this.IXt(e.NodeId, undefined);
      }
    } else if (!this.Yre.ContainTag(11)) {
      this.TXt();
    }
  }
  IXt(i, e) {
    var t = this.MXt.findIndex((e, t) => e.SourceOfAdd === i);
    if (e) {
      if (t < 0) {
        this.MXt.push(new GeneralLogicTreeDefine_1.BtCustomUiConfig(i, e));
      } else {
        this.MXt[t].CustomUiConfig = e;
      }
    } else {
      if (t < 0) {
        return;
      }
      this.MXt.splice(t, 1);
    }
    this.Yre.RemoveTag(11);
    this.Yre.RemoveTag(12);
    let s = undefined;
    if (this.MXt.length !== 0) {
      this.Yre.AddTag(11);
      e = this.MXt[this.MXt.length - 1].CustomUiConfig;
      this.pXt.CopyConfig(e);
      s = e.TrackRadius?.TrackRadius;
      if (e.UiType === IQuest_1.EQuestScheduleUiType.LevelPlay) {
        this.Yre.AddTag(12);
      }
      this.fXt.Clear();
      this.fXt.CopyConfig(e);
    } else {
      this.TXt();
    }
    ModelManager_1.ModelManager.LevelPlayModel.ChangeLevelPlayTrackRange(this.Yre.TreeConfigId, s);
  }
  TXt() {
    this.fXt.Clear();
    var t = this.Yre.GetNodesByGroupId(1);
    if (t) {
      let e = 0;
      for (var [i, s] of t) {
        if (s.ContainTag(0) && s.TrackTextConfig) {
          s = {
            TidTitle: s.TrackTextConfig,
            QuestScheduleType: {
              Type: IQuest_1.EQuestScheduleType.ChildQuestCompleted,
              ChildQuestId: i,
              ShowTracking: true
            }
          };
          this.fXt.SetMainTitle(s);
          this.fXt.AddSubTitle(s);
          e++;
        }
      }
      if (e === 1) {
        this.fXt.ClearSubTitle();
      } else {
        this.fXt.SetMainTitle(undefined);
      }
    }
  }
  LXt(e, t) {
    var i = "TaskOccupyGeneralDes_1001";
    this.fXt.Clear();
    if (t === 1 && !StringUtils_1.StringUtils.IsBlank(PublicUtil_1.PublicUtil.GetConfigTextByKey(i))) {
      this.fXt.SetMainTitle({
        TidTitle: i,
        QuestScheduleType: {
          Type: IQuest_1.EQuestScheduleType.None
        }
      });
      this.fXt.ClearSubTitle();
      this.Yre.AddTag(10);
    }
  }
  DXt() {
    if (this.Yre.ContainTag(11)) {
      this.fXt.Clear();
      this.fXt.CopyConfig(this.pXt);
    }
  }
}
exports.TrackTextExpressController = TrackTextExpressController;
//# sourceMappingURL=TrackTextExpressController.js.map