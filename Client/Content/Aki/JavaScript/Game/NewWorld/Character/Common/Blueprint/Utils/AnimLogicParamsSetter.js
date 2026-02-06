"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimLogicParamsSetter = undefined;
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const HoldingHandsUtils_1 = require("../../../../../Module/HoldHands/HoldingHandsUtils");
const CharacterUnifiedStateTypes_1 = require("../../Component/Abilities/CharacterUnifiedStateTypes");
const CharacterClimbComponent_1 = require("../../Component/Move/CharacterClimbComponent");
class AnimLogicParamsSetter {
  constructor() {
    this.AcceptedNewBeHit = false;
    this.BeHitAnim = 0;
    this.EnterFk = false;
    this.DoubleHitInAir = false;
    this.BeHitDirect = Vector_1.Vector.Create();
    this.BeHitLocation = Vector_1.Vector.Create();
    this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY;
    this.BeHitBone = FNameUtil_1.FNameUtil.EMPTY;
    this.CharMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    this.CharPositionState = CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
    this.CharCameraState = CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection;
    this.BattleIdleTime = -0;
    this.DegMovementSlope = 0;
    this.SightDirect = Vector_1.Vector.Create();
    this.RagQuitState = false;
    this.IsJump = false;
    this.Acceleration = Vector_1.Vector.Create();
    this.IsMoving = false;
    this.ForceExitStateStop = false;
    this.Speed = 0;
    this.InputDirect = Vector_1.Vector.Create();
    this.IsFallingIntoWater = false;
    this.GroundedTime = -0;
    this.HasMoveInput = false;
    this.ClimbInfo = new CharacterClimbComponent_1.SClimbInfo();
    this.ClimbState = new CharacterClimbComponent_1.SClimbState();
    this.ClimbRadius = 0;
    this.InputRotator = Rotator_1.Rotator.Create();
    this.ClimbOnWallAngle = 0;
    this.SprintSwimOffset = 0;
    this.SprintSwimOffsetLerpSpeed = 0;
    this.SlideForward = Vector_1.Vector.Create();
    this.SlideSwitchThisFrame = false;
    this.SlideStandMode = false;
    this.JumpUpRate = -0;
    this.SkillTarget = -0;
    this.HateTarget = -0;
    this.LastActiveSkillTime = 0;
    this.SitDownDirect = -1;
    this.StandUpDirect = -1;
    this.SitDownType = 0;
    this.SitDown = false;
    this.IsInPerformingPlot = false;
    this.IsInSequence = false;
    this.IsInSplineMove = false;
    this.IsInUiCamera = false;
    this.LookAt = Vector2D_1.Vector2D.Create();
    this.EnableBlendSpaceLookAt = false;
    this.CameraMode = 0;
    this.IsOnVehicle = false;
    this.IsLeavingVehicle = false;
    this.VehicleType = 0;
    this.EnableLowerBlend = false;
    this.EnableLeftArmBlend = false;
    this.EnableRightArmBlend = false;
    this.IsHoldingHands = false;
    this.IsBeHoldingHands = false;
    this.IsHoldingHandsReachable = false;
    this.IsAcceptingInvitation = false;
    this.LeftHandIkTarget = new HoldingHandsUtils_1.IkTarget();
    this.RightHandIkTarget = new HoldingHandsUtils_1.IkTarget();
    this.DisableBlink = false;
    this.IsRegionMoveMode = false;
    this.FloatingLocalDirection = Vector_1.Vector.Create();
    this.FloatingMoveMix = 0;
  }
}
exports.AnimLogicParamsSetter = AnimLogicParamsSetter;
//# sourceMappingURL=AnimLogicParamsSetter.js.map