"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
class TsAnimNotifyClientEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.GameplayTag = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    if (this.GameplayTag) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CheckClientEvent, this.GameplayTag);
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 72, "客户端全局自定义事件Tag为空");
      }
      return false;
    }
  }
  GetNotifyName() {
    return "客户端全局自定义事件";
  }
}
exports.default = TsAnimNotifyClientEvent;
//# sourceMappingURL=TsAnimNotifyClientEvent.js.map