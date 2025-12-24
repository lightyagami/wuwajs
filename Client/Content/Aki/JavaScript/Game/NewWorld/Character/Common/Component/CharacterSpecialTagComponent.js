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
    this.dQf = 0;
    this.lNe = true;
    this.mQf = false;
    this.fQf = [];
    this.gQf = [];
    this.CQf = new Set();
    this.pQf = (t, e) => {
      this.mQf = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] TagListenerStateChange", ["tagId", t], ["tagExist", e]);
      }
      this.vQf();
    };
    this.yQf = (t, e) => {
      if (e) {
        if (!this.CQf.has(t)) {
          this.CQf.add(t);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[SpecialTagListener] ForbidTagSet", ["add", t], ["size", this.CQf.size]);
          }
        }
      } else if (this.CQf.has(t) && (this.CQf.delete(t), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] ForbidTagSet", ["delete", t], ["size", this.CQf.size]);
      }
      this.vQf();
    };
  }
  InitTagListener(t, e, i, s) {
    this.Lie = t;
    this.dQf = e;
    this.gQf = s;
    this.fQf = i;
    if (this.Lie) {
      this.Lie.AddTagAddOrRemoveListener(this.dQf, this.pQf);
      for (const o of this.fQf) {
        this.Lie.AddTagAddOrRemoveListener(o, this.yQf);
      }
    }
  }
  ClearTagListener() {
    if (this.Lie) {
      this.Lie.RemoveTagAddOrRemoveListener(this.dQf, this.pQf);
      for (const t of this.fQf) {
        this.Lie.RemoveTagAddOrRemoveListener(t, this.yQf);
      }
    }
  }
  vQf() {
    if (this.Lie) {
      var t = this.CQf.size > 0 || !this.mQf || !this.lNe;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] UpdateTargetTagList", ["forbid", this.CQf.size], ["HasListenerTag", this.mQf], ["Condition", this.lNe]);
      }
      for (const e of this.gQf) {
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
  SetCondition(t) {
    if (this.lNe !== t) {
      this.lNe = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[SpecialTagListener] SetCondition", ["value", t]);
      }
      this.vQf();
    }
  }
}
class SpecialTagConfig {
  constructor() {
    this.CheckCondition = undefined;
    this.TagListenerInfo = undefined;
  }
  Init(t, e, i) {
    if (e && t) {
      this.CheckCondition = i;
      var i = e.SpecialTagListener.SpecialTagListener.TagId;
      var s = [];
      for (let t = 0; t < e.SpecialTagListener.ForbidTagList.GameplayTags.Num(); t++) {
        s.push(e.SpecialTagListener.ForbidTagList.GameplayTags.Get(t).TagId);
      }
      var o = [];
      for (let t = 0; t < e.SpecialTagListener.TargetTagList.GameplayTags.Num(); t++) {
        o.push(e.SpecialTagListener.TargetTagList.GameplayTags.Get(t).TagId);
      }
      this.TagListenerInfo = new SpecialTagListener();
      this.TagListenerInfo.InitTagListener(t, i, s, o);
    }
  }
  Clear() {
    this.TagListenerInfo?.ClearTagListener();
  }
  UpdateCondition(t) {
    if (this.CheckCondition) {
      this.TagListenerInfo?.SetCondition(this.CheckCondition(t));
    }
  }
}
let CharacterSpecialTagComponent = class CharacterSpecialTagComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.SQf = 0;
    this.MQf = new Map();
    this.Lie = undefined;
  }
  OnStart() {
    this.Lie = this.Entity.GetComponent(215);
    return true;
  }
  OnTick(t) {
    if (this.MQf.size) {
      for (const e of this.MQf.values()) {
        e.UpdateCondition(t);
      }
    }
  }
  OnEnd() {
    for (const t of this.MQf) {
      t[1].Clear();
    }
    return true;
  }
  InitTagListenerConfig(t, i) {
    const s = this.SQf++;
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_SpecialTagConfig_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_SpecialTagConfig_C, t => {
        var e;
        if (t && this.Lie) {
          (e = new SpecialTagConfig()).Init(this.Lie, t, i);
          this.MQf.set(s, e);
        }
      });
    });
    return s;
  }
  RemoveTagListenerConfig(t) {
    if (this.MQf.has(t)) {
      this.MQf.get(t).Clear();
      this.MQf.delete(t);
    }
  }
};
CharacterSpecialTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(216)], CharacterSpecialTagComponent);
exports.CharacterSpecialTagComponent = CharacterSpecialTagComponent; //# sourceMappingURL=CharacterSpecialTagComponent.js.map