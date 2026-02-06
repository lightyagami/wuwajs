"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicSupportController = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../GlobalData");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletLogicController_1 = require("./BulletLogicController");
const PROFILE_KEY = "BulletLogicSupportController_GetHitPointTransform";
const DRAW_TIME = 5;
class BulletLogicSupportController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.uoe = undefined;
    this.Q7o = undefined;
    this.X7o = undefined;
  }
  OnInit() {
    this.koe();
    this.Bullet.GetBulletInfo().BulletDataMain.Execution.SupportCamp.push(this.LogicController.Camp);
  }
  koe() {
    this.Q7o = new UE.TransformDouble();
    this.X7o = Vector_1.Vector.Create(0, 0, 0);
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Bullet);
    this.uoe.DrawTime = DRAW_TIME;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, ColorUtils_1.ColorUtils.LinearRed);
  }
  BulletLogicAction(t) {
    var e = t.GetBulletInfo();
    if (e.AttackerCamp === this.LogicController.Camp && !e.HasTag(this.LogicController.Tag)) {
      e.AddTag(this.LogicController.Tag);
      if (ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(this.LogicController.Effect)) {
        t = this.$7o(t);
        BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(GlobalData_1.GlobalData.World, this.LogicController.Effect.ToAssetPathName(), t, this.Bullet.GetBulletInfo(), "[BulletLogicSupportController.BulletLogicAction] " + e.BulletRowName);
      }
    }
  }
  $7o(t) {
    var e = this.Bullet.GetComponent(180);
    var i = t.GetComponent(180).Owner;
    var t = UE.KismetMathLibrary.D_TransformLocation(i.D_GetTransform(), t.Data.Base.CenterOffset.ToUeVector());
    var o = UE.KismetMathLibrary.D_TransformLocation(e.ActorTransform, this.Bullet.Data.Base.CenterOffset.ToUeVector());
    if (!this.uoe) {
      this.koe();
    }
    this.uoe.WorldContextObject = i;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, o);
    let r = this.Q7o;
    t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
    o = this.uoe.HitResult;
    if (t && o.bBlockingHit) {
      TraceElementCommon_1.TraceElementCommon.GetImpactPoint(o, 0, this.X7o);
      r.SetRotation(e.ActorRotation.Quaternion());
      r.SetTranslation(this.X7o.ToUeVector());
      r.SetScale3D(Vector_1.Vector.OneVectorDouble);
    } else {
      r = i.D_GetTransform();
    }
    this.uoe.WorldContextObject = undefined;
    return r;
  }
}
exports.BulletLogicSupportController = BulletLogicSupportController;
//# sourceMappingURL=BulletLogicSupportController.js.map