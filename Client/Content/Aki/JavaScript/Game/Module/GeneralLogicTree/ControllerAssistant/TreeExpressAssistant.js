"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeExpressAssistant = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const LevelGamePlayUtils_1 = require("../../../LevelGamePlay/LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ONE_HUNDRED = 100;
class TreeExpressAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.eet = (e, t) => {
      if (e) {
        TreeExpressAssistant.HBu(e.BtType, e.Id, e.IsInChallenge);
      }
    };
    this.aYt = e => {
      if (e) {
        TreeExpressAssistant.HBu(e.BtType, e.Id, e.IsInChallenge);
      }
    };
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.eet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.aYt);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.eet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, this.aYt);
  }
  static IsShowNodeStatus(e) {
    let t = false;
    switch (e.Type) {
      case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
        t = e.ShowComplete;
        break;
      case IQuest_1.EQuestScheduleType.TimeLeft:
      case IQuest_1.EQuestScheduleType.Condition:
        t = true;
    }
    return t;
  }
  static GetTitleTrackNodeId(e) {
    let t = 0;
    return t = e && e.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted ? e.ChildQuestId : t;
  }
  static IsShowTrackDistance(e, t) {
    let r = false;
    return r = t && t.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted ? !!this.IsShowNodeTrackDistance(e, t.ChildQuestId) && t.ShowTracking : r;
  }
  static IsShowNodeTrackDistance(e, t) {
    e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    return !!e && (e.GetNode(t)?.ContainTag(0) ?? false);
  }
  static GetQCount(e, t) {
    let r = 0;
    var a = t;
    if (a) {
      const n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      switch (a.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          {
            var s = a;
            const n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
            s = n?.GetNode(s.ChildQuestId);
            if (!s) {
              break;
            }
            if (s.TrackTextRule === 1) {
              r = MathUtils_1.MathUtils.StringToNumber(s.GetProgress()) ?? 0;
            }
            break;
          }
        case IQuest_1.EQuestScheduleType.TimeLeft:
          if (a.ShowTime) {
            r = Math.floor(n.GetChallengeRemainTime(a.TimerType));
          }
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          var i;
          var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a.EntityId);
          if (s &&= s.Entity.GetComponent(173)) {
            i = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life);
            s = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n);
            r = Math.floor(i / s * ONE_HUNDRED);
          }
      }
    }
    return r;
  }
  static GetTitleText(t, r, e, a) {
    let s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
    var i = e;
    if (i) {
      switch (i.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          var n = i;
          s = n.TitlePreState && a ? this.GetNodeTrackText(t, n.ChildQuestId, n.TitlePreState?.TidPreStateTitle, n.Vars, n.OnlyShowWhileRunning) : this.GetNodeTrackText(t, n.ChildQuestId, r, n.Vars, n.OnlyShowWhileRunning);
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
          s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          if (i.ShowTime) {
            n = this.GetQCount(t, e);
            s = s.replace("{q_count}", "" + n);
          }
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          n = this.GetQCount(t, e);
          s = s.replace("{q_count}", n + "%");
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount:
          {
            var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
            if (!o) {
              break;
            }
            var n = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
            var l = i.AssociatedChildQuestIds;
            var c = l.length;
            let e = 0;
            for (const v of l) {
              if (o.GetNode(v)?.IsSuccess) {
                e++;
              }
            }
            s = `${n}(${e}/${c})`;
            break;
          }
        case IQuest_1.EQuestScheduleType.Score:
          s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          l = this.Okn(ModelManager_1.ModelManager.ScoreModel.GetCurrentScore()?.toString());
          s = (s = s.replace("{currentScore}", "" + l)).replace("{targetScore}", "" + ModelManager_1.ModelManager.ScoreModel.GetTargetScore());
          break;
        case IQuest_1.EQuestScheduleType.TowerChallengeTitle:
          if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
            s = ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName();
          }
          break;
        case IQuest_1.EQuestScheduleType.Var:
          n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
          if (n) {
            s = this.rr1(r, i.Var, i.ShowAsWordArt !== undefined, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(n.BtType, n.TreeIncId, n.TreeConfigId));
          }
          break;
        case IQuest_1.EQuestScheduleType.MultiVar:
        case IQuest_1.EQuestScheduleType.Condition:
          var _ = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
          if (_) {
            c = i.Vars;
            s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
            if (c && c.length !== 0) {
              var u = i?.ShowAsWordArt;
              for (const M of c) {
                s = this.p2_(s, M, u !== undefined, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(_.BtType, _.TreeIncId, _.TreeConfigId));
              }
            }
          }
          break;
        case IQuest_1.EQuestScheduleType.ProgressValue:
          var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i.TargetProgressEntity);
          if (l) {
            n = l.Entity.GetComponent(129);
            s = n ? (c = n.GetProgressData()?.CurrentValue ?? 0, n = (l = n.GetProgressData()?.MaxValue ?? 0) === 0 ? 0 : Math.round(c / l * 100), l = Math.round(c), (s = (s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r)).replace("{percent}", n + "%")).replace("{real_progress}", "" + l)) : "";
          } else {
            s = "";
          }
      }
    }
    return s;
  }
  static rr1(e, t, r, a) {
    a = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, a);
    if (a === undefined) {
      return "";
    } else {
      return this.FormatStepTextByVarValueByKey(e, t, a, r);
    }
  }
  static p2_(e, t, r, a) {
    a = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, a);
    if (a === undefined) {
      return "";
    } else {
      return this.or1(e, t, a, r);
    }
  }
  static GetNodeTrackText(e, t, r, a, s) {
    var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    if (!i) {
      return "";
    }
    var n = i.GetNode(t);
    if (!n) {
      return "";
    }
    if (s && !n.IsProcessing) {
      return "";
    }
    var o = r ?? n.TrackTextConfig;
    if (o === undefined || o.length === 0) {
      return "";
    }
    let l = undefined;
    switch (n.TrackTextRule) {
      case 0:
        l = PublicUtil_1.PublicUtil.GetConfigTextByKey(o);
        break;
      case 1:
        var c = PublicUtil_1.PublicUtil.GetConfigTextByKey(o);
        var _ = n.GetProgress() ?? "0";
        var u = n.GetProgressMax() ?? "0";
        l = c.replace("{q_count}", _).replace("{q_countMax}", u);
        break;
      case 2:
        c = PublicUtil_1.PublicUtil.GetConfigTextByKey(o);
        l = n.GetCustomTrackText(c);
    }
    if (!(l = n.NodeType === "ChildQuest" && n instanceof InteractBehaviorNode_1.InteractBehaviorNode && n.AlwaysFalseChildNode ? n.OccupationInfo ?? l : l)) {
      return "";
    }
    if (a && a.length !== 0) {
      for (const v of a) {
        l = this.p2_(l, v, false, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(i.BtType, i.TreeIncId, i.TreeConfigId));
      }
    }
    return l;
  }
  static FormatStepTextByVarValueByKey(e, t, r, a) {
    e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
    return this.or1(e, t, r, a);
  }
  static or1(e, t, r, a) {
    let s = e;
    let i = r.toString();
    if (a && typeof r == "number") {
      i = this.Okn(r.toString());
    }
    switch (t.Source) {
      case "Global":
        s = s.replace(`{${t.Keyword}}`, i);
        break;
      case "Other":
      case "Self":
        s = s.replace(`{${t.Name}}`, i);
    }
    return s = s.replace("{q_count}", i);
  }
  static Okn(e) {
    let t = "";
    if (e) {
      for (const a of e) {
        var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_Num" + a);
        t += `<texture=${r}/>`;
      }
    }
    return t;
  }
  static HBu(e, t, r) {
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        if (r) {
          this._Yt(t);
        }
    }
  }
  static _Yt(e) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.ApplyExpressionOccupation(e);
  }
  static TryReleaseExpressionOccupation(e) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.TryReleaseExpressionOccupation(e);
  }
}
exports.TreeExpressAssistant = TreeExpressAssistant;
//# sourceMappingURL=TreeExpressAssistant.js.map