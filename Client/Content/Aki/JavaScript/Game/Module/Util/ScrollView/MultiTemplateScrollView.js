"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiTemplateScrollView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const GridDelegate_1 = require("../Grid/GridDelegate");
class OperationParam {
  constructor(e, t = false, i = -1, l = false, r = undefined) {
    this.Data = e;
    this.KeepContentPosition = t;
    this.ScrollToGridIndex = i;
    this.PlayGridAnim = l;
    this.CallBack = r;
  }
}
class MultiTemplateScrollView {
  constructor(e) {
    this.ScrollView = e;
    this.DataList = [];
    this.ActorToGridDelegateMap = new Map();
    this.BusyGridDelegateSet = new Set();
    this.gJd = undefined;
    this.pjt = false;
    this.gWt = new Queue_1.Queue();
    this.LSi = (e, t) => {
      if (t && t.IsValid()) {
        if (e < 0 || e >= this.DataList.length) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 无效的gridIndex", ["gridIndex", e]);
          }
        } else if (this.ActorToGridDelegateMap.get(t)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 重复触发Proxy的创建", ["gridIndex", e]);
          }
        } else {
          var i = this.DataList[e];
          var l = i.CreateProxy();
          const r = new GridDelegate_1.GridDelegate(l, t);
          r.GridIndex = e;
          r.Data = i.Data;
          l = () => {
            if (r.IsBusy) {
              this.BusyGridDelegateSet.add(r);
            } else if (this.BusyGridDelegateSet.size > 0 && (this.BusyGridDelegateSet.delete(r), this.BusyGridDelegateSet.size === 0)) {
              this.gJd?.SetResult();
              this.gJd = undefined;
            }
          };
          r.OnCreateCallBack = l;
          r.OnRefreshCallBack = l;
          r.OnClearCallBack = l;
          r.Create();
          this.ActorToGridDelegateMap.set(t, r);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 无效的Actor", ["gridIndex", e]);
      }
    };
    this.f7i = (e, t) => {
      var i;
      if (t && t.IsValid()) {
        if (t = this.ActorToGridDelegateMap.get(t)) {
          i = this.DataList[e];
          t.GridIndex = e;
          t.Data = i.Data;
          t.Refresh();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemRefresh] proxy未创建", ["gridIndex", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemRefresh] 无效的Actor", ["gridIndex", e]);
      }
    };
    this.rNo = (e, t) => {
      if (t && t.IsValid()) {
        if (t = this.ActorToGridDelegateMap.get(t)) {
          t.Clear();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemClear] proxy未创建", ["gridIndex", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemClear] 无效的Actor", ["gridIndex", e]);
      }
    };
    this.ScrollView.OnItemCreate.Bind(this.LSi);
    this.ScrollView.OnItemRefresh.Bind(this.f7i);
    this.ScrollView.OnItemClear.Bind(this.rNo);
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    var e;
    this.pjt = false;
    if (!this.gWt.Empty) {
      e = this.gWt.Pop();
      this.RefreshByData(e.Data, e?.KeepContentPosition, e.ScrollToGridIndex, e.PlayGridAnim, e.CallBack);
    }
  }
  RefreshByData(e, t = false, i = -1, l = false, r = undefined) {
    var s;
    if (this.Rjt) {
      s = new OperationParam(e, t, i, l, r);
      this.gWt.Push(s);
    } else {
      this.Ujt();
      this.RefreshByDataAsync(e, t, i, l).finally(() => {
        r?.();
        this.Jft();
      });
    }
  }
  async RefreshByDataAsync(e, t = false, i = -1, l) {
    if (this.gJd) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [RefreshByDataAsync] 上一次的刷新还未完成");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [RefreshByDataAsync] 开始刷新");
      }
      this.gJd = new CustomPromise_1.CustomPromise();
      this.DataList = e;
      var r = UE.NewArray(UE.BuiltinInt);
      for (const s of e) {
        r.Add(s.GetTemplateIndex());
      }
      this.ScrollView.RefreshByData(r, t, i);
      await this.gJd.Promise;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [RefreshByDataAsync] 刷新完成");
      }
    }
  }
}
exports.MultiTemplateScrollView = MultiTemplateScrollView;
//# sourceMappingURL=MultiTemplateScrollView.js.map