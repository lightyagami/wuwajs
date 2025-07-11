"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcDecisionController = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
class NpcDecisionController {
  constructor() {
    this.bre = undefined;
    this.qre = undefined;
    this.CheckPlayerImpact = false;
    this.CheckPlayerAttack = false;
    this.CheckDayState = false;
    this.CheckWeatherState = false;
    this.Gre = (t, e) => {
      if (!!this.bre && (e === Protocol_1.Aki.Protocol.hTs.nvs || e === Protocol_1.Aki.Protocol.hTs.a3_)) {
        if (this.qre && this.qre.has(t) && (e = this.bre.TsAiController) && UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_NpcEcological_C.StaticClass())) {
          e.HandleQuestChanged();
        }
      }
    };
    this.Nre = () => {
      var t;
      if (this.CheckDayState && this.bre && (t = this.bre.TsAiController) && UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_NpcEcological_C.StaticClass())) {
        t.HandleDayStateChanged();
      }
    };
  }
  Init(t) {
    if (t && (this.bre = t.CharAiDesignComp, this.bre)) {
      this.qre = new Set();
      this.Ore();
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DayStateChange, this.Nre);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.Gre);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DayStateChange, this.Nre);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.Gre);
  }
  AddQuestToCheckList(t) {
    if (this.qre) {
      this.qre.add(t);
    }
  }
  Destroy() {
    this.kre();
    this.bre = undefined;
  }
}
exports.NpcDecisionController = NpcDecisionController;
//# sourceMappingURL=NpcDecisionController.js.map