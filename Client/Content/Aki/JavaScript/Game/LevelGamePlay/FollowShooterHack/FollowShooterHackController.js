"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShooterHackController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const GAMEPLAY_CUE_ID = 640015002;
class FollowShooterHackController extends ControllerBase_1.ControllerBase {
  static AddRelationship(e, o) {
    var r;
    if (!this.TW_.has(e)) {
      this.TW_.set(e, new Set());
    }
    if (!this.TW_.get(e).has(o)) {
      if ((r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)) && r.Entity?.Valid && (r = r.Entity.GetComponent(209))) {
        r = r.AddGameplayCue([GAMEPLAY_CUE_ID], -1, "AddHackEffect");
        this.bW_.set(o, r);
        this.TW_.get(e).add(o);
      }
    }
  }
  static RemoveRelationship(e, o) {
    if (this.TW_.has(e) && this.TW_.get(e).has(o)) {
      if (this.bW_.has(o)) {
        var r = this.bW_.get(o);
        this.bW_.delete(o);
        if (r !== undefined) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
          if (!t || !t.Entity?.Valid) {
            return;
          }
          t = t.Entity.GetComponent(209);
          if (!t) {
            return;
          }
          t.RemoveBuffByHandle(r);
        }
      }
      this.TW_.get(e).delete(o);
    }
  }
}
(exports.FollowShooterHackController = FollowShooterHackController).TW_ = new Map();
FollowShooterHackController.bW_ = new Map(); //# sourceMappingURL=FollowShooterHackController.js.map