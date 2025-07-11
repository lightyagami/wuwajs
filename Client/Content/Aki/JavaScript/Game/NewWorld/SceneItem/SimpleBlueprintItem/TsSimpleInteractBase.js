"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleInteractTmpValue = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const WorldModel_1 = require("../../../World/Model/WorldModel");
const CHECK_DRAW_PERIODIC = 0.45;
const CHECK_DRAW_THREADHOLD = 25000000;
class SimpleInteractTmpValue {}
exports.SimpleInteractTmpValue = SimpleInteractTmpValue;
class TsSimpleInteractBase extends UE.KuroEffectActor {
  constructor() {
    super(...arguments);
    this.TypeId = 0;
    this.Text = undefined;
    this.CheckDrawTime = -0;
    this.LastCheckDrawResult = false;
    this.IsLegal = false;
    this.SelfTransform = undefined;
    this.SelfLocation = undefined;
    this.TmpResult = undefined;
    this.ActorLocation = undefined;
    this.SelfToActor = undefined;
    this.MoveOffset = undefined;
    this.TmpVector1 = undefined;
    this.TmpVector2 = undefined;
    this.TmpVector3 = undefined;
    this.TmpVector4 = undefined;
    this.LineTrace = undefined;
  }
  Constructor() {
    this.CheckDrawTime = -0;
    this.LastCheckDrawResult = false;
    this.IsLegal = false;
    this.SelfTransform = undefined;
    this.SelfLocation = undefined;
    this.TmpResult = undefined;
    this.ActorLocation = undefined;
    this.SelfToActor = undefined;
    this.MoveOffset = undefined;
    this.TmpVector1 = undefined;
    this.TmpVector2 = undefined;
    this.TmpVector3 = undefined;
    this.TmpVector4 = undefined;
    this.LineTrace = undefined;
  }
  ReceiveBeginPlay() {
    this.OnBeginPlay();
  }
  OnBeginPlay() {
    WorldModel_1.WorldModel.AddTsSimpleInteractItem(this);
    this.SelfTransform = Transform_1.Transform.Create();
    this.SelfLocation = Vector_1.Vector.Create();
    this.TmpResult = new UE.SSimpleInteractResult();
    this.ActorLocation = Vector_1.Vector.Create();
    this.SelfToActor = Vector_1.Vector.Create();
    this.MoveOffset = Vector_1.Vector.Create();
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpVector3 = Vector_1.Vector.Create();
    this.TmpVector4 = Vector_1.Vector.Create();
    this.Text.SetHiddenInGame(true);
    this.Text.SetComponentTickEnabled(false);
    this.InitTraceInfo();
    this.UpdateData();
  }
  UpdateData() {
    this.SelfTransform.FromUeTransform(this.D_GetTransform());
    this.SelfLocation.DeepCopy(this.SelfTransform.GetLocation());
  }
  InitTraceInfo() {
    this.LineTrace = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.LineTrace.bIsSingle = true;
    this.LineTrace.bIgnoreSelf = true;
    this.LineTrace.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
  }
  ReceiveEndPlay() {
    WorldModel_1.WorldModel.RemoveTsSimpleInteractItem(this);
  }
  EditorInit() {
    super.EditorInit();
    this.bEditorTickBySelected = false;
  }
  EditorTick(t) {
    if (this.CheckDraw(t)) {
      this.OnDraw();
    }
  }
  GetBestTransform(t, i, s, e) {
    return this.OnGetBestTransform(t, i, s, e);
  }
  OnGetBestTransform(t, i, s, e) {
    this.TmpResult.Success = false;
    return this.TmpResult;
  }
  CheckDraw(t) {
    var i;
    this.CheckDrawTime ||= 0;
    this.CheckDrawTime -= t;
    if (this.CheckDrawTime < 0) {
      this.CheckDrawTime = CHECK_DRAW_PERIODIC;
      t = (0, puerts_1.$ref)(undefined);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelEditorCameraLocationAndForward(this, t, undefined);
      i = this.D_K2_GetActorLocation();
      (t = (0, puerts_1.$unref)(t)).X -= i.X;
      t.Y -= i.Y;
      t.Z -= i.Z;
      this.LastCheckDrawResult = t.SizeSquared() < CHECK_DRAW_THREADHOLD;
      this.IsLegal = this.CheckLegal();
      this.SetText(t);
    }
    return this.LastCheckDrawResult;
  }
  CheckLegal() {
    return false;
  }
  Draw() {
    this.OnDraw();
  }
  OnDraw() {}
  SetText(t) {}
}
exports.default = TsSimpleInteractBase;
//# sourceMappingURL=TsSimpleInteractBase.js.map