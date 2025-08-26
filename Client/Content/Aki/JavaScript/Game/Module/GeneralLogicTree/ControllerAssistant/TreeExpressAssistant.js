"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeExpressAssistant = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const LevelGamePlayUtils_1 = require("../../../LevelGamePlay/LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
const ONE_HUNDRED = 100;
class TreeExpressAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.eet = (e, t) => {
      if (e) {
        TreeExpressAssistant.Dqu(e.BtType, e.Id, e.IsInChallenge);
      }
    };
    this.aYt = e => {
      if (e) {
        TreeExpressAssistant.Dqu(e.BtType, e.Id, e.IsInChallenge);
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
      const o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      switch (a.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          {
            var s = a;
            const o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
            s = o?.GetNode(s.ChildQuestId);
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
            r = Math.floor(o.GetChallengeRemainTime(a.TimerType));
          }
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          var i;
          var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a.EntityId);
          if (s &&= s.Entity.GetComponent(174)) {
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
          var o = i;
          s = o.TitlePreState && a ? this.GetNodeTrackText(t, o.ChildQuestId, o.TitlePreState?.TidPreStateTitle, o.Vars, o.OnlyShowWhileRunning) : this.GetNodeTrackText(t, o.ChildQuestId, r, o.Vars, o.OnlyShowWhileRunning);
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
          s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          if (i.ShowTime) {
            o = this.GetQCount(t, e);
            s = s.replace("{q_count}", "" + o);
          }
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          o = this.GetQCount(t, e);
          s = s.replace("{q_count}", o + "%");
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount:
          {
            var n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
            if (!n) {
              break;
            }
            var o = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
            var l = i.AssociatedChildQuestIds;
            var c = l.length;
            let e = 0;
            for (const v of l) {
              if (n.GetNode(v)?.IsSuccess) {
                e++;
              }
            }
            s = `${o}(${e}/${c})`;
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
          o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
          if (o) {
            s = this.rr1(r, i.Var, i.ShowAsWordArt !== undefined, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(o.BtType, o.TreeIncId, o.TreeConfigId));
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
            o = l.Entity.GetComponent(130);
            s = o ? (c = o.GetProgressData()?.CurrentValue ?? 0, o = (l = o.GetProgressData()?.MaxValue ?? 0) === 0 ? 0 : Math.round(c / l * 100), l = Math.round(c), (s = (s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r)).replace("{percent}", o + "%")).replace("{real_progress}", "" + l)) : "";
          } else {
            s = "";
          }
          break;
        case IQuest_1.EQuestScheduleType.DistanceValue:
          var c = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
          if (c) {
            o = Vector_1.Vector.Create(i.Pos.X ?? 0, i.Pos.Y ?? 0, i.Pos.Z ?? 0);
            l = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Meter");
            c = Math.round(Vector_1.Vector.Dist2D(c, o) * 0.01);
            o = StringUtils_1.StringUtils.Format(l, c.toString());
            s += o;
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
    var o = i.GetNode(t);
    if (!o) {
      return "";
    }
    if (s && !o.IsProcessing) {
      return "";
    }
    var n = r ?? o.TrackTextConfig;
    if (n === undefined || n.length === 0) {
      return "";
    }
    let l = undefined;
    switch (o.TrackTextRule) {
      case 0:
        l = PublicUtil_1.PublicUtil.GetConfigTextByKey(n);
        break;
      case 1:
        var c = PublicUtil_1.PublicUtil.GetConfigTextByKey(n);
        var _ = o.GetProgress() ?? "0";
        var u = o.GetProgressMax() ?? "0";
        l = c.replace("{q_count}", _).replace("{q_countMax}", u);
        break;
      case 2:
        c = PublicUtil_1.PublicUtil.GetConfigTextByKey(n);
        l = o.GetCustomTrackText(c);
    }
    if (!(l = o.NodeType === "ChildQuest" && o instanceof InteractBehaviorNode_1.InteractBehaviorNode && o.AlwaysFalseChildNode ? o.OccupationInfo ?? l : l)) {
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
  static Dqu(e, t, r) {
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