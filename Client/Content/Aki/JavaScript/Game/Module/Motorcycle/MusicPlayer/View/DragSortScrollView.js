"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragSortGridAbstract = exports.DragSortGridData = exports.DragSortScrollView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DragSortScrollView {
  constructor(t, i, s = undefined) {
    this.cNo = undefined;
    this.HDm = 0;
    this.Ugo = undefined;
    this.Dui = 0;
    this.$Dm = ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetDragSwapSpeed();
    this.WDm = 100;
    this.QDm = ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetDragScrollSpeedRange()[0];
    this.KDm = ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetDragScrollSpeedRange()[1];
    this.yGo = [];
    this.SGo = [];
    this.XDm = new Map();
    this.YDm = [];
    this.zDm = undefined;
    this.a4e = undefined;
    this.ypt = [];
    this.uGf = 0;
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
      this.XDm.clear();
      this.ypt = [];
      this.YDm = [];
      this.zDm = undefined;
      this.a4e = undefined;
      this.OnItemPointerDownCallback = undefined;
      this.OnItemPointerUpCallback = undefined;
    };
    this.Ga_ = () => {
      if (this.Ugo) {
        this.Ugo.RefreshDragPosition();
        this.JDm();
      }
      this.Xqe();
    };
    this.ZDm = t => {
      if (!t.DragData.IsTweenMoving) {
        this.Ugo = t;
        this.uGf = t.DragData.Index;
        t.GetRootItem().SetHierarchyIndex(this.SGo.length);
      }
    };
    this.eUm = t => {
      var i;
      var s;
      var h;
      if (t === this.Ugo) {
        if ((i = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0)).Y < this.WDm) {
          (s = this.cNo.VerticalScrollbarComp).SetValue(s.Value - MathUtils_1.MathUtils.RangeClamp(i.Y, this.WDm, 0, this.QDm, this.KDm));
        }
        s = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World).Y;
        if (i.Y > s - this.WDm) {
          (h = this.cNo.VerticalScrollbarComp).SetValue(h.Value + MathUtils_1.MathUtils.RangeClamp(s - i.Y, this.WDm, 0, this.QDm, this.KDm));
        }
        t.RefreshDragPosition();
        this.JDm();
      }
    };
    this.tUm = t => {
      if (this.Ugo) {
        this.SetGridIndex(this.Ugo, this.Ugo.DragData.Index);
        this.Ugo = undefined;
      }
    };
    this.x6f = t => {
      if (!t.DragData.IsTweenMoving) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(true);
      }
      this.OnItemPointerDownCallback?.(t);
    };
    this.B6f = t => {
      this.OnItemPointerUpCallback?.(t);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
    };
    this.cNo = t;
    var h = this.cNo.GetContent().GetComponentByClass(UE.UIVerticalLayout.StaticClass());
    h.GetOwner().OnDestroyed.Add(this.pGo);
    h.SetEnable(false);
    let r = s;
    if (r = s ? r : h.RootUIComp.GetAttachUIChild(0)?.GetOwner()) {
      this.zDm = r.GetUIItem();
      this.zDm.SetUIActive(false);
      this.HDm = h.Spacing;
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
    return -t * (this.Dui + this.HDm) - this.Dui * 0.5;
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
    this.iUm();
    this.YDm = [];
    this.ypt = i;
    for (let t = 0; t < i.length; t++) {
      const i = new DragSortGridData();
      i.Index = t;
      i.OriginDataIndex = t;
      this.YDm.push(i);
    }
    for (const i of this.YDm) {
      i.TargetOffsetY = this.CalcGridOffsetY(i.Index);
    }
    this.Xqe();
    this.ContentItem?.SetHeight(i.length * (this.Dui + this.HDm) - this.HDm);
  }
  IsDragging() {
    return this.Ugo !== undefined;
  }
  CancelDrag() {
    if (this.Ugo) {
      let t = true;
      var i = this.Ugo.DragData.Index;
      if (i > this.uGf) {
        t = true;
        for (const h of this.YDm) {
          if (h.Index >= this.uGf && h.Index < i) {
            h.Index += 1;
          }
          h.TargetOffsetY = this.CalcGridOffsetY(h.Index);
          h.IsTweenMoving = true;
        }
      } else {
        if (!(i < this.uGf)) {
          this.Ugo.DragData.Index = this.uGf;
          this.tUm(this.Ugo);
          return;
        }
        t = false;
        for (const r of this.YDm) {
          if (r.Index <= this.uGf && r.Index > i) {
            --r.Index;
          }
          r.TargetOffsetY = this.CalcGridOffsetY(r.Index);
          r.IsTweenMoving = true;
        }
      }
      this.Ugo.DragData.Index = this.uGf;
      this.tUm(this.Ugo);
      this.Xqe();
      for (const e of this.SGo) {
        var s = e.DragData;
        if (s.Index <= i && t && s.Index > this.uGf) {
          e.GetRootItem().SetAnchorOffsetY(this.CalcGridOffsetY(s.Index - 1));
          s.IsTweenMoving = true;
        } else if (s.Index >= i && !t && s.Index < this.uGf) {
          e.GetRootItem().SetAnchorOffsetY(this.CalcGridOffsetY(s.Index + 1));
          s.IsTweenMoving = true;
        }
      }
    }
  }
  Xqe() {
    var t = [];
    var i = Math.max(0, this.ContentItem.GetAnchorOffsetY() / (this.Dui + this.HDm) - 1);
    var s = Math.min((this.ContentItem.GetAnchorOffsetY() + this.ScrollHeight) / (this.Dui + this.HDm) + 1, this.ypt.length - 1);
    for (const h of this.SGo) {
      if ((h.DragData.Index < i || h.DragData.Index > s) && h !== this.Ugo) {
        t.push(h);
      }
    }
    for (const r of t) {
      this.PGo(r);
    }
    for (const e of this.YDm) {
      if (!this.XDm.has(e)) {
        if (e.Index >= i && e.Index <= s) {
          this.rUm(e);
        }
      }
    }
  }
  JDm() {
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
    this.XDm.delete(t.DragData);
    t.DragData.IsTweenMoving = false;
    t.DragData = undefined;
    if (t) {
      t.SetUiActive(false);
      this.yGo.push(t);
    }
  }
  iUm() {
    for (const t of Array.from(this.SGo)) {
      this.PGo(t);
    }
  }
  AGo(t) {
    var i = LguiUtil_1.LguiUtil.CopyItem(this.zDm, this.ContentItem);
    var s = this.a4e();
    s.OnDragBeginCallback = this.ZDm;
    s.OnDragCallback = this.eUm;
    s.OnDragEndCallback = this.tUm;
    s.OnPointerDownCallback = this.x6f;
    s.OnPointerUpCallback = this.B6f;
    s.CreateThenShowByActor(i.GetOwner());
    return s;
  }
  rUm(t) {
    let i = this.yGo.pop();
    (i = i || this.AGo(t)).SetUiActive(true);
    i.DragData = t;
    this.SetGridIndex(i, i.DragData.Index, false);
    i.Refresh(this.ypt[t.OriginDataIndex], false, t.Index);
    this.SGo.push(i);
    this.XDm.set(t, i);
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
            h.SetAnchorOffsetY(MathUtils_1.MathUtils.Lerp(s, r.TargetOffsetY, t * CommonDefine_1.SECOND_PER_MILLIONSECOND * this.$Dm));
          } else {
            h.SetAnchorOffsetY(r.TargetOffsetY);
            r.IsTweenMoving = false;
          }
        }
      }
    }
  }
  GetSortedData() {
    return this.YDm.sort((t, i) => t.Index - i.Index).map(t => this.ypt[t.OriginDataIndex]);
  }
  HasChanged() {
    return this.YDm.findIndex(t => t.Index !== t.OriginDataIndex) !== -1;
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