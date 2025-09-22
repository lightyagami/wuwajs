"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadReviveModel = undefined;
const Time_1 = require("../../../Core/Common/Time");
const ReviveById_1 = require("../../../Core/Define/ConfigQuery/ReviveById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
class ReviveCooldownData {
  constructor() {
    this.Index = -1;
    this.RemainMilliseconds = 0;
    this.TimerHandle = undefined;
    this.LastServerStopTimeStamp = 0;
  }
}
class DeadReviveModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ReviveMode = 0;
    this.IsAutoRevive = false;
    this.IsShowRevive = false;
    this.ReviveLimitTime = 0;
    this.BtBloodBathedModeInfo = undefined;
    this.RevivePosition = undefined;
    this.ReviveRotator = undefined;
    this.ReviveGravity = undefined;
    this.ReviveConfig = undefined;
    this.DeadDelayTimer = undefined;
    this.ReviveCooldownCreatureMap = new Map();
    this.CurrentShareReviveTimes = 0;
    this.MaxShareReviveTimes = 0;
    this.ChangeRoleIdAfterRevive = 0;
    this.OpenedViewName = undefined;
    this.BlockAllInput = false;
    this.SkipFallInjure = false;
    this.SkipDeathAnim = false;
    this.ReviveFlowIncId = 0;
    this.HandleOnClickGiveUpExternal = undefined;
  }
  InitReviveConfig(e) {
    if (!this.ReviveConfig || this.ReviveConfig.Id !== e) {
      this.ReviveConfig = ReviveById_1.configReviveById.GetConfig(e);
    }
  }
  OnClear() {
    this.qFt();
    return true;
  }
  OnLeaveLevel() {
    this.qFt();
    return true;
  }
  OnChangeMode() {
    this.qFt();
    return true;
  }
  qFt() {
    this.ClearReviveData();
    this.ClearExternalHandles();
    this.ReviveMode = 0;
    this.CurrentShareReviveTimes = 0;
    this.MaxShareReviveTimes = 0;
    this.RevivePosition = undefined;
    this.ReviveRotator = undefined;
    this.ReviveGravity = undefined;
    this.ReviveFlowIncId = 0;
    this.BlockAllInput = false;
    this.ChangeRoleIdAfterRevive = 0;
    for (var [e, t] of this.ReviveCooldownCreatureMap) {
      this.WLc(e, t);
    }
    this.ReviveCooldownCreatureMap.clear();
  }
  ClearReviveData() {
    this.ReviveLimitTime = 0;
    this.IsShowRevive = false;
    this.IsAutoRevive = false;
    this.BtBloodBathedModeInfo = undefined;
    if (this.DeadDelayTimer) {
      this.DeadDelayTimer.Remove();
      this.DeadDelayTimer = undefined;
    }
  }
  ClearExternalHandles() {
    this.HandleOnClickGiveUpExternal = undefined;
  }
  RegisterCooldown(s, e) {
    if (!this.ReviveCooldownCreatureMap.has(s)) {
      const o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(s, {
        ParamType: 3
      });
      if (o) {
        const h = o.GetPlayerId();
        var t = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(h, o.GetConfigId);
        if (t && !(t < 1)) {
          const n = e * MathUtils_1.MathUtils.MillisecondToSecond;
          var i;
          var t = t - 1;
          const r = TimerSystem_1.GameplayTimerSystem.Forever(() => {
            var e;
            var t;
            var i = this.ReviveCooldownCreatureMap.get(s);
            if (i) {
              t = (e = Time_1.Time.ServerStopTimeStamp) - i.LastServerStopTimeStamp;
              i.LastServerStopTimeStamp = e;
              if ((e = i.RemainMilliseconds - t) <= 0) {
                this.UnRegisterCooldown(s);
              } else {
                t = (i.RemainMilliseconds = e) * MathUtils_1.MathUtils.MillisecondToSecond;
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, h, o.GetConfigId, t, n);
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleReviveCooldownChange, s, t);
              }
            } else {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, h, o.GetConfigId);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleReviveCooldownChange, s, 0);
              r?.Remove();
            }
          }, 100);
          if (r) {
            (i = new ReviveCooldownData()).Index = t;
            i.RemainMilliseconds = e;
            i.TimerHandle = r;
            i.LastServerStopTimeStamp = Time_1.Time.ServerStopTimeStamp;
            this.ReviveCooldownCreatureMap.set(s, i);
          }
        }
      }
    }
  }
  UnRegisterCooldown(e) {
    var t = this.ReviveCooldownCreatureMap.get(e);
    if (t) {
      this.WLc(e, t);
      this.ReviveCooldownCreatureMap.delete(e);
    }
  }
  WLc(e, t) {
    t.TimerHandle?.Remove();
    t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 3
    });
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, t.GetPlayerId(), t.GetConfigId);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleReviveCooldownChange, e, 0);
  }
  IsCanChangeBloodBathedMode() {
    return !!this.BtBloodBathedModeInfo && this.BtBloodBathedModeInfo.LMd === 10;
  }
}
exports.DeadReviveModel = DeadReviveModel;
//# sourceMappingURL=DeadReviveModel.js.map