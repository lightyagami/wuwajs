"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalMoveToController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const DISTANCE_ERROR_THRESHOLD = 100;
const MAX_TURN_SPEED = 360;
class AnimalMoveToController {
  constructor(t) {
    this.tu = CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    this.ZWo = false;
    this.eKo = false;
    this.tKo = undefined;
    this.iKo = 0;
    this.oKo = 0;
    this.IC = false;
    this.rKo = false;
    this.jye = Vector_1.Vector.Create();
    this.nKo = 0;
    this.Hte = t.GetComponent(3);
    if (UE.KuroStaticLibrary.IsObjectClassByName(this.Hte.Owner, CharacterNameDefines_1.CharacterNameDefines.BP_BASEANIMAL)) {
      this.sKo = this.Hte.Owner.TurnSpeedCurve;
    } else {
      this.sKo = undefined;
    }
    this.mBe = t.GetComponent(101);
    this.Gce = t.GetComponent(178);
    this.aKo = this.Gce.CharacterMovement.MaxAcceleration;
  }
  Init(t, i) {
    this.tu = t;
    this.mBe.SetMoveState(t);
    this.ZWo = i;
    this.IC = true;
  }
  Start(t, i, s, e = DISTANCE_ERROR_THRESHOLD) {
    if (this.IC) {
      this.eKo = i;
      this.oKo = s;
      this.nKo = e;
      this.rKo = false;
      if (this.tu === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim && !this.ZWo) {
        this.Gce.CharacterMovement.MaxAcceleration = this.aKo;
      }
      if (this.tKo) {
        this.tKo.length = 0;
      } else {
        this.tKo = new Array();
      }
      if (this.eKo) {
        if (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(this.Hte.Owner.GetWorld(), this.Hte.ActorLocation, t.ToUeVector(), this.tKo)) {
          this.iKo = 1;
        } else {
          (i = Vector_1.Vector.Create()).DeepCopy(t);
          this.tKo.push(i);
          this.iKo = 0;
        }
      } else {
        (s = Vector_1.Vector.Create()).DeepCopy(t);
        this.tKo.push(s);
        this.iKo = 0;
      }
    }
  }
  Update(t) {
    var i;
    if (this.rKo) {
      return 2;
    } else if ((i = this.tKo[this.iKo]).ContainsNaN()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Animal", 29, "AnimalMoveToController Update Next Has NaN", ["Next", i]);
      }
      return 2;
    } else {
      i.Subtraction(this.Hte.ActorLocationProxy, this.jye);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.jye);
      if (this.jye.Size() < this.nKo) {
        if (this.iKo === this.tKo.length - 1) {
          return 1;
        } else {
          this.iKo++;
          return 0;
        }
      } else {
        this.jye.Normalize();
        if (i.ContainsNaN()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Animal", 29, "AnimalMoveToController Update Input Direct Has NaN", ["Input Direct", this.jye]);
          }
          return 2;
        } else {
          this.hKo(this.jye);
          return 0;
        }
      }
    }
  }
  Stop() {
    this.rKo = true;
  }
  Finish() {
    if (this.tu === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim && !this.ZWo) {
      this.Hte?.ClearInput();
      this.Gce.CharacterMovement.MaxAcceleration = MathUtils_1.MathUtils.MaxFloat;
    }
    this.IC = false;
  }
  hKo(t) {
    this.Hte.SetInputDirect(t);
    let i = this.oKo;
    var s;
    if (this.sKo) {
      s = MathUtils_1.MathUtils.GetAngleByVectorDot(this.Hte.ActorForwardProxy, t) * MathUtils_1.MathUtils.DegToRad;
      s = this.sKo.GetFloatValue(s);
      i = MathUtils_1.MathUtils.Lerp(this.oKo, MAX_TURN_SPEED, s);
    }
    AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.Hte, t, i, false);
  }
}
exports.AnimalMoveToController = AnimalMoveToController;
//# sourceMappingURL=AnimalMoveToController.js.map