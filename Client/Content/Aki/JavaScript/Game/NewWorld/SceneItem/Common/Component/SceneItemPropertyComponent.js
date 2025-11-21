"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var n = arguments.length;
  var o = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        o = (n < 3 ? h(o) : n > 3 ? h(e, i, o) : h(e, i)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemPropertyComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const stateToSlashLockTag = new Map([[-3775711, -462633340], [-1984184746, -1822449795]]);
let SceneItemPropertyComponent = class SceneItemPropertyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.cen = undefined;
    this.A1n = undefined;
    this.P1n = 0;
    this.Xrh = undefined;
    this.sb1 = undefined;
    this.kx1 = 0;
    this.x1n = false;
    this.Ero = false;
    this.AttributeIdSet = undefined;
    this.Yrh = false;
    this.zrh = (t, e) => {
      if (t === -662723379) {
        if (e) {
          TimerSystem_1.TimerSystem.Next(() => {
            this.Xte?.AddTag(this.P1n);
            this.x1n = true;
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, true);
          });
        } else if (!e) {
          TimerSystem_1.TimerSystem.Next(() => {
            this.Xte?.RemoveTag(this.P1n);
            this.x1n = false;
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, false);
          });
        }
      }
    };
    this.ab1 = (t, e) => {
      if (t === -1584109024) {
        t = stateToSlashLockTag.get(this.cen.StateTagId);
        if (e) {
          if (t && !this.Xte?.HasTag(t)) {
            this.Xte?.AddTag(t);
            this.kx1 = t;
          }
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe);
          EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.oFe);
        } else {
          if (t) {
            this.Xte?.RemoveTag(t);
          }
          EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.oFe);
          EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChange, this.oFe);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityBeSlashAim, this.Entity, e);
      }
    };
    this.oFe = t => {
      t = stateToSlashLockTag.get(t);
      if (t) {
        if (!this.Xte.HasTag(t)) {
          this.Xte.RemoveTag(this.kx1);
          this.Xte.AddTag(t);
          this.kx1 = t;
        }
      } else {
        this.Xte.RemoveTag(this.kx1);
        this.kx1 = 0;
      }
    };
  }
  get IsMoving() {
    return this.Ero;
  }
  set IsMoving(t) {
    if (this.Ero !== t) {
      if (this.Ero = t) {
        this.Xte?.AddTag(197059111);
        this.Xte?.RemoveTag(-1443491052);
      } else {
        this.Xte?.AddTag(-1443491052);
        this.Xte?.RemoveTag(197059111);
      }
    }
  }
  get IsLocked() {
    return this.x1n;
  }
  OnInitData(t) {
    var e = this.Entity?.GetComponent(0);
    if (e?.PbSceneItemAttributeIds) {
      this.AttributeIdSet = new Set(e.PbSceneItemAttributeIds);
    }
    return true;
  }
  OnStart() {
    var t = this.Entity?.GetComponent(0);
    this.Xte = this.Entity?.GetComponent(200);
    this.cen = this.Entity?.GetComponent(137);
    if ((t &&= t.GetPbEntityInitData()) && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityStateComponent"), this.A1n = t?.LockConfig, this.A1n)) {
      this.Xrh ||= this.Xte?.ListenForTagAddOrRemove(-662723379, this.zrh);
      this.sb1 ||= this.Xte?.ListenForTagAddOrRemove(-1584109024, this.ab1);
      this.B1n();
      this.Jrh();
    }
    return true;
  }
  OnEnd() {
    if (this.Xrh) {
      this.Xrh.EndTask();
      this.Xrh = undefined;
    }
    if (this.sb1) {
      this.sb1.EndTask();
      this.sb1 = undefined;
    }
    this.AttributeIdSet = undefined;
    if (this.Xte.HasTag(-1584109024)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityBeSlashAim, this.Entity, false);
    }
    return true;
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
          this.P1n = -1900469744;
      }
      this.x1n = false;
      if (this.Xte.HasTag(-662723379)) {
        this.x1n = true;
        this.Xte.AddTag(this.P1n);
      }
      if (this.Xte.HasTag(-1584109024)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityBeSlashAim, this.Entity, true);
      }
    }
  }
  SetIsBeingTargeted(t) {
    if (t) {
      if (!this.Xte.HasTag(712704422)) {
        this.Xte.AddTag(712704422);
      }
    } else if (this.Xte.HasTag(712704422)) {
      this.Xte.RemoveTag(712704422);
    }
  }
  Jrh() {
    if (this.AttributeIdSet && this.Xte) {
      for (const t of this.AttributeIdSet) {
        if (!this.Xte.HasTag(t)) {
          this.Xte.AddTag(t);
        }
      }
    }
    this.Yrh = true;
  }
  HandleAttributeChanged(t, e) {
    this.AttributeIdSet ||= new Set();
    if (e) {
      this.AttributeIdSet.add(t);
    } else {
      this.AttributeIdSet.delete(t);
    }
    if (this.Yrh) {
      if (e) {
        this.Xte?.AddTag(t);
      } else {
        this.Xte?.RemoveTag(t);
      }
    }
  }
};
SceneItemPropertyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(134)], SceneItemPropertyComponent);
exports.SceneItemPropertyComponent = SceneItemPropertyComponent; //# sourceMappingURL=SceneItemPropertyComponent.js.map