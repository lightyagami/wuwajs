"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionInitRender = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager");
const SceneObjectAirWallEffect_1 = require("../../../Render/Scene/Interaction/SceneObjectAirWallEffect");
const CharacterUtils_1 = require("../../Character/CharacterUtils");
const CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent");
const BulletUtil_1 = require("../BulletUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionInitRender extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.RKs = undefined;
  }
  OnExecute() {
    var e = this.BulletInfo.BulletDataMain;
    if (e.Logic.InteractWithAirWall) {
      this.RKs = new SceneObjectAirWallEffect_1.SceneObjectAirWallEffect();
      this.RKs.Start(this.BulletInfo.CollisionInfo.CollisionComponent);
      SceneInteractionManager_1.SceneInteractionManager.Get().RegisterAirWallEffectObject(this.RKs);
    }
    var e = e.Render.AttackerCameraShakeOnStart;
    if (this.BulletInfo.AttackerHandle?.Valid && CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(this.BulletInfo.AttackerHandle) && this.BulletInfo.IsAutonomousProxy && BulletUtil_1.BulletUtil.IsPlayerOrSummons(this.BulletInfo) && e.length > 0) {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, e => {
        var t = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
        CameraController_1.CameraController.PlayWorldCameraShake(e, t, 0, CharacterHitComponent_1.OUTER_RADIUS, 1, false);
      });
    }
  }
  GetSize() {
    if (this.BulletInfo.BulletDataMain.Base.Shape !== 0) {
      return this.BulletInfo.Size.X;
    } else {
      return Math.max(this.BulletInfo.Size.X, this.BulletInfo.Size.Y);
    }
  }
  Clear() {
    super.Clear();
    if (this.RKs) {
      SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterAirWallEffectObject(this.RKs);
      this.RKs = undefined;
    }
  }
}
exports.BulletActionInitRender = BulletActionInitRender;
//# sourceMappingURL=BulletActionInitRender.js.map