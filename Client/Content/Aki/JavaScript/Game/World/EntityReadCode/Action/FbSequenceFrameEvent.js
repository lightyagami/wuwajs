"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSequenceFrameEvent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
class FbSequenceFrameEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.lmh = false;
    this._mh = undefined;
    this.cmh = false;
    this.umh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSequenceFrameEvent(t);
    }
  }
  get EventKey() {
    if (!this.lmh) {
      this.lmh = true;
      this._mh = this.FbDataInternal.eventKey();
    }
    return this._mh;
  }
  get EventActions() {
    if (!this.cmh) {
      this.cmh = true;
      this.umh = new Array();
      var e = this.FbDataInternal.eventActionsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.eventActions(t, new fb_action_1.ActionInfo());
          this.umh.push(FbActionInfo_1.FbActionInfo.Create(i));
        }
      }
    }
    return this.umh;
  }
}
exports.FbSequenceFrameEvent = FbSequenceFrameEvent;
//# sourceMappingURL=FbSequenceFrameEvent.js.map