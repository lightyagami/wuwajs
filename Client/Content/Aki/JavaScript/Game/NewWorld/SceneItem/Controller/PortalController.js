"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalController = exports.PortalPairParams = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stack_1 = require("../../../../Core/Container/Stack");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PORTAL_DEBUG_KEY = "Portal";
class PortalPairParams {
  constructor(t, e, r, a, i, s) {
    this.Trans = t;
    this.PairTrans = e;
    this.Owner = r;
    this.PairOwner = a;
    this.PortalBounds = i;
    this.PairPortalBounds = s;
    this.ACapture = undefined;
    this.BCapture = undefined;
  }
}
exports.PortalPairParams = PortalPairParams;
class PortalController extends ControllerBase_1.ControllerBase {
  static RegisterPair(t, e, r = false, a = true) {
    var i;
    var s;
    var o;
    var n;
    var h;
    var l;
    if (!ModelManager_1.ModelManager.PortalModel?.GetPortal(t) && (!r || !this.mBn)) {
      i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(215);
      s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(i?.GetPairCreatureDataId() ?? 0)?.Entity?.GetComponent(215);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "传送门: RegisterPair", ["EntityId", t], ["IsDynamic", r], ["IsAddToCache", a], ["CreatureDataIdA", i?.GetCreatureDataId()], ["CreatureDataIdB", s?.GetCreatureDataId()], ["PbDataIdA", i?.GetPbDataId()], ["PbDataIdB", s?.GetPbDataId()], ["OwnerCreatureDataIdA", i?.GetDynamicPortalCreatorCreatureDataId()], ["OwnerCreatureDataIdB", s?.GetDynamicPortalCreatorCreatureDataId()], ["PortalBoundsA", e.PortalBounds], ["PortalBoundsB", e.PairPortalBounds], ["PortalTransA", e.Trans], ["PortalTransB", e.PairTrans], ["PairMaxViewDisA", i?.GetPairCaptureMaxViewDistance()], ["PairMaxViewDisB", s?.GetPairCaptureMaxViewDistance()]);
      }
      if (i && s) {
        if (!this.mBn && this.Hla) {
          this.UnRegisterPair(this.Hla, false, false, false);
        }
        if (!r && a) {
          this.CBn.set(t, e);
          this.Vla.Delete(t);
          this.Vla.Push(t);
        }
        if (!!r || !this.mBn) {
          if (r) {
            this.mBn = true;
          }
          this.Hla = t;
          (l = new UE.TransformDouble()).SetLocation(e.Trans.GetLocation());
          (o = ModelManager_1.ModelManager.PortalModel.GetBpPortalActor()).D_K2_SetActorLocation(l.GetLocation(), false, undefined, true);
          o.SetPortal1Transform(e.Trans, e.Owner.D_GetTransform());
          o.SetPortal2Transform(e.PairTrans, e.PairOwner.D_GetTransform());
          o.SetPortal1Bounds(e.PortalBounds.ToUeVectorOld());
          o.SetPortal2Bounds(e.PairPortalBounds.ToUeVectorOld());
          l = UE.NewArray(UE.Actor);
          e = s.GetPairCaptureForceShowActors() ?? l;
          n = i.GetPairCaptureForceShowActors() ?? l;
          h = s?.GetPairCaptureIgnoredActors() ?? l;
          l = i?.GetPairCaptureIgnoredActors() ?? l;
          o.SetCaptureShowingActors(true, (0, puerts_1.$ref)(h), (0, puerts_1.$ref)(e));
          o.SetCaptureShowingActors(false, (0, puerts_1.$ref)(l), (0, puerts_1.$ref)(n));
          o.SetCaptureMaxViewDistance(true, s.GetPairCaptureMaxViewDistance());
          o.SetCaptureMaxViewDistance(false, i.GetPairCaptureMaxViewDistance());
          o.SetCaptureShowFlags(true, s.GetPairCaptureShowFlags());
          o.SetCaptureShowFlags(false, i.GetPairCaptureShowFlags());
          o.EnablePortal1Rendering();
          o.EnablePortal2Rendering();
          i.PortalCapture?.SetPair(s?.PortalCapture);
          s.PortalCapture?.SetPair(i?.PortalCapture);
          ModelManager_1.ModelManager.PortalModel?.AddPortalPair(t, o);
          i?.AfterRegisterPair();
          s?.AfterRegisterPair();
          if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY)) {
            o.EnableDebugCamera1 = true;
            o.EnableDebugCamera2 = true;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "传送门: RegisterPair出错，PortalComp找不到", ["EntityId", t], ["IsDynamic", r], ["IsAddToCache", a], ["APortalComp Valid", !!i], ["BPortalComp Valid", !!s]);
      }
    }
  }
  static UnRegisterPair(t, e = false, r = true, a = false) {
    var i;
    var s;
    var o;
    var n = ModelManager_1.ModelManager.PortalModel?.GetPortal(t);
    if (n && (i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(215), s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(i?.GetPairCreatureDataId() ?? 0)?.Entity?.GetComponent(215), Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "传送门: UnRegisterPair", ["EntityId", t], ["IsDynamic", e], ["IsRemoveFromCache", r], ["RegisterNewFromCache", a], ["CreatureDataIdA", i?.GetCreatureDataId()], ["CreatureDataIdB", s?.GetCreatureDataId()], ["PbDataIdA", i?.GetPbDataId()], ["PbDataIdB", s?.GetPbDataId()], ["OwnerCreatureDataIdA", i?.GetDynamicPortalCreatorCreatureDataId()], ["OwnerCreatureDataIdB", s?.GetDynamicPortalCreatorCreatureDataId()]), n.DisablePortal1Rendering(), n.DisablePortal2Rendering(), o = UE.NewArray(UE.Actor), n.SetCaptureShowingActors(true, (0, puerts_1.$ref)(o), (0, puerts_1.$ref)(o)), n.SetCaptureShowingActors(false, (0, puerts_1.$ref)(o), (0, puerts_1.$ref)(o)), n.SetCaptureMaxViewDistance(true, 0), n.SetCaptureMaxViewDistance(false, 0), ModelManager_1.ModelManager.PortalModel?.RemovePortalPair(t), i?.PortalCapture?.SetPair(undefined), s?.PortalCapture?.SetPair(undefined), i?.AfterUnRegisterPair(), s?.AfterUnRegisterPair(), e && (this.mBn = false), this.Hla = undefined, r && !e && (this.CBn.delete(t), this.Vla.Delete(t)), a) && (o = this.Vla.Peek()) && (n = this.CBn.get(o))) {
      this.RegisterPair(o, n, false, false);
    }
  }
  static RegisterDynamicPortals() {
    if (this.GSa[0] && this.GSa[1]) {
      if (this.mBn && this.Hla) {
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.Hla)?.Entity?.GetComponent(215);
        if (this.Hla === this.GSa[0] && t?.GetPairCreatureDataId() === this.GSa[1]) {
          return;
        }
        this.UnRegisterDynamicPortals(false);
      }
      var t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.GSa[0])?.Entity;
      var e = t?.GetComponent(215);
      var r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.GSa[1])?.Entity;
      var a = r?.GetComponent(215);
      if (e?.CanRegisterPortal() && a?.CanRegisterPortal()) {
        t = new PortalPairParams(e.PortalCapture.Plane.D_K2_GetComponentToWorld(), a.PortalCapture.Plane.D_K2_GetComponentToWorld(), t.GetComponent(1).Owner, r.GetComponent(1).Owner, e.PortalBounds, a.PortalBounds);
        e?.SetPairCreatureDataId(this.GSa[1]);
        a?.SetPairCreatureDataId(this.GSa[0]);
        this.RegisterPair(this.GSa[0], t, true, false);
      }
    }
  }
  static UnRegisterDynamicPortals(t = false) {
    var e;
    var r;
    var a;
    if (this.mBn && this.Hla) {
      e = this.Hla;
      r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(e)?.Entity?.GetComponent(215);
      a = ModelManager_1.ModelManager.CreatureModel?.GetEntity(r?.GetPairCreatureDataId() ?? 0)?.Entity?.GetComponent(215);
      this.UnRegisterPair(e, true, false, t);
      r?.SetPairCreatureDataId(0);
      a?.SetPairCreatureDataId(0);
    }
  }
  static GetPairDynamicPortal(t) {
    var e = t.GetCreatureDataId();
    switch (t.GetPortalModel()) {
      case "A":
        if (this.GSa[0] === e && this.GSa[1]) {
          return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.GSa[1])?.Entity?.GetComponent(215);
        }
        break;
      case "B":
        if (this.GSa[1] === e && this.GSa[0]) {
          return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.GSa[0])?.Entity?.GetComponent(215);
        }
    }
  }
  static AfterGenerateDynamicPortal(t) {
    var e = t.GetCreatureDataId();
    switch (t.GetPortalModel()) {
      case "A":
        if (this.GSa[0] !== e) {
          this.GSa[0] = e;
        }
        break;
      case "B":
        if (this.GSa[1] !== e) {
          this.GSa[1] = e;
        }
    }
  }
  static AfterDeleteDynamicPortal(t) {
    t = t.GetCreatureDataId();
    if (this.GSa[0] === t) {
      this.GSa[0] = undefined;
    } else if (this.GSa[1] === t) {
      this.GSa[1] = undefined;
    }
  }
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeModuleDebugLevel, this.OnChangeModuleDebugLevel);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeModuleDebugLevel, this.OnChangeModuleDebugLevel);
    this.CBn.clear();
    this.Vla.Clear();
    this.GSa.length = 0;
    this.Hla = 0;
    return !(this.mBn = false);
  }
}
(exports.PortalController = PortalController).GSa = [];
PortalController.CBn = new Map();
PortalController.Vla = new Stack_1.Stack();
PortalController.Hla = undefined;
PortalController.mBn = false;
PortalController.OnChangeModuleDebugLevel = (t, e) => {
  if (t === PORTAL_DEBUG_KEY) {
    ModelManager_1.ModelManager.PortalModel?.GetPortals().forEach(t => {
      t.EnableDebugCamera1 = e > 0;
      t.EnableDebugCamera2 = e > 0;
    });
  }
}; //# sourceMappingURL=PortalController.js.map