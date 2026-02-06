"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiExploreModeData = undefined;
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TIMER_INTERVAL = 1000;
const actionNames = [InputMappingsDefine_1.actionMappings.攻击, InputMappingsDefine_1.actionMappings.技能1, InputMappingsDefine_1.actionMappings.幻象2, InputMappingsDefine_1.actionMappings.瞄准, InputMappingsDefine_1.actionMappings.大招];
class BattleUiExploreModeData {
  constructor() {
    this.XQe = true;
    this.j3 = undefined;
    this.$Qe = false;
    this.YQe = false;
    this.JQe = new Map();
    this.zQe = [];
    this.ZQe = 0;
    this.eXe = 3000;
    this.tXe = false;
    this.iXe = false;
    this.q7e = () => {
      if (this.XQe && !this.$Qe && !this.YQe && !(Time_1.Time.WorldTime < this.ZQe) && !this.tXe && !this.iXe) {
        for (const i of this.zQe) {
          if (i) {
            var t = this.zQe.length;
            for (let e = 0; e < t; e++) {
              this.zQe[e] = false;
            }
            this.DelayExitBattleMode();
            return;
          }
        }
        var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        if (e && e.EntityHandle) {
          if (!this.oXe(e)) {
            this.$Qe = true;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiExploreModeChanged, true);
          }
        }
      }
    };
  }
  Init() {
    this.eXe = CommonParamById_1.configCommonParamById.GetIntConfig("ExploreModeWaitTime");
    for (let e = 0; e < actionNames.length; e++) {
      var t = actionNames[e];
      this.zQe.push(false);
      this.JQe.set(t, e);
    }
    var e = ModelManager_1.ModelManager.BattleUiModel.GetIsAutoSwitchSkillButtonMode();
    this.SetAutoSwitch(e);
  }
  OnLeaveLevel() {}
  Clear() {
    this.SetAutoSwitch(false);
  }
  GetActionNames() {
    return actionNames;
  }
  GetIsInExploreMode() {
    return this.$Qe;
  }
  SetAutoSwitch(e) {
    this.XQe = false;
    if (this.XQe) {
      this.j3 ||= TimerSystem_1.TimerSystem.Forever(this.q7e, TIMER_INTERVAL);
    } else {
      this.BCe();
      if (this.$Qe) {
        this.$Qe = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiExploreModeChanged, false);
      }
    }
  }
  EnterBattleMode() {
    if (this.$Qe) {
      this.$Qe = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiExploreModeChanged, false);
    }
  }
  DelayExitBattleMode() {
    this.ZQe = Time_1.Time.WorldTime + this.eXe;
  }
  UpdateGuidingState(e) {
    if (this.tXe = e) {
      this.EnterBattleMode();
    } else {
      this.DelayExitBattleMode();
    }
  }
  UpdateBossState(e) {
    if (this.iXe = e) {
      this.EnterBattleMode();
    } else {
      this.DelayExitBattleMode();
    }
  }
  InputAction(e, t) {
    e = this.JQe.get(e);
    if (e !== undefined && (!!(this.zQe[e] = t) || !this.$Qe)) {
      this.EnterBattleMode();
      this.DelayExitBattleMode();
    }
  }
  BeHit(e) {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t && t.EntityHandle && t.EntityHandle.Entity === e) {
      this.EnterBattleMode();
      this.DelayExitBattleMode();
    }
  }
  UpdateDungeonState() {
    this.YQe = this.rXe();
    if (this.YQe && this.$Qe) {
      this.EnterBattleMode();
    }
  }
  oXe(e) {
    return e.EntityHandle.Entity.GetComponent(186).DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection;
  }
  rXe() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return e !== 0 && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).InstSubType === 7;
  }
  BCe() {
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
}
exports.BattleUiExploreModeData = BattleUiExploreModeData;
//# sourceMappingURL=BattleUiExploreModeData.js.map