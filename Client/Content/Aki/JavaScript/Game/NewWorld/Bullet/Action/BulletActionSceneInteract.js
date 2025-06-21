"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletActionSceneInteract = void 0;
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSceneInteract extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), this.hJ = 0, this.Swr = (e, t) => {
      var s = this.BulletInfo.GetCollisionLocation(!1);
      t ? (e.FromUeVector(this.BulletInfo.CollisionInfo.CollisionTransform.TransformVector(t)), e.AdditionEqual(s)) : e.FromUeVector(s)
    }
  }
  OnExecute() {
    var e, t, s = this.BulletInfo.BulletDataMain;
    if (s.Interact.IsSceneInteract) return this.BulletInfo.CollisionInfo.CollisionComponent ? (s = ResourceSystem_1.ResourceSystem.Load(s.Interact.SceneInteract, UE.BP_SceneBattleInteract_C), void((e = ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(s, this.eoc())) && (this.hJ = e.Id, e.SetUpdateLocationFunc(this.Swr), e.SetEnable(!0), 0 !== (s = s.EntityType) && 1 !== s || (t = this.BulletInfo.Attacker)?.Valid && (1 === s ? (s = this.BulletInfo.AttackerCreatureDataComp?.GetSummonerId()) && (s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(s), e.BindEntityId(s)) : e.BindEntityId(t.Id))))) : void(this.IsFinish = !0);
    this.IsFinish = !0
  }
  eoc() {
    var e = this.BulletInfo.BulletDataMain,
      t = this.BulletInfo.Size;
    let s = 0;
    switch (e.Base.Shape) {
      case 0:
        s = t.GetMin();
        break;
      case 1:
      case 2:
      case 3:
        s = t.X
    }
    return s
  }
  Clear() {
    super.Clear(), ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(this.hJ)
  }
}
exports.BulletActionSceneInteract = BulletActionSceneInteract;
//# sourceMappingURL=BulletActionSceneInteract.js.map