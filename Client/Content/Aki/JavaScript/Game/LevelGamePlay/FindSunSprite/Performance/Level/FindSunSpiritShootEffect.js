"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritShootEffect = undefined;
const UE = require("ue");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const OFFSET_LENGTH = -150;
class FindSunSpiritShootEffect {
  constructor() {
    this.v3g = "";
    this.y3g = "";
    this.Mme = Transform_1.Transform.Create();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
  }
  InitConfig(t, e) {
    this.v3g = t;
    this.y3g = e;
    this.Mme.SetRotation(ModelManager_1.ModelManager.FindSunSpiritModel.LevelQuat);
  }
  SpawnEffect(t) {
    var e = this.cz;
    var i = this.fz;
    e.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
    i.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorUpVector());
    e.AdditionEqual(i.MultiplyEqual(OFFSET_LENGTH));
    var i = this.Mme;
    i.SetLocation(e);
    var e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.ToUeTransform(), this.v3g, "[FindSunSpiritGuideLine.SpawnShootLineEffect]");
    var e = EffectSystem_1.EffectSystem.GetNiagaraComponent(e);
    var r = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, t.ToUeVector());
    e?.SetNiagaraVariableVec3("end", r);
    i.SetLocation(t);
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.ToUeTransform(), this.y3g, "[FindSunSpiritGuideLine.SpawnShootEndEffect]");
  }
}
exports.FindSunSpiritShootEffect = FindSunSpiritShootEffect;
//# sourceMappingURL=FindSunSpiritShootEffect.js.map