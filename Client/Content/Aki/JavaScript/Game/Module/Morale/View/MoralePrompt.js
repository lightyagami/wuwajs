"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoralePrompt = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GenericPromptFloatTipsBase_1 = require("../../GenericPrompt/View/GenericPromptFloatTipsBase");
class MoralePrompt extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem]
    ]
  }
  OnStart() {
    super.OnStart();
    var e = this.OpenParam;
    this.rau(e.AreaId), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoralePromptShow)
  }
  rau(e) {
    let r = void 0;
    switch (e) {
      case "MoraleArea1":
        r = 2;
        break;
      case "MoraleArea2":
        r = 3;
        break;
      case "MoraleArea3":
        r = 4;
        break;
      case "MoraleArea4":
        r = 5;
        break;
      case "MoraleArea5":
        r = 6
    }
    this.GetItem(r).SetUIActive(!0)
  }
}
exports.MoralePrompt = MoralePrompt;
//# sourceMappingURL=MoralePrompt.js.map