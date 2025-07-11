"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawItemMatchedConfig = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbPieceIndex_1 = require("../Action/FbPieceIndex");
const FbConditionAction_1 = require("./FbConditionAction");
class FbJigsawItemMatchedConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.qNh = false;
    this.kNh = undefined;
    this.GNh = false;
    this.ONh = undefined;
    this.L_h = false;
    this.A_h = undefined;
    this.FNh = false;
    this.NNh = undefined;
    this.VNh = false;
    this.jNh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbJigsawItemMatchedConfig(t);
    }
  }
  get TargetIndex() {
    if (!this.qNh) {
      this.qNh = true;
      this.kNh = FbPieceIndex_1.FbPieceIndex.Create(this.FbDataInternal.targetIndex());
    }
    return this.kNh;
  }
  get JigsawItemIds() {
    if (!this.GNh) {
      this.GNh = true;
      this.ONh = new Array();
      var i = this.FbDataInternal.jigsawItemIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.ONh.push(this.FbDataInternal.jigsawItemIds(t));
        }
      }
    }
    return this.ONh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.A_h;
  }
  get ConditionActions() {
    if (!this.FNh) {
      this.FNh = true;
      this.NNh = new Array();
      var i = this.FbDataInternal.conditionActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditionActions(t, new fb_component_1.ConditionAction());
          this.NNh.push(FbConditionAction_1.FbConditionAction.Create(e));
        }
      }
    }
    return this.NNh;
  }
  get UnmatchedActions() {
    if (!this.VNh) {
      this.VNh = true;
      this.jNh = new Array();
      var i = this.FbDataInternal.unmatchedActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.unmatchedActions(t, new fb_action_1.ActionInfo());
          this.jNh.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.jNh;
  }
}
exports.FbJigsawItemMatchedConfig = FbJigsawItemMatchedConfig;
//# sourceMappingURL=FbJigsawItemMatchedConfig.js.map