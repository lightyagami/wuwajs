"use strict";
var __decorate = this && this.__decorate || function(t, e, i, s) {
  var h, n = arguments.length,
    o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s);
  else
    for (var r = t.length - 1; 0 <= r; r--)(h = t[r]) && (o = (n < 3 ? h(o) : 3 < n ? h(e, i, o) : h(e, i)) || o);
  return 3 < n && o && Object.defineProperty(e, i, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneItemPropertyComponent = void 0;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  stateToSlashLockTag = new Map([
    [-3775711, -462633340],
    [-1984184746, -1822449795]
  ]);
let SceneItemPropertyComponent = class SceneItemPropertyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Xte = void 0, this.cen = void 0, this.A1n = void 0, this.P1n = 0, this.Xrh = void 0, this.DT1 = void 0, this.ax1 = 0, this.x1n = !1, this.Ero = !1, this.AttributeIdSet = void 0, this.Yrh = !1, this.zrh = (t, e) => {
      -662723379 === t && (e ? TimerSystem_1.TimerSystem.Next(() => {
        this.Xte?.AddTag(this.P1n), this.x1n = !0, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, !0)
      }) : e || TimerSystem_1.TimerSystem.Next(() => {
        this.Xte?.RemoveTag(this.P1n), this.x1n = !1, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, !1)
      }))
    }, this.BT1 = (t, e) => {
      -1584109024 === t && (t = stateToSlashLockTag.get(this.cen.StateTagId), e ? (t && !this.Xte?.HasTag(t) && (this.Xte?.AddTag(t), this.ax1 = t), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.oFe)) : (t && this.Xte?.RemoveTag(t), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.oFe)), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityBeSlashAim, this.Entity, e))
    }, this.oFe = t => {
      t = stateToSlashLockTag.get(t);
      t ? this.Xte.HasTag(t) || (this.Xte.RemoveTag(this.ax1), this.Xte.AddTag(t), this.ax1 = t) : (this.Xte.RemoveTag(this.ax1), this.ax1 = 0)
    }
  }
  get IsMoving() {
    return this.Ero
  }
  set IsMoving(t) {
    this.Ero !== t && ((this.Ero = t) ? (this.Xte?.AddTag(197059111), this.Xte?.RemoveTag(-1443491052)) : (this.Xte?.AddTag(-1443491052), this.Xte?.RemoveTag(197059111)))
  }
  get IsLocked() {
    return this.x1n
  }
  OnInitData(t) {
    var e = this.Entity?.GetComponent(0);
    return e?.PbSceneItemAttributeIds && (this.AttributeIdSet = new Set(e.PbSceneItemAttributeIds)), !0
  }
  OnStart() {
    var t = this.Entity?.GetComponent(0);
    return this.Xte = this.Entity?.GetComponent(196), this.cen = this.Entity?.GetComponent(133), t && (t = t.GetPbEntityInitData()) && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityStateComponent"), this.A1n = t?.LockConfig, this.A1n) && (this.Xrh || (this.Xrh = this.Xte?.ListenForTagAddOrRemove(-662723379, this.zrh)), this.DT1 || (this.DT1 = this.Xte?.ListenForTagAddOrRemove(-1584109024, this.BT1)), this.B1n(), this.Jrh()), !0
  }
  OnEnd() {
    return this.Xrh && (this.Xrh.EndTask(), this.Xrh = void 0), this.DT1 && (this.DT1.EndTask(), this.DT1 = void 0), this.AttributeIdSet = void 0, this.Xte.HasTag(-1584109024) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityBeSlashAim, this.Entity, !1), !0
  }
  B1n() {
    if (this.A1n) {
      switch (this.A1n?.LockType) {
        case "Program":
          this.P1n = -2073998558;
          break;
        case "Blackstone":
          this.P1n = 1023182128;
          break;
        case "Holovision":
          this.P1n = 1479110609;
          break;
        default:
          this.P1n = -1900469744
      }
      this.x1n = !1, this.Xte.HasTag(-662723379) && (this.x1n = !0, this.Xte.AddTag(this.P1n)), this.Xte.HasTag(-1584109024) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityBeSlashAim, this.Entity, !0)
    }
  }
  SetIsBeingTargeted(t) {
    t ? this.Xte.HasTag(712704422) || this.Xte.AddTag(712704422) : this.Xte.HasTag(712704422) && this.Xte.RemoveTag(712704422)
  }
  Jrh() {
    if (this.AttributeIdSet && this.Xte)
      for (const t of this.AttributeIdSet) this.Xte.HasTag(t) || this.Xte.AddTag(t);
    this.Yrh = !0
  }
  HandleAttributeChanged(t, e) {
    this.AttributeIdSet || (this.AttributeIdSet = new Set), e ? this.AttributeIdSet.add(t) : this.AttributeIdSet.delete(t), this.Yrh && (e ? this.Xte?.AddTag(t) : this.Xte?.RemoveTag(t))
  }
};
SceneItemPropertyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(130)], SceneItemPropertyComponent), exports.SceneItemPropertyComponent = SceneItemPropertyComponent;
//# sourceMappingURL=SceneItemPropertyComponent.js.map