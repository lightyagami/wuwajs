"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const UiManager_1 = require("../../Ui/UiManager");
const SeekTraceDefine_1 = require("./SeekTraceDefine");
const SeekTraceModel_1 = require("./SeekTraceModel");
const DEFAULT_PANEL_SIZE = 8;
class SeekTraceController extends ControllerBase_1.ControllerBase {
  static OpenSeekTrace(e, r, o) {
    var a = ModelManager_1.ModelManager.SeekTraceModel;
    var t = (a.Config = e).BoardConfig.BoardSize;
    if (t) {
      a.PanelWidth = t?.X ?? DEFAULT_PANEL_SIZE;
      a.PanelHeight = t?.Y ?? DEFAULT_PANEL_SIZE;
      a.IconType = e.ImageResourceType;
      a.CurrentInteractEntityId = r;
      a.RemainUiAfterCompletion = e.RemainUiAfterCompletion ?? false;
      a.ItemDataList = new Array();
      a.EnableGridList = [];
      a.SelectedStartFilledIndexSet = new Set();
      a.IndexToItemMap = new Map();
      a.PreSelectedIndexToItemsMap = new Map();
      a.ItemToPreSelectedIndexSetMap = new Map();
      a.MainItemMap = new Map();
      a.OnSeekTraceFinish = o;
      this.Pod();
      UiManager_1.UiManager.OpenView("SeekTraceStartView");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 48, "SeekTrace初始化失败，缺少面板大小配置");
    }
  }
  static ResetSeekTrace(e) {
    const o = ModelManager_1.ModelManager.SeekTraceModel;
    o.ResetTimes++;
    const a = () => {
      this.Pod();
      e();
    };
    var t = o.Config?.MaxStepRewardRule;
    if (t) {
      var i = o.ResetTimes;
      let e = 0;
      let r = 0;
      for (const c of t) {
        var n = c.RestartCount;
        if (n <= i && n > r) {
          e = c.AddStep;
          r = n;
        }
      }
      if (o.AddStep === e) {
        a();
      } else {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(366)).FunctionMap.set(1, a);
        t.FunctionMap.set(2, () => {
          o.AddStep = e;
          a();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    } else {
      a();
    }
  }
  static FinishSeekTrace() {
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    var r = e.GameFinishResult;
    if (r) {
      ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_TraceTracing, "");
    }
    e.OnSeekTraceFinish?.(r);
    e.IsGameFinish = false;
    e.GameFinishResult = false;
    e.Config = undefined;
    e.PanelWidth = 0;
    e.PanelHeight = 0;
    e.ResetTimes = 0;
    e.IconType = IAction_1.ETraceTracingImageType.Type1;
    e.RemainUiAfterCompletion = false;
    e.OnSeekTraceFinish = undefined;
    e.StepLimit = 0;
    e.AddStep = 0;
    e.ItemDataList = undefined;
    e.EnableGridList = undefined;
    e.SelectedItem = undefined;
    e.SelectedStartPosition = undefined;
    e.SelectedStartFilledIndexSet = undefined;
    e.IndexToItemMap = undefined;
    e.PreSelectedIndexToItemsMap = undefined;
    e.ItemToPreSelectedIndexSetMap = undefined;
    e.MainItemMap = undefined;
  }
  static Pod() {
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    var r = e.Config;
    if (r) {
      e.StepLimit = r.StepLimit + e.AddStep;
      var a = e.ItemDataList;
      var t = e.EnableGridList;
      var i = e.IndexToItemMap;
      var o = e.PreSelectedIndexToItemsMap;
      var n = e.MainItemMap;
      e.IsGameFinish = false;
      e.GameFinishResult = false;
      e.SelectedItem = undefined;
      a.length = 0;
      t.length = 0;
      i.clear();
      o.clear();
      n.clear();
      var c = e.PanelWidth;
      var f = r.BoardConfig.Grids;
      for (let o = 0; o < f.length; o++) {
        var l;
        var s;
        var v = f[o];
        let e = true;
        let r = 0;
        switch (v) {
          case IAction_1.ETraceTracingGridType.Block:
            e = false;
            break;
          case IAction_1.ETraceTracingGridType.Empty:
            break;
          case IAction_1.ETraceTracingGridType.Chess1:
            r = 3;
            break;
          case IAction_1.ETraceTracingGridType.Chess2:
            r = 1;
            break;
          case IAction_1.ETraceTracingGridType.Chess3:
            r = 2;
        }
        t.push(e);
        if (v !== IAction_1.ETraceTracingGridType.Block && v !== IAction_1.ETraceTracingGridType.Empty) {
          (v = new SeekTraceModel_1.SeekTraceItemData()).ItemType = r;
          l = o % c;
          s = Math.floor(o / c);
          v.BasePosition[0] = l;
          v.BasePosition[1] = s;
          v.FilledIndexSet.add(o);
          v.FilledPositionOffsetList.push([0, 0]);
          a.push(v);
          i.set(o, v);
        }
      }
      for (const _ of a) {
        if (_.IsValid) {
          if (_.FilledPositionOffsetList.length !== 1) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 48, "SeekTrace数据初始化失败，已填充数量错误");
            }
            return;
          }
          this.Aod(_, _.BasePosition);
          if (_.FilledPositionOffsetList.length > 1) {
            n.set(_.ItemType, _);
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 48, "SeekTrace初始化失败，缺少配置");
    }
  }
  static Aod(o, e) {
    var r = ModelManager_1.ModelManager.SeekTraceModel;
    var a = r.PanelWidth;
    var t = r.PanelHeight;
    var i = r.EnableGridList;
    var n = r.IndexToItemMap;
    var c = r.PreSelectedIndexToItemsMap;
    var f = r.ItemToPreSelectedIndexSetMap;
    var l = o.ItemType;
    var s = o.BasePosition;
    var v = i.length;
    for (const A of SeekTraceDefine_1.preSelectedOffsetList) {
      var _ = [e[0] + A[0], e[1] + A[1]];
      var d = _[0];
      var M = _[1];
      if (!(d < 0) && !(a <= d) && !(M < 0) && !(t <= M)) {
        M = M * a + d;
        if (!(v <= M)) {
          if (i[M]) {
            d = n.get(M);
            if (d && d.ItemType === l) {
              if (d !== o && d.IsValid) {
                var u = s[0];
                var S = s[1];
                var g = d.BasePosition[0];
                var k = d.BasePosition[1];
                for (const L of d.FilledPositionOffsetList) {
                  var I = g + L[0];
                  var C = k + L[1];
                  var T = C * a + I;
                  o.FilledIndexSet.add(T);
                  o.FilledPositionOffsetList.push([I - u, C - S]);
                  n.set(T, o);
                }
                this.Dod(d);
                this.Aod(o, _);
              }
            } else {
              let e = c.get(M);
              if (!e) {
                e = new Set();
                c.set(M, e);
              }
              let r = f.get(o);
              if (!r) {
                r = new Set();
                f.set(o, r);
              }
              e.add(o);
              r.add(M);
            }
          }
        }
      }
    }
  }
  static SelectItem(e) {
    var r = ModelManager_1.ModelManager.SeekTraceModel;
    if (r.SelectedItem) {
      return false;
    }
    var o = r.IndexToItemMap;
    const a = e[1] * r.PanelWidth + e[0];
    e = o.get(a);
    if (!e) {
      return false;
    }
    var t = r.MainItemMap.get(e.ItemType);
    if (t && e !== t) {
      return false;
    }
    var t = (r.SelectedItem = e).BasePosition;
    r.SelectedStartPosition = [t[0], t[1]];
    var i = r.SelectedStartFilledIndexSet;
    i.clear();
    for (const a of e.FilledIndexSet) {
      i.add(a);
      o.delete(a);
    }
    return true;
  }
  static MoveSelectedItem(e) {
    var r = ModelManager_1.ModelManager.SeekTraceModel;
    var o = r.SelectedItem;
    if (o) {
      var a = r.PanelWidth;
      var t = r.PanelHeight;
      var i = e[0];
      var n = e[1];
      o.BasePosition[0] = i;
      o.BasePosition[1] = n;
      o.FilledIndexSet.clear();
      for (const l of o.FilledPositionOffsetList) {
        var c = i + l[0];
        var f = n + l[1];
        let e = c >= 0 && c < a && f >= 0 && f < t ? f * a + c : -1;
        o.FilledIndexSet.add(e);
      }
    }
  }
  static CheckCanPlaceSelectedItem() {
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    var r = e.SelectedItem;
    if (!r) {
      return 1;
    }
    var o = e.EnableGridList;
    var a = e.IndexToItemMap;
    var t = e.PanelWidth;
    var i = e.PanelHeight;
    var n = r.BasePosition;
    var c = n[0];
    var f = n[1];
    for (const u of r.FilledPositionOffsetList) {
      var l = c + u[0];
      var s = f + u[1];
      if (l < 0 || t <= l || s < 0 || i <= s) {
        return 2;
      }
    }
    let v = false;
    var _ = r.ItemType;
    var d = e.PreSelectedIndexToItemsMap;
    for (const S of r.FilledIndexSet) {
      if (!o[S]) {
        return 3;
      }
      if (a.has(S)) {
        return 4;
      }
      if (!v) {
        var M = d.get(S);
        if (M) {
          for (const g of M) {
            if (g !== r && g.IsValid && g.ItemType === _) {
              v = true;
              break;
            }
          }
        }
      }
    }
    if (v) {
      return 0;
    } else {
      return 5;
    }
  }
  static PlaceSelectedItem() {
    var e = ModelManager_1.ModelManager.SeekTraceModel;
    var r = e.SelectedItem;
    if (!r) {
      return 1;
    }
    var o = r.BasePosition;
    var a = o[0];
    var t = o[1];
    var o = e.SelectedStartPosition;
    var o = a === o[0] && t === o[1];
    var i = this.CheckCanPlaceSelectedItem();
    if (!o && i !== 0) {
      return i;
    }
    var n = e.PanelWidth;
    var c = e.IndexToItemMap;
    for (const k of r.FilledIndexSet) {
      c.set(k, r);
    }
    if (o) {
      e.SelectedItem = undefined;
    } else {
      var f = r.ItemType;
      var l = e.PreSelectedIndexToItemsMap;
      for (const I of r.FilledIndexSet) {
        var s = l.get(I);
        if (s) {
          for (const C of s) {
            if (C.IsValid && C.ItemType === f && C !== r) {
              var v = C.BasePosition[0];
              var _ = C.BasePosition[1];
              for (const T of C.FilledPositionOffsetList) {
                var d = v + T[0];
                var M = _ + T[1];
                var u = M * n + d;
                r.FilledIndexSet.add(u);
                r.FilledPositionOffsetList.push([d - a, M - t]);
                c.set(u, r);
              }
              this.Dod(C);
            }
          }
        }
      }
      if (r.FilledPositionOffsetList.length > 1) {
        e.MainItemMap.set(f, r);
      } else {
        i = e.ItemToPreSelectedIndexSetMap.get(r);
        if (i) {
          for (const A of i) {
            l.get(A)?.delete(r);
          }
          e.ItemToPreSelectedIndexSetMap.delete(r);
        }
        this.Aod(r, r.BasePosition);
      }
      e.SelectedItem = undefined;
      e.StepLimit--;
      var o = e.ItemDataList;
      var S = new Set();
      for (const L of o) {
        if (L.IsValid) {
          var g = L.ItemType;
          if (S.has(g)) {
            if (e.StepLimit <= 0) {
              e.IsGameFinish = true;
              e.GameFinishResult = false;
            }
            return 0;
          }
          S.add(g);
        }
      }
      e.IsGameFinish = true;
      e.GameFinishResult = true;
    }
    return 0;
  }
  static Dod(e) {
    e.BasePosition[0] = 0;
    e.BasePosition[1] = 0;
    e.FilledPositionOffsetList.length = 0;
    e.FilledIndexSet.clear();
    e.IsValid = false;
  }
}
exports.SeekTraceController = SeekTraceController;
//# sourceMappingURL=SeekTraceController.js.map