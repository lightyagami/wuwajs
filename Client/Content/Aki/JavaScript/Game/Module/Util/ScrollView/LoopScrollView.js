"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoopScrollView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation");
const ScrollViewDelegate_1 = require("./ScrollViewDelegate");
const IS_DEBUG = false;
class OperationParam {
  constructor(i = undefined, t = false, s = undefined, e = false) {
    this.Data = i;
    this.KeepContentPosition = t;
    this.CallBack = s;
    this.PlayGridAnim = e;
  }
}
class LoopScrollView {
  constructor(i, t, s, e = false) {
    this.cNo = undefined;
    this.uGo = undefined;
    this.cGo = undefined;
    this.mNo = [];
    this.dNo = 0;
    this.CNo = -1;
    this.gNo = -1;
    this.fGo = undefined;
    this.fNo = false;
    this.pjt = false;
    this.gWt = new Queue_1.Queue();
    this.znl = undefined;
    this.HDa = false;
    this.pNo = (i, t) => {
      this.uGo.CreateGridProxy(i, t);
    };
    this.vNo = (i, t) => {
      const s = this.uGo.CreateGridProxyAsync(i, t);
      if (this.HDa) {
        this.mNo.push(s);
      } else {
        this.mNo.push(s);
        s.then(() => {
          var i = this.mNo.indexOf(s);
          this.mNo.splice(i, 1);
        });
      }
    };
    this.MNo = (e, h) => {
      if (!(this.mNo.length > 0) && (this.Iei !== e || this.NCi !== h)) {
        var r;
        var o;
        var n;
        var a;
        var d = this.Iei;
        var l = this.NCi;
        var G = this.IGo;
        var p = h - e + 1;
        for (let i = d; i <= l; ++i) {
          if (!(i < 0) && !(i >= this.dNo) && !(r = i % G, o = i % p, i >= e && i <= h && i <= l && r == o)) {
            this.uGo.ClearGridProxy(i, this.ENo(i));
          }
        }
        this.Iei = e;
        this.NCi = h;
        let t = -1;
        let s = -1;
        for (let i = e; i <= h; ++i) {
          if (!(i < 0) && !(i >= this.dNo) && !(n = i % G, a = i % p, d >= 0 && i >= d && i <= l && n == a)) {
            this.SNo(i);
            if (IS_DEBUG) {
              if (t < 0) {
                t = i;
              }
              s = i;
            }
          }
        }
        if (IS_DEBUG && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LoopScrollView", 16, "更新格子", ["起始Index", t], ["终止Index", s], ["展示中数量", this.IGo]);
        }
      }
    };
    this.pGo = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LoopScrollView", 24, "LoopScrollView.OnDestroy");
      }
      this.cNo.OnDestroyCallBack.Unbind();
      this.cNo.OnGridsUpdate.Unbind();
      this.cNo.OnGridCreate.Unbind();
      if (this.cGo) {
        this.cGo.Clear();
      }
      this.uGo.Destroy();
    };
    this.BZi = -1;
    if (t) {
      t.GetUIItem().SetUIActive(false);
      i.SetTickableWhenPaused(true);
      i.OnDestroyCallBack.Bind(this.pGo);
      if (e) {
        i.OnGridCreate.Bind(this.vNo);
      } else {
        i.OnGridCreate.Bind(this.pNo);
      }
      i.OnGridsUpdate.Bind(this.MNo);
      this.cNo = i;
      this.fGo = t;
      this.uGo = new ScrollViewDelegate_1.ScrollViewDelegate(s);
      this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(this);
      this.cGo.RegisterAnimController();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LoopScrollView", 16, "设置格子模板错误，grid为空!");
    }
  }
  get IGo() {
    if (this.CN) {
      return 0;
    } else {
      return this.NCi - this.Iei + 1;
    }
  }
  get Iei() {
    return this.CNo;
  }
  set Iei(i) {
    this.CNo = i;
  }
  get NCi() {
    return this.gNo;
  }
  set NCi(i) {
    this.gNo = i;
  }
  get CN() {
    return this.NCi === -1 && this.Iei === -1;
  }
  get DataInited() {
    return this.fNo;
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    var i;
    this.pjt = false;
    if (!this.gWt.Empty) {
      i = this.gWt.Pop();
      this.RefreshByData(i.Data, i?.KeepContentPosition, i.CallBack, i.PlayGridAnim);
    }
  }
  GetDisplayGridNum() {
    return this.IGo;
  }
  GetPreservedGridNum() {
    if (this.cNo) {
      return this.cNo.GridArray.Num();
    } else {
      return 0;
    }
  }
  GetDisplayGridStartIndex() {
    return this.Iei;
  }
  GetDisplayGridEndIndex() {
    return this.NCi;
  }
  GetGridAnimationInterval() {
    return this.cNo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.cNo.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.cNo.SetInAnimation(true);
  }
  NotifyAnimationEnd() {
    this.cNo.SetInAnimation(false);
    this.znl?.();
  }
  SetAnimFinishDelegate(i) {
    this.znl = i;
  }
  GetGrid(i) {
    i = this.cNo.GetGrid(i);
    if (i) {
      return i.GetUIItem();
    }
  }
  GetGridByDisplayIndex(i) {
    if (!(this.cNo.GridArray.Num() <= 0)) {
      var t = this.cNo.GridArray.Get(i);
      if (t) {
        return t.GetUIItem();
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 24, "Grid is NULL!", ["DisplayIndex", i]);
      }
    }
  }
  UnsafeGetGridProxy(i, t = false) {
    var s = this.ENo(i, true);
    if (s !== -1) {
      if (!this.cGo || this.cGo.IsGridControlValid()) {
        return this.uGo.GetGridProxy(s);
      }
      if (t && Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 24, "动画还在播放时非法获取格子, gridIndex: " + i);
      }
    }
  }
  ReloadGrids(i) {
    if (i !== this.uGo.GetDataLength()) {
      this.MGo(i, false);
    }
  }
  ReloadProxyData(i, t, s = true, e = false) {
    this.uGo.ClearSelectInfo();
    this.uGo.SetDataProxy(i, t, s);
    this.MGo(t, e);
  }
  ReloadData(i, t = false) {
    if (i.length === this.uGo.GetDataLength()) {
      this.UpdateData(i);
      this.cGo?.PlayGridAnim(this.IGo, true);
    } else {
      this.uGo.ClearSelectInfo();
      this.uGo.SetData(i);
      this.MGo(i.length, t);
    }
  }
  UpdateData(i) {
    if (i.length !== this.uGo.GetDataLength()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 24, `UpdateData要求新的数据长度必须跟旧的数据长度相等. 新长度: ${i.length}, 旧长度：${this.uGo.GetDataLength()}`);
      }
    } else {
      this.uGo.SetData(i);
      this.RefreshAllGridProxies();
    }
  }
  RefreshAllGridProxies() {
    if (!this.CN) {
      for (let i = this.Iei; i <= this.NCi; ++i) {
        this.RefreshGridProxy(i);
      }
    }
  }
  RefreshGridProxy(i) {
    var t;
    if (i >= this.Iei && i <= this.NCi) {
      t = this.ENo(i);
      this.uGo.RefreshGridProxy(i, t);
    }
  }
  ClearGridProxies() {
    this.uGo.ClearData();
    for (let i = this.Iei; i <= this.NCi; ++i) {
      this.uGo.ClearGridProxy(i, this.ENo(i));
    }
  }
  ClearSelectInfo() {
    this.uGo.ClearSelectInfo();
  }
  TryGetCachedData(i) {
    return this.uGo.TryGetCachedData(i);
  }
  SelectGridProxy(i, t = false) {
    this.uGo.SelectGridProxy(i, this.ENo(i), t);
  }
  DeselectCurrentGridProxy(i = false) {
    this.uGo.DeselectCurrentGridProxy(i);
  }
  GetSelectedGridIndex() {
    return this.uGo.GetSelectedGridIndex();
  }
  BindLateUpdate(i) {
    this.cNo.OnLateUpdate.Bind(i);
  }
  UnBindLateUpdate() {
    this.cNo.OnLateUpdate.Unbind();
  }
  MGo(i, t) {
    var s;
    if (this.cNo) {
      if (s = this.fGo) {
        this.Iei = -1;
        this.NCi = -1;
        this.dNo = i;
        this.cNo.RefreshByData(s, i, t);
        this.fNo = true;
        if (this.cGo) {
          this.cGo.PlayGridAnim(this.IGo, true);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LoopScrollView", 16, "更新数据错误，TemplateGrid为空!");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LoopScrollView", 16, "更新数据错误，UILoopScrollViewComponent组件为空!");
    }
  }
  RefreshByData(i, t = false, s, e = false) {
    var h;
    if (this.Rjt) {
      h = new OperationParam(i, t, s);
      this.gWt.Push(h);
    } else {
      this.Ujt();
      this.RefreshByDataAsync(i, t, e).finally(() => {
        s?.();
        this.Jft();
      });
    }
  }
  async RefreshByDataAsync(i, t = false, s = false) {
    if (i.length === this.uGo.GetDataLength()) {
      this.UpdateData(i);
    } else {
      this.uGo.ClearSelectInfo();
      this.uGo.SetData(i);
      await this.yNo(i.length, t);
    }
    if (s && this.cGo) {
      this.cGo.PlayGridAnim(this.IGo, true);
    }
  }
  async yNo(i, t) {
    var s;
    if (this.cNo) {
      if (s = this.fGo) {
        this.Iei = -1;
        this.NCi = -1;
        this.dNo = i;
        this.HDa = true;
        this.mNo.length = 0;
        this.cNo.RefreshByData(s, i, t);
        await Promise.all(this.mNo);
        if (this.mNo.length > 0) {
          this.mNo.length = 0;
          this.cNo.RefreshByData(s, i, t);
        }
        this.HDa = false;
        this.fNo = true;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LoopScrollView", 43, "更新数据错误，TemplateGrid为空!");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LoopScrollView", 43, "更新数据错误，UILoopScrollViewComponent组件为空!");
    }
  }
  IsGridDisplaying(i) {
    i = this.ENo(i, false);
    return i >= 0 && i < this.IGo;
  }
  ScrollToGridIndex(i, t = true) {
    this.cNo.ScrollToGridIndex(i);
    if (t) {
      this.ResetGridController();
    }
  }
  ScrollToGridIndexWithTween(i, t = true) {
    this.cNo.ScrollToGridIndex(i, true);
    if (t) {
      this.ResetGridController();
    }
  }
  SNo(i) {
    var t = this.ENo(i);
    this.uGo.OnGridsUpdate(i, t, this.Iei, this.NCi);
  }
  ENo(i, t = false) {
    if (this.Iei < 0 || this.IGo <= 0) {
      if (t && Log_1.Log.CheckError()) {
        Log_1.Log.Error("LoopScrollView", 16, "GetGridDisplayIndex: 未初始化", ["this.StartGridIndex", this.Iei], ["this.DisplayGridNum", this.IGo]);
      }
      return -1;
    } else if (i < this.Iei || i >= this.Iei + this.IGo) {
      if (t && Log_1.Log.CheckError()) {
        Log_1.Log.Error("LoopScrollView", 16, "GetGridDisplayIndex: 未处于展示中", ["gridIndex", i], ["this.StartGridIndex", this.Iei], ["this.StartGridIndex + this.DisplayGridNum", this.Iei + this.IGo]);
      }
      return -1;
    } else {
      return i % this.IGo;
    }
  }
  BindOnScrollValueChanged(i) {
    this.cNo.OnScrollValueChange.Bind(i);
  }
  GetGridAndScrollToByJudge(s, e, h = true) {
    if (this.DataInited) {
      let i = 0;
      let t = false;
      for (const r of this.uGo.GetDatas()) {
        if (e(s, r)) {
          t = true;
          break;
        }
        i++;
      }
      if (!t) {
        i = 0;
      }
      this.ScrollToGridIndex(i, h);
      return this.GetGrid(i);
    }
  }
  ScrollToNextLine(i = true) {
    this.cNo.ScrollToNextLine(i);
  }
  SetTargetRootComponentActive(i) {
    this.cNo.GetRootComponent().SetUIActive(i);
  }
  ResetGridController() {
    if (this.cGo) {
      this.cGo.PlayGridAnim(this.IGo, true);
    }
  }
  ScrollToDisplayingIndex(i) {
    i = this.GetGridByDisplayIndex(i);
    if (i) {
      this.cNo.ScrollTo(i);
    }
  }
  GetUiAnimController() {
    return this.cNo?.GetContent()?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
  }
  GetDisplayGridEndIndexPurely() {
    var i;
    var t;
    var s;
    var e;
    if (this.BZi === -1 && (i = this.cNo?.GetViewport()?.GetUIItem()?.GetHeight() ?? 0, t = this.cNo?.PaddingVertical ?? 0, s = this.cNo?.SpacingVertical ?? 0, (e = this.cNo?.TemplateGrid?.GetUIItem()?.GetHeight() ?? 0) + s !== 0)) {
      this.BZi = Math.ceil((i - t * 2 + s) / (e + s));
    }
    return this.Iei + this.BZi - 1;
  }
}
exports.LoopScrollView = LoopScrollView;
//# sourceMappingURL=LoopScrollView.js.map