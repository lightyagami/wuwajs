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
const ModelManager_1 = require("../../../Manager/ModelManager");
const ERRORTOLERANCE = 0.0001;
class UiNavigationModeModule {
  constructor(i) {
    this.Nxo = undefined;
    this.PBo = MathUtils_1.MathUtils.SmallNumber;
    this.Nxo = i;
    this.PBo = i.NavigateTolerance;
  }
  xBo(i, t, e) {
    var a = e.GetRootComponent().GetLocalSpaceCenter();
    var o = e.GetRootComponent().GetLocalSpaceLeftBottomPoint();
    var e = e.GetRootComponent().GetLocalSpaceRightTopPoint();
    if (t) {
      t = a.X - i.X;
      if (t < o.X || t > e.X) {
        return false;
      }
    } else {
      t = a.Y - i.Z;
      if (t < o.Y || t > e.Y) {
        return false;
      }
    }
    return true;
  }
  wBo(i, t) {
    return Math.abs(i - t) < MathUtils_1.MathUtils.KindaSmallNumber && (UiNavigationModeModule.BBo.X < 0 || UiNavigationModeModule.BBo.Z > 0) || t - i >= MathUtils_1.MathUtils.KindaSmallNumber;
  }
  kRc(i, t) {
    return t === 4 && this.Nxo.ScrollView !== i.ScrollView;
  }
  bBo(e, i, a, o) {
    var r = this.qBo(this.Nxo);
    let s = 0;
    let h = Number.MAX_VALUE;
    let n = Number.MAX_VALUE;
    let M = false;
    let v = undefined;
    let d = 0;
    let l = Number.MAX_VALUE;
    let u = Number.MIN_VALUE;
    let _ = undefined;
    var U = Vector_1.Vector.Create();
    var N = Vector_1.Vector.Create();
    for (let i = 0, t = e.length; i < t; ++i) {
      var g = e[i];
      if (g.GetNavigationComponent().CheckFindOpposite(this.Nxo) && !this.kRc(g, a)) {
        this.qBo(g).Subtraction(r, U);
        var c = U.Size();
        N.DeepCopy(U);
        N.Normalize();
        var f = Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, N);
        if (!MathUtils_1.MathUtils.IsNearlyEqual(f, 0, MathUtils_1.MathUtils.KindaSmallNumber)) {
          var p;
          var R;
          var m = o ? Math.abs(U.Z) : Math.abs(U.X);
          if (f > 0) {
            var E = MathUtils_1.MathUtils.IsNearlyEqual(f, 1, this.PBo);
            var C = MathUtils_1.MathUtils.IsNearlyEqual(s, 1, this.PBo);
            let i = false;
            let t = false;
            switch (a) {
              case 1:
                if (E && c < h) {
                  i = true;
                }
                break;
              case 0:
              case 4:
                if ((t = this.xBo(U, o, g)) && M) {
                  if (MathUtils_1.MathUtils.IsNearlyEqual(m, n, 1)) {
                    if (this.wBo(c, h)) {
                      i = true;
                    }
                  } else if (m < n) {
                    i = true;
                  }
                } else if (this.wBo(c, h)) {
                  i = true;
                }
                break;
              case 2:
                if (E) {
                  if (!C || c < h) {
                    i = true;
                  }
                } else if (!C && c < h) {
                  i = true;
                }
                break;
              case 3:
                if (E && (!C || f > s)) {
                  i = true;
                }
            }
            if (i) {
              s = f;
              h = c;
              v = g;
              n = m;
              M = t;
            }
          } else {
            let i = false;
            if (a === 4) {
              if (MathUtils_1.MathUtils.IsNearlyEqual(m, u, 1)) {
                if (c < l) {
                  i = true;
                }
              } else if (m > u) {
                i = true;
              }
            } else {
              R = MathUtils_1.MathUtils.IsNearlyEqual(f, -1, MathUtils_1.MathUtils.KindaSmallNumber);
              p = MathUtils_1.MathUtils.IsNearlyEqual(d, -1, MathUtils_1.MathUtils.KindaSmallNumber);
              if (R) {
                if (!p || c > l) {
                  i = true;
                }
              } else if (!p && (!(R = MathUtils_1.MathUtils.IsNearlyEqual(f, d)) && f < d || R && c > l)) {
                i = true;
              }
            }
            if (i) {
              d = f;
              u = m;
              l = c;
              _ = g;
            }
          }
        }
      }
    }
    if (MathUtils_1.MathUtils.IsNearlyEqual(s, 0)) {
      if (!this.Nxo.HasDynamicScrollView() && i === 1 && this.nvc(_)) {
        return _?.GetSelectableComponent();
      } else {
        return undefined;
      }
    } else {
      return v?.GetSelectableComponent();
    }
  }
  nvc(i) {
    var t;
    var e;
    var a;
    return !i?.ScrollView || !this.Nxo?.ScrollView || !(i = this.Nxo.GetNavigationGroup()) || !!(t = this.Nxo.ScrollView).CheckContentUnderSize() || !(t.Horizontal && t.HorizontalScrollbarComp && UiNavigationModeModule.BBo.X !== 0 ? (e = t.HorizontalScrollbarComp.Value, a = UiNavigationModeModule.BBo.X > 0, e < 1 - ERRORTOLERANCE && a && i?.SlideToRightOrDown || e > ERRORTOLERANCE && !a && i?.SlideToLeftOrTop) : t.Vertical && t.VerticalScrollbarComp && UiNavigationModeModule.BBo.Z !== 0 && (e = t.VerticalScrollbarComp.Value, a = UiNavigationModeModule.BBo.Z < 0, e < 1 - ERRORTOLERANCE && a && i?.SlideToRightOrDown || e > ERRORTOLERANCE && !a && i?.SlideToLeftOrTop));
  }
  GBo(i, t, e) {
    let a = this.Nxo.GetNavigationComponent().FindLoopScrollViewNavigationComponent(UiNavigationModeModule.BBo.ToUeVectorOld(), i);
    var o;
    if (!a) {
      o = this.Nxo.GetNavigationGroup().GetOppositeListenerListByListener(this.Nxo);
      a = this.bBo(o, i, t, e);
    }
    if (!a && this.Nxo.HasDynamicScrollView()) {
      this.nNn(this.Nxo, e);
    }
    return a;
  }
  nNn(i, t) {
    i = i.ScrollView;
    if (i.Vertical === t) {
      if (t) {
        t = UiNavigationModeModule.BBo.Z < 0;
        i.ScrollItemIndex(!t);
      } else {
        t = UiNavigationModeModule.BBo.X > 0;
        i.ScrollItemIndex(!t);
      }
      ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    }
  }
  NBo() {
    if (this.Nxo.HasLoopScrollView()) {
      UiNavigationModeModule.BBo.Set(1, 0, 0);
      var i = this.Nxo.ScrollView.FindNavigationComponent(this.Nxo.GetSelectableComponent(), UiNavigationModeModule.BBo.ToUeVectorOld(), 2);
      if (i) {
        return i;
      }
    }
    var t = this.Nxo.GetNavigationGroup().ListenerList;
    var e = t.length;
    if (e <= 0) {
      return this.Nxo.GetSelectableComponent();
    }
    var a = t.indexOf(this.Nxo);
    if (a !== -1) {
      for (let i = a + 1; i < e; i++) {
        var o = t[i];
        if (o.IsCanFocus()) {
          return o.GetSelectableComponent();
        }
      }
      if (!this.Nxo?.HasDynamicScrollView()) {
        for (let i = 0; i < a; i++) {
          var r = t[i];
          if (r.IsCanFocus()) {
            return r.GetSelectableComponent();
          }
        }
      }
    }
  }
  OBo() {
    if (this.Nxo.HasLoopScrollView()) {
      UiNavigationModeModule.BBo.Set(-1, 0, 0);
      var t = this.Nxo.ScrollView.FindNavigationComponent(this.Nxo.GetSelectableComponent(), UiNavigationModeModule.BBo.ToUeVectorOld(), 2);
      if (t) {
        return t;
      }
    }
    var e = this.Nxo.GetNavigationGroup().ListenerList;
    var t = e.length;
    if (t <= 0) {
      return this.Nxo.GetSelectableComponent();
    }
    var a = e.indexOf(this.Nxo);
    if (a !== -1) {
      for (let i = a - 1; i >= 0; i--) {
        var o = e[i];
        if (o.IsCanFocus()) {
          return o.GetSelectableComponent();
        }
      }
      if (!this.Nxo?.HasDynamicScrollView()) {
        for (let i = t - 1; i > a; i--) {
          var r = e[i];
          if (r.IsCanFocus()) {
            return r.GetSelectableComponent();
          }
        }
      }
    }
  }
  kBo(i) {
    if (Math.abs(UiNavigationModeModule.BBo.X) >= Math.abs(UiNavigationModeModule.BBo.Z)) {
      switch (i.HorizontalWrapMode) {
        case 2:
          if (UiNavigationModeModule.BBo.X > 0) {
            return this.NBo();
          } else {
            return this.OBo();
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
            return this.NBo();
          } else {
            return this.OBo();
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
    var e = this.qBo(this.Nxo);
    let a = Number.MIN_VALUE;
    let o = this.Nxo.GetSelectableComponent();
    var r = UE.LGUIBPLibrary.GetComponentsInChildren(i.GetOwner(), UE.TsUiNavigationBehaviorListener_C.StaticClass(), false);
    for (let i = 0, t = r.Num(); i < t; ++i) {
      var s;
      var h;
      var n = r.Get(i);
      if (n.GroupName === this.Nxo.GroupName && n.IsCanFocus()) {
        (s = this.qBo(n)).Subtraction(e, s);
        if (!((h = Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, s)) <= 0.1)) {
          if ((h = h / s.SizeSquared()) > a) {
            a = h;
            o = n.GetSelectableComponent();
          }
        }
      }
    }
    return o;
  }
  qBo(i) {
    var t = i.GetRootComponent().GetLocalSpaceCenter();
    var t = Vector_1.Vector.Create(t.X, t.Y, 0);
    Transform_1.Transform.Create(i.GetRootSceneComponent().D_K2_GetComponentToWorld()).TransformPosition(t, t);
    return t;
  }
  FindActorByDirection(i, t = true) {
    var e;
    var a = this.VBo(i);
    if (a === 2) {
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
    } else if (a === 1) {
      this.HBo(i);
      return this.jBo()?.GetRootSceneComponent();
    } else {
      return undefined;
    }
  }
}
(exports.UiNavigationModeModule = UiNavigationModeModule).BBo = Vector_1.Vector.Create();
//# sourceMappingURL=UiNavigationModeModule.js.map