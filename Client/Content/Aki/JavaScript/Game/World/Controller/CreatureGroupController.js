"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatureGroupController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DisjointSet_1 = require("../../../Core/Container/DisjointSet");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const BindGroupEntityWhiteFilter_1 = require("../../Utils/Filter/EntityToLoad/BindGroupEntityWhiteFilter");
class CreatureGroupController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return super.OnInit();
  }
  static OnClear() {
    this.sTa.Clear();
    this.AOc.Cleanup();
    return super.OnClear();
  }
  static AddBindEntity(r, e) {
    this.sTa.Union(r, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 19, "[实体生命周期:实体绑组] 建立实体绑定", ["CreatureDataIdA", r], ["CreatureDataIdB", e]);
    }
  }
  static HasBindGroup(r) {
    return this.sTa.Has(r);
  }
  static GetBindGroup(r) {
    return this.sTa.GetSet(r);
  }
  static rr_(r) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    if (r?.Valid && r.Entity) {
      if ((r = r.Entity.Flag) & 64) {
        return 64;
      } else if (r & 32) {
        return 32;
      } else if (r & 16) {
        return 16;
      } else if (r & 8) {
        return 8;
      } else if (r & 4) {
        return 4;
      } else if (r & 2) {
        return 2;
      } else if (r & 1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  static or_(r) {
    let e = 4;
    for (const o of r) {
      var t = this.rr_(o);
      if (t !== undefined) {
        e = Math.max(e, t);
      }
    }
    return e;
  }
  static nr_(r) {
    let e = 16;
    for (const o of r) {
      var t = this.rr_(o);
      if (t !== undefined) {
        e = Math.min(e, t);
      }
    }
    return e;
  }
  static sr_() {
    var r;
    var e;
    CreatureGroupController.ar_ = false;
    if (CreatureGroupController.hr_.size > 0) {
      r = [...CreatureGroupController.hr_.keys()][0];
      e = CreatureGroupController.hr_.get(r);
      CreatureGroupController.hr_.delete(r);
      CreatureGroupController.RefreshBindGroup(r, e);
    }
  }
  static RefreshBindGroup(r, e) {
    var t = CreatureGroupController.GetBindGroup(r);
    var o = [["CreatureDataId", r], ["bindGroup", t], ["EntityId", ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Id], ["reason", e]];
    if (t) {
      var n = this.or_(t);
      var i = this.nr_(t);
      o.push(["highestFlag", n], ["lowestFlag", i]);
      if (i >= 16) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 19, "[实体生命周期:实体绑组] 实体组激活完毕，删除实体组及相应缓存", ...o);
        }
        for (const l of t) {
          CreatureGroupController.hr_.delete(l);
        }
        CreatureGroupController.sTa.DeleteSet(r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveEntityFromBindGroup, t);
        this.sr_();
      } else if (CreatureGroupController.ar_) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Entity", 19, "[实体生命周期:实体绑组] 绑组递归调用，缓存执行", ...o);
        }
        CreatureGroupController.hr_.set(r, e);
      } else {
        CreatureGroupController.ar_ = true;
        if (n <= i) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Entity", 19, "[实体生命周期:实体绑组] 整组推进生命周期", ...o);
          }
          for (const u of t) {
            CreatureGroupController.lr_(u);
          }
        } else if (n > 4) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Entity", 19, "[实体生命周期:实体绑组] 部分推进生命周期", ...o);
          }
          for (const C of t) {
            var a = CreatureGroupController.rr_(C);
            if (a && a < n) {
              CreatureGroupController.lr_(C);
            }
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 19, "[实体生命周期:实体绑组] 同组尚未start，暂时阻塞", ...o);
        }
        this.sr_();
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 19, "[实体生命周期:实体绑组] 实体不在实体组中", ...o);
      }
      this.sr_();
    }
  }
  static lr_(r) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    var t = CreatureGroupController.rr_(r);
    var o = [["CreatureDataId", r], ["EntityId", e?.Id], ["ExecutedFlag", t]];
    if (e?.Valid && e.Entity) {
      if (t) {
        if (t < 4 || t >= 16) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Entity", 19, "[实体生命周期:实体绑组]实体无需推进", ...o);
          }
        } else if (t === 4) {
          ControllerHolder_1.ControllerHolder.CreatureController.ActivateEntityRequest(e);
        } else if (t === 8) {
          EntitySystem_1.EntitySystem.PostActive(e.Entity);
          CreatureGroupController.RefreshBindGroup(r, "postActive");
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 19, "[实体生命周期:实体绑组]预期外的flag类型", ...o);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 19, "[实体生命周期:实体绑组]实体Flag为空", ...o);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Entity", 19, "[实体生命周期:实体绑组]推进不存在的实体生命周期", ...o);
    }
  }
  static RemoveFromBindGroup(e, t) {
    var o = CreatureGroupController.GetBindGroup(e);
    if (o) {
      let r = undefined;
      for (const n of o) {
        if (n !== undefined && n !== e) {
          r = n;
          break;
        }
      }
      CreatureGroupController.sTa.Delete(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveEntityFromBindGroup, e);
      if (r !== undefined) {
        if (CreatureGroupController.HasBindGroup(r)) {
          CreatureGroupController.RefreshBindGroup(r, t);
        } else {
          CreatureGroupController.lr_(r);
        }
      }
    }
  }
}
(exports.CreatureGroupController = CreatureGroupController).sTa = new DisjointSet_1.DisjointSet();
CreatureGroupController.AOc = BindGroupEntityWhiteFilter_1.BindGroupEntityWhiteFilter.Create();
CreatureGroupController.ar_ = false;
CreatureGroupController.hr_ = new Map(); //# sourceMappingURL=CreatureGroupController.js.map