"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectActorPool = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const Queue_1 = require("../../Core/Container/Queue");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const DEFAULT_CAPACITY = 4;
class CustomObjectPool {
  constructor(t = DEFAULT_CAPACITY, e = 0) {
    this.o7 = t;
    this.wCe = e;
    this.BCe = undefined;
    this.bCe = new Queue_1.Queue(this.o7);
  }
  OnSpawn(t, e) {}
  OnDeSpawn(t) {}
  OnClear() {}
  Spawn(...t) {
    let e = undefined;
    let i = false;
    while (this.bCe.Size) {
      e = this.bCe.Pop();
      if (this.OnObjectIsValid(e)) {
        i = true;
        break;
      }
      e = undefined;
    }
    if (!this.OnObjectIsValid(e)) {
      e = this.OnCreateObject(...t);
      i = false;
    }
    this.OnSpawn(i, e, ...t);
    if (this.wCe) {
      if (this.BCe) {
        TimerSystem_1.TimerSystem.Remove(this.BCe);
        this.BCe = undefined;
      }
      this.BCe = TimerSystem_1.TimerSystem.Delay(() => {
        var t = this.bCe.Size;
        var e = Math.floor(t / 2);
        this.BCe = undefined;
        if (!(t <= this.o7)) {
          for (var i = Math.max(e, this.o7); this.bCe.Size >= i;) {
            var s = this.bCe.Pop();
            this.OnDestroyObject(s);
          }
        }
      }, this.wCe);
    }
    return e;
  }
  DeSpawn(t) {
    if (this.OnObjectIsValid(t)) {
      this.OnDeSpawn(t);
      this.bCe.Push(t);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "poolObject无效，回池失败");
      }
      return false;
    }
  }
  Clear() {
    while (this.bCe.Size) {
      var t = this.bCe.Pop();
      this.OnDestroyObject(t);
    }
    if (this.BCe) {
      TimerSystem_1.TimerSystem.Remove(this.BCe);
      this.BCe = undefined;
    }
    this.OnClear();
  }
}
class EffectActorPool extends CustomObjectPool {
  OnCreateObject(...t) {
    var e = t[0];
    let i = undefined;
    if (e.IsA(UE.Actor.StaticClass())) {
      i = e;
    }
    e = t[1];
    return ActorSystem_1.ActorSystem.Get(UE.TsEffectActor_C.StaticClass(), e, i);
  }
  OnSpawn(t, e, ...i) {
    e?.SetActorHiddenInGame(false);
    e?.K2_DetachFromActor(1, 1, 1);
    if (t) {
      t = i[1];
      e?.D_K2_SetActorTransform(t, false, undefined, true);
    }
  }
  OnDeSpawn(t) {
    if (!this.qCe?.IsValid()) {
      this.qCe = ActorSystem_1.ActorSystem.Get(UE.TsEffectActor_C.StaticClass(), new UE.TransformDouble());
      if (this.qCe === undefined) {
        return;
      }
      var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
      if (e === 3 || e === 2) {
        this.qCe.ActorLabel = "EffectActorPool";
      }
    }
    t.K2_AttachToActor(this.qCe, undefined, 2, 2, 2, false);
  }
  OnObjectIsValid(t) {
    return t?.IsValid() ?? false;
  }
  OnDestroyObject(t) {
    t.K2_DestroyActor();
  }
  OnClear() {
    if (this.qCe?.IsValid()) {
      this.qCe.K2_DestroyActor();
      this.qCe = undefined;
    }
  }
}
exports.EffectActorPool = EffectActorPool;
//# sourceMappingURL=CustomObjectPool.js.map