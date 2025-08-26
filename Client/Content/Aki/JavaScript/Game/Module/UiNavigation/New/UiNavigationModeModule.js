"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationModeModule = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const NavigationDynamicScrollViewFindContext_1 = require("./DynScrollView/NavigationDynamicScrollViewFindContext");
const FindOppositeNavigationResult_1 = require("./FindOppositeNavigationResult");
const ERRORTOLERANCE = 0.0001;
class UiNavigationModeModule {
  constructor(i) {
    this.Nxo = undefined;
    this.PBo = MathUtils_1.MathUtils.SmallNumber;
    this.zdd = MathUtils_1.MathUtils.KindaSmallNumber;
    this.Nxo = i;
    this.PBo = i.NavigateTolerance;
    this.zdd = i.NavigateToleranceReverse;
  }
  static xBo(i, t, e) {
    var o = e.GetRootComponent().GetLocalSpaceCenter();
    var a = e.GetRootComponent().GetLocalSpaceLeftBottomPoint();
    var e = e.GetRootComponent().GetLocalSpaceRightTopPoint();
    if (t) {
      t = o.X - i.X;
      if (t < a.X || t > e.X) {
        return false;
      }
    } else {
      t = o.Y - i.Z;
      if (t < a.Y || t > e.Y) {
        return false;
      }
    }
    return true;
  }
  static wBo(i, t) {
    return Math.abs(i - t) < MathUtils_1.MathUtils.KindaSmallNumber && (UiNavigationModeModule.BBo.X < 0 || UiNavigationModeModule.BBo.Z > 0) || t - i >= MathUtils_1.MathUtils.KindaSmallNumber;
  }
  static kRc(i, t, e) {
    return e === 4 && i !== t.ScrollView;
  }
  static FindDynamicScrollViewNavigationComponent(i) {
    var t;
    var e;
    if (i.NextType === 0) {
      e = i.GroupConfig;
      t = i.ScrollView;
      e = e.GetOppositeListenerListByListener(t.GetOwner(), undefined);
      return UiNavigationModeModule.FindOppositeNavigationComponent(i.LastListenerPosition, e, i.WrapMode, i.PriorityMode, i.IsVertical, i.NavigateTolerance, i.NavigateToleranceReverse, t, i.GroupConfig, i.NegativeDirection);
    }
    var o = i.LastListener.GetNavigationGroup().ListenerList;
    if (i.NextType === 1) {
      for (let i = 0, t = o.length; i < t; ++i) {
        var a = o[i];
        if (a.IsCanFocus()) {
          return a;
        }
      }
    } else {
      for (let i = o.length - 1; i >= 0; --i) {
        var r = o[i];
        if (r.IsCanFocus()) {
          return r;
        }
      }
    }
  }
  static FindOppositeNavigationComponent(e, o, i, a, r, s, n, d, t, v = false) {
    let M = 0;
    let h = Number.MAX_VALUE;
    let l = Number.MAX_VALUE;
    let u = false;
    let N = undefined;
    let U = 0;
    let g = Number.MAX_VALUE;
    let _ = Number.MIN_VALUE;
    let c = undefined;
    var f = Vector_1.Vector.Create();
    var p = Vector_1.Vector.Create();
    for (let i = 0, t = o.length; i < t; ++i) {
      var R = o[i];
      if (R.GetNavigationComponent().CheckFindOpposite() && !this.kRc(d, R, a)) {
        this.qBo(R).Subtraction(e, f);
        var m = f.Size();
        p.DeepCopy(f);
        p.Normalize();
        var C = Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, p);
        if (!MathUtils_1.MathUtils.IsNearlyEqual(C, 0, MathUtils_1.MathUtils.KindaSmallNumber)) {
          var E;
          var O;
          var V = r ? Math.abs(f.Z) : Math.abs(f.X);
          if (C > 0) {
            var y = MathUtils_1.MathUtils.IsNearlyEqual(C, 1, s);
            var F = MathUtils_1.MathUtils.IsNearlyEqual(M, 1, s);
            let i = false;
            let t = false;
            switch (a) {
              case 1:
                if (y && m < h) {
                  i = true;
                }
                break;
              case 0:
              case 4:
                if ((t = this.xBo(f, r, R)) && u) {
                  if (MathUtils_1.MathUtils.IsNearlyEqual(V, l, 1)) {
                    if (this.wBo(m, h)) {
                      i = true;
                    }
                  } else if (V < l) {
                    i = true;
                  }
                } else if (this.wBo(m, h)) {
                  i = true;
                }
                break;
              case 2:
                if (y) {
                  if (!F || m < h) {
                    i = true;
                  }
                } else if (!F && m < h) {
                  i = true;
                }
                break;
              case 3:
                if (y && (!F || C > M)) {
                  i = true;
                }
            }
            if (i) {
              M = C;
              h = m;
              N = R;
              l = V;
              u = t;
            }
          } else {
            let i = false;
            if (a === 4) {
              if (MathUtils_1.MathUtils.IsNearlyEqual(V, _, 1)) {
                if (m < g) {
                  i = true;
                }
              } else if (V > _) {
                i = true;
              }
            } else {
              O = MathUtils_1.MathUtils.IsNearlyEqual(C, -1, n);
              E = MathUtils_1.MathUtils.IsNearlyEqual(U, -1, n);
              if (O) {
                if (!E || m > g) {
                  i = true;
                }
              } else if (!E && (!(O = MathUtils_1.MathUtils.IsNearlyEqual(C, U)) && C < U || O && m > g)) {
                i = true;
              }
            }
            if (i) {
              U = C;
              _ = V;
              g = m;
              c = R;
            }
          }
        }
      }
    }
    if (v && c) {
      UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = false;
      return c;
    } else if (MathUtils_1.MathUtils.IsNearlyEqual(M, 0)) {
      if ((!(d instanceof UE.UIDynScrollViewComponent) || d.IsAllItemDisplayed()) && i === 1 && this.nvc(c, d, t)) {
        UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = false;
        return c;
      } else {
        return undefined;
      }
    } else {
      UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = true;
      return N;
    }
  }
  static nvc(i, t, e) {
    var o;
    return !i?.ScrollView || !t || t instanceof UE.UIDynScrollViewComponent || !!t.CheckContentUnderSize() || !(t.Horizontal && t.HorizontalScrollbarComp && UiNavigationModeModule.BBo.X !== 0 ? (i = t.HorizontalScrollbarComp.Value, o = UiNavigationModeModule.BBo.X > 0, i < 1 - ERRORTOLERANCE && o && e?.SlideToRightOrDown || i > ERRORTOLERANCE && !o && e?.SlideToLeftOrTop) : t.Vertical && t.VerticalScrollbarComp && UiNavigationModeModule.BBo.Z !== 0 && (i = t.VerticalScrollbarComp.Value, o = UiNavigationModeModule.BBo.Z < 0, i < 1 - ERRORTOLERANCE && o && e?.SlideToRightOrDown || i > ERRORTOLERANCE && !o && e?.SlideToLeftOrTop));
  }
  GBo(i, t, e) {
    let o = this.Nxo.GetNavigationComponent().FindLoopScrollViewNavigationComponent(UiNavigationModeModule.BBo.ToUeVectorOld(), i);
    var a;
    var r;
    var s;
    var n;
    if (!o) {
      a = this.Nxo.GetNavigationGroup();
      r = this.Nxo.ScrollView;
      n = this.Nxo.ScrollViewActor;
      s = this.Nxo.LayoutActor;
      n = a.GetOppositeListenerListByListener(n, s).filter(i => i !== this.Nxo);
      s = UiNavigationModeModule.qBo(this.Nxo);
      n = UiNavigationModeModule.FindOppositeNavigationComponent(s, n, i, t, e, this.PBo, this.zdd, r, a);
      o = n?.GetSelectableComponent();
      if (!n && this.Nxo.HasDynamicScrollView()) {
        this.Iad(s, e, i, t, a, 0);
      }
    }
    return o;
  }
  Iad(a, r, s, n, d, v) {
    if (this.Nxo.HasDynamicScrollView()) {
      var M = this.Nxo.ScrollView;
      if ((!M || r === M.Vertical || s !== 0) && !M.IsAllItemDisplayed()) {
        var h;
        var l = M.TotalItemNum;
        var u = M.GetStartItemIndex();
        var N = M.GetEndItemIndex();
        let i = -1;
        let t = false;
        let e = false;
        let o = false;
        if (r) {
          h = UiNavigationModeModule.BBo.Z < 0;
          if (N === l - 1 && h) {
            i = 0;
            o = true;
          } else if (u !== 0 || h) {
            t = true;
            e = !h;
          } else {
            i = l - 1;
            o = true;
          }
        } else {
          h = UiNavigationModeModule.BBo.X > 0;
          if (N === l - 1 && h) {
            i = 0;
            o = true;
          } else if (u !== 0 || h) {
            t = true;
            e = !h;
          } else {
            i = l - 1;
            o = true;
          }
        }
        N = new NavigationDynamicScrollViewFindContext_1.NavigationDynamicScrollViewFindContext();
        N.LastListenerPosition = a;
        N.WrapMode = s;
        N.IsVertical = r;
        N.PriorityMode = n;
        N.ScrollView = M;
        N.GroupConfig = d;
        N.NavigateTolerance = this.PBo;
        N.NavigateToleranceReverse = this.zdd;
        N.NegativeDirection = o;
        N.LastListener = this.Nxo;
        N.NextType = v;
        this.Nxo.PanelConfig?.MarkToFindDynamicGrid(N);
        if (i >= 0) {
          M.ScrollToItemIndex(i);
        } else if (t) {
          M.ScrollItemIndex(e);
        }
      }
    }
  }
  NBo(i, t, e) {
    if (this.Nxo.HasLoopScrollView()) {
      UiNavigationModeModule.BBo.Set(1, 0, 0);
      var o = this.Nxo.ScrollView.FindNavigationComponent(this.Nxo.GetSelectableComponent(), UiNavigationModeModule.BBo.ToUeVectorOld(), 2);
      if (o) {
        return o;
      }
    }
    var a = this.Nxo.GetNavigationGroup().ListenerList;
    var r = a.length;
    if (r <= 0) {
      return this.Nxo.GetSelectableComponent();
    }
    var s = a.indexOf(this.Nxo);
    if (s !== -1) {
      for (let i = s + 1; i < r; i++) {
        var n = a[i];
        if (n.IsCanFocus()) {
          UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = true;
          return n.GetSelectableComponent();
        }
      }
      if (this.Nxo?.HasDynamicScrollView()) {
        if (!this.Nxo.ScrollView.IsAllItemDisplayed()) {
          UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = false;
          this.Iad(UiNavigationModeModule.qBo(this.Nxo), i, t, e, this.Nxo.GetNavigationGroup(), 1);
          return;
        }
      }
      for (let i = 0; i < s; i++) {
        var d = a[i];
        if (d.IsCanFocus()) {
          UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = false;
          return d.GetSelectableComponent();
        }
      }
    }
  }
  OBo(i, t, e) {
    if (this.Nxo.HasLoopScrollView()) {
      UiNavigationModeModule.BBo.Set(-1, 0, 0);
      var o = this.Nxo.ScrollView.FindNavigationComponent(this.Nxo.GetSelectableComponent(), UiNavigationModeModule.BBo.ToUeVectorOld(), 2);
      if (o) {
        return o;
      }
    }
    var a = this.Nxo.GetNavigationGroup().ListenerList;
    var o = a.length;
    if (o <= 0) {
      return this.Nxo.GetSelectableComponent();
    }
    var r = a.indexOf(this.Nxo);
    if (r !== -1) {
      for (let i = r - 1; i >= 0; i--) {
        var s = a[i];
        if (s.IsCanFocus()) {
          UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = true;
          return s.GetSelectableComponent();
        }
      }
      if (this.Nxo?.HasDynamicScrollView()) {
        if (!this.Nxo.ScrollView.IsAllItemDisplayed()) {
          UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = false;
          this.Iad(UiNavigationModeModule.qBo(this.Nxo), i, t, e, this.Nxo.GetNavigationGroup(), 2);
          return;
        }
      }
      for (let i = o - 1; i > r; i--) {
        var n = a[i];
        if (n.IsCanFocus()) {
          UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive = false;
          return n.GetSelectableComponent();
        }
      }
    }
  }
  kBo(i) {
    if (Math.abs(UiNavigationModeModule.BBo.X) >= Math.abs(UiNavigationModeModule.BBo.Z)) {
      switch (i.HorizontalWrapMode) {
        case 2:
          if (UiNavigationModeModule.BBo.X > 0) {
            return this.NBo(false, i.HorizontalWrapMode, i.HorizontalPriorityMode);
          } else {
            return this.OBo(false, i.HorizontalWrapMode, i.HorizontalPriorityMode);
          }
        case 0:
        case 1:
          UiNavigationModeModule.BBo.Set(Math.sign(UiNavigationModeModule.BBo.X), 0, 0);
          return this.GBo(i.HorizontalWrapMode, i.HorizontalPriorityMode, false);
        default:
          return;
      }
    } else {
      switch (i.VerticalWrapMode) {
        case 2:
          if (UiNavigationModeModule.BBo.Z < 0) {
            return this.NBo(true, i.VerticalWrapMode, i.VerticalPriorityMode);
          } else {
            return this.OBo(true, i.VerticalWrapMode, i.VerticalPriorityMode);
          }
        case 0:
        case 1:
          UiNavigationModeModule.BBo.Set(0, 0, Math.sign(UiNavigationModeModule.BBo.Z));
          return this.GBo(i.VerticalWrapMode, i.VerticalPriorityMode, true);
        default:
          return;
      }
    }
  }
  FBo(i) {
    if (i === 3) {
      return this.Nxo.NavigationMode.TopActor;
    } else if (i === 4) {
      return this.Nxo.NavigationMode.DownActor;
    } else if (i === 1) {
      return this.Nxo.NavigationMode.LeftActor;
    } else if (i === 2) {
      return this.Nxo.NavigationMode.RightActor;
    } else {
      return undefined;
    }
  }
  VBo(i) {
    if (i === 3) {
      return this.Nxo.NavigationMode.TopMode;
    } else if (i === 4) {
      return this.Nxo.NavigationMode.DownMode;
    } else if (i === 1) {
      return this.Nxo.NavigationMode.LeftMode;
    } else if (i === 2) {
      return this.Nxo.NavigationMode.RightMode;
    } else {
      return undefined;
    }
  }
  HBo(i) {
    var t;
    if (i === 3) {
      t = this.Nxo.GetRootComponent().D_GetRightVector();
      UiNavigationModeModule.BBo.Set(t.X, t.Y, t.Z);
    }
    if (i === 4) {
      t = this.Nxo.GetRootComponent().D_GetRightVector();
      UiNavigationModeModule.BBo.Set(-t.X, -t.Y, -t.Z);
    }
    if (i === 1) {
      t = this.Nxo.GetRootComponent().D_GetForwardVector();
      UiNavigationModeModule.BBo.Set(-t.X, -t.Y, -t.Z);
    }
    if (i === 2) {
      t = this.Nxo.GetRootComponent().D_GetForwardVector();
      UiNavigationModeModule.BBo.Set(t.X, t.Y, t.Z);
    }
  }
  jBo() {
    var i = this.Nxo.RootUIComp;
    if (i) {
      var t = i.GetRenderCanvas();
      if (t !== undefined && t.GetRootCanvas() !== undefined) {
        if (i.IsScreenSpaceOverlayUI()) {
          t = i.GetRootCanvas().GetOwner().RootComponent;
          return this.WBo(t);
        } else {
          return this.WBo(undefined);
        }
      }
    }
  }
  WBo(i) {
    UiNavigationModeModule.BBo.Normalize(0);
    var t = this.Nxo.GetNavigationGroup();
    if (t) {
      return this.kBo(t);
    }
    var e = UiNavigationModeModule.qBo(this.Nxo);
    let o = Number.MIN_VALUE;
    let a = this.Nxo.GetSelectableComponent();
    var r = UE.LGUIBPLibrary.GetComponentsInChildren(i.GetOwner(), UE.TsUiNavigationBehaviorListener_C.StaticClass(), false);
    for (let i = 0, t = r.Num(); i < t; ++i) {
      var s;
      var n;
      var d = r.Get(i);
      if (d.GroupName === this.Nxo.GroupName && d.IsCanFocus()) {
        (s = UiNavigationModeModule.qBo(d)).Subtraction(e, s);
        if (!((n = Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, s)) <= 0.1)) {
          if ((n = n / s.SizeSquared()) > o) {
            o = n;
            a = d.GetSelectableComponent();
          }
        }
      }
    }
    return a;
  }
  static qBo(i) {
    var t = i.GetRootComponent().GetLocalSpaceCenter();
    var t = Vector_1.Vector.Create(t.X, t.Y, 0);
    Transform_1.Transform.Create(i.GetRootSceneComponent().D_K2_GetComponentToWorld()).TransformPosition(t, t);
    return t;
  }
  FindActorByDirection(i, t = true) {
    var e;
    var o = this.VBo(i);
    if (o === 2) {
      e = this.Nxo.RootUIComp;
      if (t && !e.IsUIActiveInHierarchy()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiNavigation", 10, "当前选中的导航监听组件按钮不可视", ["DisplayName", e.displayName]);
        }
        return;
      } else if ((t = this.FBo(i).GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass())) && !t.IsCanFocus()) {
        return t.ModeModule?.FindActorByDirection(i, false);
      } else {
        return t.GetBehaviorComponent().GetRootSceneComponent();
      }
    } else if (o === 1) {
      this.HBo(i);
      return this.jBo()?.GetRootSceneComponent();
    } else {
      return undefined;
    }
  }
}
(exports.UiNavigationModeModule = UiNavigationModeModule).BBo = Vector_1.Vector.Create();
UiNavigationModeModule.FindOppositeNavigationResult = new FindOppositeNavigationResult_1.FindOppositeNavigationResult(); //# sourceMappingURL=UiNavigationModeModule.js.map