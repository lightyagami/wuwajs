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
    this.ENu = undefined;
    this.INu = e => {
      if (e && !this.ENu) {
        this.TNu();
      } else if (this.ENu) {
        this.ENu.SetVisible(e);
      }
    };
  }
  OnDestroyed() {
    this.bNu();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueBurstEnableChange, this.INu);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueBurstEnableChange, this.INu);
  }
  TNu() {
    this.ENu = this.NewHudUnitWithReturn(WeeklyRogueUnit_1.WeeklyRogueUnit, "UiView_WeeklyRogueLink", true, () => {});
    this.ENu.SetVisible(true);
  }
  bNu() {
    if (this.ENu) {
      this.DestroyHudUnit(this.ENu);
      this.ENu = undefined;
    }
  }
}
exports.WeeklyRogueHandle = WeeklyRogueHandle;
//# sourceMappingURL=WeeklyRogueHandle.js.map