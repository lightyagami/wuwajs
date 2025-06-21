"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventExecClientBattleAction = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputFunctionVisionSkill1_1 = require("../../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputFunctionVisionSkill1"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  HOOK_VISION_ID = 1001;
class LevelEventExecClientBattleAction extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.PW1 = () => {
      EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.PW1) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.PW1);
      const e = (0, InputFunctionVisionSkill1_1.getVisionSkill1SkillId)();
      void 0 !== e && TimerSystem_1.TimerSystem.Next(() => {
        (Global_1.Global.BaseCharacter.CharacterActorComponent.Entity?.GetComponent(40))?.BeginSkill(e, {
          Reason: "ExecClientBattleAction行为触发"
        }), this.FinishExecute(!0)
      })
    }
  }
  ExecuteNew(e, t) {
    var n = e;
    if (n) switch (n.ClientBattleOption.Type) {
      case "SendTagEventToControlCharacter":
        this.xW1(n.ClientBattleOption);
        break;
      case "TriggerHookPointSkill":
        this.UW1(n.ClientBattleOption)
    } else this.FinishExecute(!1)
  }
  UW1(e) {
    var e = e.HookEntityId,
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity?.GetComponent(85);
    t || (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction] 行为传入的实体未找到钩锁组件", ["PbDataId", e]), this.FinishExecute(!1));
    e = (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())?.GetComponent(99);
    e || (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction] 未找到角色场景交互组件"), this.FinishExecute(!1)), e?.SetForceTarget(t), ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId !== HOOK_VISION_ID ? EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.PW1) : this.PW1()
  }
  xW1(e) {
    e = e.EventTags;
    if (e && 0 !== e.length) {
      var t = (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())?.GetComponent(18);
      if (t)
        for (const i of e) {
          var n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(i);
          if (!n) return Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] Tag事件标签未找到", ["TagName", i]), void this.FinishExecute(!1);
          t.SendGameplayEventToActor(n)
        } else Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] 角色未找到能力组件"), this.FinishExecute(!1)
    } else Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "[LevelEventExecClientBattleAction.HandleSendTagEvent] Tag事件标签未配置"), this.FinishExecute(!1)
  }
}
exports.LevelEventExecClientBattleAction = LevelEventExecClientBattleAction;
//# sourceMappingURL=LevelEventExecClientBattleAction.js.map