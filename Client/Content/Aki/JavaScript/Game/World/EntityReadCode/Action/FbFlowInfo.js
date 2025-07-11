"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFlowInfo = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbStateInfo_1 = require("./FbStateInfo");
const UnionVarContextHelper_1 = require("./UnionVarContextHelper");
class FbFlowInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.Ixh = false;
    this.Txh = undefined;
    this.bxh = false;
    this.Lxh = undefined;
    this.Axh = false;
    this.xxh = undefined;
    this.Rxh = false;
    this.wxh = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.x_h = false;
    this.FGi = undefined;
    this.MMh = false;
    this.EMh = 0;
    this.ogh = false;
    this.ngh = false;
    this.Pxh = false;
    this.Uxh = undefined;
    this.Dxh = false;
    this.Bxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFlowInfo(t);
    }
  }
  get ObjType() {
    if (!this.Ixh) {
      this.Ixh = true;
      this.Txh = this.FbDataInternal.objType();
    }
    return this.Txh;
  }
  get Children() {
    if (!this.bxh) {
      this.bxh = true;
      this.Lxh = new Array();
      var i = this.FbDataInternal.childrenLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Lxh.push(this.FbDataInternal.children(t));
        }
      }
    }
    return this.Lxh;
  }
  get Reference() {
    if (!this.Axh) {
      this.Axh = true;
      this.xxh = new Array();
      var i = this.FbDataInternal.referenceLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.xxh.push(this.FbDataInternal.reference(t));
        }
      }
    }
    return this.xxh;
  }
  get WeakReference() {
    if (!this.Rxh) {
      this.Rxh = true;
      this.wxh = new Array();
      var i = this.FbDataInternal.weakReferenceLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.wxh.push(this.FbDataInternal.weakReference(t));
        }
      }
    }
    return this.wxh;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get DungeonId() {
    if (!this.MMh) {
      this.MMh = true;
      this.EMh = this.FbDataInternal.dungeonId();
    }
    return this.EMh;
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get VarContext() {
    var t;
    var i;
    if (!this.Pxh && (this.Pxh = true, t = this.FbDataInternal.varContextType(), i = UnionVarContextHelper_1.UnionVarContextHelper.GetUnionVarContextObject(t))) {
      this.Uxh = UnionVarContextHelper_1.UnionVarContextHelper.ReadUnionVarContext(t, this.FbDataInternal.varContext(i));
    }
    return this.Uxh;
  }
  get States() {
    if (!this.Dxh) {
      this.Dxh = true;
      this.Bxh = new Array();
      var i = this.FbDataInternal.statesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.states(t, new fb_action_1.StateInfo());
          this.Bxh.push(FbStateInfo_1.FbStateInfo.Create(s));
        }
      }
    }
    return this.Bxh;
  }
}
exports.FbFlowInfo = FbFlowInfo;
//# sourceMappingURL=FbFlowInfo.js.map