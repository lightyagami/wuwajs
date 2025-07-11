"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnopenedAreaController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const PublicUtil_1 = require("../../Common/PublicUtil");
const UnopenedAreaCheck_1 = require("./UnopenedAreaCheck");
const UnopenedAreaPullback_1 = require("./UnopenedAreaPullback");
class UnopenedAreaController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.tBe = !PublicUtil_1.PublicUtil.GetIsSilentLogin();
    if (!this.tBe) {
      this.PauseTick();
    }
    return true;
  }
  static OnTick(e) {
    if (this.tBe) {
      this.iBe.Tick(e);
    }
  }
  static OnClear() {
    this.iBe.Clear();
    this.oBe.Clear();
    return true;
  }
  static SetCheckUnopenedArea(e) {
    if (this.tBe !== e) {
      if (this.tBe = e) {
        this.ResumeTick();
      } else {
        this.PauseTick();
      }
    }
  }
  static OnCheckUnopenedArea(e, t, n) {
    return !this.tBe || this.oBe.BinTest(e, t, n);
  }
  static AreaCheckInit(e) {
    this.oBe.AreaInit(e);
  }
  static AreaCheckStatesChange(e) {
    this.oBe.AreaStatesChange(e);
  }
  static OnEnterUnopenedArea() {
    this.iBe.OnEnterUnopenedArea();
  }
  static OnExitUnopenedArea() {
    this.iBe.OnExitUnopenedArea();
  }
  static CheckInPullback() {
    return this.iBe.GetInPullback;
  }
}
(exports.UnopenedAreaController = UnopenedAreaController).tBe = false;
UnopenedAreaController.iBe = new UnopenedAreaPullback_1.UnopenedAreaPullback();
UnopenedAreaController.oBe = new UnopenedAreaCheck_1.UnopenedAreaCheck(); //# sourceMappingURL=UnopenedAreaController.js.map