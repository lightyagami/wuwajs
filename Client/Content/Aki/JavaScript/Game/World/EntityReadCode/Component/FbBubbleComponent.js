"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBubbleComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbConditionBubbleData_1 = require("./FbConditionBubbleData");
class FbBubbleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.ajh = false;
    this.hjh = undefined;
    this.ljh = false;
    this._jh = 0;
    this.cjh = false;
    this.ujh = 0;
    this.djh = false;
    this.mjh = undefined;
    this.tph = false;
    this.iph = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBubbleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get NpcIds() {
    if (!this.ajh) {
      this.ajh = true;
      this.hjh = new Array();
      var i = this.FbDataInternal.npcIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.hjh.push(this.FbDataInternal.npcIds(t));
        }
      }
    }
    return this.hjh;
  }
  get EnterRange() {
    if (!this.ljh) {
      this.ljh = true;
      this._jh = this.FbDataInternal.enterRange();
    }
    return this._jh;
  }
  get LeaveRange() {
    if (!this.cjh) {
      this.cjh = true;
      this.ujh = this.FbDataInternal.leaveRange();
    }
    return this.ujh;
  }
  get Flows() {
    if (!this.djh) {
      this.djh = true;
      this.mjh = new Array();
      var i = this.FbDataInternal.flowsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.flows(t, new fb_component_1.ConditionBubbleData());
          this.mjh.push(FbConditionBubbleData_1.FbConditionBubbleData.Create(s));
        }
      }
    }
    return this.mjh;
  }
  get TimberId() {
    if (!this.tph) {
      this.tph = true;
      this.iph = this.FbDataInternal.timberId();
    }
    return this.iph;
  }
}
exports.FbBubbleComponent = FbBubbleComponent;
//# sourceMappingURL=FbBubbleComponent.js.map