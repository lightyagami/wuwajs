"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSkillExecuteTask = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerController_1 = require("../../GuessJokerController");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerPlotAction_1 = require("../Action/GuessJokerPlotAction");
const GuessJokerTaskBase_1 = require("./GuessJokerTaskBase");
class GuessJokerSkillExecuteTask extends GuessJokerTaskBase_1.GuessJokerTaskBase {
  constructor(e) {
    super();
    this.Pe = undefined;
    this.SkillId = 0;
    this.PlayerType = 1;
    this.IsUseSkill = false;
    this.Pe = e;
    this.SkillId = e.wXm;
    this.PlayerType = GuessJokerUtils_1.GuessJokerUtils.ServerPlayerTransToClient(e.PXm);
    this.IsUseSkill = GuessJokerUtils_1.GuessJokerUtils.ServerUseSkillTransToClient(e.j7n);
    this.FinishTime = GuessJokerDefine_1.GUESS_JOKER_CARD_SKILL_EXECUTE_TIME;
  }
  OnExecute() {
    if (this.Pe) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, `技能执行：玩家类型${this.PlayerType} 技能ID${this.SkillId} 是否使用${this.IsUseSkill}`);
      }
      let e = false;
      if (this.Pe.BXm && this.Pe.BXm.Yru) {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel?.UpdateCardBelongPlayerType(this.Pe.BXm.Yru, 0);
        for (const s of this.Pe.BXm.Yru) {
          if (ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetCardDataById(s)?.Type === 1) {
            e = true;
            break;
          }
        }
      }
      if (this.Pe.xXm && this.Pe.xXm.Yru) {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel?.UpdateCardBelongPlayerType(this.Pe.xXm.Yru, 1);
      }
      if (this.IsUseSkill) {
        this.D8g(e);
      } else {
        this.U8g();
      }
    }
  }
  D8g(e) {
    var s;
    var t = ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView();
    if (t) {
      t.UpdateSkill(this.PlayerType);
      if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShouldPlaySkillEffect(this.SkillId)) {
        (s = []).push(new GuessJokerPlotAction_1.GuessJokerPlotAction(this.PlayerType, 9, this.SkillId));
        s.push(new GuessJokerPlotAction_1.GuessJokerPlotAction(GuessJokerUtils_1.GuessJokerUtils.GetOtherPlayerType(this.PlayerType), 9, this.SkillId));
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions(s);
        t.PlaySkillEffect(this.SkillId, () => {
          if (e) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "GuessJokerJokerReturn");
          }
          this.FinishTask();
        });
      } else {
        if (e) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "GuessJokerJokerReturn");
        }
        this.FinishTask();
      }
    }
  }
  U8g() {
    var e;
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowPlayGiveUpSkillTip(this.SkillId) && (e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(this.SkillId)?.SkillName)) {
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? e;
      GuessJokerController_1.GuessJokerController.OpenGuessJokerFloatTipsView("GuessJoker_NotUseSkill", [e]);
    }
    this.FinishTask();
  }
}
exports.GuessJokerSkillExecuteTask = GuessJokerSkillExecuteTask;
//# sourceMappingURL=GuessJokerSkillExecuteTask.js.map