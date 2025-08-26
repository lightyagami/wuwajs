"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const WeeklyRogueUnit_1 = require("../HudUnit/WeeklyRogueUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class WeeklyRogueHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.kqu = undefined;
    this.Oqu = e => {
      if (e && !this.kqu) {
        this.qqu();
      } else if (this.kqu) {
        this.kqu.SetVisible(e);
      }
    };
  }
  OnDestroyed() {
    this.Gqu();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueBurstEnableChange, this.Oqu);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueBurstEnableChange, this.Oqu);
  }
  qqu() {
    this.kqu = this.NewHudUnitWithReturn(WeeklyRogueUnit_1.WeeklyRogueUnit, "UiView_WeeklyRogueLink", true, () => {});
    this.kqu.SetVisible(true);
  }
  Gqu() {
    if (this.kqu) {
      this.DestroyHudUnit(this.kqu);
      this.kqu = undefined;
    }
  }
}
exports.WeeklyRogueHandle = WeeklyRogueHandle;
//# sourceMappingURL=WeeklyRogueHandle.js.map