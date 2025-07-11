"use strict";

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
const ModelManager_1 = require("../../Manager/ModelManager");
const InputFunctionVisionSkill1_1 = require("../../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionVisionSkill1");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const HOOK_VISION_ID = 1001;
class LevelEventExecClientBattleAction extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.mQ1 = () => {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.mQ1)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.mQ1);
      }
      const t = (0, InputFunctionVisionSkill1_1.getVisionSkill1SkillId)();
      if (t !== undefined) {
        TimerSystem_1.TimerSystem.Next(() => {
          var e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity?.GetComponent(40);
          if (e?.CurrentSkill?.SkillId !== t) {
            e?.BeginSkill(t, {
              Reason: "ExecClientBattleAction行为触发"
            });
          }
          this.FinishExecute(true);
        });
      }
    };
  }
  ExecuteNew(e, t) {
    var n = e;
    if (n) {
      switch (n.ClientBattleOption.Type) {
        case "SendTagEventToControlCharacter":
          this.fQ1(n.ClientBattleOption);
          break;
        case "TriggerHookPointSkill":
          this.gQ1(n.ClientBattleOption);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  gQ1(e) {
    var e = e.HookEntityId;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity?.GetComponent(85);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction] 行为传入的实体未找到钩锁组件", ["PbDataId", e]);
      }
      this.FinishExecute(false);
    }
    var n = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(99);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction] 未找到角色场景交互组件");
      }
      this.FinishExecute(false);
    }
    if (n?.SetForceTarget(t)) {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== HOOK_VISION_ID) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.mQ1);
      } else {
        this.mQ1();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction] 与当前目标相同", ["PbDataId", e]);
      }
      this.FinishExecute(false);
    }
  }
  fQ1(e) {
    e = e.EventTags;
    if (e && e.length !== 0) {
      var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(18);
      if (t) {
        for (const i of e) {
          var n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(i);
          if (!n) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] Tag事件标签未找到", ["TagName", i]);
            }
            this.FinishExecute(false);
            return;
          }
          t.SendGameplayEventToActor(n);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] 角色未找到能力组件");
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] Tag事件标签未配置");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventExecClientBattleAction = LevelEventExecClientBattleAction;
//# sourceMappingURL=LevelEventExecClientBattleAction.js.map