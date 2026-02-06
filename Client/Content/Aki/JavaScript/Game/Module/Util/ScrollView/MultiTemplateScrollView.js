"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiTemplateScrollView = exports.MultiTemplateScrollViewRefreshContext = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class MultiTemplateScrollViewRefreshContext {
  constructor(e) {
    this.DataList = e;
    this.KeepContentPosition = false;
    this.ScrollToGridIndex = -1;
    this.PlayGridAnim = false;
    this.GridAnimName = "";
  }
}
exports.MultiTemplateScrollViewRefreshContext = MultiTemplateScrollViewRefreshContext;
class MultiTemplateScrollView {
  constructor(e) {
    this.ScrollView = e;
    this.DataList = [];
    this.Yvf = new Map();
    this.fZf = undefined;
    this.LSi = (e, t) => {
      var i;
      var l;
      if (t && t.IsValid()) {
        if (e < 0 || e >= this.DataList.length) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 无效的gridIndex", ["gridIndex", e]);
          }
        } else if ((i = t.GetUIItem()) && i.IsValid()) {
          if (this.Yvf.get(i)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 重复触发Proxy的创建", ["gridIndex", e]);
            }
          } else {
            (l = this.DataList[e].CreateProxy()).GridIndex = e;
            l.CreateThenShowByActor(t);
            this.Yvf.set(i, l);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 无效的item", ["gridIndex", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemCreate] 无效的Actor", ["gridIndex", e]);
      }
    };
    this.f7i = (e, t) => {
      var i;
      if (t && t.IsValid()) {
        if ((t = t.GetUIItem()) && t.IsValid()) {
          if (t = this.Yvf.get(t)) {
            i = this.DataList[e];
            t.GridIndex = e;
            t.Refresh(i.Data);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemRefresh] proxy未创建", ["gridIndex", e]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemRefresh] 无效的item", ["gridIndex", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemRefresh] 无效的Actor", ["gridIndex", e]);
      }
    };
    this.rNo = (e, t) => {
      if (t && t.IsValid()) {
        if ((t = t.GetUIItem()) && t.IsValid()) {
          if (t = this.Yvf.get(t)) {
            t.GridIndex = e;
            t.Clear();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemClear] proxy未创建", ["gridIndex", e]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemClear] 无效的item", ["gridIndex", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiTemplateScrollView", 43, "[MultiTemplateScrollView] [OnItemClear] 无效的Actor", ["gridIndex", e]);
      }
    };
    this.ScrollView.OnItemCreate.Bind(this.LSi);
    this.ScrollView.OnItemRefresh.Bind(this.f7i);
    this.ScrollView.OnItemClear.Bind(this.rNo);
    e = this.ScrollView.Content;
    if (e && e.IsValid()) {
      this.fZf = e.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    }
  }
  RefreshByData(e) {
    var t = Array.from(e.DataList);
    this.DataList = t;
    var i = UE.NewArray(UE.BuiltinInt);
    for (const l of t) {
      i.Add(l.GetTemplateIndex());
    }
    this.ScrollView.RefreshByData(i, e.KeepContentPosition, e.ScrollToGridIndex);
    if (e.PlayGridAnim) {
      this.PlayGridAnim(e.GridAnimName);
    }
  }
  GetProxyByGridIndex(e) {
    e = this.ScrollView.GetGridItem(e);
    if (e && e.IsValid()) {
      return this.Yvf.get(e);
    }
  }
  RefreshProxyDirectly(e) {
    var t = this.GetProxyByGridIndex(e);
    return !!t && (t.Refresh(this.DataList[e].Data), true);
  }
  RefreshProxyByData(e, t) {
    var i = this.GetProxyByGridIndex(e);
    return !!i && (this.DataList[e] = t, i.Refresh(t.Data), true);
  }
  PlayGridAnim(e) {
    if (this.fZf) {
      this.fZf.Play(e, -1, true);
    }
  }
}
exports.MultiTemplateScrollView = MultiTemplateScrollView;
//# sourceMappingURL=MultiTemplateScrollView.js.map