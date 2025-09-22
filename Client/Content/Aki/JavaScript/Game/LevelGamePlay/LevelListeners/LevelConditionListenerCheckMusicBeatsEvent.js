"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckMusicBeatsEvent = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckMusicBeatsEvent extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Zge = (...e) => {
      var t = this.ListeningInfo.MusicEvent;
      var n = e?.[0];
      if (t.Type === n) {
        this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.CheckMusicBeatsEvent, ...e));
      }
    };
  }
  OnListen(e, t, n) {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckMusicBeatsEvent, this.Zge)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CheckMusicBeatsEvent, this.Zge);
    }
  }
  OnUnListen() {
    if (this.Zge && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CheckMusicBeatsEvent, this.Zge)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CheckMusicBeatsEvent, this.Zge);
    }
  }
}
exports.LevelConditionListenerCheckMusicBeatsEvent = LevelConditionListenerCheckMusicBeatsEvent;
//# sourceMappingURL=LevelConditionListenerCheckMusicBeatsEvent.js.map