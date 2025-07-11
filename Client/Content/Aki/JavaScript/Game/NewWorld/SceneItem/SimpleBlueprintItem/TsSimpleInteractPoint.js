"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsSimpleInteractBase_1 = require("./TsSimpleInteractBase");
const redColor = new UE.LinearColor(1, 0, 0, 1);
const blueColor = new UE.LinearColor(0, 0, 1, 1);
const DRAW_TIME = 0.05;
const DEFAULT_THICKNESS = 4;
const DEFAULT_ARROW_SIZE = 20;
const DRAW_LENGTH = 100;
const forwardOffset = new UE.VectorDouble(DRAW_LENGTH, 0, 0);
const upOffset = new UE.VectorDouble(0, 0, DRAW_LENGTH);
const textColor = new UE.Color(255, 128, 128, 255);
const TEXT_SIZE = 80;
const PROFILE_KEY = "TsSimpleInteractPoint_GetBestTransform";
class TsSimpleInteractPoint extends TsSimpleInteractBase_1.default {
  constructor() {
    super(...arguments);
    this.OnWall = true;
    this.OutRotator = undefined;
    this.TmpLocation = undefined;
  }
  Constructor() {
    super.Constructor();
    this.OutRotator = undefined;
    this.TmpLocation = undefined;
  }
  OnBeginPlay() {
    this.OutRotator = Rotator_1.Rotator.Create();
    this.TmpLocation = Vector_1.Vector.Create();
    super.OnBeginPlay();
  }
  CheckLegal() {
    return true;
  }
  OnDraw() {
    var t = this.D_K2_GetActorLocation();
    var s = this.D_GetTransform();
    if (this.OnWall) {
      UE.KismetSystemLibrary.D_DrawDebugArrow(this, t, s.TransformPosition(forwardOffset), DEFAULT_ARROW_SIZE, redColor, DRAW_TIME, DEFAULT_THICKNESS);
    } else {
      UE.KismetSystemLibrary.D_DrawDebugArrow(this, t, s.TransformPosition(upOffset), DEFAULT_ARROW_SIZE, blueColor, DRAW_TIME, DEFAULT_THICKNESS);
    }
  }
  SetText(t) {
    this.Text.HorizontalAlignment = 1;
    this.Text.SetWorldSize(TEXT_SIZE);
    this.Text.SetTextRenderColor(textColor);
    this.Text.Text = "Point " + this.TypeId;
  }
  OnGetBestTransform(t, s, i, h) {
    this.UpdateData();
    this.ActorLocation.FromUeVector(t.D_K2_GetActorLocation());
    this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor);
    if (!this.OnWall || !(MathUtils_1.MathUtils.DotProduct(this.SelfToActor, this.GetActorForwardVector()) > h)) {
      if (this.OnWall) {
        this.TmpVector1.X = h;
        this.TmpVector1.Y = 0;
        this.TmpVector1.Z = 0;
      } else {
        this.TmpVector1.X = 0;
        this.TmpVector1.Y = 0;
        this.TmpVector1.Z = i;
      }
      this.SelfTransform.TransformPosition(this.TmpVector1, this.TmpLocation);
      this.TmpResult.Location = this.TmpLocation.ToUeVectorOld();
      if (this.OnWall) {
        (h = this.LineTrace).WorldContextObject = t;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(h, this.ActorLocation);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, this.TmpResult.Location);
        this.TmpResult.Success = !TraceElementCommon_1.TraceElementCommon.LineTrace(h, PROFILE_KEY);
        h.WorldContextObject = undefined;
        if (this.TmpResult.Success) {
          this.MoveOffset.FromUeVector(s);
          this.SelfLocation.Subtraction(this.ActorLocation, this.TmpVector1);
          this.TmpResult.SquaredOffsetLength = MathUtils_1.MathUtils.Square(this.SelfToActor.Size2D() - this.MoveOffset.Size2D()) + MathUtils_1.MathUtils.Square(this.SelfToActor.Z + this.MoveOffset.Z);
          (i = this.SelfTransform.GetRotation()).RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TmpVector1);
          i.RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector2);
          this.TmpVector1.UnaryNegation(this.TmpVector1);
          MathUtils_1.MathUtils.LookRotationForwardFirst(this.TmpVector1, this.TmpVector2, this.OutRotator);
          this.TmpResult.Rotator = this.OutRotator.ToUeRotator();
        }
      } else {
        this.TmpResult.Success = true;
        this.MoveOffset.FromUeVector(s);
        this.SelfLocation.Subtraction(this.ActorLocation, this.TmpVector1);
        this.TmpResult.SquaredOffsetLength = MathUtils_1.MathUtils.Square(this.SelfToActor.Size2D() - this.MoveOffset.Size2D()) + MathUtils_1.MathUtils.Square(this.SelfToActor.Z + this.MoveOffset.Z);
        this.SelfTransform.GetRotation().RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector2);
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.TmpVector1, this.TmpVector2, this.OutRotator);
        this.TmpResult.Rotator = this.OutRotator.ToUeRotator();
      }
    }
    return this.TmpResult;
  }
}
exports.default = TsSimpleInteractPoint;
//# sourceMappingURL=TsSimpleInteractPoint.js.map