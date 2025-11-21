"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskNpcEnableEntityLookAt extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Key = "";
    this.SourcePbDataId = undefined;
    this.TargetPbDataId = undefined;
    this.TargetPosition = undefined;
    this.MaxDistance = undefined;
    this.MaxAngle = undefined;
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(t, e) {
    if (this.Key !== "" && !ControllerHolder_1.ControllerHolder.NpcPerformController.EntityLookAtCacheForKey.has(this.Key)) {
      var s = this.TargetPbDataId?.Num() ?? 0;
      var r = this.SourcePbDataId?.Num() ?? 0;
      if (s && r) {
        var o = [];
        for (let t = 0; t < s; ++t) {
          var i;
          var a = {
            TargetPbDataId: 0,
            TargetPosition: Vector_1.Vector.Create(),
            MaxAngle: 180,
            MaxDistance: 0
          };
          var l = this.TargetPbDataId.Get(t);
          if (l === 0) {
            i = this.TargetPosition.Get(t);
            a.TargetPosition.FromUeVector(i);
          } else {
            a.TargetPbDataId = l;
          }
          a.MaxAngle = this.MaxAngle.Get(t);
          a.MaxDistance = this.MaxDistance.Get(t);
          o.push(a);
        }
        var h = [];
        for (let t = 0; t < r; ++t) {
          var d = this.SourcePbDataId.Get(t);
          h.push(d);
        }
        ControllerHolder_1.ControllerHolder.NpcPerformController.AddNpcLookAtParams({
          Key: this.Key,
          PbDataIds: h,
          Params: o
        });
      }
    }
    this.FinishExecute(true);
  }
}
exports.default = TsTaskNpcEnableEntityLookAt;
//# sourceMappingURL=TsTaskNpcEnableEntityLookAt.js.map