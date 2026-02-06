"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicReboundController = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const BulletController_1 = require("../BulletController");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletLogicController_1 = require("./BulletLogicController");
const OUTER_RADIUS = 100;
const CharacterUtils_1 = require("../../Character/CharacterUtils");
const BulletUtil_1 = require("../BulletUtil");
class BulletLogicReboundController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.n$t = undefined;
    this.a7o = undefined;
    this.n$t = e.GetComponent(180);
    this.a7o = this.Bullet.GetBulletInfo();
  }
  OnInit() {
    this.Bullet.GetBulletInfo().BulletDataMain.Execution.ReboundBitMask |= this.LogicController.ReboundBitMask;
  }
  BulletLogicAction(t) {
    var e = t.BulletDataMain.Logic.ReboundChannel;
    if (!((this.LogicController.ReboundBitMask & e) <= 0)) {
      if (this.LogicController.EffectRebound && UE.KismetSystemLibrary.IsValidSoftObjectReference(this.LogicController.EffectRebound) && (l = (e = t.Attacker).GetComponent(1)) && (e = e.GetComponent(66))) {
        r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.LogicController.PositionOffset);
        r = UE.KismetMathLibrary.D_TransformLocation(l.ActorTransform, r);
        l = UE.KismetMathLibrary.D_TransformRotation(l.ActorTransform, this.LogicController.RotationOffset);
        l = new UE.TransformDouble(l, r, Vector_1.Vector.OneVectorDouble);
        e.OnReboundSuccess(this.LogicController.EffectRebound, l, t.EffectInfo.DisablePostProcess);
      }
      if (this.LogicController.ScreenShake && UE.KismetSystemLibrary.IsValidSoftClassReference(this.LogicController.ScreenShake) && CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(this.a7o.AttackerHandle)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.LogicController.ScreenShake.ToAssetPathName(), UE.Class, t => {
          var e = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
          CameraController_1.CameraController.PlayWorldCameraShake(t, e, 0, OUTER_RADIUS, 1, false);
        });
      }
      if (this.LogicController.CameraModified) {
        CameraController_1.CameraController.FightCamera.GetComponent(5).ApplyCameraModify(undefined, this.LogicController.CameraModified.持续时间, this.LogicController.CameraModified.淡入时间, this.LogicController.CameraModified.淡出时间, this.LogicController.CameraModified.摄像机配置, undefined);
      }
      var r;
      var l;
      var i = this.LogicController.BulletRowName.Num();
      var o = this.a7o.ContextId;
      for (let t = 0; t < i; t++) {
        var s = this.LogicController.BulletRowName.Get(t);
        var s = BulletController_1.BulletController.CreateBulletCustomTarget(this.a7o.Attacker, s, this.n$t.ActorTransform, {
          SyncType: 1,
          ParentId: this.Bullet.Id,
          SkillId: this.a7o.BulletInitParams.SkillId,
          SkillContextId: this.a7o.BulletInitParams.SkillContextId,
          Source: Protocol_1.Aki.Protocol.E4s.Proto_ReboundSource,
          DtType: this.a7o.BulletInitParams.DtType,
          BattleContext: this.a7o.BulletInitParams.BattleContext,
          ParentIds: undefined
        }, o);
        if (s?.Valid && (s = s.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect) {
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(this.a7o, s);
        }
      }
    }
  }
}
exports.BulletLogicReboundController = BulletLogicReboundController;
//# sourceMappingURL=BulletLogicReboundController.js.map