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
const RefCompAirWallController_1 = require("../../SceneItem/RefCompController/RefCompAirWallController");
const BulletPool_1 = require("../Model/BulletPool");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSpawnObstacles extends BulletLogicController_1.BulletLogicController {
  constructor(e, t) {
    super(e, t);
    this.OC = undefined;
  }
  OnInit() {
    var e = this.LogicController;
    var t = MathUtils_1.MathUtils.DefaultTransformDouble;
    this.OC = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      this.OC.SetActorLabel("BulletCage", true);
    }
    var t = e.Model;
    let l = undefined;
    var r;
    var o = this.Bullet.GetBulletInfo();
    if (t === 1) {
      (r = this.OC.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true)).SetStaticMesh(e.Mesh);
      l = r;
    } else if (t === 2) {
      l = this.OC.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true);
    }
    if (l) {
      l.SetCollisionProfileName(e.ProfileName, false);
      l.bCanCharacterStandOn = e.CanStandOn;
      this.OC.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
      l.SetGenerateOverlapEvents(false);
      l.CreationMethod = 3;
      l.SetVisibility(e.ShowModel);
      this.OC.FinishAddComponent(l, false, MathUtils_1.MathUtils.DefaultTransform);
      if (e.NeedAttach) {
        this.OC.K2_AttachToActor(o.Actor, FNameUtil_1.FNameUtil.NONE, 2, 2, 1, false);
      } else {
        this.OC.D_K2_SetActorTransform(o.Actor.D_GetTransform(), false, undefined, true);
      }
      if (t === 1) {
        (r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e.Size);
        r.MultiplyEqual(0.02);
        l.D_SetRelativeScale3D(r.ToUeVector());
        BulletPool_1.BulletPool.RecycleVector(r);
      } else if (t === 2) {
        l.D_SetBoxExtent(UE.KismetMathLibrary.Conv_VectorToVectorDouble(e.Size));
      }
    }
    if (e.IsAirWall) {
      this.OC.Tags.Add(RefCompAirWallController_1.AIR_WALL);
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