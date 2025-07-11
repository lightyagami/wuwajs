"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPointEffectController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const ReachAreaBehaviorNode_1 = require("../../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode");
class CheckPointEffectInfo {
  constructor() {
    this.EffectPathKey = "";
    this.EffectSpawnPosition = Vector_1.Vector.ZeroVectorProxy;
  }
}
class CheckPointEffectController {
  constructor(e) {
    this.Yre = e;
    this.qQt = new Map();
    this.GQt = new Map();
  }
  EnableAllEffects(e) {
    if (this.GQt) {
      for (var [t, i] of this.qQt) {
        if (e) {
          this.NQt(t, i);
        } else {
          this.StopEffect(t);
        }
      }
    }
  }
  UpdateOnChildQuestNodeStatusChange(e, t, i) {
    if (e.TrackTarget && e instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode && (t && (t = this.Yre.IsOccupied, e.EffectPathKey) && this.VX1(e.NodeId, e.EffectPathKey, e.GetTargetPosition(), t), i)) {
      this.jX1(e.NodeId);
    }
  }
  VX1(e, t, i, o) {
    var r = this.qQt.get(e);
    if (!r && !((r = new CheckPointEffectInfo()).EffectPathKey = t, r.EffectSpawnPosition = i, this.qQt.set(e, r), o)) {
      this.NQt(e, r);
    }
  }
  jX1(e) {
    this.qQt.delete(e);
    this.StopEffect(e);
  }
  OnBtApplyExpressionOccupation(e) {
    if (!e) {
      this.EnableAllEffects(true);
    }
  }
  OnBtReleaseExpressionOccupation(e) {
    if (!e) {
      this.EnableAllEffects(false);
    }
  }
  NQt(i, e) {
    var t = EffectUtil_1.EffectUtil.GetEffectPath(e.EffectPathKey ?? "DA_Fx_Group_Sl3_Cishi_10idle");
    if (!StringUtils_1.StringUtils.IsBlank(t)) {
      EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, e.EffectSpawnPosition.ToUeVector(), Vector_1.Vector.OneVectorDouble), t, "[CheckPointEffectController.CreateTrackEffect]", undefined, 3, undefined, (e, t) => {
        if (e !== 5) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree:CheckPointEffectController.SpawnEffect 错误", ["result", e]);
          }
        } else if (t) {
          if (this.GQt.has(i)) {
            this.StopEffect(i);
          }
          this.GQt.set(i, t);
          EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(t, () => this.GQt.get(i) !== undefined);
        }
      });
    }
  }
  StopEffect(e) {
    var t = this.GQt.get(e) ?? 0;
    if (EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.StopEffectById(t, "[CheckPointEffectController.End]", true);
    }
    this.GQt.delete(e);
  }
}
exports.CheckPointEffectController = CheckPointEffectController;
//# sourceMappingURL=CheckPointEffectController.js.map