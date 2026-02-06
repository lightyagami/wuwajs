"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritLevelModifier = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const SceneInteractionManager_1 = require("../../../../Render/Scene/Interaction/SceneInteractionManager");
class FindSunSpiritLevelModifier {
  constructor() {
    this.tKf = "";
    this.iKf = 0;
    this.UAe = Vector_1.Vector.Create();
    this.mC = Rotator_1.Rotator.Create();
    this.G2e = 0;
    this.U4f = undefined;
    this.rKf = undefined;
  }
  async RefreshAsync(t, e, i, s) {
    this.tKf = t;
    this.UAe.DeepCopy(i);
    this.mC.DeepCopy(s);
    this.G2e = e ? 1 : 0;
    this.rKf?.Remove();
    this.rKf = undefined;
    if (this.iKf > 0) {
      if ((t = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(this.iKf))?.IsValid()) {
        t.D_K2_SetActorLocationAndRotation(this.UAe.ToUeVector(), this.mC.ToUeRotator(), false, undefined, true);
      }
    } else {
      const r = new CustomPromise_1.CustomPromise();
      this.iKf = SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(this.tKf, 0, this.UAe.ToUeVector(), this.mC.ToUeRotator(), () => {
        r.SetResult();
        SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.iKf, this.Ksm(this.G2e), false, false);
      }, true, false);
      await r.Promise;
    }
  }
  Clear() {
    this.rKf?.Remove();
    this.rKf = undefined;
    SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(this.iKf);
  }
  ResetState(t) {
    this.rKf?.Remove();
    this.rKf = undefined;
    this.Usi(t ? 1 : 0);
  }
  UpdateSelect(t) {
    t = t ? 1 : 0;
    if (this.G2e === 2) {
      this.U4f = t;
    } else {
      this.Usi(t);
    }
  }
  Trigger(t) {
    if (this.G2e !== 2) {
      this.Usi(2);
      this.rKf = TimerSystem_1.TimerSystem.Delay(() => {
        if ((this.rKf = undefined) !== this.U4f) {
          this.Usi(this.U4f);
          this.U4f = undefined;
        } else {
          this.Usi(1);
        }
      }, t);
    }
  }
  Usi(t) {
    this.G2e = t;
    SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.iKf, this.Ksm(t), false, false);
  }
  Ksm(t) {
    switch (t) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return 0;
    }
  }
}
exports.FindSunSpiritLevelModifier = FindSunSpiritLevelModifier;
//# sourceMappingURL=FindSunSpiritLevelModifier.js.map