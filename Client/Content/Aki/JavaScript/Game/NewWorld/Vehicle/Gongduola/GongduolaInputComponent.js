"use strict";

var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(i, e, n) : s(i, e)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaInputComponent = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const InputEnums_1 = require("../../../Input/InputEnums");
const PhotographController_1 = require("../../../Module/Photograph/PhotographController");
const ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController");
const UiManager_1 = require("../../../Ui/UiManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const VehicleInputComponent_1 = require("../Common/VehicleInputComponent");
const SKILL_ID_RIDER_SHARING = 100034;
let GongduolaInputComponent = class GongduolaInputComponent extends VehicleInputComponent_1.VehicleInputComponent {
  constructor() {
    super(...arguments);
    this.PerformComp = undefined;
    this.TurningForceInputFactor = 0;
    this.TurnForwardInputMinX = 0;
    this.TurnBackwardInputMaxX = 0;
    this.MaxForwardThreshold = 1;
    this.MaxRightThreshold = 1;
    this.LastInput = Vector_1.Vector.Create();
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TagEventSprint = undefined;
  }
  UpdateVehicleInputDirectAndFacing() {
    this.UpdateMoveCache();
    this.InputAdjusted(this.TmpVector1);
    this.ActorComp.SetInputDirect(this.TmpVector1, true);
    this.SetInputFacingFromInputDirect();
  }
  SetInputFacingFromInputDirect(t = true) {
    if (this.MoveDirectionCache.X < 0) {
      this.MoveDirectionCache.UnaryNegation(this.TempVector);
      this.TempRotator.DeepCopy(this.ActorComp.ActorRotationProxy);
      GravityUtils_1.GravityUtils.GetQuatFromRotatorAndGravityForActor(this.ActorComp, this.TempRotator, this.TempQuat);
      this.TempQuat.RotateVector(this.TempVector, this.TmpVector1);
      this.ActorComp.SetInputFacing(this.TmpVector1);
    } else if (GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.ActorComp.InputDirectProxy) > MathUtils_1.MathUtils.SmallNumber) {
      this.ActorComp.SetInputFacing(this.GetWorldMoveDirectionCache());
    } else if (t) {
      this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
    }
  }
  InputAdjusted(i) {
    i.DeepCopy(this.MoveVectorCache);
    var e = Math.abs(this.MoveVectorCache.X);
    var t = this.MoveVectorCache.X < 0 ? -1 : 1;
    var o = Math.abs(this.MoveVectorCache.Y);
    var s = this.MoveVectorCache.Y < 0 ? -1 : 1;
    if (this.TurningForceInputFactor && o !== 0) {
      var r = this.ActorComp.ActorVelocityProxy.Size();
      var n = Vector_1.Vector.DotProduct(this.ActorComp.ActorVelocityProxy, this.ActorComp.ActorForwardProxy);
      var r = !!this.PerformComp?.IsBeingImpacted || r < 1 || n >= 0;
      var n = r ? 1 : this.TurnBackwardInputMaxX;
      var h = r ? this.TurnForwardInputMinX : -1;
      let t = r ? 1 : -1;
      if (i.X < h) {
        t = -1;
      } else if (i.X > n) {
        t = 1;
      }
      i.X = t * Math.max(e, o * this.TurningForceInputFactor);
    }
    if (e >= this.MaxForwardThreshold) {
      i.X = t;
    }
    if (o >= this.MaxRightThreshold) {
      i.Y = s;
    }
    if (Info_1.Info.IsInGamepad() && i.Y * this.LastInput.Y < 0) {
      i.Y = 0;
    }
    this.LastInput.DeepCopy(i);
  }
  ExecuteSprint(t) {
    this.Entity.GetComponent(245)?.TryEnterSprint();
  }
  ExecuteSkill(t) {
    t = t.IntValue;
    if (t === 210012) {
      PhotographController_1.PhotographController.PhotographFastScreenShot();
    } else if (t === SKILL_ID_RIDER_SHARING) {
      if (this.Entity.GetComponent(245)?.CheckIfCanRiderSharing()) {
        if (this.Entity.GetComponent(236)?.IsMoving) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ShipTogetherViewCanNotOpenWhenMoving");
        } else {
          UiManager_1.UiManager.OpenView("ShipTogetherView");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_GongDuoLaCarpoolingForbid_Text");
      }
    }
  }
  AddBlockEvents() {
    super.AddBlockEvents();
    this.TagEventSprint = this.AddBlockActionEvent(-1347413397, InputEnums_1.EInputAction.闪避);
  }
  RemoveBlockActionEvents() {
    super.RemoveBlockActionEvents();
    this.TagEventSprint?.EndTask();
  }
};
GongduolaInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(246)], GongduolaInputComponent);
exports.GongduolaInputComponent = GongduolaInputComponent; //# sourceMappingURL=GongduolaInputComponent.js.map