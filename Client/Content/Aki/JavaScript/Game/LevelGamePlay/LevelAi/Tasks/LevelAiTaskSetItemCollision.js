"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskSetItemCollision = undefined;
const puerts_1 = require("puerts");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSetItemCollision extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.ItemEntity = undefined;
    this.IsIgnore = false;
  }
  ExecuteTask() {
    if (this.IsIgnore) {
      this.FTe();
    } else {
      this.VTe();
    }
    return 0;
  }
  HTe(e, s) {
    var t = e.Entity.GetComponent(0);
    var i = this.CreatureDataComponent.Entity.GetComponent(2);
    var t = t.GetPbDataId();
    var t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(t);
    let r = undefined;
    if (r = (t &&= ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)) ? t.Entity.GetComponent(202) : e) {
      var t = (0, puerts_1.$ref)(undefined);
      r.Owner.GetAttachedActors(t);
      var o = (0, puerts_1.$unref)(t);
      var a = o.Num();
      for (let e = 0; e < a; ++e) {
        var l = o.Get(e);
        var v = (0, puerts_1.$ref)(undefined);
        l.GetAttachedActors(v);
        var _ = (0, puerts_1.$unref)(v);
        var n = _.Num();
        for (let e = 0; e < n; ++e) {
          i.Actor.CapsuleComponent.IgnoreActorWhenMoving(_.Get(e), s);
        }
      }
    }
  }
  VTe() {
    var e;
    var s = this.ItemEntity.Entity.GetComponent(202);
    if (s) {
      e = this.CreatureDataComponent.Entity.GetComponent(2);
      this.HTe(s, false);
      e.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2);
    }
  }
  FTe() {
    var e = this.ItemEntity.Entity.GetComponent(202);
    if (e) {
      this.HTe(e, true);
      this.CreatureDataComponent.Entity.GetComponent(2).Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
    }
  }
}
exports.LevelAiTaskSetItemCollision = LevelAiTaskSetItemCollision;
//# sourceMappingURL=LevelAiTaskSetItemCollision.js.map