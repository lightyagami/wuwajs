"use strict";

var SceneItemInhalationComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        r = (s < 3 ? o(r) : s > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemInhalationComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
let SceneItemInhalationComponent = SceneItemInhalationComponent_1 = class SceneItemInhalationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Ear = undefined;
    this.vtn = undefined;
    this.mBe = undefined;
    this._ii = undefined;
    this.Jel = new Map();
    this.Zel = new Set();
    this.g_n = (t, e) => {
      if (this.vtn !== undefined && this.mBe !== undefined && this.Ear !== undefined && t !== this._ii) {
        this._ii = t;
        t = this.vtn.GetEntitiesInRangeLocal();
        if (t !== undefined) {
          for (var [, i] of t) {
            i = i.Entity;
            if (i !== undefined) {
              if (this.zel(i)) {
                if (!this.Zel.has(i)) {
                  i.GetComponent(289).StartInhalation(this.Entity);
                  this.Zel.add(i);
                }
              } else if (this.Zel.has(i)) {
                i.GetComponent(289).StopInhalation();
                this.Zel.delete(i);
              }
            }
          }
        }
      }
    };
  }
  OnInitData(t) {
    this.Lo = t.GetParam(SceneItemInhalationComponent_1)[0];
    var n = this.Lo.InhalationConfigs;
    for (let i = 0; i < n.length; i++) {
      var o = n[i];
      if (o.InhalationPerformance.Type !== IComponent_1.EInhalationPerformanceType.SceneItem) {
        return false;
      }
      o = o.InhalationMatching.EntityMatch.SelfState;
      let t = -1;
      if (o !== undefined) {
        t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
      }
      let e = this.Jel.get(t);
      if (e === undefined) {
        e = new Set();
        this.Jel.set(t, e);
      }
      e.add(i);
    }
    return true;
  }
  OnStart() {
    this.Ear = this.Entity.GetComponent(214);
    this.vtn = this.Entity.GetComponent(91);
    this.mBe = this.Entity.GetComponent(144);
    this._ii = this.mBe?.StateTagId;
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    return true;
  }
  OnActivate() {
    if (this.vtn !== undefined && this.mBe !== undefined && this.Ear !== undefined) {
      var t = this.vtn.GetEntitiesInRangeLocal();
      if (t !== undefined) {
        for (var [, e] of t) {
          e = e.Entity;
          if (e !== undefined && this.zel(e)) {
            e.GetComponent(289).StartInhalation(this.Entity);
            this.Zel.add(e);
          }
        }
      }
    }
  }
  OnEnd() {
    this.vtn = undefined;
    this.mBe = undefined;
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    return false;
  }
  zel(t) {
    var e = t.GetComponent(289);
    var i = t.GetComponent(0)?.GetBaseInfo();
    var n = e?.InhaledStrength;
    if (e !== undefined && i !== undefined && n !== undefined && !e.IsHaling) {
      t = this.Jel.get(this._ii);
      if (t !== undefined && t.size !== 0) {
        for (const v of t) {
          var o = this.Lo.InhalationConfigs[v];
          if (o !== undefined) {
            var s = o.InhalationMatching.EntityMatch.EntityMatch;
            if ((s === undefined || (0, IUtil_1.isEntitiyMatch)(s, i.Category)) && !(n > o.InhalationMatching.InhalationStrength)) {
              return true;
            }
          }
        }
      }
      if ((t = this.Jel.get(-1)) !== undefined && t.size !== 0) {
        for (const a of t) {
          var r = this.Lo.InhalationConfigs[a];
          if (r !== undefined) {
            var h = r.InhalationMatching.EntityMatch.EntityMatch;
            if ((h === undefined || (0, IUtil_1.isEntitiyMatch)(h, i.Category)) && !(n > r.InhalationMatching.InhalationStrength)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
};
SceneItemInhalationComponent = SceneItemInhalationComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(290)], SceneItemInhalationComponent);
exports.SceneItemInhalationComponent = SceneItemInhalationComponent; //# sourceMappingURL=SceneItemInhalationComponent.js.map