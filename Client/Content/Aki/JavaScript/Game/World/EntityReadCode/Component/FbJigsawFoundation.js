"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawFoundation = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbJigsawConfig_1 = require("../Action/FbJigsawConfig");
const FbJigsawCompletedConfig_1 = require("./FbJigsawCompletedConfig");
const FbJigsawItemMatchedConfig_1 = require("./FbJigsawItemMatchedConfig");
const FbJigsawPieceMatch_1 = require("./FbJigsawPieceMatch");
const UnionJigsawCompleteConditionHelper_1 = require("./UnionJigsawCompleteConditionHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbJigsawFoundation {
  constructor(i) {
    this.FbDataInternal = i;
    this.q_h = false;
    this.k_h = false;
    this.hNh = false;
    this.lNh = 0;
    this.uNh = false;
    this.dNh = undefined;
    this.mNh = false;
    this.CNh = undefined;
    this.Xqh = false;
    this.Yqh = undefined;
    this.gNh = false;
    this.fNh = undefined;
    this.pNh = false;
    this.vNh = undefined;
    this.yNh = false;
    this.SNh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbJigsawFoundation(i);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ModelId() {
    if (!this.hNh) {
      this.hNh = true;
      this.lNh = this.FbDataInternal.modelId();
    }
    return this.lNh;
  }
  get PlaceOffset() {
    if (!this.uNh) {
      this.uNh = true;
      this.dNh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.placeOffset());
    }
    return this.dNh;
  }
  get InitMatchList() {
    if (!this.mNh) {
      this.mNh = true;
      this.CNh = new Array();
      var t = this.FbDataInternal.initMatchListLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.initMatchList(i, new fb_component_1.JigsawPieceMatch());
          this.CNh.push(FbJigsawPieceMatch_1.FbJigsawPieceMatch.Create(e));
        }
      }
    }
    return this.CNh;
  }
  get CompleteCondition() {
    var i;
    var t;
    if (!this.Xqh && (this.Xqh = true, i = this.FbDataInternal.completeConditionType(), t = UnionJigsawCompleteConditionHelper_1.UnionJigsawCompleteConditionHelper.GetUnionJigsawCompleteConditionObject(i))) {
      this.Yqh = UnionJigsawCompleteConditionHelper_1.UnionJigsawCompleteConditionHelper.ReadUnionJigsawCompleteCondition(i, this.FbDataInternal.completeCondition(t));
    }
    return this.Yqh;
  }
  get CompletedConfig() {
    if (!this.gNh) {
      this.gNh = true;
      this.fNh = FbJigsawCompletedConfig_1.FbJigsawCompletedConfig.Create(this.FbDataInternal.completedConfig());
    }
    return this.fNh;
  }
  get JigsawConfig() {
    if (!this.pNh) {
      this.pNh = true;
      this.vNh = FbJigsawConfig_1.FbJigsawConfig.Create(this.FbDataInternal.jigsawConfig());
    }
    return this.vNh;
  }
  get MatchedConfig() {
    if (!this.yNh) {
      this.yNh = true;
      this.SNh = new Array();
      var t = this.FbDataInternal.matchedConfigLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.matchedConfig(i, new fb_component_1.JigsawItemMatchedConfig());
          this.SNh.push(FbJigsawItemMatchedConfig_1.FbJigsawItemMatchedConfig.Create(e));
        }
      }
    }
    return this.SNh;
  }
}
exports.FbJigsawFoundation = FbJigsawFoundation;
//# sourceMappingURL=FbJigsawFoundation.js.map