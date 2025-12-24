"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolMoveLogic = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const MoveToLocationController_1 = require("./MoveToLocationController");
const WHILE_UPDATE_MOVE_POINT_COUNT = 2;
const RESET_LOCATION_TOLERANCE = 10;
class PatrolMoveLogic {
  constructor() {
    this.Entity = undefined;
    this.Hte = undefined;
    this.oRe = undefined;
    this.mBe = undefined;
    this.sJo = false;
    this.lJo = 0;
    this.nJo = 0;
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
    this.jJo = Quat_1.Quat.Create();
    this.nRi = -0;
    this.WJo = Vector_1.Vector.Create();
    this.c6a = Vector_1.Vector.Create();
    this.KJo = Vector_1.Vector.Create(0, 0, 0);
    this.XJo = 0;
    this.NOe = 0;
    this.$Jo = Vector_1.Vector.Create();
    this.YJo = [];
  }
  Init(t) {
    this.Entity = t;
    this.Hte = t.CheckGetComponent(3);
    this.oRe = t.CheckGetComponent(186);
    this.mBe = t.GetComponent(109);
  }
  GetMovePoint(t) {
    if (t >= 0 && t < this.YJo.length) {
      return this.YJo[t];
    }
  }
  UpdateMovePath(t, i, s, h) {
    this.YJo.length = 0;
    this.YJo.push(...t);
    this.nJo = h;
    this.sJo = i;
    this.lJo = s;
    this.NOe = 0;
    this.ZJo(1);
  }
  StopMove() {
    this.YJo.length = 0;
    this.XJo = 0;
    this.NOe = 0;
  }
  UpdateMove(t) {
    if (!this.GetMovePoint(this.NOe)) {
      this.StopMove();
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor && MoveToLocationController_1.MoveToLocationController.DebugDraw) {
      this.IJo();
    }
    this.ezo();
    let i = 0;
    while (this.tzo() && i < WHILE_UPDATE_MOVE_POINT_COUNT) {
      i++;
      if (this.NOe === this.YJo.length - 1) {
        return false;
      }
      this.ZJo(this.NOe + 1);
    }
    var s;
    this.WJo.Normalize();
    if (this.mBe && this.mBe.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      this.jJo.DeepCopy(this.Hte.ActorQuatProxy);
      this.jJo.Inverse(this.jJo);
      this.jJo.RotateVector(this.WJo, this.WJo);
      s = this.WJo.X;
      this.WJo.X = this.WJo.Z;
      this.WJo.Z = s;
      this.Hte.SetInputDirect(this.WJo);
    } else {
      this.Hte.SetOverrideTurnSpeed(this.lJo);
      if (this.sJo) {
        this.Hte.SetInputDirect(this.Hte.ActorForwardProxy);
      } else {
        this.Hte.SetInputDirect(this.WJo);
      }
      AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, this.WJo, this.lJo, this.sJo);
    }
    return true;
  }
  ZJo(t) {
    this.XJo = this.NOe;
    this.NOe = t;
    this.$Jo = this.YJo[this.NOe];
    this.ezo();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "更新移动目标点", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["CurrentIndex", this.NOe], ["CurrentToLocation", this.$Jo]);
    }
  }
  ezo() {
    var t;
    this.WJo.DeepCopy(this.$Jo);
    this.WJo.SubtractionEqual(this.Hte.ActorLocationProxy);
    this.c6a.DeepCopy(this.WJo);
    if (this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      this.jye.DeepCopy(this.WJo);
      t = this.jye.DotProduct(this.Hte.ActorForwardProxy);
      this.jye.DeepCopy(this.Hte.ActorForwardProxy);
      this.jye.MultiplyEqual(t);
      this.jye.UnaryNegation(this.jye);
      this.jye.AdditionEqual(this.WJo);
      this.WJo.DeepCopy(this.jye);
    } else if (!this.sJo) {
      this.WJo.Z = 0;
    }
    this.nRi = this.sJo ? this.c6a.Size() : this.c6a.Size2D();
  }
  tzo() {
    if (this.XJo === this.NOe || this.nRi <= this.nJo) {
      this.ozo();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "到达目标位置", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["distance", this.nRi], ["index", this.NOe]);
      }
      return true;
    }
    this.$Jo.Subtraction(this.YJo[this.XJo], this.jye);
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, this.jye, 0);
    this.RTe.DeepCopy(this.c6a);
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, this.RTe, 0);
    var t = this.RTe.DotProduct(this.jye);
    if ((t < 0 || this.nRi < this.nJo) && (this.ozo(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("AI", 42, "经过了目标位置", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["distance", this.nRi], ["index", this.NOe], ["dotProduct", t]);
    }
    return t < 0 || this.nRi < this.nJo;
  }
  ozo() {
    this.KJo.DeepCopy(this.$Jo);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "经过目标位置，更新拉回点记录", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["LastPatrolPoint", this.KJo], ["CurrentPoint", this.Hte.ActorLocationProxy]);
    }
  }
  ResetLastPointCondition() {
    return !(this.KJo.Size() < 1) && (!(Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy) < this.nJo + RESET_LOCATION_TOLERANCE) || !(this.KJo.Set(0, 0, 0), 1));
  }
  ResetLastPatrolPoint(t) {
    var i;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "Reset目标位置", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["deltaSeconds", t], ["LastPatrolPoint", this.KJo], ["CurrentPoint", this.Hte.ActorLocationProxy], ["Distance", Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy)]);
    }
    this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1);
    this.Hte.ClearInput();
    if (this.oRe && this.Entity.GetTickInterval() > 1) {
      i = this.oRe.GetMeshTransform();
      this.rzo();
      this.oRe.SetModelBuffer(i, t * CommonDefine_1.MILLIONSECOND_PER_SECOND * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    } else {
      this.rzo();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "Reset目标位置结束", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["ActorLocation", this.Hte.ActorLocationProxy], ["Distance", Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy)]);
    }
    this.KJo.Set(0, 0, 0);
  }
  rzo() {
    if (this.sJo) {
      this.Hte.SetActorLocation(this.KJo.ToUeVector(), "拉回目标点设置坐标", false);
    } else if (!this.Hte.FixBornLocation("拉回目标点地面修正", true, this.KJo, false, true)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 42, "未能检测到地面，没设置拉回目标点", ["EntityId", this.Entity.Id], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["LastPatrolPoint", this.KJo], ["ActorLocation", this.Hte.ActorLocationProxy]);
      }
    }
  }
  IJo() {
    if (this.YJo.length !== 0 && GlobalData_1.GlobalData.IsPlayInEditor) {
      for (let t = this.YJo.length - 1; t > -1; t--) {
        var i = this.YJo[t];
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i.ToUeVector(), 35, 10, t === this.NOe ? ColorUtils_1.ColorUtils.LinearRed : ColorUtils_1.ColorUtils.LinearGreen, 1);
      }
    }
  }
}
exports.PatrolMoveLogic = PatrolMoveLogic;
//# sourceMappingURL=PatrolMoveLogic.js.map