"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowEffectManager = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
class MotorcycleArrowEffectManager {
  constructor() {
    this.PlayerLevelBuff = new Map();
    this.PlayerWaveGroupBuff = new Map();
    this.Controller = undefined;
    this.MonsterBuff = new Set();
    this.MonsterLevelBuff = new Map();
    this.MonsterWaveGroupBuff = new Map();
    this.OAg = 0;
  }
  static Create(e) {
    var r = new MotorcycleArrowEffectManager();
    r.Controller = e;
    return r;
  }
  AddBuffEffect(e, r, o) {
    e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffEffectById(e);
    if (!!e && (r === undefined || !(r <= 0))) {
      if (o) {
        o = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(o.KscPlayerEntityId, true, e.BuffId);
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(o.MotorcycleKscEntityId, true, e.BuffId);
        if (e.DurationType === 1) {
          this.PlayerLevelBuff.set(e.BuffId, r ?? e.Param1);
        } else if (e.DurationType === 2) {
          this.PlayerWaveGroupBuff.set(e.BuffId, r ?? e.Param1);
        }
      } else {
        if (e.DurationType === 1) {
          this.MonsterLevelBuff.set(e.BuffId, r ?? e.Param1);
        } else if (e.DurationType === 2) {
          this.MonsterWaveGroupBuff.set(e.BuffId, r ?? e.Param1);
        }
        this.MonsterBuff.add(e.BuffId);
      }
    }
  }
  OnEnterNextWaveGroup() {
    this.Xhg(this.PlayerWaveGroupBuff, true);
    this.Xhg(this.MonsterWaveGroupBuff, false);
  }
  OnEnterNextSubLevel() {
    this.OnEnterNextWaveGroup();
    this.Xhg(this.PlayerLevelBuff, true);
    this.Xhg(this.MonsterLevelBuff, false);
  }
  Xhg(e, r) {
    for (var [o, t] of e) {
      if (t <= 1) {
        e.delete(o);
        if (r) {
          this.RemovePlayerBuff(o);
        } else {
          this.MonsterBuff.delete(o);
        }
      } else {
        e.set(o, t - 1);
      }
    }
  }
  RemovePlayerBuff(e) {
    var r = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(r.KscPlayerEntityId, false, e);
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.ModifyBuffAsync(r.MotorcycleKscEntityId, false, e);
  }
  Clear() {
    this.PlayerLevelBuff.clear();
    this.PlayerWaveGroupBuff.clear();
    this.MonsterLevelBuff.clear();
    this.MonsterWaveGroupBuff.clear();
    this.MonsterBuff.clear();
    this.OAg = 0;
  }
  GetFixValidCount(e) {
    var r;
    var o = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffEffectById(e.b6n);
    if (o && o.DurationType !== 0) {
      if (o.DurationType === 1) {
        r = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
        return o.Param1 - (r.SubLevelIndex - e.vjf);
      } else if (o.DurationType === 2) {
        e = (r = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel).WaveGroupCount[r.SubLevelIndex] - r.WaveGroupCount[e.vjf] + e.pjf - r.CurrentGroupWaveIndex;
        return o.Param1 - e;
      } else {
        return undefined;
      }
    }
  }
  AddPlayerBornEffect(e) {
    for (const o of e) {
      var r = this.GetFixValidCount(o);
      this.AddBuffEffect(o.b6n, r, true);
    }
  }
  AddMonsterBornEffect(e) {
    for (const o of e) {
      var r = this.GetFixValidCount(o);
      this.AddBuffEffect(o.b6n, r, false);
    }
  }
  UpdateWaveDamageAmplify(e) {
    if (this.OAg !== e) {
      this.OAg = e;
      e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightWaveGroupById(e);
      if (e) {
        var r = e.DamageIds;
        var o = e.Amplify * KscSubControllerBase_1.DIVIDED_TEN_THOUSAND;
        if (r.length !== 0) {
          var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel?.DamageIds;
          var s = KscEnv_1.KscEnv.KscWorld?.DamageData;
          if (t && s) {
            for (const n of r) {
              var i = t.get(n);
              if (i) {
                s.UpdateDamageAmplify(n, i.Amplify * o);
              } else {
                KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]UpdateWaveDamageAmplify失败:未找到伤害数据" + n);
              }
            }
          } else {
            KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]UpdateWaveDamageAmplify失败:未初始化");
          }
        }
      }
    }
  }
}
exports.MotorcycleArrowEffectManager = MotorcycleArrowEffectManager;
//# sourceMappingURL=MotorcycleArrowEffectManager.js.map