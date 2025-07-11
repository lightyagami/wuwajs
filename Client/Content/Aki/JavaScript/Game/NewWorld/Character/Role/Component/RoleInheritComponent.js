"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var i = arguments.length;
  var s = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var f = e.length - 1; f >= 0; f--) {
      if (r = e[f]) {
        s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleInheritComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ActiveBuffConfigs_1 = require("../../Common/Component/Abilities/Buff/ActiveBuffConfigs");
let RoleInheritComponent = class RoleInheritComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.m1t = undefined;
  }
  OnStart() {
    this.m1t = this.Entity.CheckGetComponent(174);
    return true;
  }
  static StateInherit(e, t, o, n) {
    if (e && t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "换人进入StateInherit");
      }
      e.m1t.TriggerEvents(5, t.m1t, {});
      t.m1t.TriggerEvents(4, e.m1t, {});
      this.non(e, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "换人进入RoleOnStateInherit");
      }
      EventSystem_1.EventSystem.EmitWithTarget(t.Entity, EventDefine_1.EEventName.RoleOnStateInherit, e.Entity, o === 1 || n || (t.Entity.GetComponent(205)?.HasAnyTag([-1388400236, 1144073280]) ?? false));
    }
  }
  static non(t, o) {
    for (const f of t.m1t.GetAllBuffs()) {
      var n = f.StackCount;
      if (!(n <= 0)) {
        var r = f.Handle;
        var i = f.InstigatorId;
        var s = f.Config;
        if (s.FormationPolicy === 2 || s.FormationPolicy === 3) {
          let e = f.GetRemainDuration();
          if (f.Duration > 0 && e <= 0) {
            e = ActiveBuffConfigs_1.MIN_BUFF_REMAIN_DURATION;
          }
          o.m1t.AddBuff(f.Id, {
            Level: f.Level,
            ServerId: f.ServerId,
            InstigatorId: i ?? 0,
            OuterStackCount: n,
            Duration: e,
            IsIterable: false,
            PreMessageId: f.MessageId,
            Reason: "因为状态继承导致的buff添加"
          });
          if (s.FormationPolicy === 3) {
            t.m1t.RemoveBuffByHandle(r, -1, "因为状态继承导致的移除");
          }
        }
      }
    }
  }
};
RoleInheritComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(96)], RoleInheritComponent);
exports.RoleInheritComponent = RoleInheritComponent; //# sourceMappingURL=RoleInheritComponent.js.map