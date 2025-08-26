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
        this.Gce.Entity.GetComponent(178).SetSightTargetItem(t);
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
    this.Gce = t.GetComponent(45);
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
    var t;
    var i;
    var e;
    var s;
    var o;
    if (this.NeedTurn) {
      if (this.Gce?.Valid) {
        if (this.Gce.CharacterMovement.MovementMode === 1 || this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE) {
          t = Global_1.Global.BaseCharacter.CharacterActorComponent;
          i = (e = this.Gce.Entity).GetComponent(178);
          if (e = e.GetComponent(3)) {
            (o = Vector_1.Vector.Create(t.ActorLocationProxy)).AdditionEqual(this.PlayerOffset);
            s = e.InputFacingProxy;
            (o = o.SubtractionEqual(e.ActorLocationProxy)).Z = 0;
            o.Normalize();
            o.ToOrientationRotator(MathUtils_1.MathUtils.CommonTempRotator);
            if ((s = MathUtils_1.MathUtils.GetAngleByVectorDot(s, o)) < TURN_ANGLE_MAX) {
              if (i) {
                i.SetSightTargetItem(t);
              }
              if (this.OnTurnToInteractTargetEndHandle) {
                this.OnTurnToInteractTargetEndHandle();
              }
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("NPC", 50, "[PawnTurnActionController.TurnToInteractTarget][交互转身] 夹角小于阈值，转头不转身", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()], ["Angle", s], ["TurnAngleMax", TURN_ANGLE_MAX], ["CurRot", e.ActorRotationProxy], ["CurInputRot", e.InputRotatorProxy], ["TarRot", MathUtils_1.MathUtils.CommonTempRotator]);
              }
            } else {
              if (this.WaitTurnEnd) {
                this.Jrr(true);
              } else if (this.OnTurnToInteractTargetEndHandle) {
                this.OnTurnToInteractTargetEndHandle();
              }
              (o = Vector_1.Vector.Create(t.ActorLocationProxy)).AdditionEqual(this.PlayerOffset);
              this.Jh.GetComponent(46).PerformTurn(2, {
                TargetLocation: o
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
      i = e.GetComponent(62);
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
    if (this.NeedTurn && this.Krr) {
      if (this.Gce?.Valid) {
        if (this.Gce.CharacterMovement.MovementMode === 1 || this.Gce.CharacterMovement.MovementMode === 6 && this.Gce.CharacterMovement.CustomMovementMode === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE) {
          var t;
          var i = this.Gce.Entity;
          const e = i.GetComponent(188);
          if (!e?.OpenLookAt) {
            if (t = i.GetComponent(178)) {
              t.SetSightTargetItem(undefined);
            }
          }
          if (i.GetComponent(3)) {
            const e = this.Jh.GetComponent(46);
            e.PerformTurn(2, {
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
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("NPC", 50, "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] MoveComp不合法", ["PbDataID", this.Hte?.CreatureData.GetPbDataId()]);
        }
        if (this.OnTurnToDefaultForwardEndHandle) {
          this.OnTurnToDefaultForwardEndHandle();
        }
      }
    } else if (this.OnTurnToDefaultForwardEndHandle) {
      this.OnTurnToDefaultForwardEndHandle();
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