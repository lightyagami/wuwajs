"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventExecClientBattleAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputFunctionMotorcycle_1 = require("../../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionMotorcycle");
const InputFunctionVisionSkill1_1 = require("../../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionVisionSkill1");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const HOOK_VISION_ID = 1001;
const MOTORCYCLE_LOG_REPORT_SKILL_ID = 10001002;
class LevelEventExecClientBattleAction extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var n = e;
    if (n) {
      switch (n.ClientBattleOption.Type) {
        case "SendTagEventToControlCharacter":
          LevelEventExecClientBattleAction.HandleSendTagEvent(n.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          });
          break;
        case "TriggerHookPointSkill":
          LevelEventExecClientBattleAction.HandleHookPointSkill(n.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          });
          break;
        case "TriggerMotorSkill":
          LevelEventExecClientBattleAction.HandleMotorSkill(n.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          }, t);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  static HandleSendTagEvent(e, t, n) {
    e = e.EventTags;
    if (e && e.length !== 0) {
      var l = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(18);
      if (l) {
        for (const i of e) {
          var o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(i);
          if (!o) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] Tag事件标签未找到", ["TagName", i]);
            }
            n?.();
            return;
          }
          l.SendGameplayEventToActor(o);
        }
        t?.();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] 角色未找到能力组件");
        }
        n?.();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] Tag事件标签未配置");
      }
      n?.();
    }
  }
  static HandleHookPointSkill(e, t, n) {
    var l;
    var e = e.HookEntityId;
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity?.GetComponent(88);
    if (o) {
      if (l = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent()) {
        if (l.ForceLockTarget(o, "LevelEventExecClientBattleAction")) {
          if (this.skf) {
            EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.skf);
          }
          if (ModelManager_1.ModelManager.ExploreModel.IsPlayerDrivingMotorcycle) {
            this.PQm(t, n);
          } else if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== HOOK_VISION_ID) {
            this.skf = () => {
              this.mQ1(t, n);
            };
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.skf);
          } else {
            this.mQ1(t, n);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 79, "[LevelEventExecClientBattleAction] 与当前目标相同", ["PbDataId", e]);
          }
          n?.();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 79, "[LevelEventExecClientBattleAction] 未找到已经激活的探索组件");
        }
        n?.();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 79, "[LevelEventExecClientBattleAction] 行为传入的实体未找到钩锁组件", ["PbDataId", e]);
      }
      n?.();
    }
  }
  static HandleMotorSkill(e, t, n, l) {
    (this.akf(e.MotorSkillId) ? (e.MotorSkillId === MOTORCYCLE_LOG_REPORT_SKILL_ID && (e = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, l))) && ControllerHolder_1.ControllerHolder.LevelPlayController.LogReportMotorcycleLevelPlay(e, 1, true, 2), t) : n)?.();
  }
  static akf(e) {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 79, "LevelEventExecClientBattleAction释放摩托车技能失败, 玩家角色未找到CharacterActorComponent");
      }
      return false;
    }
    t = t.Entity.GetComponent(242);
    if (!t || !t.VehicleEntity?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 79, "LevelEventExecClientBattleAction释放摩托车技能失败, 未找到载具实体");
      }
      return false;
    }
    if (t.VehicleType !== "Motorcycle") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 72, `LevelEventExecClientBattleAction释放摩托车技能失败, EVehicleType${t.VehicleType}不是Motorcycle`);
      }
      return false;
    }
    var n = t.VehicleEntity.GetComponent(40);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 79, "LevelEventExecClientBattleAction释放摩托车技能失败, 玩家角色绑定的载具未找到BaseSkillComponent");
      }
      return false;
    }
    let l = false;
    if (!(l = n && n.CurrentSkill?.SkillId !== e ? n.BeginSkill(e, {
      Reason: "ExecClientBattleAction行为触发"
    }) : l)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "LevelEventExecClientBattleAction释放摩托车技能失败", ["SkillId", e]);
      }
      t.VehicleEntity.GetComponent(57)?.CancelLockTarget("LevelEventExecClientBattleAction.DoUseMotorSkill", false);
    }
    return true;
  }
}
exports.LevelEventExecClientBattleAction = LevelEventExecClientBattleAction;
(_a = LevelEventExecClientBattleAction).skf = undefined;
LevelEventExecClientBattleAction.mQ1 = (l, e) => {
  if (_a.skf && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, _a.skf)) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, _a.skf);
    _a.skf = undefined;
  }
  const o = (0, InputFunctionVisionSkill1_1.getVisionSkill1SkillId)();
  if (o !== undefined) {
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      var e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
      var t = e?.GetComponent(41);
      let n = false;
      if (!(n = t && t.CurrentSkill?.SkillId !== o ? t.BeginSkill(o, {
        Reason: "ExecClientBattleAction行为触发"
      }) : n)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 31, "[LevelEventExecClientBattleAction.UseHookSkill] 技能释放失败", ["SkillId", o]);
        }
        e?.CheckGetComponent(56)?.CancelLockTarget("LevelEventExecClientBattleAction.UseHookSkill", false);
      }
      l?.();
    });
  }
};
LevelEventExecClientBattleAction.PQm = (e, t) => {
  if (_a.skf && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, _a.skf)) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, _a.skf);
    _a.skf = undefined;
  }
  const n = (0, InputFunctionMotorcycle_1.getVisionSkill1SkillId)(true);
  if (n !== undefined) {
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      (_a.akf(n) ? e : t)?.();
    });
  }
}; //# sourceMappingURL=LevelEventExecClientBattleAction.js.map