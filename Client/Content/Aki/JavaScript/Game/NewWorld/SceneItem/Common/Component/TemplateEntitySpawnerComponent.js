"use strict";
var TemplateEntitySpawnerComponent_1, __decorate = this && this.__decorate || function(t, e, n, o) {
  var i, r = arguments.length,
    s = r < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, o);
  else
    for (var a = t.length - 1; 0 <= a; a--)(i = t[a]) && (s = (r < 3 ? i(s) : 3 < r ? i(e, n, s) : i(e, n)) || s);
  return 3 < r && s && Object.defineProperty(e, n, s), s
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TemplateEntitySpawnerComponent = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
let TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent_1 = class TemplateEntitySpawnerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.EIe = void 0, this.kHa = void 0, this.kT1 = [], this.Wz1 = !1, this.kW1 = new Set, this.OT1 = new Map, this.OW1 = new Set, this.FT1 = t => {
      if (this.kHa = void 0, t) {
        for (const r of this.kT1) {
          var e = [],
            n = r.Zy1?.Zy1;
          if (void 0 !== n)
            for (const s of n) e.push(s);
          var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(r.w5n));
          if (o && o.Entity) {
            this.kW1.add(o.Entity);
            for (const a of e) this.OT1.has(a) || this.OT1.set(a, new Set), this.OT1.get(a).add(o.Entity)
          }
        }
        for (var [, i] of this.OT1) ControllerHolder_1.ControllerHolder.SlashGameplayController.AddGroupEntities(i);
        this.Wz1 && this.qW1()
      } else Log_1.Log.CheckError() && Log_1.Log.Error("TemplateEntitySpawner", 31, "[TemplateEntitySpawner] 生成实体失败或者等待超时")
    }, this.GW1 = () => {
      for (const t of this.kW1) {
        const e = t.GetComponent(205);
        e && TimerSystem_1.TimerSystem.Next(() => {
          e.RemoveTag(1090344258)
        })
      }
    }
  }
  OnInitData(t) {
    t = t.GetParam(TemplateEntitySpawnerComponent_1)[0];
    return this.Wz1 = t.SpawnConfig.IsInitHide ?? !1, !0
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    var t = [];
    for (const e of this.EIe.SpawnedEntityInfos) t.push(MathUtils_1.MathUtils.LongToNumber(e.w5n));
    return this.kT1 = this.EIe.SpawnedEntityInfos, this.kW1.clear(), 0 < t.length && (this.kHa = WaitEntityTask_1.WaitEntityTask.Create("TemplateEntitySpawnerComponent", t, this.FT1)), !0
  }
  OnEnd() {
    this.kHa && this.kHa.Cancel();
    for (var [, t] of this.OT1) ControllerHolder_1.ControllerHolder.SlashGameplayController.RemoveGroupEntities(t);
    return !0
  }
  OnNotifyUpdateContent(t) {
    var e = [];
    for (const n of t) e.push(MathUtils_1.MathUtils.LongToNumber(n.w5n));
    this.kT1 = t, 0 < e.length && (this.kHa = WaitEntityTask_1.WaitEntityTask.Create("TemplateEntitySpawnerComponent", e, this.FT1, -1))
  }
  qW1() {
    for (const n of this.kW1) {
      var t = n.GetComponent(202);
      if (t) {
        var e = n.GetComponent(205);
        if (e) {
          if (e.AddTag(1090344258), !t.GetIsSceneInteractionLoadCompleted()) {
            this.OW1.add(n);
            const o = () => {
              EventSystem_1.EventSystem.RemoveWithTarget(n, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, o), this.OW1.delete(n), 0 === this.OW1.size && this.GW1()
            };
            EventSystem_1.EventSystem.AddWithTarget(n, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, o)
          }
          TimerSystem_1.TimerSystem.Next(() => {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, !0, "TemplateEntitySpawnerComponent", !0)
          })
        }
      }
    }
  }
};
TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(289)], TemplateEntitySpawnerComponent), exports.TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent;
//# sourceMappingURL=TemplateEntitySpawnerComponent.js.map