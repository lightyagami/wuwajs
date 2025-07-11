"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcModel = undefined;
const UnionNpcModelTypeHelper_1 = require("./UnionNpcModelTypeHelper");
class FbNpcModel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$Qh = false;
    this.XQh = undefined;
    this.hKh = false;
    this.lKh = undefined;
    this._Kh = false;
    this.cKh = undefined;
    this.uKh = false;
    this.dKh = undefined;
    this.mKh = false;
    this.CKh = undefined;
    this.gKh = false;
    this.fKh = 0;
    this.pKh = false;
    this.vKh = undefined;
    this.yKh = false;
    this.SKh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcModel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BlueprintPath() {
    if (!this.$Qh) {
      this.$Qh = true;
      this.XQh = this.FbDataInternal.blueprintPath();
    }
    return this.XQh;
  }
  get NpcModel() {
    var t;
    var i;
    if (!this.hKh && (this.hKh = true, t = this.FbDataInternal.npcModelType(), i = UnionNpcModelTypeHelper_1.UnionNpcModelTypeHelper.GetUnionNpcModelTypeObject(t))) {
      this.lKh = UnionNpcModelTypeHelper_1.UnionNpcModelTypeHelper.ReadUnionNpcModelType(t, this.FbDataInternal.npcModel(i));
    }
    return this.lKh;
  }
  get Abp() {
    if (!this._Kh) {
      this._Kh = true;
      this.cKh = this.FbDataInternal.abp();
    }
    return this.cKh;
  }
  get BattleSockets() {
    if (!this.uKh) {
      this.uKh = true;
      this.dKh = new Array();
      var i = this.FbDataInternal.battleSocketsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.dKh.push(this.FbDataInternal.battleSockets(t));
        }
      }
    }
    return this.dKh;
  }
  get NormalSockets() {
    if (!this.mKh) {
      this.mKh = true;
      this.CKh = new Array();
      var i = this.FbDataInternal.normalSocketsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.CKh.push(this.FbDataInternal.normalSockets(t));
        }
      }
    }
    return this.CKh;
  }
  get LookingUpAngle() {
    if (!this.gKh) {
      this.gKh = true;
      this.fKh = this.FbDataInternal.lookingUpAngle();
    }
    return this.fKh;
  }
  get BodyType() {
    if (!this.pKh) {
      this.pKh = true;
      this.vKh = this.FbDataInternal.bodyType();
    }
    return this.vKh;
  }
  get NameZaxisOffset() {
    if (!this.yKh) {
      this.yKh = true;
      this.SKh = this.FbDataInternal.nameZaxisOffset();
    }
    return this.SKh;
  }
}
exports.FbNpcModel = FbNpcModel;
//# sourceMappingURL=FbNpcModel.js.map