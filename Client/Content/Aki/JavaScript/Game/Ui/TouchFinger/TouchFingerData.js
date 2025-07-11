"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchFingerData = undefined;
const UE = require("ue");
const LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager");
class TouchFingerData {
  constructor(t) {
    this.Fdr = undefined;
    this.Vdr = undefined;
    this.Hdr = false;
    this.OOn = BigInt(0);
    this.jdr = t;
  }
  StartTouch(t) {
    this.Fdr = t;
    this.Vdr = t;
    this.Hdr = true;
  }
  EndTouch() {
    this.Fdr = undefined;
    this.Vdr = undefined;
    this.Hdr = false;
  }
  MoveTouch(t) {
    if (this.OOn !== UE.KismetSystemLibrary.GetFrameCount()) {
      this.Vdr = this.Fdr;
      this.OOn = UE.KismetSystemLibrary.GetFrameCount();
    }
    this.Fdr = t;
  }
  GetFingerIndex() {
    return this.jdr;
  }
  GetTouchPosition() {
    return this.Fdr;
  }
  GetLastTouchPosition() {
    return this.Vdr;
  }
  IsInTouch() {
    return this.Hdr;
  }
  IsTouchEmpty() {
    return !LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(this.jdr);
  }
  GetPointerEventData() {
    return LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(this.jdr);
  }
  IsTouchComponentContainTag(t) {
    var e = this.GetPointerEventData();
    var i = e.pressComponent;
    var e = e.enterComponent;
    if (i?.IsValid()) {
      return i.ComponentHasTag(t);
    } else {
      return !!e?.IsValid() && e.ComponentHasTag(t);
    }
  }
}
exports.TouchFingerData = TouchFingerData;
//# sourceMappingURL=TouchFingerData.js.map