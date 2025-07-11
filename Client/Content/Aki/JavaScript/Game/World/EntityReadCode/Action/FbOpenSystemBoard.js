"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenSystemBoard = undefined;
const FbPhotographConfig_1 = require("./FbPhotographConfig");
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenSystemBoard {
  constructor(t) {
    this.FbDataInternal = t;
    this.udh = false;
    this.ddh = undefined;
    this.mdh = false;
    this.Cdh = 0;
    this.gdh = false;
    this.fdh = undefined;
    this.pdh = false;
    this.vdh = undefined;
    this.ydh = false;
    this.Sdh = undefined;
    this.Mdh = false;
    this.Edh = 0;
    this.Q6l = false;
    this.K6l = false;
    this.kKl = false;
    this.OKl = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenSystemBoard(t);
    }
  }
  get SystemType() {
    if (!this.udh) {
      this.udh = true;
      this.ddh = this.FbDataInternal.systemType();
    }
    return this.ddh;
  }
  get BoardId() {
    if (!this.mdh) {
      this.mdh = true;
      this.Cdh = this.FbDataInternal.boardId();
    }
    return this.Cdh;
  }
  get ActionMontage() {
    if (!this.gdh) {
      this.gdh = true;
      this.fdh = this.FbDataInternal.actionMontage();
    }
    return this.fdh;
  }
  get InputVars() {
    if (!this.pdh) {
      this.pdh = true;
      this.vdh = new Array();
      var i = this.FbDataInternal.inputVarsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.inputVarsType(t);
          var h = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(s);
          if (h && (s = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(s, this.FbDataInternal.inputVars(t, h))) !== undefined) {
            this.vdh.push(s);
          }
        }
      }
    }
    return this.vdh;
  }
  get PhotographConfig() {
    if (!this.ydh) {
      this.ydh = true;
      this.Sdh = FbPhotographConfig_1.FbPhotographConfig.Create(this.FbDataInternal.photographConfig());
    }
    return this.Sdh;
  }
  get GramophoneId() {
    if (!this.Mdh) {
      this.Mdh = true;
      this.Edh = this.FbDataInternal.gramophoneId();
    }
    return this.Edh;
  }
  get FadeInScreenWhenClose() {
    if (!this.Q6l) {
      this.Q6l = true;
      this.K6l = this.FbDataInternal.fadeInScreenWhenClose();
    }
    return this.K6l;
  }
  get SyncOpenSystemBoardFinishTiming() {
    if (!this.kKl) {
      this.kKl = true;
      this.OKl = this.FbDataInternal.syncOpenSystemBoardFinishTiming();
    }
    return this.OKl;
  }
}
exports.FbOpenSystemBoard = FbOpenSystemBoard;
//# sourceMappingURL=FbOpenSystemBoard.js.map