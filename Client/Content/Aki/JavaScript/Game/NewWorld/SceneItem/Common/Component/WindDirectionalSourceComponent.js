"use strict";
var __decorate = this && this.__decorate || function(t, e, i, n) {
  var o, r = arguments.length,
    s = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, n);
  else
    for (var a = t.length - 1; 0 <= a; a--)(o = t[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(e, i, s) : o(e, i)) || s);
  return 3 < r && s && Object.defineProperty(e, i, s), s
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.WindDirectionalSourceComponent = void 0;
const ue_1 = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData");
let WindDirectionalSourceComponent = class WindDirectionalSourceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.C8c = void 0, this.QJr = void 0, this.p8c = void 0, this.v8c = void 0, this.y8c = void 0, this.g_n = (t, e) => {
      var i, n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      n ? (i = this.y8c?.get(n)) ? (this.v8c?.SetStrength(i.Strength), this.v8c?.SetSpeed(i.Speed)) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("LevelPlay", 72, "[WindDirectionalSourceComponent]实体状态切换到了风力组件没有配置 " + n) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelPlay", 72, "[WindDirectionalSourceComponent]实体状态没有对应的TagName，可能漏提交了 " + t)
    }
  }
  get S8c() {
    return this.p8c && this.p8c.WindSource.Type === IComponent_1.EWindSourceType.Directional ? 0 : 2
  }
  OnInitData(t) {
    var e = this.Entity?.GetComponent(0);
    if (!e) return !1;
    e = e.GetPbEntityInitData();
    if (!e) return !1;
    if (this.C8c = (0, IComponent_1.getComponent)(e.ComponentsData, "EntityStateComponent"), this.p8c = (0, IComponent_1.getComponent)(e.ComponentsData, "WindSourceComponent"), !this.p8c || !this.C8c) return !1;
    this.y8c = new Map;
    for (const i of this.p8c.WindSource.Grades) this.y8c.set(i.State, i);
    return void 0 !== this.p8c
  }
  OnStart() {
    var t;
    return this.QJr = this.Entity.GetComponent(1), this.QJr?.Owner?.IsValid() ? (GlobalData_1.GlobalData.IsPlayInEditor ? (this.v8c = ue_1.KuroRenderingEditorBPPluginBPLibrary.AddInstanceComponent(this.QJr.Owner, ue_1.WindDirectionalSourceComponent.StaticClass()), this.v8c.K2_AttachToComponent(this.QJr.Owner.RootComponent, FNameUtil_1.FNameUtil.NONE, 2, 2, 2, !1)) : this.v8c = this.QJr?.Owner?.D_AddComponentByClass(ue_1.WindDirectionalSourceComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransformDouble, !1), this.p8c && (t = this.p8c.WindSource.Rot, MathUtils_1.MathUtils.CommonTempRotator.Set(t.Y ?? 0, t.Z ?? 0, t.X ?? 0), this.v8c.K2_SetRelativeRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), !1, void 0, !1)), this.v8c?.SetWindType(this.S8c), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n), void 0 !== this.QJr) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelPlay", 72, "[WindDirectionalSourceComponent]实体没有Owner Actor"), !1)
  }
  OnEnd() {
    return EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n), this.QJr?.Owner?.IsValid() && this.v8c && this.QJr.Owner.K2_DestroyComponent(this.v8c), !0
  }
  OnActivate() {
    this.g_n(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.C8c.State), !0)
  }
  OnDisable() {
    this.v8c?.Deactivate()
  }
  OnEnable() {
    return this.v8c?.Activate(), !0
  }
};
WindDirectionalSourceComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(284)], WindDirectionalSourceComponent), exports.WindDirectionalSourceComponent = WindDirectionalSourceComponent;
//# sourceMappingURL=WindDirectionalSourceComponent.js.map