"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAimLineController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemMaterialControllerActorData_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialControllerActorData");
const ItemMaterialManager_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialManager");
const UPDATE_MESH_INTERVAL = 1000;
const DATA_PATH = "/Game/Aki/Effect/MaterialController/ItemMaterial/DA_Fx_ActorItem_Scanning.DA_Fx_ActorItem_Scanning";
const sightingTag = new UE.FName("Manipulate_Targeted");
class LevelAimLineController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_Miaozhunxian_C", () => {
      this.OC = ActorSystem_1.ActorSystem.Get(UE.BP_Miaozhunxian_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      if (this.OC?.IsValid()) {
        this.zie = this.OC.GetComponentByClass(UE.SplineComponent.StaticClass());
        if (GlobalData_1.GlobalData.IsPlayInEditor) {
          this.OC.ActorLabel = "AimLineController";
        }
        this.OC.Init();
      }
    });
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_Miaozhunxian_Bullet_C", () => {
      this.iye = ActorSystem_1.ActorSystem.Get(UE.BP_Miaozhunxian_Bullet_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      if (this.iye?.IsValid() && (this.iye.OnActorBeginOverlap.Add(this.oye), GlobalData_1.GlobalData.IsPlayInEditor)) {
        this.iye.ActorLabel = "AimLineBullet";
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(DATA_PATH, ItemMaterialControllerActorData_1.default, e => {
      this.rye = e;
    });
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  static OnClear() {
    if (this.OC?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("LevelAimLineController.OnClear1", this.OC);
    }
    if (this.iye?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("LevelAimLineController.OnClear2", this.iye);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDone, this.nye)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    }
    return true;
  }
  static PlayEffect(e = undefined) {
    if (this.sye) {
      return false;
    }
    this.sye = true;
    if (e) {
      this.aye = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, e, "[LevelAimLineController.PlayEffect]", new EffectContext_1.EffectContext(undefined, this.OC));
      if (!EffectSystem_1.EffectSystem.IsValid(this.aye)) {
        return false;
      }
      EffectSystem_1.EffectSystem.GetEffectActor(this.aye).K2_AttachToActor(this.OC, undefined, 0, 0, 0, false);
    } else {
      this.hye = true;
      this.OC.ShowMesh();
    }
    return true;
  }
  static StopEffect() {
    return !!this.sye && (this.sye = false, this.hye ? this.OC.HideMesh() : (EffectSystem_1.EffectSystem.StopEffectById(this.aye ?? 0, "[LevelAimLineController.StopEffect]", true), this.aye = undefined), this.lye(), true);
  }
  static UpdatePoints(t, e) {
    if (t?.length <= 0) {
      return false;
    }
    var i = t[0];
    var r = Vector_1.Vector.Create();
    this.OC.D_K2_SetActorLocation(i.ToUeVector(), false, undefined, true);
    var o = UE.NewArray(UE.SplinePoint);
    let a = 5;
    a = e === 0 ? 0 : 1;
    for (let e = 0; e < t.length; e++) {
      t[e].Subtraction(i, r);
      var s = new UE.SplinePoint(e, r.ToUeVectorOld(), t[e === 0 ? e : e - 1].ToUeVectorOld(), t[e === t.length - 1 ? e : e + 1].ToUeVectorOld(), Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVector, a);
      o.Add(s);
    }
    this.zie.ClearSplinePoints();
    this.zie.AddPoints(o);
    this.zie.UpdateSpline();
    this.OC.UpdateMesh();
    if (Time_1.Time.WorldTime - this._ye > UPDATE_MESH_INTERVAL) {
      this._ye = Time_1.Time.WorldTime;
      this.uye();
    }
    return true;
  }
  static uye() {
    this.iye.D_K2_SetActorLocation(this.OC.D_K2_GetActorLocation(), true, undefined, false);
    var t = this.zie.GetSplineLength() / (this.OC.SamplingNum - 1);
    for (let e = 0; e < this.OC.SamplingNum; e++) {
      var i = this.zie.D_GetLocationAtDistanceAlongSpline((e + 1) * t, 1);
      this.iye.D_K2_SetActorLocation(i, true, undefined, false);
    }
    this.cye.filter(e => !this.mye.includes(e)).forEach(e => {
      ItemMaterialManager_1.ItemMaterialManager.DisableActorData(this.dye.get(e));
      this.dye.delete(e);
    });
    this.mye.filter(e => !this.cye.includes(e)).forEach(e => {
      var t = ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(e, this.rye);
      this.dye.set(e, t);
    });
    this.cye = this.mye;
    this.mye = [];
    this.Cye.filter(e => !this.gye.includes(e)).forEach(e => {
      if (e?.Valid) {
        e.Entity.GetComponent(134).SetIsBeingTargeted(false);
      }
    });
    this.gye.filter(e => !this.Cye.includes(e)).forEach(e => {
      if (e?.Valid) {
        e.Entity.GetComponent(134).SetIsBeingTargeted(true);
      }
    });
    this.Cye = this.gye;
    this.gye = [];
  }
  static lye() {
    this.Cye.forEach(e => {
      if (e?.Valid) {
        e.Entity.GetComponent(134).SetIsBeingTargeted(false);
      }
    });
    this.cye.forEach(e => {
      ItemMaterialManager_1.ItemMaterialManager.DisableActorData(this.dye.get(e));
      this.dye.delete(e);
    });
  }
}
exports.LevelAimLineController = LevelAimLineController;
(_a = LevelAimLineController).aye = undefined;
LevelAimLineController.sye = false;
LevelAimLineController.hye = false;
LevelAimLineController._ye = 0;
LevelAimLineController.cye = [];
LevelAimLineController.mye = [];
LevelAimLineController.dye = new Map();
LevelAimLineController.Cye = [];
LevelAimLineController.gye = [];
LevelAimLineController.oye = (e, t) => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Temp", 31, "111", ["otherActor", t.ActorLabel]);
  }
  if (t.Tags.Contains(sightingTag)) {
    if (!_a.mye.includes(t)) {
      _a.mye.push(t);
    }
  } else if ((t = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(t)) && t.Entity.GetComponent(158)?.Valid && !_a.gye.includes(t)) {
    _a.gye.push(t);
  }
};
LevelAimLineController.nye = () => {
  if (!_a.OC?.IsValid()) {
    _a.OC = ActorSystem_1.ActorSystem.Get(UE.BP_Miaozhunxian_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
    _a.zie = _a.OC.GetComponentByClass(UE.SplineComponent.StaticClass());
    _a.OC.Init();
  }
  if (!_a.iye?.IsValid()) {
    _a.iye = ActorSystem_1.ActorSystem.Get(UE.BP_Miaozhunxian_Bullet_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
    _a.iye.OnActorBeginOverlap.Add(_a.oye);
  }
  if (GlobalData_1.GlobalData.IsPlayInEditor) {
    _a.OC.ActorLabel = "AimLineController";
    _a.iye.ActorLabel = "AimLineBullet";
  }
}; //# sourceMappingURL=LevelAimLineController.js.map