"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbBaseMoveState = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class RbBaseMoveState {
  constructor(t) {
    this.Owner = undefined;
    this.NeedUpdate = false;
    this.StateName = 1;
    this.IsFinishedInternal = false;
    this.Owner = t;
    this.NeedUpdate = this.Update !== RbBaseMoveState.prototype.Update;
    this.IsFinishedInternal = false;
  }
  Enter(t) {}
  Exit() {}
  Update(t) {}
  IsFinished() {
    return this.IsFinishedInternal;
  }
  NotifyServerMovementFinish() {
    var t = Protocol_1.Aki.Protocol.Hem.create();
    t.w5n = this.Owner.IncId;
    t.F4n = MathUtils_1.MathUtils.NumberToLong(this.Owner.CreatureDataId);
    Net_1.Net.Call(23585, t, t => {});
  }
}
exports.RbBaseMoveState = RbBaseMoveState;
//# sourceMappingURL=RbBaseMoveState.js.map