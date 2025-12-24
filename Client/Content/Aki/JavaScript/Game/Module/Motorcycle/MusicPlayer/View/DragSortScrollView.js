"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragSortGridAbstract = exports.DragSortGridData = exports.DragSortScrollView = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DragSortScrollView {
  constructor(t, i, s = undefined) {
    this.cNo = undefined;
    this.TPm = 0;
    this.Ugo = undefined;
    this.Dui = 0;
    this.bPm = 2;
    this.RPm = 100;
    this.wPm = 0.001;
    this.LPm = 0.01;
    this.yGo = [];
    this.SGo = [];
    this.PPm = new Map();
    this.APm = [];
    this.DPm = undefined;
    this.a4e = undefined;
    this.ypt = [];
    this.PUf = 0;
    this.OnItemPointerDownCallback = undefined;
    this.OnItemPointerUpCallback = undefined;
    this.pGo = () => {
      for (let t = 0, i = this.yGo.length; t < i; ++t) {
        this.yGo[t].Destroy();
      }
      this.yGo = [];
      for (let t = 0, i = this.SGo.length; t < i; ++t) {
        this.SGo[t].Destroy();
      }
      this.SGo = [];
      this.cNo?.OnScrollValueChange.Unbind();
      this.cNo = undefined;
      this.Ugo = undefined;
      this.yGo.length = 0;
      this.SGo.length = 0;
      this.PPm.clear();
      this.ypt = [];
      this.APm = [];
      this.DPm = undefined;
      this.a4e = undefined;
      this.OnItemPointerDownCallback = undefined;
      this.OnItemPointerUpCallback = undefined;
    };
    this.Ga_ = () => {
      if (this.Ugo) {
        this.Ugo.RefreshDragPosition();
        this.UPm();
      }
      this.Xqe();
    };
    this.xPm = t => {
      if (!t.DragData.IsTweenMoving) {
        this.Ugo = t;
        this.PUf = t.DragData.Index;
        t.GetRootItem().SetHierarchyIndex(this.SGo.length);
      }
    };
    this.BPm = t => {
      var i;
      var s;
      var h;
      if (t === this.Ugo) {
        if ((i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0)).Y < this.RPm) {
          (s = this.cNo.VerticalScrollbarComp).SetValue(s.Value - MathUtils_1.MathUtils.RangeClamp(i.Y, this.RPm, 0, this.wPm, this.LPm));
        }
        s = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World).Y;
        if (i.Y > s - this.RPm) {
          (h = this.cNo.VerticalScrollbarComp).SetValue(h.Value + MathUtils_1.MathUtils.RangeClamp(s - i.Y, this.RPm, 0, this.wPm, this.LPm));
        }
        t.RefreshDragPosition();
        this.UPm();
      }
    };
    this.kPm = t => {
      if (this.Ugo) {
        this.SetGridIndex(this.Ugo, this.Ugo.DragData.Index);
        this.Ugo = undefined;
      }
    };
    this.yGf = t => {
      if (!t.DragData.IsTweenMoving) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(true);
      }
      this.OnItemPointerDownCallback?.(t);
    };
    this.SGf = t => {
      this.OnItemPointerUpCallback?.(t);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
    };
    this.cNo = t;
    var h = this.cNo.GetContent().GetComponentByClass(UE.UIVerticalLayout.StaticClass());
    h.GetOwner().OnDestroyed.Add(this.pGo);
    h.SetEnable(false);
    let r = s;
    if (r = s ? r : h.RootUIComp.GetAttachUIChild(0)?.GetOwner()) {
      this.DPm = r.GetUIItem();
      this.DPm.SetUIActive(false);
      this.TPm = h.Spacing;
      this.Dui = r.GetUIItem().Height;
      this.a4e = i;
      t.OnScrollValueChange.Bind(this.Ga_);
    }
  }
  get ContentItem() {
    return this.cNo.ContentUIItem;
  }
  get ScrollWidth() {
    return this.cNo.RootUIComp.Width ?? 0;
  }
  get ScrollHeight() {
    return this.cNo.RootUIComp.Height ?? 0;
  }
  CalcGridOffsetY(t) {
    return -t * (this.Dui + this.TPm) - this.Dui * 0.5;
  }
  SetGridIndex(t, i, s = true) {
    if (t.DragData) {
      t.DragData.Index = i;
      (i = t.DragData).TargetOffsetY = this.CalcGridOffsetY(t.DragData.Index);
      if (s) {
        i.IsTweenMoving = true;
      } else {
        t.GetRootItem().SetAnchorOffsetY(i.TargetOffsetY);
        i.IsTweenMoving = false;
      }
    }
  }
  async RefreshByDataAsync(i, t = 0) {
    this.qPm();
    this.APm = [];
    this.ypt = i;
    for (let t = 0; t < i.length; t++) {
      const i = new DragSortGridData();
      i.Index = t;
      i.OriginDataIndex = t;
      this.APm.push(i);
    }
    for (const i of this.APm) {
      i.TargetOffsetY = this.CalcGridOffsetY(i.Index);
    }
    this.Xqe();
    this.ContentItem?.SetHeight(i.length * (this.Dui + this.TPm) - this.TPm);
  }
  IsDragging() {
    return this.Ugo !== undefined;
  }
  CancelDrag() {
    if (this.Ugo) {
      let t = true;
      var i = this.Ugo.DragData.Index;
      if (i > this.PUf) {
        t = true;
        for (const h of this.APm) {
          if (h.Index >= this.PUf && h.Index < i) {
            h.Index += 1;
          }
          h.TargetOffsetY = this.CalcGridOffsetY(h.Index);
          h.IsTweenMoving = true;
        }
      } else {
        if (!(i < this.PUf)) {
          this.Ugo.DragData.Index = this.PUf;
          this.kPm(this.Ugo);
          return;
        }
        t = false;
        for (const r of this.APm) {
          if (r.Index <= this.PUf && r.Index > i) {
            --r.Index;
          }
          r.TargetOffsetY = this.CalcGridOffsetY(r.Index);
          r.IsTweenMoving = true;
        }
      }
      this.Ugo.DragData.Index = this.PUf;
      this.kPm(this.Ugo);
      this.Xqe();
      for (const e of this.SGo) {
        var s = e.DragData;
        if (s.Index <= i && t && s.Index > this.PUf) {
          e.GetRootItem().SetAnchorOffsetY(this.CalcGridOffsetY(s.Index - 1));
          s.IsTweenMoving = true;
        } else if (s.Index >= i && !t && s.Index < this.PUf) {
          e.GetRootItem().SetAnchorOffsetY(this.CalcGridOffsetY(s.Index + 1));
          s.IsTweenMoving = true;
        }
      }
    }
  }
  Xqe() {
    var t = [];
    var i = Math.max(0, this.ContentItem.GetAnchorOffsetY() / (this.Dui + this.TPm) - 1);
    var s = Math.min((this.ContentItem.GetAnchorOffsetY() + this.ScrollHeight) / (this.Dui + this.TPm) + 1, this.ypt.length - 1);
    for (const h of this.SGo) {
      if ((h.DragData.Index < i || h.DragData.Index > s) && h !== this.Ugo) {
        t.push(h);
      }
    }
    for (const r of t) {
      this.PGo(r);
    }
    for (const e of this.APm) {
      if (!this.PPm.has(e)) {
        if (e.Index >= i && e.Index <= s) {
          this.OPm(e);
        }
      }
    }
  }
  UPm() {
    if (this.Ugo && this.Ugo.DragData) {
      var t = this.Ugo.GetRootItem();
      const s = this.Ugo.DragData.Index - 1;
      if (s >= 0) {
        var i = this.SGo.find(t => t.DragData.Index === s);
        if (i && t.GetAnchorOffsetY() > i.DragData.TargetOffsetY - this.Dui * 0.5) {
          --this.Ugo.DragData.Index;
          this.Ugo.DragData.TargetOffsetY = this.CalcGridOffsetY(this.Ugo.DragData.Index);
          this.SetGridIndex(i, 1 + s);
          return;
        }
      }
      const h = this.Ugo.DragData.Index + 1;
      if (h < this.ypt.length && (i = this.SGo.find(t => t.DragData.Index === h)) && t.GetAnchorOffsetY() < i.DragData.TargetOffsetY + this.Dui * 0.5) {
        this.Ugo.DragData.Index += 1;
        this.Ugo.DragData.TargetOffsetY = this.CalcGridOffsetY(this.Ugo.DragData.Index);
        this.SetGridIndex(i, h - 1);
      }
    }
  }
  PGo(t) {
    this.SGo.splice(this.SGo.indexOf(t), 1);
    this.PPm.delete(t.DragData);
    t.DragData.IsTweenMoving = false;
    t.DragData = undefined;
    if (t) {
      t.SetUiActive(false);
      this.yGo.push(t);
    }
  }
  qPm() {
    for (const t of Array.from(this.SGo)) {
      this.PGo(t);
    }
  }
  AGo(t) {
    var i = LguiUtil_1.LguiUtil.CopyItem(this.DPm, this.ContentItem);
    var s = this.a4e();
    s.OnDragBeginCallback = this.xPm;
    s.OnDragCallback = this.BPm;
    s.OnDragEndCallback = this.kPm;
    s.OnPointerDownCallback = this.yGf;
    s.OnPointerUpCallback = this.SGf;
    s.CreateThenShowByActor(i.GetOwner());
    return s;
  }
  OPm(t) {
    let i = this.yGo.pop();
    (i = i || this.AGo(t)).SetUiActive(true);
    i.DragData = t;
    this.SetGridIndex(i, i.DragData.Index, false);
    i.Refresh(this.ypt[t.OriginDataIndex], false, t.Index);
    this.SGo.push(i);
    this.PPm.set(t, i);
    return i;
  }
  Tick(t) {
    var i = this.SGo;
    if (i) {
      for (const e of i) {
        var s;
        var h = e.GetRootItem();
        var r = e.DragData;
        if (r.IsTweenMoving) {
          s = h.GetAnchorOffsetY();
          if (Math.abs(r.TargetOffsetY - s) > 0.1) {
            h.SetAnchorOffsetY(MathUtils_1.MathUtils.Lerp(s, r.TargetOffsetY, 1 / t * this.bPm));
          } else {
            h.SetAnchorOffsetY(r.TargetOffsetY);
            r.IsTweenMoving = false;
          }
        }
      }
    }
  }
  GetSortedData() {
    return this.APm.sort((t, i) => t.Index - i.Index).map(t => this.ypt[t.OriginDataIndex]);
  }
  HasChanged() {
    return this.APm.findIndex(t => t.Index !== t.OriginDataIndex) !== -1;
  }
}
exports.DragSortScrollView = DragSortScrollView;
class DragSortGridData {
  constructor() {
    this.OriginDataIndex = 0;
    this.Index = 0;
    this.TargetOffsetY = 0;
    this.IsTweenMoving = false;
    this.IsDrag = false;
  }
}
exports.DragSortGridData = DragSortGridData;
class DragSortGridAbstract extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnDragCallback = undefined;
    this.OnDragBeginCallback = undefined;
    this.OnDragEndCallback = undefined;
    this.OnPointerDownCallback = undefined;
    this.OnPointerUpCallback = undefined;
    this.DragData = undefined;
    this.Pgt = () => {
      this.OnDragBeginCallback?.(this);
    };
    this.Kgo = () => {
      this.OnDragEndCallback?.(this);
    };
    this.Agt = t => {
      this.OnDragCallback?.(this);
    };
    this.Ngo = () => {
      this.OnPointerDownCallback?.(this);
    };
    this.GFo = () => {
      this.OnPointerUpCallback?.(this);
    };
    this.nh1 = () => {
      this.OnPointerUpCallback?.(this);
    };
  }
  OnStart() {
    var t = this.GetDraggableComp();
    t.OnPointerDragCallBack.Bind(this.Agt);
    t.OnPointerBeginDragCallBack.Bind(this.Pgt);
    t.OnPointerEndDragCallBack.Bind(this.Kgo);
    t.OnPointerDownCallBack.Bind(this.Ngo);
    t.OnPointerUpCallBack.Bind(this.GFo);
    t.OnPointerCancelCallBack.Bind(this.nh1);
    this.OnStartImplement();
  }
  RefreshDragPosition() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0);
    var t = Vector2D_1.Vector2D.Create(t.X, t.Y);
    t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(true)));
    var t = t.Y;
    this.RootItem.SetLGUISpaceAbsolutePosition(new UE.Vector(this.RootItem.GetLGUISpaceAbsolutePosition().X, t, 0));
  }
}
exports.DragSortGridAbstract = DragSortGridAbstract;
//# sourceMappingURL=DragSortScrollView.js.map