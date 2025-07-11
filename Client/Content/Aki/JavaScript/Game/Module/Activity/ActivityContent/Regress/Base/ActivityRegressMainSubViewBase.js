"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressMainSubViewBase = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class ActivityRegressMainSubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PassRecallBaseCallBack = undefined;
    this.SequencePlayer = undefined;
  }
  OnStart() {
    var e = this.GetRootItem();
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(e);
  }
  BindPassRecallBaseCallBack(e) {
    this.PassRecallBaseCallBack = e;
  }
  UnBindPassRecallBaseCallBack() {
    this.PassRecallBaseCallBack = undefined;
  }
  InvokePassRecallBaseCallBack(e, s) {
    this.PassRecallBaseCallBack?.(e, s);
  }
  Update(e = 0) {
    this.OnUpdate(e);
  }
  OnUpdate(e) {}
  OnBeforeShow() {
    this.SequencePlayer.StopSequenceByKey("Start");
    var e = new CustomPromise_1.CustomPromise();
    this.SequencePlayer.PlaySequenceAsync("Start", e);
  }
  OnParentShow() {
    this.SequencePlayer.StopSequenceByKey("Start");
    var e = new CustomPromise_1.CustomPromise();
    this.SequencePlayer.PlaySequenceAsync("Start", e);
  }
}
exports.ActivityRegressMainSubViewBase = ActivityRegressMainSubViewBase;
//# sourceMappingURL=ActivityRegressMainSubViewBase.js.map