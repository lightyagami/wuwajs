"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitEntityToLoadTask = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Pool_1 = require("../../../Core/Container/Pool");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const PreloadDefine_1 = require("../../Preload/PreloadDefine");
const EntityToLoadFilterChain_1 = require("../../Utils/Filter/EntityToLoad/EntityToLoadFilterChain");
const EntityHandleCallbackPair_1 = require("./EntityHandleCallbackPair");
class WaitEntityToLoadTask {
  constructor(t, e) {
    this.nya = () => 0;
    this.UHa = () => {};
    this.sja = new Map();
    this.DOc = EntityToLoadFilterChain_1.EntityToLoadFilterChain.Create();
    this.QEa = 0;
    this.zr_ = 0;
    this.WJl = undefined;
    this.Jr_ = 0;
    this.UOc = t => {
      this.DOc.AddFilter(t);
      this.DelayInvoke();
    };
    this.BOc = t => {
      this.DOc.RemoveFilter(t);
      this.DelayInvoke();
    };
    this.DelayInvoke = () => {
      if (!this.WJl && this.DOc.QueuedHeap.Size > 0) {
        this.WJl = TimerSystem_1.TimerSystem.Next(() => {
          this.WJl = undefined;
          this.oya();
        });
      }
    };
    this.nya = t;
    this.UHa = e;
  }
  OnInit() {
    this.Vr();
    this.QEa = 0;
  }
  OnClear() {
    this.sya();
    this.sja.clear();
    if (this.WJl) {
      TimerSystem_1.TimerSystem.Remove(this.WJl);
      this.WJl = undefined;
    }
    this.DOc.Cleanup();
  }
  Vr() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EntityToLoadFilterCreated, this.UOc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EntityToLoadFilterDestroyed, this.BOc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EntityToLoadParamUpdated, this.DelayInvoke);
  }
  sya() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityToLoadFilterCreated, this.UOc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityToLoadFilterDestroyed, this.BOc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityToLoadParamUpdated, this.DelayInvoke);
  }
  static aya(t, e, i, r) {
    let o = this.hya.Get();
    (o = o || WaitEntityToLoadTask.hya.Create()).Handle = t;
    o.CreatureDataId = i;
    o.PbDataId = r;
    o.Priority = t.Priority;
    o.AngleRatio = 0;
    o.Order = 0;
    o.AddCallback(e);
    o.Version++;
    return o;
  }
  aja(t) {
    let e = this.sja.get(t);
    return e = e || this.DOc.QueuedEntitiesLookup.get(t);
  }
  static fJa(t) {
    var e = t.Entity.GetComponent(0);
    return (!PreloadDefine_1.PreloadSetting.UseNewPreload || !e.GetPreloadFinished()) && ((e = e.GetEntityType()) !== Protocol_1.Aki.Protocol.kks.Proto_Custom && e !== Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity || !(e === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity && (t.Priority = 106), 1));
  }
  QueueToInvoke(t, e, i, r) {
    let o = this.aja(t);
    if (o) {
      o.AddCallback(e);
    } else {
      o = WaitEntityToLoadTask.aya(t, e, i, r);
      if (WaitEntityToLoadTask.fJa(t)) {
        this.DOc.AddPair(o);
        this.DelayInvoke();
      } else {
        if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Preload", 60, "预加载实体:不需要预加载，直接唤醒", ["EntityId", t.Id], ["CreatureDataId", o.CreatureDataId], ["PbDataId", o.PbDataId], ["Priority", o.Priority], ["Order", o.Order], ["Version", o.Version]);
        }
        this.pJa(o);
      }
    }
  }
  Flush() {
    for (this.WJl && (TimerSystem_1.TimerSystem.Remove(this.WJl), this.WJl = undefined); !this.DOc.QueuedHeap.Empty;) {
      this.AHa();
    }
  }
  RemoveEntity(t) {
    var e = this.aja(t);
    if (e && (this.DOc.RemovePair(e), this.hja(e, 4), ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 60, "预加载实体:移除加载队列", ["RemoveType", "Outside"], ["EntityId", t.Id], ["CreatureDataId", e.CreatureDataId], ["PbDataId", e.PbDataId], ["AngleRatio", e.AngleRatio], ["Priority", e.Priority], ["Order", e.Order], ["Version", e.Version], ["Remain", this.DOc.QueuedHeap.Size]);
    }
  }
  hja(t, e) {
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 60, "预加载实体:执行加载回调", ["EntityId", t.Handle.Id], ["CreatureDataId", t.CreatureDataId], ["PbDataId", t.PbDataId], ["Priority", t.Priority], ["Order", t.Order], ["Version", t.Version], ["Result", e]);
    }
    this.sja.delete(t.Handle);
    t.InvokeCallbacks(e);
    t.ClearCallbacks();
    WaitEntityToLoadTask.hya.Put(t);
  }
  lja(e, t, i) {
    const r = i ?? e.Version;
    if (this.sja.has(e.Handle) && r === e.Version) {
      if (t === 3 || t === 2 && Info_1.Info.IsBuildShipping) {
        this.UHa(e.Handle, t => {
          if (this.sja.has(e.Handle) && r === e.Version) {
            this.hja(e, t);
          }
        });
      } else {
        this.hja(e, t);
      }
    }
  }
  pJa(t) {
    this.sja.set(t.Handle, t);
    this.lja(t, 3);
  }
  lya(e) {
    let i = false;
    let r = undefined;
    let o = false;
    const s = () => {
      var t;
      if (r) {
        if (r.Valid()) {
          TimerSystem_1.TimerSystem.Remove(r);
        }
        r = undefined;
      }
      if (!i && o && (t = ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(e.CreatureDataId), Log_1.Log.CheckError())) {
        Log_1.Log.Error("Preload", 60, "预加载实体:加载超时", ["EntityId", e.Handle.Id], ["CreatureDataId", e.CreatureDataId], ["PbDataId", e.PbDataId], ["Priority", e.Priority], ["Order", e.Order], ["Version", e.Version], ["Remain", this.DOc.QueuedHeap.Size], ["InLoading", this.QEa], ["HasAssetElement", t ? "Yes" : "No"], ["LoadState", t ? t.LoadState : "None"], ["CollectMinorAssets", t ? t.CollectMinorAsset : "None"]);
      }
      if (i !== o) {
        this.QEa--;
        this.oya();
      }
    };
    const a = e.Version;
    var t = t => {
      i = true;
      this.lja(e, t, a);
      s();
    };
    this.QEa++;
    this.sja.set(e.Handle, e);
    var n = this.nya(e.Handle, t);
    if (n !== 1) {
      t(n);
    } else {
      r = TimerSystem_1.TimerSystem.Delay(() => {
        o = true;
        s();
      }, ResourceSystem_1.ASYNC_LOAD_TIMEOUT_MS);
    }
  }
  _ya() {
    return this.DOc.QueuedHeap.Size > 0 && this.QEa < this.DOc.EntityToLoadParam.MaxLoadingCount && this.zr_ >= this.DOc.EntityToLoadParam.LoadingInterval;
  }
  AHa() {
    var t = this.DOc.PopTopPair();
    if (t) {
      if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 60, "预加载实体:移除加载队列", ["RemoveType", "InvokeTop"], ["EntityId", t.Handle.Id], ["CreatureDataId", t.CreatureDataId], ["PbDataId", t.PbDataId], ["AngleRatio", t.AngleRatio], ["Priority", t.Priority], ["Order", t.Order], ["Version", t.Version], ["Remain", this.DOc.QueuedHeap.Size]);
      }
      this.lya(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Preload", 72, "预加载实体:调用InvokeTop之前需要确保优先队列不为空");
    }
  }
  eo_() {
    var t = Time_1.Time.Frame;
    if (t > this.Jr_) {
      this.zr_ += t - this.Jr_;
      this.Jr_ = t;
    }
  }
  to_() {
    if (this.DOc.QueuedHeap.Size === 0 || this.QEa >= this.DOc.EntityToLoadParam.MaxLoadingCount || this.zr_ >= this.DOc.EntityToLoadParam.LoadingInterval) {
      this.zr_ = 0;
    }
  }
  oya() {
    for (this.eo_(); this._ya();) {
      this.uya();
      this.AHa();
    }
    this.to_();
    if (this.DOc.QueuedHeap.Size > 0 && this.QEa < this.DOc.EntityToLoadParam.MaxLoadingCount) {
      this.DelayInvoke();
    }
  }
  uya() {
    if (this.DOc.QueuedHeap.Size > this.DOc.EntityToLoadParam.MaxLoadingCount - this.QEa) {
      this.DOc.UpdatePriority(this.io_());
    }
  }
  io_() {
    if (WaitEntityToLoadTask.GetPlayerVelocityOverride) {
      return WaitEntityToLoadTask.GetPlayerVelocityOverride();
    } else {
      return Vector_1.Vector.ZeroVectorProxy;
    }
  }
}
(exports.WaitEntityToLoadTask = WaitEntityToLoadTask).GetPlayerVelocityOverride = undefined;
WaitEntityToLoadTask.hya = new Pool_1.Pool(200, () => new EntityHandleCallbackPair_1.EntityHandleCallbackPair()); //# sourceMappingURL=WaitEntityToLoadTask.js.map