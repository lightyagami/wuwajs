"use strict";

var __decorate = this && this.__decorate || function (t, e, a, i) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, a) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, a, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
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
exports.LevelTagComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const BaseTagComponent_1 = require("./BaseTagComponent");
const shouldNotifyTagType = [2128634312, 992548024];
let LevelTagComponent = class LevelTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.Jrn = new Map();
    this.zrn = 0;
  }
  get NotifyLock() {
    return this.zrn;
  }
  set NotifyLock(t) {
    if (t !== this.zrn && (this.zrn = t, this.zrn === 0)) {
      this.NotifyTagChanged();
    }
  }
  OnInitData() {
    super.OnInitData();
    this.Jrn.clear();
    this.u1t = this.Entity.GetComponent(0);
    if (this.u1t) {
      var t = this.u1t.GetPbDataId();
      var e = this.u1t.GetCreatureDataId();
      for (const a of this.u1t.GetEntityCommonTags()) {
        this.Zrn(a);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Entity", 19, "初始添加标签:", ["pbDataId", t], ["creatureDataId", e], ["tagId", a], ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(a)]);
        }
      }
    }
    return true;
  }
  OnStart() {
    super.OnStart();
    var t = this.Entity.GetComponent(0);
    if (t?.IsConcealed) {
      this.AddTag(1227933697);
    }
    var t = t?.GetModelComponent()?.PerformanceTags;
    if (t) {
      for (const e of t) {
        if (GameplayTagUtils_1.GameplayTagUtils.IsChildTag(e, 991613615)) {
          this.AddTag(e);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Entity", 39, "实体配置了非【关卡.Common.表现】子Tag的客户端模型表现Tag，请检查配置", ["pbDataId", this.u1t?.GetPbDataId()], ["creatureDataId", this.u1t?.GetCreatureDataId()], ["tagId", e], ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
        }
      }
    }
    return true;
  }
  OnTick(t) {
    if (this.NotifyLock) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 7, "Notifylock在Tick结束时不为0", ["pbDataId", this.u1t?.GetPbDataId()], ["LockCount", this.NotifyLock]);
      }
      this.NotifyLock = 0;
    }
  }
  GetTagNames() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      var t = new Array();
      for (const a of this.GetTagIds()) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(a);
        if (!t.includes(e)) {
          t.push(e);
        }
      }
      return t;
    }
  }
  ContainsTag(t) {
    t = t?.TagId;
    return t !== undefined && this.HasTag(t);
  }
  ContainsTagByName(t) {
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    return t !== undefined && this.HasTag(t);
  }
  AddTag(t) {
    this.NotifyLock++;
    super.AddTag(t);
    this.NotifyLock--;
  }
  RemoveTag(t) {
    this.NotifyLock++;
    t = super.RemoveTag(t);
    this.NotifyLock--;
    return t;
  }
  ChangeLocalLevelTag(t, e) {
    this.NotifyLock++;
    this.RemoveTag(e);
    this.AddTag(t);
    this.NotifyLock--;
  }
  Zrn(t) {
    var e;
    if (!this.HasTag(t)) {
      if ((e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 17, "要添加的tagId找不到对应的gameplayTag", ["tagId", t]);
        }
      } else {
        this.NotifyLock++;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Entity", 17, "添加服务端标签:", ["pbDataId", this.u1t?.GetPbDataId()], ["creatureDataId", this.u1t?.GetCreatureDataId()], ["tagId", t], ["tagName", e]);
        }
        this.TagContainer.AddExactTag(3, t);
        this.NotifyLock--;
      }
    }
  }
  enn(t) {
    if (!(this.TagContainer.GetRawTagCount(3, t) <= 0)) {
      this.NotifyLock++;
      this.TagContainer.RemoveExactTag(3, t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 17, "移除服务端标签:", ["pbDataId", this.u1t.GetPbDataId()], ["creatureDataId", this.u1t.GetCreatureDataId()], ["tagId", t], ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
      }
      this.NotifyLock--;
    }
  }
  SyncTagsFromServer(t) {
    for (const a of t) {
      var e = a.m5n;
      if (a.lWn) {
        this.Zrn(e);
      } else {
        this.enn(e);
      }
    }
  }
  AddServerTagByIdLocal(t, e) {
    this.Zrn(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 36, "通过客户端添加服务器下发的Tag", ["原因", e]);
    }
  }
  RemoveServerTagByIdLocal(t, e) {
    this.enn(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 36, "通过客户端移除服务器下发的Tag", ["原因", e]);
    }
  }
  NotifyTagChanged() {
    var t = [];
    var e = [];
    for (const s of this.Jrn.keys()) {
      var a = this.Jrn.get(s);
      var i = this.GetTagCount(s);
      if (a > 0 && i <= 0) {
        e.push(s);
      } else if (a <= 0 && i > 0) {
        t.push(s);
      }
    }
    this.Jrn.clear();
    let o = false;
    if (t.length > 0) {
      for (const r of t) {
        if (this.tnn(r)) {
          o = true;
          break;
        }
      }
    }
    if (!o && e.length > 0) {
      for (const n of e) {
        if (this.tnn(n)) {
          o = true;
          break;
        }
      }
    }
    if (o) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnLevelTagChanged, t, e);
    }
  }
  *GetTagIds() {
    for (const t of this.TagContainer.GetAllExactTags()) {
      yield t;
    }
  }
  OnAnyTagChanged(t, e, a, i) {
    if (t !== undefined && a !== e && !(super.OnAnyTagChanged(t, e, a, i), this.Jrn.has(t))) {
      this.Jrn.set(t, a);
    }
  }
  tnn(t) {
    for (const e of shouldNotifyTagType) {
      if (GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e)) {
        return true;
      }
    }
    return false;
  }
};
LevelTagComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(197)], LevelTagComponent);
exports.LevelTagComponent = LevelTagComponent; //# sourceMappingURL=LevelTagComponent.js.map