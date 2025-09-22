"use strict";

var TemplateEntitySpawnerComponent_1;
var __decorate = this && this.__decorate || function (t, e, n, o) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, n, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(e, n, s) : i(e, n)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateEntitySpawnerComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
let TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent_1 = class TemplateEntitySpawnerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.kHa = undefined;
    this.hb1 = [];
    this._Z1 = false;
    this.vQ1 = new Set();
    this.lb1 = new Map();
    this.yQ1 = new Set();
    this.cb1 = t => {
      this.kHa = undefined;
      if (t) {
        for (const r of this.hb1) {
          var e = [];
          var n = r.ES1?.ES1;
          if (n !== undefined) {
            for (const s of n) {
              e.push(s);
            }
          }
          var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(r.w5n));
          if (o && o.Entity) {
            this.vQ1.add(o.Entity);
            for (const a of e) {
              if (!this.lb1.has(a)) {
                this.lb1.set(a, new Set());
              }
              this.lb1.get(a).add(o.Entity);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TemplateEntitySpawner", 31, "[TemplateEntitySpawner] 未找到实体", ["id", r.w5n]);
          }
        }
        for (var [, i] of this.lb1) {
          ControllerHolder_1.ControllerHolder.SlashGameplayController.AddGroupEntities(i);
        }
        if (this._Z1) {
          this.SQ1();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TemplateEntitySpawner", 31, "[TemplateEntitySpawner] 生成实体失败或者等待超时");
      }
    };
    this.MQ1 = () => {
      for (const t of this.vQ1) {
        const e = t.GetComponent(206);
        if (e) {
          TimerSystem_1.TimerSystem.Next(() => {
            e.RemoveTag(1090344258);
          });
        }
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(TemplateEntitySpawnerComponent_1)[0];
    this._Z1 = t.SpawnConfig.IsInitHide ?? false;
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    var t = [];
    for (const e of this.EIe.SpawnedEntityInfos) {
      t.push(MathUtils_1.MathUtils.LongToNumber(e.w5n));
    }
    this.hb1 = this.EIe.SpawnedEntityInfos;
    this.vQ1.clear();
    if (t.length > 0) {
      this.kHa = WaitEntityTask_1.WaitEntityTask.Create("TemplateEntitySpawnerComponent", t, this.cb1, -1, false, true);
    }
    return true;
  }
  OnEnd() {
    if (this.kHa) {
      this.kHa.Cancel();
    }
    for (var [, t] of this.lb1) {
      ControllerHolder_1.ControllerHolder.SlashGameplayController.RemoveGroupEntities(t);
    }
    return true;
  }
  OnNotifyUpdateContent(t) {
    var e = [];
    for (const n of t) {
      e.push(MathUtils_1.MathUtils.LongToNumber(n.w5n));
    }
    this.hb1 = t;
    if (e.length > 0) {
      this.kHa = WaitEntityTask_1.WaitEntityTask.Create("TemplateEntitySpawnerComponent", e, this.cb1, -1, false, true);
    }
  }
  SQ1() {
    for (const n of this.vQ1) {
      var t = n.GetComponent(203);
      if (t) {
        var e = n.GetComponent(206);
        if (e) {
          e.AddTag(1090344258);
          if (!t.GetIsSceneInteractionLoadCompleted()) {
            this.yQ1.add(n);
            const o = () => {
              EventSystem_1.EventSystem.RemoveWithTarget(n, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, o);
              this.yQ1.delete(n);
              if (this.yQ1.size === 0) {
                this.MQ1();
              }
            };
            EventSystem_1.EventSystem.AddWithTarget(n, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, o);
          }
          TimerSystem_1.TimerSystem.Next(() => {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, true, "TemplateEntitySpawnerComponent");
          });
        }
      }
    }
  }
};
TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(296)], TemplateEntitySpawnerComponent);
exports.TemplateEntitySpawnerComponent = TemplateEntitySpawnerComponent; //# sourceMappingURL=TemplateEntitySpawnerComponent.js.map