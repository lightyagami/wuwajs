"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlaySequenceData = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSequenceFrameEvent_1 = require("./FbSequenceFrameEvent");
class FbPlaySequenceData {
  constructor(t) {
    this.FbDataInternal = t;
    this.Hdh = false;
    this.Xdr = undefined;
    this.Pdh = false;
    this.Udh = false;
    this.tmh = false;
    this.imh = false;
    this.rmh = false;
    this.omh = false;
    this.nmh = false;
    this.smh = undefined;
    this.amh = false;
    this.hmh = false;
  }
  static Create(t) {
    if (t) {
      return new FbPlaySequenceData(t);
    }
  }
  get Path() {
    if (!this.Hdh) {
      this.Hdh = true;
      this.Xdr = this.FbDataInternal.path();
    }
    return this.Xdr;
  }
  get ResetCamera() {
    if (!this.Pdh) {
      this.Pdh = true;
      this.Udh = this.FbDataInternal.resetCamera();
    }
    return this.Udh;
  }
  get KeepCamera() {
    if (!this.tmh) {
      this.tmh = true;
      this.imh = this.FbDataInternal.keepCamera();
    }
    return this.imh;
  }
  get PreLoadRenderAssets() {
    if (!this.rmh) {
      this.rmh = true;
      this.omh = this.FbDataInternal.preLoadRenderAssets();
    }
    return this.omh;
  }
  get FrameEvents() {
    if (!this.nmh) {
      this.nmh = true;
      this.smh = new Array();
      var e = this.FbDataInternal.frameEventsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.frameEvents(t, new fb_action_1.SequenceFrameEvent());
          this.smh.push(FbSequenceFrameEvent_1.FbSequenceFrameEvent.Create(s));
        }
      }
    }
    return this.smh;
  }
  get SaveFinalPos() {
    if (!this.amh) {
      this.amh = true;
      this.hmh = this.FbDataInternal.saveFinalPos();
    }
    return this.hmh;
  }
}
exports.FbPlaySequenceData = FbPlaySequenceData;
//# sourceMappingURL=FbPlaySequenceData.js.map