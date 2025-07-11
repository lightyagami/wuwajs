"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConveyorBeltState = undefined;
const UnionConveyorBeltFieldTypeHelper_1 = require("./UnionConveyorBeltFieldTypeHelper");
const UnionConveyorBeltMoveTypeHelper_1 = require("./UnionConveyorBeltMoveTypeHelper");
class FbConveyorBeltState {
  constructor(e) {
    this.FbDataInternal = e;
    this._vh = false;
    this.cvh = undefined;
    this.PWh = false;
    this.UWh = undefined;
    this._dh = false;
    this.cdh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbConveyorBeltState(e);
    }
  }
  get EntityState() {
    if (!this._vh) {
      this._vh = true;
      this.cvh = this.FbDataInternal.entityState();
    }
    return this.cvh;
  }
  get FieldType() {
    var e;
    var t;
    if (!this.PWh && (this.PWh = true, e = this.FbDataInternal.fieldTypeType(), t = UnionConveyorBeltFieldTypeHelper_1.UnionConveyorBeltFieldTypeHelper.GetUnionConveyorBeltFieldTypeObject(e))) {
      this.UWh = UnionConveyorBeltFieldTypeHelper_1.UnionConveyorBeltFieldTypeHelper.ReadUnionConveyorBeltFieldType(e, this.FbDataInternal.fieldType(t));
    }
    return this.UWh;
  }
  get MoveType() {
    var e;
    var t;
    if (!this._dh && (this._dh = true, e = this.FbDataInternal.moveTypeType(), t = UnionConveyorBeltMoveTypeHelper_1.UnionConveyorBeltMoveTypeHelper.GetUnionConveyorBeltMoveTypeObject(e))) {
      this.cdh = UnionConveyorBeltMoveTypeHelper_1.UnionConveyorBeltMoveTypeHelper.ReadUnionConveyorBeltMoveType(e, this.FbDataInternal.moveType(t));
    }
    return this.cdh;
  }
}
exports.FbConveyorBeltState = FbConveyorBeltState;
//# sourceMappingURL=FbConveyorBeltState.js.map