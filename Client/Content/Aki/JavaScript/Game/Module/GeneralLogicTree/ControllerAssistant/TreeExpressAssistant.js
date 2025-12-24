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
        TreeExpressAssistant.Pku(e.BtType, e.Id, e.IsInChallenge);
      }
    };
    this.aYt = e => {
      if (e) {
        TreeExpressAssistant.Pku(e.BtType, e.Id, e.IsInChallenge);
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
    var r;
    var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    return !!e && (!(r = e.GetModifyTrackAreaConfig()) || !!r.TrackConfig.Show) && (e.GetNode(t)?.ContainTag(0) ?? false);
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
          if (s &&= s.Entity.GetComponent(182)) {
            i = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life);
            s = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n);
            r = Math.floor(i / s * ONE_HUNDRED);
          }
      }
    }
    return r;
  }
  static GetTitleText(t, r, e, a, s) {
    let i = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
    var o = e;
    if (o) {
      switch (o.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          var n = o;
          i = n.TitlePreState && a ? this.GetNodeTrackText(t, n.ChildQuestId, n.TitlePreState?.TidPreStateTitle, n.Vars, n.OnlyShowWhileRunning) : this.GetNodeTrackText(t, n.ChildQuestId, r, n.Vars, n.OnlyShowWhileRunning);
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
          i = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          if (o.ShowTime) {
            n = this.GetQCount(t, e);
            i = i.replace("{q_count}", "" + n);
          }
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          i = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          n = this.GetQCount(t, e);
          i = i.replace("{q_count}", n + "%");
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount:
          {
            var l = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
            if (!l) {
              break;
            }
            var n = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
            var c = o.AssociatedChildQuestIds;
            var _ = c.length;
            let e = 0;
            for (const M of c) {
              if (l.GetNode(M)?.IsSuccess) {
                e++;
              }
            }
            i = `${n}(${e}/${_})`;
            break;
          }
        case IQuest_1.EQuestScheduleType.Score:
          i = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          c = this.Okn(ModelManager_1.ModelManager.ScoreModel.GetCurrentScore()?.toString());
          i = (i = i.replace("{currentScore}", "" + c)).replace("{targetScore}", "" + ModelManager_1.ModelManager.ScoreModel.GetTargetScore());
          break;
        case IQuest_1.EQuestScheduleType.TowerChallengeTitle:
          if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
            i = ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName();
          }
          break;
        case IQuest_1.EQuestScheduleType.Var:
          n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
          if (n) {
            i = this.rr1(r, o.Var, o.ShowAsWordArt !== undefined, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(n.BtType, n.TreeIncId, n.TreeConfigId));
          }
          break;
        case IQuest_1.EQuestScheduleType.MultiVar:
        case IQuest_1.EQuestScheduleType.Condition:
          var u = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
          if (u) {
            _ = o.Vars;
            i = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
            if (_ && _.length !== 0) {
              var v = o?.ShowAsWordArt;
              for (const h of _) {
                i = this.p2_(i, h, v !== undefined, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(u.BtType, u.TreeIncId, u.TreeConfigId));
              }
            }
          }
          break;
        case IQuest_1.EQuestScheduleType.ProgressValue:
          var c = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.TargetProgressEntity);
          if (c) {
            n = c.Entity.GetComponent(138);
            i = n ? (_ = n.GetProgressData()?.CurrentValue ?? 0, n = (c = n.GetProgressData()?.MaxValue ?? 0) === 0 ? 0 : Math.round(_ / c * 100), c = Math.round(_), (i = (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(r)).replace("{percent}", n + "%")).replace("{real_progress}", "" + c)) : "";
          } else {
            i = "";
          }
          break;
        case IQuest_1.EQuestScheduleType.DistanceValue:
          var _ = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
          if (_) {
            n = Vector_1.Vector.Create(o.Pos.X ?? 0, o.Pos.Y ?? 0, o.Pos.Z ?? 0);
            c = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Meter");
            _ = Math.round(Vector_1.Vector.Dist2D(_, n) * 0.01);
            n = StringUtils_1.StringUtils.Format(c, _.toString());
            i += n;
          }
      }
      for (const d of s ?? []) {
        i = i.replace(`{${d.PlaceHolderName}}`, this.igf(d.BindingProgressType));
      }
    }
    return i;
  }
  static igf(e) {
    if (e.Type !== IQuest_1.EBindingProgressType.PlayerHavingItemCount) {
      return "";
    } else {
      e = e.ItemId;
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e).toString();
    }
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
  static Pku(e, t, r) {
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