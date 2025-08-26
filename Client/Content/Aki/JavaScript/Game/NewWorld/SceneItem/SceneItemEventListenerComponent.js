"use strict";

var SceneItemEventListenerComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, i) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, i);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (s = e[a]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, n, r) : s(t, n)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemEventListenerComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const MechanismDefine_1 = require("../../Module/MechanismTimeline/MechanismDefine");
const MechanismEventCenter_1 = require("../../Module/MechanismTimeline/MechanismEvent/MechanismEventCenter");
const SERVER_DATA = "uju";
let SceneItemEventListenerComponent = SceneItemEventListenerComponent_1 = class SceneItemEventListenerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.n$t = undefined;
    this.u1t = undefined;
    this.DQc = new WeakMap();
    this.xQc = new Map();
    this.VFu = new Map();
    this.UQc = new Map();
    this.BQc = new Map();
    this.kQc = new Map();
    this.wDe = 0;
    this.OQc = BigInt(0);
    this.qQc = (e, t) => {
      t = this.GQc(t);
      let n = this.UQc.get(t);
      if (n) {
        n.length = 0;
      } else {
        n = [];
        this.UQc.set(t, n);
      }
    };
    this.FQc = (e, t) => {
      t = this.GQc(t);
      this.NQc(t);
      this.VQc(t, e);
    };
  }
  OnInitData(e) {
    var t = e.GetParam(SceneItemEventListenerComponent_1)[0];
    this.wDe = e.PbDataId;
    for (const o of t.Events) {
      if (o.SequenceEvents) {
        for (const r of o.SequenceEvents) {
          var n = [];
          var i = new Map();
          for (const a of r.EventCallbacks) {
            var s = {
              Info: a,
              SeqGuid: r.SeqGuid
            };
            i.set(a.EventName, s);
            if (a.Type === "AN") {
              n.push(a);
            }
          }
          this.xQc.set(r.SeqPath, i);
          this.kQc.set(r.SeqGuid, n);
        }
      }
    }
    this.Xte = this.Entity.GetComponent(197);
    this.n$t = this.Entity.GetComponent(1);
    this.u1t = this.Entity.GetComponent(0);
    e = this.u1t?.ComponentDataMap.get(SERVER_DATA)?.uju;
    if (e) {
      this.OQc = MathUtils_1.MathUtils.LongToBigInt(e._Vn);
    }
    return true;
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionSequencePlay, this.qQc);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionSequenceOver, this.FQc);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionSequencePlay, this.qQc);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionSequenceOver, this.FQc);
    for (var [, e] of this.VFu) {
      for (var [, t] of e) {
        t.End();
        t.Dispose();
      }
    }
    this.xQc.clear();
    this.VFu.clear();
    this.UQc.clear();
    this.BQc.clear();
    this.kQc.clear();
    this.Xte = undefined;
    return !(this.n$t = undefined);
  }
  NQc(e) {
    var t = this.VFu.get(e);
    if (t) {
      for (var [, n] of t) {
        n.End();
        n.Dispose();
      }
      t.clear();
      this.VFu.delete(e);
    }
  }
  VQc(e, t) {
    var n = this.UQc.get(e);
    if (n) {
      var i = this.BQc.get(e);
      if (i) {
        var s;
        var o;
        var r = this.kQc.get(i);
        if (r && r.length !== 0) {
          for (const a of r) {
            if (!n.includes(a.EventName)) {
              o = {
                Info: a,
                SeqGuid: i
              };
              s = new MechanismDefine_1.MechanismEventLevelPrefabContext(this.wDe, t);
              if (o = this.jQc(e, o, 0, s)) {
                o.Trigger();
                n.push(a.EventName);
              }
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "SceneItemEventListenerComponent.ExecuteMissingEventOnSeqOver:找不到Sequence的Guid", ["PbDataId", this.wDe]);
      }
    }
  }
  GetPlayerId() {
    return this.u1t.GetPlayerId();
  }
  GetCreatureDataId() {
    return this.u1t.GetCreatureDataId();
  }
  ExecuteEvent(e, t, n, i, s) {
    var o = UE.KismetSystemLibrary.GetPathName(e.Sequence);
    if (StringUtils_1.StringUtils.IsBlank(o) || o === "None") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:找不到SequencePath", ["pbDataId", this.wDe], ["eventType", t], ["eventName", n]);
      }
    } else {
      var r = this.xQc.get(o)?.get(n);
      if (r) {
        var a = r.Info;
        if (t !== a.Action.Name) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:事件类型不相同，配置有误", ["pbDataId", this.wDe], ["sequencePath", o], ["eventType", t], ["eventName", n]);
          }
        } else if (a.Type === "AN" && i !== 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:执行事件错误，事件配置中不为ANS", ["pbDataId", this.wDe], ["sequencePath", o], ["eventType", t], ["eventName", n], ["executeType", i]);
          }
        } else if (a.Type === "ANS" && i === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:执行事件错误，事件配置中不为AN", ["pbDataId", this.wDe], ["sequencePath", o], ["eventType", t], ["eventName", n], ["executeType", i]);
          }
        } else {
          var v = this.GQc(e);
          this.BQc.set(v, r.SeqGuid);
          var h = this.jQc(v, r, i, s);
          if (h) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:执行事件开始", ["pbDataId", this.wDe], ["sequencePath", o], ["eventType", t], ["eventName", n], ["executeType", i]);
            }
            switch (i) {
              case 0:
                h.Trigger();
                this.UQc.get(v)?.push(n);
                break;
              case 1:
                h.Start();
                break;
              case 2:
                h.Tick();
                break;
              case 3:
                h.End();
                this.HQc(v, r, i);
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:执行事件结束", ["pbDataId", this.wDe], ["sequencePath", o], ["eventType", t], ["eventName", n], ["executeType", i]);
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 18, "SceneItemEventListenerComponent.ExecuteEvent:找不到事件配置", ["pbDataId", this.wDe], ["sequencePath", o], ["eventType", t], ["eventName", n]);
      }
    }
  }
  GQc(e) {
    let t = this.DQc.get(e);
    if (!t) {
      t = new WeakRef(e);
      this.DQc.set(e, t);
    }
    return t;
  }
  jQc(n, i, e, s) {
    var o = i.Info.Action.Name;
    var r = MechanismEventCenter_1.MechanismEventCenter.GetEventClass(o);
    if (r) {
      var a = MechanismEventCenter_1.MechanismEventCenter.GetEventIsServerAction(o);
      let t = undefined;
      switch (e) {
        case 0:
          t = new r(i, s, this, a);
          break;
        case 1:
          {
            let e = this.VFu.get(n);
            if (!e) {
              e = new Map();
              this.VFu.set(n, e);
            }
            t = new r(i, s, this, a);
            e.set(i.Info.EventName, t);
            break;
          }
        case 2:
        case 3:
          var v = this.VFu.get(n);
          if (v) {
            t = v.get(i.Info.EventName);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 18, "SceneItemEventListenerComponent.GetEventObj,通过sequencePlayer获取EventStates失败", ["PbDataId", this.wDe], ["sequence", i.SeqGuid]);
          }
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "SceneItemEventListenerComponent.GetEventObj,机关时间轴事件未定义", ["PbDataId", this.wDe], ["sequence", i.SeqGuid], ["eventType", o], ["eventName", i.Info.EventName]);
    }
  }
  HQc(e, t, n) {
    return n === 3 && ((n = this.VFu.get(e)) ? (e = n.get(t.Info.EventName)) ? (e.Dispose(), n.delete(t.Info.EventName)) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SceneItemEventListenerComponent.DestroyEventObj,通过sequencePlayer获取EventObj失败", ["PbDataId", this.wDe], ["sequence", t.SeqGuid], ["eventType", t.Info.Action.Name], ["eventName", t.Info.EventName]), false) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SceneItemEventListenerComponent.DestroyEventObj,通过sequencePlayer获取EventStates失败", ["PbDataId", this.wDe], ["sequence", t.SeqGuid], ["eventType", t.Info.Action.Name], ["eventName", t.Info.EventName]), false));
  }
  AddTags(e) {
    for (const i of e) {
      var t;
      var n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i);
      if (n) {
        t = `SceneItemEventListenerComponent_${this.wDe}_AddTag`;
        this.Xte?.AddServerTagByIdLocal(n.TagId, t);
      }
    }
  }
  RemoveTags(e) {
    for (const i of e) {
      var t;
      var n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i);
      if (n) {
        t = `SceneItemEventListenerComponent_${this.wDe}_AddTag`;
        this.Xte?.RemoveServerTagByIdLocal(n.TagId, t);
      }
    }
  }
  CreateBullet(e, t) {
    var n = ControllerHolder_1.ControllerHolder.BulletController.GetSceneBulletOwner();
    if (n?.IsInit) {
      return ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(n.Entity, e.BulletId.toString(), this.n$t?.ActorTransform, {}, this.OQc)?.Id ?? 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 17, "Bullet生成错误, 找不到场景子弹owner", ["EntityID", this.Entity.Id]);
      }
      return 0;
    }
  }
  DestroyBullet(e) {
    ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(e, false);
  }
};
SceneItemEventListenerComponent = SceneItemEventListenerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(300)], SceneItemEventListenerComponent);
exports.SceneItemEventListenerComponent = SceneItemEventListenerComponent; //# sourceMappingURL=SceneItemEventListenerComponent.js.map