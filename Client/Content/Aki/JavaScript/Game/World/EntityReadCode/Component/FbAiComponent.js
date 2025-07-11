"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAiComponent = undefined;
const FbPatrol_1 = require("./FbPatrol");
const UnionInitStateHelper_1 = require("./UnionInitStateHelper");
const UnionBlackBoardHelper_1 = require("../Var/UnionBlackBoardHelper");
class FbAiComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.DRh = false;
    this.BRh = 0;
    this.qRh = false;
    this.kRh = undefined;
    this.wAh = false;
    this.PAh = undefined;
    this.GRh = false;
    this.ORh = 0;
    this.FRh = false;
    this.NRh = undefined;
    this.VRh = false;
    this.jRh = undefined;
    this.HRh = false;
    this.WRh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAiComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AiId() {
    if (!this.DRh) {
      this.DRh = true;
      this.BRh = this.FbDataInternal.aiId();
    }
    return this.BRh;
  }
  get Patrol() {
    if (!this.qRh) {
      this.qRh = true;
      this.kRh = FbPatrol_1.FbPatrol.Create(this.FbDataInternal.patrol());
    }
    return this.kRh;
  }
  get InitState() {
    var t;
    var i;
    if (!this.wAh && (this.wAh = true, t = this.FbDataInternal.initStateType(), i = UnionInitStateHelper_1.UnionInitStateHelper.GetUnionInitStateObject(t))) {
      this.PAh = UnionInitStateHelper_1.UnionInitStateHelper.ReadUnionInitState(t, this.FbDataInternal.initState(i));
    }
    return this.PAh;
  }
  get CenterPoint() {
    if (!this.GRh) {
      this.GRh = true;
      this.ORh = this.FbDataInternal.centerPoint();
    }
    return this.ORh;
  }
  get InitBlackBoard() {
    if (!this.FRh) {
      this.FRh = true;
      this.NRh = new Array();
      var i = this.FbDataInternal.initBlackBoardLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.initBlackBoardType(t);
          var e = UnionBlackBoardHelper_1.UnionBlackBoardHelper.GetUnionBlackBoardObject(s);
          if (e && (s = UnionBlackBoardHelper_1.UnionBlackBoardHelper.ReadUnionBlackBoard(s, this.FbDataInternal.initBlackBoard(t, e))) !== undefined) {
            this.NRh.push(s);
          }
        }
      }
    }
    return this.NRh;
  }
  get WeaponId() {
    if (!this.VRh) {
      this.VRh = true;
      this.jRh = this.FbDataInternal.weaponId();
    }
    return this.jRh;
  }
  get AiTeamLevelId() {
    if (!this.HRh) {
      this.HRh = true;
      this.WRh = this.FbDataInternal.aiTeamLevelId();
    }
    return this.WRh;
  }
}
exports.FbAiComponent = FbAiComponent;
//# sourceMappingURL=FbAiComponent.js.map