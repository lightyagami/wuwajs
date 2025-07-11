"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayUtils = undefined;
const Log_1 = require("../../Core/Common/Log");
const GamePlayScanCompositeByUid_1 = require("../../Core/Define/ConfigQuery/GamePlayScanCompositeByUid");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IVar_1 = require("../../UniverseEditor/Interface/IVar");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ModelManager_1 = require("../Manager/ModelManager");
const ActorUtils_1 = require("../Utils/ActorUtils");
const OperationRestrictUtils_1 = require("./OperationRestrict/OperationRestrictUtils");
class LevelGamePlayUtils {
  static HasScanInfo(e) {
    e = e.GetBaseInfo()?.ScanFunction?.ScanId;
    return !!e && e !== 0;
  }
  static GetScanCompositeResult(t) {
    t = t.GetBaseInfo()?.ScanFunction?.ScanId;
    if (t && t !== 0) {
      var a = LevelGamePlayUtils.SUe.get(t);
      if (a) {
        return a;
      }
      var r = GamePlayScanCompositeByUid_1.configGamePlayScanCompositeByUid.GetConfig(t);
      if (r) {
        var i = [];
        for (const o of r.ScanInfos) {
          var n = ConfigManager_1.ConfigManager.LevelGamePlayConfig.GetScanInfoById(o);
          i.push(n);
        }
        let e = 0;
        for (const s of i) {
          if (s.Interval > e) {
            e = s.Interval;
          }
        }
        a = {
          ScanInfos: i,
          Interval: e,
          ScanCompositeConfig: r
        };
        LevelGamePlayUtils.SUe.set(t, a);
        return a;
      }
    }
  }
  static ReleaseOperationRestriction() {
    OperationRestrictUtils_1.OperationRestrictUtils.SetOperationRestrictEnableAll();
  }
  static LevelOperationRestriction(e) {
    e = JSON.parse(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "Set Player Operation Action");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 5, "关卡事件-设置玩家操作限制", ["配置param:", e]);
    }
    OperationRestrictUtils_1.OperationRestrictUtils.SetOperationRestrictByOption(e);
  }
  static CheckVarRefSame(e, t) {
    if (e.Source === t.Source) {
      return false;
    }
    let a = false;
    switch (e.Source) {
      case "Constant":
        a = true;
        break;
      case "Self":
        if (t.Source === "Self") {
          a = e.Name === t.Name;
        }
        break;
      case "Other":
        if (t.Source === "Other") {
          a = e.Name === t.Name;
        }
        break;
      case "Global":
        if (t.Source === "Global") {
          a = e.Keyword === t.Keyword;
        }
    }
    return a;
  }
  static GetVarValue(e, t) {
    switch (e.Source) {
      case "Constant":
        return e.Value;
      case "Global":
        return ModelManager_1.ModelManager.WorldModel?.GetWorldState(e.Keyword);
      case "Other":
        var a = this.DRn(e.Name, e.RefId, e.RefType);
        return this.E$(a);
      case "Self":
        if (t) {
          a = this.RRn(e.Name, t);
          return this.E$(a);
        } else {
          return undefined;
        }
      default:
        return;
    }
  }
  static DRn(t, a, e) {
    switch (e) {
      case "Entity":
        var r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(a);
        if (r) {
          return r.Entity?.GetComponent(0)?.GetEntityVar(t);
        }
        break;
      case "Quest":
        return ModelManager_1.ModelManager.QuestNewModel.GetQuest(a)?.Tree?.GetTreeVarByKey(t);
      case "LevelPlay":
        {
          let e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(a)?.Tree;
          if (!e) {
            if ((r = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo())?.TreeConfigId === a) {
              e = r.Tree;
            }
          }
          return e?.GetTreeVarByKey(t);
        }
      default:
        return;
    }
  }
  static RRn(e, t) {
    switch (t.Type) {
      case 1:
        var a = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t.EntityId);
        if (a) {
          return a.Entity?.GetComponent(0)?.GetEntityVar(e);
        }
        break;
      case 6:
        return ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeIncId, true)?.GetTreeVarByKey(e);
      case 5:
        a = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t.TriggerEntityId);
        if (a) {
          return a.Entity?.GetComponent(0)?.GetEntityVar(e);
        }
        break;
      default:
        return;
    }
  }
  static GetVarRefFormAiLevelVar(e) {
    let t = "Constant";
    let a = "Entity";
    switch (e.VarSource) {
      case 0:
        t = "Global";
        break;
      case 1:
        t = "Self";
        break;
      case 2:
        t = "Other";
        a = "Entity";
        break;
      case 4:
        t = "Other";
        a = "LevelPlay";
        break;
      case 3:
        t = "Other";
        a = "Quest";
    }
    let r = undefined;
    switch (t) {
      case "Global":
        var i = {
          Type: "Int",
          Source: t,
          Keyword: e.VarName
        };
        r = i;
        break;
      case "Self":
        i = {
          Type: "Int",
          Source: t,
          Name: e.VarName
        };
        r = i;
        break;
      case "Other":
        i = {
          Type: "Int",
          Source: t,
          Name: e.VarName,
          RefId: e.Id,
          RefType: a
        };
        r = i;
    }
    return r;
  }
  static E$(e) {
    if (e) {
      switch ((0, IVar_1.getVarTypeByIndex)(e.iTs)) {
        case "Boolean":
          return e.rTs;
        case "Float":
          return e.sTs;
        case "Int":
          return MathUtils_1.MathUtils.LongToNumber(e.oTs);
        case "String":
          return e.nTs;
        case "Transform":
          if (e.wn1) {
            return {
              X: e.wn1.l8n ? e.wn1.l8n.X : undefined,
              Y: e.wn1.l8n ? e.wn1.l8n.Y : undefined,
              Z: e.wn1.l8n ? e.wn1.l8n.Z : undefined,
              Pitch: e.wn1._8n ? e.wn1._8n.Pitch : undefined,
              Roll: e.wn1._8n ? e.wn1._8n.Roll : undefined
            };
          } else {
            return {};
          }
        default:
          return;
      }
    }
  }
  static GetEntityHandle(e, t) {
    let a = undefined;
    if (t) {
      switch (t.Type) {
        case 1:
          a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
          break;
        case 5:
          a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.TriggerEntityId);
          break;
        case 11:
          for (const r of t.Contexts) {
            if (a = this.GetEntityHandle(e, r)) {
              break;
            }
          }
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 72, "[LevelGamePlayUtils.GetEntityHandle] 对应的Context类型获取实体未实现", ["context.Type", t.Type]);
          }
      }
    } else if (e) {
      a = ActorUtils_1.ActorUtils.GetEntityByActor(e);
    }
    return a;
  }
  static GetCheckTargetConditionEntityHandles(t, a, r) {
    const i = new Array();
    function e() {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (e?.Valid) {
        i.push(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 72, "[GetCheckTargetConditionEntityHandles] 玩家实体无效", ["PlayerId", ModelManager_1.ModelManager.CreatureModel.GetPlayerId()]);
      }
    }
    switch (t.Type) {
      case "OnlinePlayer":
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
          switch (t.OnlinePlayerConditionTargetOption.Type) {
            case "Host":
              if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
                e();
              }
              break;
            case "Participator":
              e();
          }
        } else {
          e();
        }
        break;
      case "TargetEntity":
        {
          let e = undefined;
          var n = t;
          switch (n.TargetEntity.Type) {
            case "Self":
              e = LevelGamePlayUtils.GetEntityHandle(a, r);
              break;
            case "Target":
              var o = n.TargetEntity;
              e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.EntityId);
              break;
            case "Triggered":
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelCondition", 72, "[GetCheckTargetConditionEntityHandles] 指定实体为触发者未实现", ["TargetEntity.Type", "Triggered"]);
              }
              break;
            case "Player":
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelCondition", 72, "[GetCheckTargetConditionEntityHandles] 指定实体为某个特定玩家未实现", ["TargetEntity.Type", "Player"]);
              }
          }
          if (e?.Valid) {
            i.push(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 72, "[GetCheckTargetConditionEntityHandles] 指定实体无效", ["TargetEntity.Type", n.TargetEntity.Type]);
          }
        }
    }
    return i;
  }
}
(exports.LevelGamePlayUtils = LevelGamePlayUtils).SUe = new Map();
//# sourceMappingURL=LevelGamePlayUtils.js.map