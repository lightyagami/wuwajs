"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityStateComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbLockConfig_1 = require("./FbLockConfig");
const FbStateChangeBehavior_1 = require("./FbStateChangeBehavior");
const FbStateConfig_1 = require("./FbStateConfig");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityStateComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.u_h = false;
    this.f8o = undefined;
    this.Bch = false;
    this.Cbo = undefined;
    this.DUh = false;
    this.BUh = undefined;
    this.qUh = false;
    this.kUh = undefined;
    this.HG_ = false;
    this.$G_ = false;
    this.GUh = false;
    this.OUh = undefined;
    this.FUh = false;
    this.NUh = undefined;
    this.VUh = false;
    this.jUh = undefined;
    this.HUh = false;
    this.WUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityStateComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get StateChangeCondition() {
    if (!this.DUh) {
      this.DUh = true;
      this.BUh = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.stateChangeCondition());
    }
    return this.BUh;
  }
  get StateChangeBehaviors() {
    if (!this.qUh) {
      this.qUh = true;
      this.kUh = new Array();
      var i = this.FbDataInternal.stateChangeBehaviorsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stateChangeBehaviors(t, new fb_component_1.StateChangeBehavior());
          this.kUh.push(FbStateChangeBehavior_1.FbStateChangeBehavior.Create(s));
        }
      }
    }
    return this.kUh;
  }
  get InstantActionsOnStateChange() {
    if (!this.HG_) {
      this.HG_ = true;
      this.$G_ = this.FbDataInternal.instantActionsOnStateChange();
    }
    return this.$G_;
  }
  get LockConfig() {
    if (!this.GUh) {
      this.GUh = true;
      this.OUh = FbLockConfig_1.FbLockConfig.Create(this.FbDataInternal.lockConfig());
    }
    return this.OUh;
  }
  get StateConfigs() {
    if (!this.FUh) {
      this.FUh = true;
      this.NUh = new Array();
      var i = this.FbDataInternal.stateConfigsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stateConfigs(t, new fb_component_1.StateConfig());
          this.NUh.push(FbStateConfig_1.FbStateConfig.Create(s));
        }
      }
    }
    return this.NUh;
  }
  get CycleStates() {
    if (!this.VUh) {
      this.VUh = true;
      this.jUh = new Array();
      var i = this.FbDataInternal.cycleStatesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.jUh.push(this.FbDataInternal.cycleStates(t));
        }
      }
    }
    return this.jUh;
  }
  get PrefabPerformanceType() {
    if (!this.HUh) {
      this.HUh = true;
      this.WUh = this.FbDataInternal.prefabPerformanceType();
    }
    return this.WUh;
  }
}
exports.FbEntityStateComponent = FbEntityStateComponent;
//# sourceMappingURL=FbEntityStateComponent.js.map