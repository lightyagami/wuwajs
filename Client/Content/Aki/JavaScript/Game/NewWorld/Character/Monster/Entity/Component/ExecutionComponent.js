"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var i = arguments.length;
  var a = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, o, n);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (r = e[l]) {
        a = (i < 3 ? r(a) : i > 3 ? r(t, o, a) : r(t, o)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(t, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecutionComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ExecutionConfById_1 = require("../../../../../../Core/Define/ConfigQuery/ExecutionConfById");
const MonsterBattleConfById_1 = require("../../../../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const CodeDefineLevelConditionInfo_1 = require("../../../../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo");
const LevelGameplayActionsDefine_1 = require("../../../../../LevelGamePlay/LevelGameplayActionsDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const ScrollingTipsController_1 = require("../../../../../Module/ScrollingTips/ScrollingTipsController");
const CharacterBuffIds_1 = require("../../../Common/Component/Abilities/CharacterBuffIds");
const MAX_CHARACTERID = 9999;
let ExecutionComponent = class ExecutionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ytn = undefined;
    this.Itn = undefined;
    this.vzi = undefined;
    this.Ttn = undefined;
    this.Ltn = (e, t) => {
      var o = this.Entity.GetComponent(198);
      if (o) {
        this.vzi = o.GetInteractController();
        if (this.vzi) {
          if (t) {
            if (this.Dtn()) {
              this.Rtn();
            } else if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 4, "队伍内没有符合处决条件的角色");
            }
          } else if (this.Itn) {
            this.vzi.RemoveClientInteractOption(this.Itn);
            this.Itn = undefined;
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 4, "Can not find interactController");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Can not find PawnInteractNewComponent");
      }
    };
  }
  OnStart() {
    return true;
  }
  OnActivate() {
    var e = this.Entity.GetComponent(206);
    var t = this.Entity.GetComponent(0);
    var o = t.GetMonsterComponent().FightConfigId;
    this.Ttn = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(o);
    this.ytn = e.ListenForTagAddOrRemove(-121513115, this.Ltn);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "处决组件初始化完成", ["EntityId", this.Entity.Id], ["CreatureDataId", t.GetCreatureDataId()], ["PbDataId", t.GetPbDataId()], ["ExecutionId", this.Ttn.ExecutionId]);
    }
  }
  Utn() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(0)?.GetPbDataId();
    for (const r of this.Ttn.ExecutionId) {
      var t = ExecutionConfById_1.configExecutionConfById.GetConfig(r);
      if (t) {
        if (t.ExecutionRoleId === e || this.Atn(e, t.ExecutionRoleId)) {
          return t;
        }
        for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          var o = i.GetConfigId;
          if (o > MAX_CHARACTERID) {
            o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o);
            if (o && o.ParentId === t.ExecutionRoleId) {
              return t;
            }
          }
        }
        if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() === t.ExecutionRoleId) {
          var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t.ExecutionRoleId, {
            ParamType: 0
          })?.GetCreatureDataId();
          if (n && n > 0) {
            return t;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", ["ExecutionId", r]);
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "不存在合适的处决配置项", ["MonsterBattleConfigId", this.Ttn.Id]);
    }
  }
  Rtn() {
    var e;
    var t;
    var o = new LevelGameplayActionsDefine_1.ActionExecution();
    var n = this.Utn();
    var r = new CodeDefineLevelConditionInfo_1.LevelConditionGroup();
    r.Type = 0;
    for (const i of n.LimitExecutionTags) {
      if (i && i.length !== 0 && (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i))) {
        (t = new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId = e;
        t.IsContain = false;
        r.Conditions.push(t);
      }
    }
    this.Itn = this.vzi.AddClientInteractOption(o, r, "Direct", this.Ttn.ExecutionRadius, undefined, 1);
  }
  Dtn() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    for (const n of this.Ttn.ExecutionId) {
      var t = ExecutionConfById_1.configExecutionConfById.GetConfig(n);
      if (t) {
        if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t.ExecutionRoleId, {
          ParamType: 0
        })?.GetCreatureDataId()) {
          return true;
        }
        for (const r of e) {
          var o = r.GetConfigId;
          if (o > MAX_CHARACTERID) {
            o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o);
            if (o && o.ParentId === t.ExecutionRoleId) {
              return true;
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", ["ExecutionId", n]);
      }
    }
    return false;
  }
  OnEnd() {
    this.ytn?.EndTask();
    return true;
  }
  StartExecution() {
    let t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var e = t.Entity.GetComponent(0)?.GetPbDataId();
    let o = false;
    for (const l of this.Ttn.ExecutionId) {
      var n = ExecutionConfById_1.configExecutionConfById.GetConfig(l);
      if (n) {
        if (n.ExecutionRoleId === e || this.Atn(e, n.ExecutionRoleId)) {
          if (!this.Ptn(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetCreatureDataId())) {
            return;
          }
          this.xtn(t.Entity, n);
          o = true;
          break;
        }
        var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(n.ExecutionRoleId, {
          ParamType: 0
        })?.GetCreatureDataId();
        if (r) {
          if (!this.Ptn(r)) {
            return;
          }
          SceneTeamController_1.SceneTeamController.RequestChangeRole(r, {
            FilterSameRole: false,
            GoDownWaitSkillEnd: true,
            ForceInheritTransform: false
          });
          t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
          this.wtn(t.Entity);
          if (!this.xtn(t.Entity, n)) {
            this.btn(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity);
          }
          o = true;
          break;
        }
        for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          var i = s.GetConfigId;
          if (i > MAX_CHARACTERID) {
            var a = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i);
            if (a && a.ParentId === n.ExecutionRoleId) {
              a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
                ParamType: 0
              })?.GetCreatureDataId();
              if (!this.Ptn(a)) {
                return;
              }
              let e = false;
              t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
              if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetCreatureDataId() !== a) {
                SceneTeamController_1.SceneTeamController.RequestChangeRole(a, {
                  FilterSameRole: false,
                  GoDownWaitSkillEnd: true,
                  ForceInheritTransform: false
                });
                t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
                this.wtn(t.Entity);
                e = true;
              }
              if (!this.xtn(t.Entity, n) && e) {
                this.btn(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity);
              }
              o = true;
              break;
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", ["ExecutionId", l]);
      }
    }
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Execution can not find execution role", ["MonsterBattleConfigId", this.Ttn.Id]);
      }
    }
  }
  Atn(e, t) {
    return !(t <= MAX_CHARACTERID) && !!(t = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)) && t.ParentId === e;
  }
  Ptn(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 3
    });
    if (t?.IsMyRole()) {
      return !t.IsDead() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Execution_Error_Die"), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 4, "Execution character is dead!", ["CreatureDataId", e]), false);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Execution character is not Player!", ["CreatureDataId", e]);
      }
      return false;
    }
  }
  xtn(e, t) {
    t = e.GetComponent(40)?.BeginSkill(t.ExecutionSkillId, {
      Reason: "ExecutionComponent.UseExecutionSkill"
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "触发处决技能！", ["触发者", e.Id], ["处决对象", this.Entity.Id], ["是否成功执行", t]);
    }
    return t ?? false;
  }
  wtn(e) {
    e = e.GetComponent(175);
    e?.AddBuff(CharacterBuffIds_1.buffId.ChangeRoleBuff, {
      InstigatorId: e?.CreatureDataId,
      Reason: "处决换人"
    });
  }
  btn(e) {
    e.GetComponent(175)?.RemoveBuff(CharacterBuffIds_1.buffId.ChangeRoleBuff, -1, "处决换人失败");
  }
};
ExecutionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(88)], ExecutionComponent);
exports.ExecutionComponent = ExecutionComponent; //# sourceMappingURL=ExecutionComponent.js.map