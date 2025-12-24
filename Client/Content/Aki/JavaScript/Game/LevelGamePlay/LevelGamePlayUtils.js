"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayUtils = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const GamePlayScanCompositeByUid_1 = require("../../Core/Define/ConfigQuery/GamePlayScanCompositeByUid");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IVar_1 = require("../../UniverseEditor/Interface/IVar");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const EffectParameterNiagara_1 = require("../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../Effect/EffectSystem");
const Global_1 = require("../Global");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ActorUtils_1 = require("../Utils/ActorUtils");
const OperationRestrictUtils_1 = require("./OperationRestrict/OperationRestrictUtils");
const vectorArrayName = FNameUtil_1.FNameUtil.GetDynamicFName("VectorArray");
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
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 39, "关卡事件-设置玩家操作限制: 全部解除");
    }
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
      case 11:
        for (const i of t.Contexts) {
          var r = this.RRn(e, i);
          if (r !== undefined) {
            return r;
          }
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
            Log_1.Log.Error("Level", 72, "[LevelGamePlayUtils.GetEntityHandle] 对应的Context类型获取实体未实现", ["context.Type", t.Type]);
          }
      }
    } else if (e) {
      a = ActorUtils_1.ActorUtils.GetEntityByActor(e);
    }
    return a;
  }
  static GetCustomTimeDilationByContext(e) {
    let t = undefined;
    switch (e.Type) {
      case 1:
      case 5:
        var a = this.GetEntityHandle(undefined, e);
        var r = a?.Entity?.GetComponent(131);
        if (a?.Valid && r) {
          t = r.CurrentTimeScale * r.TimeDilation;
        }
        break;
      case 6:
      case 3:
      case 4:
      case 2:
      case 9:
        t = ModelManager_1.ModelManager.CharacterModel?.SelfCenteredTimeDilation;
        break;
      case 11:
        for (const i of e.Contexts) {
          if ((t = this.GetCustomTimeDilationByContext(i)) !== undefined) {
            break;
          }
        }
    }
    return t;
  }
  static GetCheckTargetConditionEntityHandles(e, t, a) {
    switch (e.Type) {
      case "OnlinePlayer":
        return this.GetEntityHandlesByCheckOnlinePlayerConfig(e.OnlinePlayerConditionTargetOption, t, a);
      case "TargetEntity":
        var r = this.GetEntityHandleByCheckTargetEntityConfig(e.TargetEntity, t, a);
        if (r) {
          return [r];
        }
    }
    return [];
  }
  static GetEntityHandlesByCheckOnlinePlayerConfig(e, t, a) {
    const r = new Array();
    function i() {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (e?.Valid) {
        r.push(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 72, "[GetCheckTargetConditionEntityHandles] 玩家实体无效", ["PlayerId", ModelManager_1.ModelManager.CreatureModel.GetPlayerId()]);
      }
    }
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      switch (e.Type) {
        case "Host":
          if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
            i();
          }
          break;
        case "Participator":
          i();
      }
    } else {
      i();
    }
    return r;
  }
  static GetEntityHandleByCheckTargetEntityConfig(e, t, a) {
    let r = undefined;
    switch (e.Type) {
      case "Self":
        r = LevelGamePlayUtils.GetEntityHandle(t, a);
        break;
      case "Target":
        var i = e;
        r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i.EntityId);
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
    if (!r?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 72, "[GetCheckTargetConditionEntityHandles] 指定实体无效", ["TargetEntity.Type", e.Type]);
      }
    }
    return r;
  }
  static TogglePlayerControl(e, t) {
    var a = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    if (a?.Valid) {
      var r = a.GetComponent(184);
      var i = a.GetComponent(41);
      var n = a.GetComponent(3);
      var o = a.GetComponent(65);
      var s = a.GetComponent(215);
      var a = a.GetComponent(187);
      var l = [-1697149502, -541178966, -542518289, -732810197, -1802431900, -1752099043, 581080458, -469423249, -2140742267, -1013832153];
      if (e) {
        a?.StopMove(false);
        a?.ResetMaxSpeed(r?.MoveState);
        n?.ClearInput();
        o?.ClearMoveVectorCache();
        o?.SetActive(true);
        for (const c of l) {
          s?.RemoveTag(c);
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, t);
        if (r?.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
          r?.ExitAimStatus();
        }
        if (i?.CurrentSkill) {
          i.EndOwnerAndFollowSkills();
        }
        n?.ClearInput();
        o?.ClearMoveVectorCache();
        o?.SetActive(false);
        for (const f of l) {
          s?.AddTag(f);
        }
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    }
  }
  static SetSplinePointEffectParam(e, t, a) {
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      var r = UE.NewArray(UE.Vector);
      var i = new UE.Vector();
      for (const n of a) {
        i.Set(n.Position.X ?? 0, n.Position.Y ?? 0, n.Position.Z ?? 0);
        r.Add(t.TransformPosition(i));
      }
      a = new EffectParameterNiagara_1.EffectParameterNiagara();
      a.UserParameterArrayVector = [[vectorArrayName, r]];
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, a);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 72, "[LevelGamePlayUtils.SetSplinePointEffectParam] 特效handle无效", ["effectHandle", e]);
    }
  }
  static GetValueInCurveFloatRange(e, t) {
    if (e.FromMax - e.FromMin < MathUtils_1.MathUtils.SmallNumber) {
      return t;
    }
    let a = (t - e.FromMin) / (e.FromMax - e.FromMin);
    if (e.CurveFloat) {
      a = e.CurveFloat.GetFloatValue(a);
    }
    a = MathUtils_1.MathUtils.Clamp(a, 0, 1);
    return MathUtils_1.MathUtils.Lerp(e.ToMin, e.ToMax, a);
  }
}
(exports.LevelGamePlayUtils = LevelGamePlayUtils).SUe = new Map();
//# sourceMappingURL=LevelGamePlayUtils.js.map