"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DungeonAutoExitFloatTips = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class DungeonAutoExitFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments);
    this.PYt = e => {
      if (e === undefined) {
        this.CloseMe();
      } else {
        this.SetMainText(e.toString());
      }
    };
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGamePlayCdChanged, this.PYt);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGamePlayCdChanged, this.PYt);
  }
}
exports.DungeonAutoExitFloatTips = DungeonAutoExitFloatTips;
//# sourceMappingURL=DungeonAutoExitFloatTips.js.map