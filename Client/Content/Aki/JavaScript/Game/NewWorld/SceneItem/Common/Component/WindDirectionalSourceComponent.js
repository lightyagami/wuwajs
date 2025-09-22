"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        s = (r < 3 ? o(s) : r > 3 ? o(e, i, s) : o(e, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindDirectionalSourceComponent = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
let WindDirectionalSourceComponent = class WindDirectionalSourceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.C8c = undefined;
    this.QJr = undefined;
    this.p8c = undefined;
    this.v8c = undefined;
    this.y8c = undefined;
    this.g_n = (t, e) => {
      var i;
      var n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      if (n) {
        if (i = this.y8c?.get(n)) {
          this.v8c?.SetStrength(i.Strength);
          this.v8c?.SetSpeed(i.Speed);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelPlay", 72, "[WindDirectionalSourceComponent]实体状态切换到了风力组件没有配置 " + n);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 72, "[WindDirectionalSourceComponent]实体状态没有对应的TagName，可能漏提交了 " + t);
      }
    };
  }
  get S8c() {
    if (this.p8c && this.p8c.WindSource.Type === IComponent_1.EWindSourceType.Directional) {
      return 0;
    } else {
      return 2;
    }
  }
  OnInitData(t) {
    var e = this.Entity?.GetComponent(0);
    if (!e) {
      return false;
    }
    e = e.GetPbEntityInitData();
    if (!e) {
      return false;
    }
    this.C8c = (0, IComponent_1.getComponent)(e.ComponentsData, "EntityStateComponent");
    this.p8c = (0, IComponent_1.getComponent)(e.ComponentsData, "WindSourceComponent");
    if (!this.p8c || !this.C8c) {
      return false;
    }
    this.y8c = new Map();
    for (const i of this.p8c.WindSource.Grades) {
      this.y8c.set(i.State, i);
    }
    return this.p8c !== undefined;
  }
  OnStart() {
    var t;
    this.QJr = this.Entity.GetComponent(1);
    if (this.QJr?.Owner?.IsValid()) {
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        this.v8c = ue_1.KuroRenderingEditorBPPluginBPLibrary.AddInstanceComponent(this.QJr.Owner, ue_1.WindDirectionalSourceComponent.StaticClass());
        this.v8c.K2_AttachToComponent(this.QJr.Owner.RootComponent, FNameUtil_1.FNameUtil.NONE, 2, 2, 2, false);
      } else {
        this.v8c = this.QJr?.Owner?.D_AddComponentByClass(ue_1.WindDirectionalSourceComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransformDouble, false);
      }
      if (this.p8c) {
        t = this.p8c.WindSource.Rot;
        MathUtils_1.MathUtils.CommonTempRotator.Set(t.Y ?? 0, t.Z ?? 0, t.X ?? 0);
        this.v8c.K2_SetRelativeRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), false, undefined, false);
      }
      this.v8c?.SetWindType(this.S8c);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      return this.QJr !== undefined;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 72, "[WindDirectionalSourceComponent]实体没有Owner Actor");
      }
      return false;
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    if (this.QJr?.Owner?.IsValid() && this.v8c) {
      this.QJr.Owner.K2_DestroyComponent(this.v8c);
    }
    return true;
  }
  OnActivate() {
    this.g_n(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.C8c.State), true);
  }
  OnDisable() {
    this.v8c?.Deactivate();
  }
  OnEnable() {
    this.v8c?.Activate();
    return true;
  }
};
WindDirectionalSourceComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(290)], WindDirectionalSourceComponent);
exports.WindDirectionalSourceComponent = WindDirectionalSourceComponent; //# sourceMappingURL=WindDirectionalSourceComponent.js.map