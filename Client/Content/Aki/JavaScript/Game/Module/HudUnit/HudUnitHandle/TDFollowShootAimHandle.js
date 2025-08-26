"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDFollowShootAimHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TDFollowShootAimUnit_1 = require("../HudUnit/TDFollowShootAimUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class TDFollowShootAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.noi = undefined;
    this.PFa = e => {
      if (e && !this.noi) {
        this.Soi();
      } else if (this.noi) {
        this.noi.SetVisible(e);
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
  }
  OnDestroyed() {
    this.yoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetTDFollowShootAimVisible, this.PFa);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetTDFollowShootAimVisible, this.PFa);
  }
  Soi() {
    this.noi = this.NewHudUnitWithReturn(TDFollowShootAimUnit_1.TDFollowShootAimUnit, "TrapDefenseFollowAim", true);
    this.noi.SetVisible(true);
  }
  yoi() {
    if (this.noi) {
      this.DestroyHudUnit(this.noi);
      this.noi = undefined;
    }
  }
}
exports.TDFollowShootAimHandle = TDFollowShootAimHandle;
//# sourceMappingURL=TDFollowShootAimHandle.js.map