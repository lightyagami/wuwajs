"use strict";

var BaseTagComponent_1;
var __decorate = this && this.__decorate || function (t, e, a, n) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, a) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, a, n);
  } else {
    for (var i = t.length - 1; i >= 0; i--) {
      if (o = t[i]) {
        r = (s < 3 ? o(r) : s > 3 ? o(e, a, r) : o(e, a)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, a, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseTagComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CharacterTagContainer_1 = require("../../Character/Common/Component/Abilities/CharacterTagContainer");
class TagSwitchedTask {
  constructor() {
    this.Qor = 0;
    this.B7 = undefined;
    this.Xte = undefined;
  }
  StartTask(t, e, a, n) {
    this.Qor = t;
    this.B7 = e;
    this.Xte = a;
    this.Xte?.AddTagAddOrRemoveListener(this.Qor, e, n);
  }
  EndTask() {
    this.Xte?.RemoveTagAddOrRemoveListener(this.Qor, this.B7);
  }
}
class TagChangedTask {
  constructor() {
    this.Qor = 0;
    this.B7 = undefined;
    this.Xte = undefined;
  }
  StartTask(t, e, a, n) {
    this.Qor = t;
    this.B7 = e;
    this.Xte = a;
    this.Xte?.AddTagChangedListener(this.Qor, this.B7, n);
  }
  EndTask() {
    this.Xte?.RemoveTagChangedListener(this.Qor, this.B7);
  }
}
let BaseTagComponent = BaseTagComponent_1 = class BaseTagComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.TagSwitchedCallbacks = new Map();
    this.TagChangedCallbacks = new Map();
    this.TagContainer = new CharacterTagContainer_1.TagContainer();
    this.Ac_ = new Map();
  }
  OnInit() {
    this.TagContainer.AddAnyTagListener((t, e, a, n) => {
      this.OnAnyTagChanged(t, e, a, n);
    });
    return true;
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    let e = undefined;
    if ((e = (t?.IsVehicle() ? this.Entity.GetComponent(247) : this.Entity.GetComponent(3))?.Actor?.AbilitySystemComponent)?.IsValid()) {
      this.TagContainer.BindTsTagContainer(e);
    }
    return true;
  }
  OnEnd() {
    this.TagContainer.Clear();
    return true;
  }
  Emit(t, e, ...a) {
    if (t !== undefined && e !== undefined) {
      var n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      for (const o of [...e]) {
        try {
          o(...a);
        } catch (t) {
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Event", 19, "tag事件回调执行异常", t, ["tag", n], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 19, "tag事件回调执行异常", ["tag", n], ["error", t]);
          }
        }
      }
    }
  }
  AddTag(t) {
    if (t !== undefined) {
      this.TagContainer.AddExactTag(1, t);
    }
  }
  RemoveTag(t) {
    return t !== undefined && (this.TagContainer.RemoveTag(1, t), this.TagContainer.RemoveTag(4, t), true);
  }
  HasTag(t) {
    return this.TagContainer.ContainsTag(t);
  }
  HasExactTag(t) {
    return this.TagContainer.ContainsExactTag(t);
  }
  HasAnyTag(t) {
    for (const e of t) {
      if (this.HasTag(e)) {
        return true;
      }
    }
    return false;
  }
  HasAllTag(t) {
    for (const e of t) {
      if (!this.HasTag(e)) {
        return false;
      }
    }
    return true;
  }
  GetTagCount(t) {
    if (t === undefined) {
      return 0;
    } else {
      return this.TagContainer.GetTagCount(t);
    }
  }
  ListenForTagAddOrRemove(t, e, a) {
    var n;
    if (t !== undefined && e) {
      (n = new TagSwitchedTask()).StartTask(t, e, this, a);
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
    }
  }
  HasTagAddOrRemoveListener(t, e) {
    t = this.TagSwitchedCallbacks.get(t);
    return !!t && t?.has(e);
  }
  AddTagAddOrRemoveListener(e, a, t) {
    if (e !== undefined && a) {
      let t = this.TagSwitchedCallbacks.get(e);
      if (!t) {
        this.TagSwitchedCallbacks.set(e, t = new Set());
      }
      if (t.has(a)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 19, "重复添加回调函数", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", a.name]);
        }
      } else {
        t.add(a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", a?.name]);
    }
  }
  RemoveTagAddOrRemoveListener(t, e) {
    t = this.TagSwitchedCallbacks.get(t);
    if (t) {
      t.delete(e);
    }
  }
  ListenForTagAnyCountChanged(t, e) {
    var a;
    if (t !== undefined && e) {
      (a = new TagChangedTask()).StartTask(t, e, this);
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
    }
  }
  AddTagChangedListener(e, a, t) {
    if (e !== undefined && a) {
      let t = this.TagChangedCallbacks.get(e);
      if (!t) {
        this.TagChangedCallbacks.set(e, t = new Set());
      }
      if (t.has(a)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 19, "重复添加回调函数", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", a.name]);
        }
      } else {
        t.add(a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
    }
  }
  RemoveTagChangedListener(t, e) {
    t = this.TagChangedCallbacks.get(t);
    if (t) {
      t.delete(e);
    }
  }
  GetTagDebugStrings() {
    return this.TagContainer?.GetDebugString() ?? "";
  }
  OnAnyTagChanged(t, e, a, n) {
    var o;
    BaseTagComponent_1.Pc_.Start();
    if (t !== undefined && a !== e) {
      BaseTagComponent_1.wc_.Start();
      if (a > 0 != (o = e > 0)) {
        this.Emit(t, this.TagSwitchedCallbacks.get(t), t, o);
      }
      this.Emit(t, this.TagChangedCallbacks.get(t), e, t, n, a);
      BaseTagComponent_1.wc_.Stop();
      BaseTagComponent_1.Dc_.Start();
      if (o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)) {
        EventSystem_1.EventSystem.EmitWithTarget(o, EventDefine_1.EEventName.OnGlobalGameplayTagChanged, this.Entity.Id, t, a, e);
      }
      BaseTagComponent_1.Dc_.Stop();
      this.Entity.GetComponent(220)?.OnTagChanged(t);
    }
    BaseTagComponent_1.Pc_.Stop();
  }
  GetChildrenTags(t) {
    var e = [];
    for (const a of this.TagContainer.GetAllExactTags()) {
      if (a !== t && GameplayTagUtils_1.GameplayTagUtils.IsChildTag(a, t)) {
        e.push(a);
      }
    }
    return e;
  }
};
BaseTagComponent.Rc_ = new Map();
BaseTagComponent.Pc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged");
BaseTagComponent.wc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged.Callbacks");
BaseTagComponent.Dc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged.OnGlobalGameplayTagChanged");
BaseTagComponent = BaseTagComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(215)], BaseTagComponent);
exports.BaseTagComponent = BaseTagComponent; //# sourceMappingURL=BaseTagComponent.js.map