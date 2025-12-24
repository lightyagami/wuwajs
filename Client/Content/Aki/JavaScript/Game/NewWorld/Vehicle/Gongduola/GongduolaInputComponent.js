"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(i, e, n) : o(i, e)) || n;
      }
    }
  }
  if (h > 3 && n) {
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
    this.TagEventChangeRoll1 = undefined;
    this.TagEventChangeRoll2 = undefined;
    this.TagEventChangeRoll3 = undefined;
    this.TagEventSprint = undefined;
  }
  UpdateVehicleInputDirectAndFacing() {
    this.UpdateMoveCache();
    this.InputAdjusted(this.TmpVector1);
    this.ActorComp.SetInputDirect(this.TmpVector1);
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
    var s = Math.abs(this.MoveVectorCache.Y);
    var o = this.MoveVectorCache.Y < 0 ? -1 : 1;
    if (this.TurningForceInputFactor && s !== 0) {
      var h = this.ActorComp.ActorVelocityProxy.Size();
      var n = Vector_1.Vector.DotProduct(this.ActorComp.ActorVelocityProxy, this.ActorComp.ActorForwardProxy);
      var h = !!this.PerformComp?.IsBeingImpacted || h < 1 || n >= 0;
      var n = h ? 1 : this.TurnBackwardInputMaxX;
      var r = h ? this.TurnForwardInputMinX : -1;
      let t = h ? 1 : -1;
      if (i.X < r) {
        t = -1;
      } else if (i.X > n) {
        t = 1;
      }
      i.X = t * Math.max(e, s * this.TurningForceInputFactor);
    }
    if (e >= this.MaxForwardThreshold) {
      i.X = t;
    }
    if (s >= this.MaxRightThreshold) {
      i.Y = o;
    }
    if (Info_1.Info.IsInGamepad() && i.Y * this.LastInput.Y < 0) {
      i.Y = 0;
    }
    this.LastInput.DeepCopy(i);
  }
  ExecuteSprint(t) {
    this.Entity.GetComponent(260)?.TryEnterSprint();
  }
  ExecuteSkill(t) {
    t = t.IntValue;
    if (t === 210012) {
      PhotographController_1.PhotographController.PhotographFastScreenShot();
    } else if (t === SKILL_ID_RIDER_SHARING) {
      if (this.Entity.GetComponent(260)?.CheckIfCanRiderSharing()) {
        if (this.Entity.GetComponent(249)?.IsMoving) {
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
    this.TagEventChangeRoll1 = this.AddBlockActionEvent(-1216591977, InputEnums_1.EInputAction.切换角色1);
    this.TagEventChangeRoll2 = this.AddBlockActionEvent(-1199814358, InputEnums_1.EInputAction.切换角色2);
    this.TagEventChangeRoll3 = this.AddBlockActionEvent(-1183036739, InputEnums_1.EInputAction.切换角色3);
  }
  RemoveBlockActionEvents() {
    super.RemoveBlockActionEvents();
    this.TagEventSprint?.EndTask();
    this.TagEventChangeRoll1.EndTask();
    this.TagEventChangeRoll2.EndTask();
    this.TagEventChangeRoll3.EndTask();
  }
  InitPassengerInputForbidTagInfo() {
    super.InitPassengerInputForbidTagInfo();
    this.PassengerInputForbidTagArray.push(-1216591977);
    this.PassengerInputForbidTagArray.push(-1199814358);
    this.PassengerInputForbidTagArray.push(-1183036739);
  }
};
GongduolaInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(261)], GongduolaInputComponent);
exports.GongduolaInputComponent = GongduolaInputComponent; //# sourceMappingURL=GongduolaInputComponent.js.map