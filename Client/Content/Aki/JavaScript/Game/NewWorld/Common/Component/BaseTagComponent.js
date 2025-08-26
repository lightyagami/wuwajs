"use strict";

var BaseTagComponent_1;
var __decorate = this && this.__decorate || function (e, t, a, n) {
  var o;
  var s = arguments.length;
  var i = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, a) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, a, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (o = e[r]) {
        i = (s < 3 ? o(i) : s > 3 ? o(t, a, i) : o(t, a)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(t, a, i);
  }
  return i;
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
  StartTask(e, t, a, n) {
    this.Qor = e;
    this.B7 = t;
    this.Xte = a;
    this.Xte?.AddTagAddOrRemoveListener(this.Qor, t, n);
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
  StartTask(e, t, a, n) {
    this.Qor = e;
    this.B7 = t;
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
    this.TagContainer.AddAnyTagListener((e, t, a, n) => {
      this.OnAnyTagChanged(e, t, a, n);
    });
    return true;
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    let t = undefined;
    if ((t = (e?.IsVehicle() ? this.Entity.GetComponent(235) : this.Entity.GetComponent(3))?.Actor?.AbilitySystemComponent)?.IsValid()) {
      this.TagContainer.BindTsTagContainer(t);
    }
    return true;
  }
  OnEnd() {
    this.TagContainer.Clear();
    return true;
  }
  Emit(e, t, ...a) {
    if (e !== undefined && t !== undefined) {
      var n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
      for (const o of [...t]) {
        try {
          o(...a);
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Event", 19, "tag事件回调执行异常", e, ["tag", n], ["error", e.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 19, "tag事件回调执行异常", ["tag", n], ["error", e]);
          }
        }
      }
    }
  }
  AddTag(e) {
    if (e !== undefined) {
      this.TagContainer.AddExactTag(1, e);
    }
  }
  RemoveTag(e) {
    return e !== undefined && (this.TagContainer.RemoveTag(1, e), this.TagContainer.RemoveTag(4, e), true);
  }
  HasTag(e) {
    return this.TagContainer.ContainsTag(e);
  }
  HasExactTag(e) {
    return this.TagContainer.ContainsExactTag(e);
  }
  HasAnyTag(e) {
    for (const t of e) {
      if (this.HasTag(t)) {
        return true;
      }
    }
    return false;
  }
  HasAllTag(e) {
    for (const t of e) {
      if (!this.HasTag(t)) {
        return false;
      }
    }
    return true;
  }
  GetTagCount(e) {
    if (e === undefined) {
      return 0;
    } else {
      return this.TagContainer.GetTagCount(e);
    }
  }
  ListenForTagAddOrRemove(e, t, a) {
    var n;
    if (e !== undefined && t) {
      (n = new TagSwitchedTask()).StartTask(e, t, this, a);
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
    }
  }
  HasTagAddOrRemoveListener(e, t) {
    e = this.TagSwitchedCallbacks.get(e);
    return !!e && e?.has(t);
  }
  AddTagAddOrRemoveListener(t, a, e) {
    if (t !== undefined && a) {
      let e = this.TagSwitchedCallbacks.get(t);
      if (!e) {
        this.TagSwitchedCallbacks.set(t, e = new Set());
      }
      if (e.has(a)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 19, "重复添加回调函数", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)], ["callbackName", a.name]);
        }
      } else {
        e.add(a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)], ["callbackName", a?.name]);
    }
  }
  RemoveTagAddOrRemoveListener(e, t) {
    e = this.TagSwitchedCallbacks.get(e);
    if (e) {
      e.delete(t);
    }
  }
  ListenForTagAnyCountChanged(e, t) {
    var a;
    if (e !== undefined && t) {
      (a = new TagChangedTask()).StartTask(e, t, this);
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
    }
  }
  AddTagChangedListener(t, a, e) {
    if (t !== undefined && a) {
      let e = this.TagChangedCallbacks.get(t);
      if (!e) {
        this.TagChangedCallbacks.set(t, e = new Set());
      }
      if (e.has(a)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 19, "重复添加回调函数", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)], ["callbackName", a.name]);
        }
      } else {
        e.add(a);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 19, "回调函数添加失败", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
    }
  }
  RemoveTagChangedListener(e, t) {
    e = this.TagChangedCallbacks.get(e);
    if (e) {
      e.delete(t);
    }
  }
  GetTagDebugStrings() {
    return this.TagContainer?.GetDebugString() ?? "";
  }
  OnAnyTagChanged(e, t, a, n) {
    var o;
    BaseTagComponent_1.Pc_.Start();
    if (e !== undefined && a !== t) {
      BaseTagComponent_1.wc_.Start();
      if (a > 0 != (o = t > 0)) {
        this.Emit(e, this.TagSwitchedCallbacks.get(e), e, o);
      }
      this.Emit(e, this.TagChangedCallbacks.get(e), t, e, n, a);
      BaseTagComponent_1.wc_.Stop();
      BaseTagComponent_1.Uc_.Start();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnGameplayTagChanged, e, a, t);
      BaseTagComponent_1.Uc_.Stop();
      BaseTagComponent_1.Dc_.Start();
      if (o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)) {
        EventSystem_1.EventSystem.EmitWithTarget(o, EventDefine_1.EEventName.OnGlobalGameplayTagChanged, this.Entity.Id, e, a, t);
      }
      BaseTagComponent_1.Dc_.Stop();
      this.Entity.GetComponent(210)?.OnTagChanged(e);
    }
    BaseTagComponent_1.Pc_.Stop();
  }
  GetChildrenTags(e) {
    var t = [];
    for (const a of this.TagContainer.GetAllExactTags()) {
      if (a !== e && GameplayTagUtils_1.GameplayTagUtils.IsChildTag(a, e)) {
        t.push(a);
      }
    }
    return t;
  }
};
BaseTagComponent.Rc_ = new Map();
BaseTagComponent.Pc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged");
BaseTagComponent.wc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged.Callbacks");
BaseTagComponent.Uc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged.OnGameplayTagChanged");
BaseTagComponent.Dc_ = Stats_1.Stat.Create("BaseTagComponent.OnAnyTagChanged.OnGlobalGameplayTagChanged");
BaseTagComponent = BaseTagComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(206)], BaseTagComponent);
exports.BaseTagComponent = BaseTagComponent; //# sourceMappingURL=BaseTagComponent.js.map