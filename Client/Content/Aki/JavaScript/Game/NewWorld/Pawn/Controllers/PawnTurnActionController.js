"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnTurnActionController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine");
const TURN_ANGLE_MAX = 60;
class PawnTurnActionController {
  constructor(t) {
    this.Jh = undefined;
    this.Krr = undefined;
    this.vir = Vector_1.Vector.Create();
    this.Hte = undefined;
    this.Gce = undefined;
    this.NeedTurn = false;
    this.WaitTurnEnd = false;
    this.PlayerOffset = Vector_1.Vector.Create();
    this.IsPlayerInputLocked = false;
    this.OnTurnEndHandle = undefined;
    this.OnTurnToDefaultForwardEndHandle = undefined;
    this.OnTurnToInteractTargetEndHandle = undefined;
    this.Xrr = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pawn", 50, "转身开始", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
      }
    };
    this.$rr = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Pawn", 50, "转身结束", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
      }
      this.RemoveEvents();
      if (this.OnTurnEndHandle) {
        this.OnTurnEndHandle();
      }
    };
    this.Yrr = () => {
      var t;
      if (this.Gce?.Valid) {
        t = Global_1.Global.BaseCharacter.CharacterActorComponent;
        this.Gce.Entity.GetComponent(197)?.SightTarget(t, 3);
        if (this.WaitTurnEnd && (this.Jrr(false), this.OnTurnToInteractTargetEndHandle)) {
          this.OnTurnToInteractTargetEndHandle();
        }
      } else if (this.OnTurnToInteractTargetEndHandle) {
        this.OnTurnToInteractTargetEndHandle();
      }
    };
    this.zrr = () => {
      if (this.OnTurnToDefaultForwardEndHandle) {
        this.OnTurnToDefaultForwardEndHandle();
      }
    };
    this.Jh = t;
    this.Gce = t.GetComponent(46);
    this.Hte = t.GetComponent(1);
    if (this.Gce?.Valid) {
      this.vir.DeepCopy(this.Hte.ActorForwardProxy);
    }
  }
  AddEvents() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnBegin, this.Xrr)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnBegin, this.Xrr);
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.$rr);
    }
  }
  RemoveEvents() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnBegin, this.Xrr)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnBegin, this.Xrr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.$rr);
    }
  }
  TurnToInteractTarget() {
    if (this.NeedTurn) {
      if (this.Gce?.Valid) {
        if (this.Gce.CharacterMovement.MovementMode === 1 || this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE) {
          var t = Global_1.Global.BaseCharacter.CharacterActorComponent;
          var i = this.Gce.Entity;
          const o = i.GetComponent(197);
          i = i.GetComponent(3);
          if (i) {
            var e = Vector_1.Vector.Create(t.ActorLocationProxy);
            e.AdditionEqual(this.PlayerOffset);
            var s = i.InputFacingProxy;
            var e = e.SubtractionEqual(i.ActorLocationProxy);
            e.Z = 0;
            e.Normalize();
            e.ToOrientationRotator(MathUtils_1.MathUtils.CommonTempRotator);
            var s = MathUtils_1.MathUtils.GetAngleByVectorDot(s, e);
            if (s < TURN_ANGLE_MAX) {
              if (o) {
                o.SightTarget(t, 3);
              }
              if (this.OnTurnToInteractTargetEndHandle) {
                this.OnTurnToInteractTargetEndHandle();
              }
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("NPC", 50, "[PawnTurnActionController.TurnToInteractTarget][交互转身] 夹角小于阈值，转头不转身", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()], ["Angle", s], ["TurnAngleMax", TURN_ANGLE_MAX], ["CurRot", i.ActorRotationProxy], ["CurInputRot", i.InputRotatorProxy], ["TarRot", MathUtils_1.MathUtils.CommonTempRotator]);
              }
            } else {
              if (this.WaitTurnEnd) {
                this.Jrr(true);
              } else if (this.OnTurnToInteractTargetEndHandle) {
                this.OnTurnToInteractTargetEndHandle();
              }
              e = Vector_1.Vector.Create(t.ActorLocationProxy);
              e.AdditionEqual(this.PlayerOffset);
              const o = this.Jh.GetComponent(47);
              o.PerformTurn(2, {
                TargetLocation: e
              });
              this.OnTurnEndHandle = this.Yrr;
              this.AddEvents();
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("NPC", 50, "[PawnTurnActionController.TurnToInteractTarget][交互转身] 添加转身监听事件", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()]);
              }
              this.Krr = true;
            }
          }
        } else if (this.OnTurnToInteractTargetEndHandle) {
          this.OnTurnToInteractTargetEndHandle();
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("NPC", 50, "[PawnTurnActionController.TurnToInteractTarget][交互转身] MoveComp不合法", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()]);
        }
        if (this.OnTurnToInteractTargetEndHandle) {
          this.OnTurnToInteractTargetEndHandle();
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("NPC", 50, "[PawnTurnActionController.TurnToInteractTarget][交互转身] NeedTurn为False", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()]);
      }
      if (this.OnTurnToInteractTargetEndHandle) {
        this.OnTurnToInteractTargetEndHandle();
      }
    }
  }
  Jrr(t) {
    var i;
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    if (e) {
      i = e.GetComponent(65);
      if (t) {
        e.GetComponent(3).SetInputDirect(Vector_1.Vector.ZeroVector);
        i.ClearMoveVectorCache();
        i.SetActive(false);
      } else {
        i.SetActive(true);
      }
      this.IsPlayerInputLocked = t;
    }
  }
  TurnToDefaultForward() {
    if (this.Gce?.Valid) {
      var t = this.Gce.Entity;
      const i = t.GetComponent(197);
      i?.SightTarget(undefined, 3);
      if (this.NeedTurn && this.Krr) {
        if (this.Gce.CharacterMovement.MovementMode === 1 || this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE) {
          if (t.GetComponent(3)) {
            const i = this.Jh.GetComponent(47);
            i.PerformTurn(2, {
              Direction: this.vir
            });
            this.OnTurnEndHandle = this.zrr;
            this.AddEvents();
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("NPC", 50, "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] 添加转身监听事件", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()]);
            }
          }
          this.Krr = false;
        } else if (this.OnTurnToDefaultForwardEndHandle) {
          this.OnTurnToDefaultForwardEndHandle();
        }
      } else if (this.OnTurnToDefaultForwardEndHandle) {
        this.OnTurnToDefaultForwardEndHandle();
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("NPC", 50, "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] MoveComp不合法", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()]);
      }
      if (this.OnTurnToDefaultForwardEndHandle) {
        this.OnTurnToDefaultForwardEndHandle();
      }
    }
  }
  UpdateDefaultDirect(t) {
    this.vir.DeepCopy(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 50, "[PawnTurnActionController.UpdateDefaultDirect]更新默认朝向", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()], ["NewDirect", t]);
    }
  }
  Dispose() {
    this.RemoveEvents();
    this.Gce = undefined;
    if (this.IsPlayerInputLocked) {
      this.Jrr(false);
    }
  }
}
exports.PawnTurnActionController = PawnTurnActionController;
//# sourceMappingURL=PawnTurnActionController.js.map