"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CheckPointEffectController = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  EffectUtil_1 = require("../../../../Utils/EffectUtil"),
  ReachAreaBehaviorNode_1 = require("../../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode");
class CheckPointEffectInfo {
  constructor() {
    this.EffectPathKey = "", this.EffectSpawnPosition = Vector_1.Vector.ZeroVectorProxy
  }
}
class CheckPointEffectController {
  constructor(e) {
    this.Yre = e, this.qQt = new Map, this.GQt = new Map
  }
  EnableAllEffects(e) {
    if (this.GQt)
      for (var [t, i] of this.qQt) e ? this.NQt(t, i) : this.StopEffect(t)
  }
  UpdateOnChildQuestNodeStatusChange(e, t, i) {
    e.TrackTarget && e instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode && (t && (t = this.Yre.IsOccupied, e.EffectPathKey) && this.aX1(e.NodeId, e.EffectPathKey, e.GetTargetPosition(), t), i) && this.hX1(e.NodeId)
  }
  aX1(e, t, i, o) {
    var r = this.qQt.get(e);
    r || ((r = new CheckPointEffectInfo).EffectPathKey = t, r.EffectSpawnPosition = i, this.qQt.set(e, r), o) || this.NQt(e, r)
  }
  hX1(e) {
    this.qQt.delete(e), this.StopEffect(e)
  }
  OnBtApplyExpressionOccupation(e) {
    e || this.EnableAllEffects(!0)
  }
  OnBtReleaseExpressionOccupation(e) {
    e || this.EnableAllEffects(!1)
  }
  NQt(i, e) {
    var t = EffectUtil_1.EffectUtil.GetEffectPath(e.EffectPathKey ?? "DA_Fx_Group_Sl3_Cishi_10idle");
    StringUtils_1.StringUtils.IsBlank(t) || EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(Rotator_1.Rotator.ZeroRotator, e.EffectSpawnPosition.ToUeVector(), Vector_1.Vector.OneVectorDouble), t, "[CheckPointEffectController.CreateTrackEffect]", void 0, 3, void 0, (e, t) => {
      5 !== e ? Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "GeneralLogicTree:CheckPointEffectController.SpawnEffect 错误", ["result", e]) : t && (this.GQt.has(i) && this.StopEffect(i), this.GQt.set(i, t), EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(t, () => void 0 !== this.GQt.get(i)))
    })
  }
  StopEffect(e) {
    var t = this.GQt.get(e) ?? 0;
    EffectSystem_1.EffectSystem.IsValid(t) && EffectSystem_1.EffectSystem.StopEffectById(t, "[CheckPointEffectController.End]", !0), this.GQt.delete(e)
  }
}
exports.CheckPointEffectController = CheckPointEffectController;
//# sourceMappingURL=CheckPointEffectController.js.map