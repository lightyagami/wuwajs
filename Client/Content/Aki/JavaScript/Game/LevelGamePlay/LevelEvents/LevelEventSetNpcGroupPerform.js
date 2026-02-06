"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetNpcGroupPerform = undefined;
const Log_1 = require("../../../Core/Common/Log");
const NpcGroupPerformConfigByRoleIdAndNpcPerformMark_1 = require("../../../Core/Define/ConfigQuery/NpcGroupPerformConfigByRoleIdAndNpcPerformMark");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const HoldingHandsController_1 = require("../../Module/HoldHands/HoldingHandsController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetNpcGroupPerform extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.jye = Vector_1.Vector.Create();
    this.OPt = undefined;
    this.nx = undefined;
    this.zpe = (e, r) => {
      this.f6g(r);
    };
  }
  ExecuteNew(e, r) {
    this.OPt = e;
    this.nx = r;
    var t = this.OPt.PerformType;
    switch (this.OPt.PerformType.Type) {
      case 0:
        this.FinishExecute(this.i5g(t));
        break;
      case 5:
        this.r5g(t);
    }
  }
  ExecuteWhenEntitiesReady() {
    var e = this.OPt;
    var r = this.nx;
    if (e && r) {
      var t = e.PerformType;
      switch (t.Type) {
        case 0:
          var o = this.g6g(e, r);
          this.FinishExecute(o);
          break;
        case 5:
          if (!this.f7u(t, t.GroupPerformMark)) {
            this.FinishExecute(false);
          }
      }
    } else {
      this.FinishExecute(false);
    }
  }
  r5g(e) {
    return !!e && !!e.Target && !(this.CreateWaitEntityTask(e.Target), 0);
  }
  o5g(t, o) {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    var n = e?.CreatureData.GetPbDataId();
    if (e && n) {
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n);
      let r = NpcGroupPerformConfigByRoleIdAndNpcPerformMark_1.configNpcGroupPerformConfigByRoleIdAndNpcPerformMark.GetConfigList(o, i, t.NpcType);
      e = ModelManager_1.ModelManager.RoleModel.IsMainRole(i);
      if (e && (!r || r.length === 0)) {
        for (const a of ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig()) {
          if (a.Id !== i && (r = NpcGroupPerformConfigByRoleIdAndNpcPerformMark_1.configNpcGroupPerformConfigByRoleIdAndNpcPerformMark.GetConfigList(o, a.Id, t.NpcType)) && r.length > 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 42, "[LevelEventSetNpcGroupPerform] NPC组合表演时，当前主角无配置，使用其他搜索到的主角配置", ["configId", r[0].Id], ["PerformType", o], ["curRoleId", i], ["useRoleId", a.Id], ["GroupPerformMark", t.GroupPerformMark]);
            }
            break;
          }
        }
      }
      if (r && r.length !== 0) {
        if (r.length > 1) {
          let e = "";
          for (const s of r) {
            e += "[Id: " + s.Id + "]";
          }
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 42, "[LevelEventSetNpcGroupPerform] 进行NPC组合表演时无法唯一确定一条选项，默认选择第一条匹配项", ["PerformType", o], ["RoleId", i], ["NpcType", t.NpcType], ["configList", e]);
          }
        }
        n = r[0];
        if (!(n.RelativeOffset.length < 3)) {
          return n;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 42, "[LevelEventSetNpcGroupPerform] NPC组合表演配置项RelativeOffset异常", ["configId", n.Id], ["PerformType", o], ["RoleId", i], ["GroupPerformMark", t.GroupPerformMark], ["RelativeOffset", n.RelativeOffset]);
        }
      }
    }
  }
  f7u(e, r) {
    if (!e || !e.Target) {
      return false;
    }
    if (e.Initiator.Type !== IAction_1.ENpcGroupPerformInitiatorType.Player) {
      return false;
    }
    const t = this.o5g(e, r);
    if (!t) {
      return false;
    }
    this.jye.Set(t.RelativeOffset[0], t.RelativeOffset[1], t.RelativeOffset[2]);
    const o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e.Target);
    const n = o?.Entity?.GetComponent(1);
    var i = o?.Entity?.GetComponent(209);
    return !!o && !!n && !!i && (EventSystem_1.EventSystem.HasWithTarget(o, EventDefine_1.EEventName.RemoveEntity, this.zpe) || EventSystem_1.EventSystem.AddWithTarget(o, EventDefine_1.EEventName.RemoveEntity, this.zpe), Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(30)?.AddCustomSetCollision(n, true), i.AddWaitNpcTurnCompleteCallback(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[LevelEventSetNpcGroupPerform] 进行NPC组合表演", ["configId", t.Id], ["PerformType", r], ["RoleId", t.RoleId], ["GroupPerformMark", e.GroupPerformMark], ["RelativeOffset", t.RelativeOffset]);
      }
      this.n5g(o, n, t);
    }), true);
  }
  n5g(r, t, o) {
    const n = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (n?.Valid && t.Valid) {
      var e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n.CreatureData.GetPbDataId());
      const a = n.Entity.GetComponent(30);
      const s = t.Entity.GetComponent(30);
      if (a) {
        var i = t.ActorTransform.TransformVector(this.jye.ToUeVector());
        this.jye.DeepCopy(i);
        this.jye.AdditionEqual(t.ActorLocationProxy);
        var i = ModelManager_1.ModelManager.RoleModel.IsMainRole(e);
        if (i || e === o.RoleId) {
          const f = i && ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? o.MaleVariantMontage : o.RoleMontage;
          if (f) {
            a?.AddCustomSetPlayerControl(true);
            a?.AddCustomMoveToLocation(this.jye, () => {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 42, "[LevelEventSetNpcGroupPerform] 移动到了目标位置");
              }
              var e = Vector_1.Vector.Create(o.RelativeOffset[0], -o.RelativeOffset[1], o.RelativeOffset[2]);
              a?.AddCustomSetTurnToTarget(t, 1);
              s?.AddCustomSetTurnToTarget(n, 0, e);
              s?.AddCustomPlayMontage(o.NpcMontage, o.NpcAbpMontageId, () => {
                a?.AddCustomPlayMontage(f);
              }, () => {
                this.f6g(r);
              });
            });
          } else {
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 42, "[LevelEventSetNpcGroupPerform] 当前角色ID与配置表ID不符", ["currentId", e], ["configId", o.RoleId]);
          }
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  f6g(e) {
    var r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(30);
    var t = e?.Entity?.GetComponent(1);
    if (t) {
      r?.AddCustomSetCollision(t, false);
    }
    r?.AddCustomSetPlayerControl(false);
    if (e && EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    this.FinishExecute(true);
  }
  i5g(e) {
    if (e && e.Follower) {
      var r = e.Initiator.Initiator;
      switch (r.Type) {
        case 1:
          if (r.EntityId) {
            this.CreateWaitEntityTask([e.Follower, r.EntityId]);
            return true;
          } else {
            return false;
          }
        case 0:
          this.CreateWaitEntityTask(e.Follower);
          return true;
        default:
          return false;
      }
    }
    return false;
  }
  g6g(e, r) {
    var t;
    var o = e.PerformType;
    var n = this.g7u(o.Initiator.Initiator);
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.Follower);
    if (n) {
      if (i) {
        o = o.Initiator.HandType;
        t = e.IsWaitActionFinish;
        HoldingHandsController_1.HoldingHandsController.RequestHoldHands(e.Key, n, i, o, t, true, "关卡行为");
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 82, "[LevelEventSetNpcGroupPerform] 无法获取牵手目标");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 82, "[LevelEventSetNpcGroupPerform] 无法获取牵手发起者");
      }
      return false;
    }
  }
  g7u(e) {
    switch (e.Type) {
      case 1:
        return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
      case 0:
        return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      default:
        return;
    }
  }
}
exports.LevelEventSetNpcGroupPerform = LevelEventSetNpcGroupPerform;
//# sourceMappingURL=LevelEventSetNpcGroupPerform.js.map