"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicSpawnObstacles = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines");
const BulletPool_1 = require("../Model/BulletPool");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSpawnObstacles extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.OC = undefined;
  }
  OnInit() {
    var t = this.LogicController;
    var e = MathUtils_1.MathUtils.DefaultTransformDouble;
    this.OC = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.OC.SetActorLabel("BulletCage", true);
    }
    var e = t.Model;
    let l = undefined;
    var r;
    var s = this.Bullet.GetBulletInfo();
    if (e === 1) {
      (r = this.OC.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true)).SetStaticMesh(t.Mesh);
      l = r;
    } else if (e === 2) {
      l = this.OC.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true);
    }
    if (l) {
      l.SetCollisionProfileName(t.ProfileName, false);
      l.bCanCharacterStandOn = t.CanStandOn;
      this.OC.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
      l.SetGenerateOverlapEvents(false);
      l.CreationMethod = 3;
      l.SetVisibility(t.ShowModel);
      this.OC.FinishAddComponent(l, false, MathUtils_1.MathUtils.DefaultTransform);
      if (t.NeedAttach) {
        this.OC.K2_AttachToActor(s.Actor, FNameUtil_1.FNameUtil.NONE, 2, 2, 1, false);
      } else {
        this.OC.D_K2_SetActorTransform(s.Actor.D_GetTransform(), false, undefined, true);
      }
      if (e === 1) {
        (r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.Size);
        r.MultiplyEqual(0.02);
        l.D_SetRelativeScale3D(r.ToUeVector());
        BulletPool_1.BulletPool.RecycleVector(r);
      } else if (e === 2) {
        l.D_SetBoxExtent(UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.Size));
      }
    }
  }
  OnBulletDestroy() {
    if (this.LogicController.NeedAttach) {
      this.OC.K2_DetachFromActor();
    }
    ActorSystem_1.ActorSystem.Put("BulletLogicSpawnObstacles.OnBulletDestroy", this.OC);
  }
}
exports.BulletLogicSpawnObstacles = BulletLogicSpawnObstacles;
//# sourceMappingURL=BulletLogicSpawnObstacles.js.map