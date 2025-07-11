"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraAimHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CameraAimUnit_1 = require("../HudUnit/CameraAimUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class CameraAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.voi = undefined;
    this.Moi = undefined;
    this.Eoi = (t, e, i) => {
      if (t && e === 0) {
        if (this.Moi !== i) {
          this.Moi = i;
        }
        if (!this.voi) {
          this.Soi();
          return;
        }
        if (this.voi.ResourceId !== this.Moi) {
          this.yoi();
          this.Soi();
          return;
        }
      }
      if (this.voi) {
        this.voi.SetVisible(t, e);
      }
    };
  }
  OnDestroyed() {
    this.Moi = undefined;
    this.yoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetCameraAimVisible, this.Eoi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetCameraAimVisible, this.Eoi);
  }
  Soi() {
    if (this.Moi && this.Moi.length !== 0) {
      this.voi = this.NewHudUnitWithReturn(CameraAimUnit_1.CameraAimUnit, this.Moi, true, () => {
        if (this.Moi !== this.voi?.ResourceId) {
          this.yoi();
        }
      });
      this.voi.SetVisible(true, 0);
    }
  }
  yoi() {
    if (this.voi) {
      this.DestroyHudUnit(this.voi);
      this.voi = undefined;
    }
  }
}
exports.CameraAimHandle = CameraAimHandle;
//# sourceMappingURL=CameraAimHandle.js.map