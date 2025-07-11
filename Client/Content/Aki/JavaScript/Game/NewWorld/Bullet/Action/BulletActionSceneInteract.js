"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionSceneInteract = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSceneInteract extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.hJ = 0;
    this.Swr = (e, t) => {
      var s = this.BulletInfo.GetCollisionLocation(false);
      if (t) {
        e.FromUeVector(this.BulletInfo.CollisionInfo.CollisionTransform.TransformVector(t));
        e.AdditionEqual(s);
      } else {
        e.FromUeVector(s);
      }
    };
  }
  OnExecute() {
    var e;
    var t;
    var s = this.BulletInfo.BulletDataMain;
    if (s.Interact.IsSceneInteract) {
      if (this.BulletInfo.CollisionInfo.CollisionComponent) {
        s = ResourceSystem_1.ResourceSystem.Load(s.Interact.SceneInteract, UE.BP_SceneBattleInteract_C);
        if (e = ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(s, this.eoc())) {
          this.hJ = e.Id;
          e.SetUpdateLocationFunc(this.Swr);
          e.SetEnable(true);
          if ((s = s.EntityType) === 0 || s === 1) {
            if ((t = this.BulletInfo.Attacker)?.Valid) {
              if (s === 1) {
                if (s = this.BulletInfo.AttackerCreatureDataComp?.GetSummonerId()) {
                  s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(s);
                  e.BindEntityId(s);
                }
              } else {
                e.BindEntityId(t.Id);
              }
            }
          }
        }
        return;
      } else {
        this.IsFinish = true;
        return;
      }
    }
    this.IsFinish = true;
  }
  eoc() {
    var e = this.BulletInfo.BulletDataMain;
    var t = this.BulletInfo.Size;
    let s = 0;
    switch (e.Base.Shape) {
      case 0:
        s = t.GetMin();
        break;
      case 1:
      case 2:
      case 3:
        s = t.X;
    }
    return s;
  }
  Clear() {
    super.Clear();
    ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(this.hJ);
  }
}
exports.BulletActionSceneInteract = BulletActionSceneInteract;
//# sourceMappingURL=BulletActionSceneInteract.js.map