"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
class TsAnimNotifyFinishPokerPerformAction extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.PokerState = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    if (this.PokerState) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GuessJokerFinishPokerPerformAction, this.PokerState);
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GuessJokerCard", 78, "PokerState is undefined");
      }
      return false;
    }
  }
  GetNotifyName() {
    return "猜鬼牌完成动作动画通知";
  }
}
exports.default = TsAnimNotifyFinishPokerPerformAction;
//# sourceMappingURL=TsAnimNotifyFinishPokerPerformAction.js.map