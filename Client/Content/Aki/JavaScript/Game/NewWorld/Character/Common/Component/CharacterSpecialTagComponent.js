"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var a = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        a = (r < 3 ? o(a) : r > 3 ? o(e, i, a) : o(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSpecialTagComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialTagListener {
  constructor() {
    this.Lie = undefined;
    this.Dsg = 0;
    this.lNe = true;
    this.Usg = false;
    this.xsg = [];
    this.Bsg = [];
    this.ksg = new Set();
    this.yzt = undefined;
    this.qsg = (t, e) => {
      this.Usg = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] TagListenerStateChange", ["tagId", t], ["tagExist", e]);
      }
      this._Fe(0);
      this.Osg();
    };
    this.Gsg = (t, e) => {
      if (e) {
        if (!this.ksg.has(t)) {
          this.ksg.add(t);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[SpecialTagListener] ForbidTagSet", ["add", t], ["size", this.ksg.size]);
          }
        }
      } else if (this.ksg.has(t) && (this.ksg.delete(t), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] ForbidTagSet", ["delete", t], ["size", this.ksg.size]);
      }
      this._Fe(0);
      this.Osg();
    };
  }
  InitTagListener(t, e, i, s, o) {
    this.Lie = t;
    this.Dsg = e;
    this.Bsg = s;
    this.xsg = i;
    this.yzt = o;
    if (this.Lie) {
      this.Lie.AddTagAddOrRemoveListener(this.Dsg, this.qsg);
      for (const r of this.xsg) {
        this.Lie.AddTagAddOrRemoveListener(r, this.Gsg);
      }
    }
  }
  ClearTagListener() {
    if (this.Lie) {
      this.Lie.RemoveTagAddOrRemoveListener(this.Dsg, this.qsg);
      for (const t of this.xsg) {
        this.Lie.RemoveTagAddOrRemoveListener(t, this.Gsg);
      }
    }
  }
  Osg() {
    if (this.Lie) {
      var t = this.ksg.size > 0 || !this.Usg || !this.lNe;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] UpdateTargetTagList", ["forbid", this.ksg.size], ["HasListenerTag", this.Usg], ["Condition", this.lNe]);
      }
      for (const e of this.Bsg) {
        if (!t && !this.Lie.HasTag(e)) {
          this.Lie.AddTag(e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[SpecialTagListener] AddTag", ["tag", e]);
          }
        }
        if (t && this.Lie.HasTag(e) && (this.Lie.RemoveTag(e), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Character", 42, "[SpecialTagListener] RemoveTag", ["tag", e]);
        }
      }
    }
  }
  _Fe(t) {
    return !!this.yzt && (t = this.yzt(t), this.lNe !== t) && (this.lNe = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 42, "[SpecialTagListener] SetCondition", ["value", t]), true);
  }
  UpdateCondition(t) {
    if (this._Fe(t)) {
      this.Osg();
    }
  }
}
class SpecialTagConfig {
  constructor() {
    this.e2g = undefined;
  }
  Init(t, e, i) {
    if (e && t) {
      var s = e.SpecialTagListener.SpecialTagListener.TagId;
      var o = [];
      for (let t = 0; t < e.SpecialTagListener.ForbidTagList.GameplayTags.Num(); t++) {
        o.push(e.SpecialTagListener.ForbidTagList.GameplayTags.Get(t).TagId);
      }
      var r = [];
      for (let t = 0; t < e.SpecialTagListener.TargetTagList.GameplayTags.Num(); t++) {
        r.push(e.SpecialTagListener.TargetTagList.GameplayTags.Get(t).TagId);
      }
      this.e2g = new SpecialTagListener();
      this.e2g.InitTagListener(t, s, o, r, i);
    }
  }
  Clear() {
    this.e2g?.ClearTagListener();
  }
  UpdateCondition(t) {
    this.e2g?.UpdateCondition(t);
  }
}
let CharacterSpecialTagComponent = class CharacterSpecialTagComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Fsg = 0;
    this.Nsg = new Map();
    this.Lie = undefined;
  }
  OnStart() {
    this.Lie = this.Entity.GetComponent(217);
    return true;
  }
  OnTick(t) {
    if (this.Nsg.size) {
      for (const e of this.Nsg.values()) {
        e.UpdateCondition(t);
      }
    }
  }
  OnEnd() {
    for (const t of this.Nsg) {
      t[1].Clear();
    }
    return true;
  }
  InitTagListenerConfig(t, i) {
    const s = this.Fsg++;
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_SpecialTagConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_SpecialTagConfig_C, t => {
        var e;
        if (t && this.Lie) {
          (e = new SpecialTagConfig()).Init(this.Lie, t, i);
          this.Nsg.set(s, e);
        }
      });
    });
    return s;
  }
  RemoveTagListenerConfig(t) {
    if (this.Nsg.has(t)) {
      this.Nsg.get(t).Clear();
      this.Nsg.delete(t);
    }
  }
};
CharacterSpecialTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(218)], CharacterSpecialTagComponent);
exports.CharacterSpecialTagComponent = CharacterSpecialTagComponent; //# sourceMappingURL=CharacterSpecialTagComponent.js.map