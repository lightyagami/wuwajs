"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowTalk = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const FbShowTalkFrameEvent_1 = require("./FbShowTalkFrameEvent");
const FbShowTalkOutline_1 = require("./FbShowTalkOutline");
const FbTalkItem_1 = require("./FbTalkItem");
const FbTalkSequenceTransition_1 = require("./FbTalkSequenceTransition");
class FbShowTalk {
  constructor(t) {
    this.FbDataInternal = t;
    this.Pdh = false;
    this.Udh = false;
    this.NCh = false;
    this.VCh = undefined;
    this.jCh = false;
    this.HCh = undefined;
    this.WCh = false;
    this.QCh = undefined;
    this.KCh = false;
    this.$Ch = undefined;
    this.XCh = false;
    this.YCh = undefined;
    this.zCh = false;
    this.JCh = undefined;
    this.ZCh = false;
    this.egh = undefined;
    this.amh = false;
    this.hmh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowTalk(t);
    }
  }
  get ResetCamera() {
    if (!this.Pdh) {
      this.Pdh = true;
      this.Udh = this.FbDataInternal.resetCamera();
    }
    return this.Udh;
  }
  get TalkItems() {
    if (!this.NCh) {
      this.NCh = true;
      this.VCh = new Array();
      var i = this.FbDataInternal.talkItemsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.talkItems(t, new fb_action_1.TalkItem());
          this.VCh.push(FbTalkItem_1.FbTalkItem.Create(e));
        }
      }
    }
    return this.VCh;
  }
  get TalkOutline() {
    if (!this.jCh) {
      this.jCh = true;
      this.HCh = FbShowTalkOutline_1.FbShowTalkOutline.Create(this.FbDataInternal.talkOutline());
    }
    return this.HCh;
  }
  get SequenceDataAsset() {
    if (!this.WCh) {
      this.WCh = true;
      this.QCh = this.FbDataInternal.sequenceDataAsset();
    }
    return this.QCh;
  }
  get TalkFrameEvents() {
    if (!this.KCh) {
      this.KCh = true;
      this.$Ch = new Array();
      var i = this.FbDataInternal.talkFrameEventsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.talkFrameEvents(t, new fb_action_1.ShowTalkFrameEvent());
          this.$Ch.push(FbShowTalkFrameEvent_1.FbShowTalkFrameEvent.Create(e));
        }
      }
    }
    return this.$Ch;
  }
  get TalkSequence() {
    if (!this.XCh) {
      this.XCh = true;
      var i = this.FbDataInternal.talkSequenceLength();
      if (i) {
        this.YCh = new Array();
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.talkSequence(t, new fb_var_1.IntArray());
          var s = e.valuesLength();
          var h = new Array();
          for (let t = 0; t < s; t++) {
            h.push(e.values(t));
          }
          this.YCh.push(h);
        }
      }
    }
    return this.YCh;
  }
  get SequenceNames() {
    if (!this.zCh) {
      this.zCh = true;
      this.JCh = new Array();
      var i = this.FbDataInternal.sequenceNamesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.JCh.push(this.FbDataInternal.sequenceNames(t));
        }
      }
    }
    return this.JCh;
  }
  get SequenceTransitions() {
    if (!this.ZCh) {
      this.ZCh = true;
      var i = this.FbDataInternal.sequenceTransitionsLength();
      if (i) {
        this.egh = {};
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.sequenceTransitions(t, new fb_action_1.RecordTalkSequenceTransition());
          var s = e.key();
          var h = new Array();
          var r = e.valueLength();
          for (let t = 0; t < r; ++t) {
            var a = FbTalkSequenceTransition_1.FbTalkSequenceTransition.Create(e.value(t));
            h.push(a);
          }
          this.egh[s] = h;
        }
      }
    }
    return this.egh;
  }
  get SaveFinalPos() {
    if (!this.amh) {
      this.amh = true;
      this.hmh = this.FbDataInternal.saveFinalPos();
    }
    return this.hmh;
  }
}
exports.FbShowTalk = FbShowTalk;
//# sourceMappingURL=FbShowTalk.js.map