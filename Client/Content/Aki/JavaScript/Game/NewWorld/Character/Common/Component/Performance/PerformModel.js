"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformModel = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class PerformModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.iX_ = new Map();
    this.uXf = undefined;
    this.HidePlayerHandle = 0;
  }
  set PlayerSightTarget(e) {
    this.uXf = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BasePerform", 26, "设置主角看向", ["target", e]);
    }
  }
  get PlayerSightTarget() {
    return this.uXf;
  }
  SetSightTarget(e) {
    var r = e.s6n;
    switch (r) {
      case 0:
        this.iX_.set(e.F4n, {
          Type: 0
        });
        break;
      case 2:
        this.iX_.set(e.F4n, {
          Type: 2,
          Pos: Vector_1.Vector.Create(e.CIl)
        });
        break;
      case 1:
        this.iX_.set(e.F4n, {
          Type: 1,
          EntityId: e.TVn
        });
        break;
      case 3:
        this.iX_.set(e.F4n, {
          Type: 3
        });
        break;
      case 4:
        this.iX_.delete(e.F4n);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BasePerform", 26, "NPC行为设置看向", ["pbDataId", e.F4n], ["type", r]);
    }
  }
  HasSightTarget(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    return !!e && this.iX_.has(e.PbDataId);
  }
  GetSightTarget(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    var r = this.iX_.get(e.PbDataId);
    let t = undefined;
    switch (r.Type) {
      case 2:
        t = r.Pos;
        break;
      case 1:
        var a = r;
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a.EntityId)?.Entity?.GetComponent(1);
        if (a?.Valid) {
          t = a.GetWatchedPoint();
        }
        break;
      case 3:
        a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
        if (a?.Valid) {
          t = a.GetWatchedPoint();
        }
    }
    return t;
  }
}
exports.PerformModel = PerformModel;
//# sourceMappingURL=PerformModel.js.map