"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueGrid = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class MapRogueGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.rk1 = 0, this.xL1 = !1, this.OnExtendTogglePointerDown = void 0, this.OnExtendToggleStateChanged = void 0, this.OnCanExecuteChangeFunc = void 0, this.OnHoverFunc = void 0, this.OnUnHoverFunc = void 0, this.Ngo = i => {
      this.OnExtendTogglePointerDown?.(i, this.Pe)
    }, this.PPt = i => {
      this.OnExtendToggleStateChanged?.(i, this.Pe)
    }, this.Lke = () => !this.OnCanExecuteChangeFunc || this.OnCanExecuteChangeFunc(this.GetExtendToggle(0).GetToggleState(), this.Pe), this._ui = () => {
      this.OnHoverFunc?.(this.Pe)
    }, this.uui = () => {
      this.OnUnHoverFunc?.(this.Pe)
    }, this.VR1 = !1
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem]
    ]
  }
  OnStart() {
    var i = this.GetExtendToggle(0);
    i.OnPointDownCallBack.Unbind(), i.OnPointDownCallBack.Bind(this.Ngo), i.OnStateChange.Clear(), i.OnStateChange.Add(this.PPt), i.CanExecuteChange.Unbind(), i.CanExecuteChange.Bind(this.Lke), i.OnHover.Clear(), i.OnHover.Add(this._ui), i.OnUnHover.Clear(), i.OnUnHover.Add(this.uui)
  }
  OnBeforeDestroy() {}
  SetGridToggleState(i, t = !1) {
    this.Pe.Walkable && (i = i ? 1 : 0, this.GetExtendToggle(0).SetToggleStateForce(i, t))
  }
  SetToggleMoveEnable(i) {
    this.Pe.Walkable && (this.GetItem(4).SetUIActive(i), this.GetItem(5).SetUIActive(i), this.GetItem(6).SetUIActive(!i), this.GetItem(7).SetUIActive(!i))
  }
  GetPanelEvent() {
    return this.GetItem(3)
  }
  Refresh(i) {
    this.Pe = i;
    var s = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(this.Pe.GridTypeId);
    if (s) {
      const U = Array.from(s.GroundPath.keys()),
        l = this.GetSprite(1);
      l.SetUIActive(!1), this.SetSpriteByPath(U[i.GroundPathIndex], l, !0, void 0, () => {
        l.SetUIActive(!0)
      });
      var t = 0 < s.ExtraPathList.length,
        h = 0 <= this.Pe.ExtraPathIndex,
        e = (this.VR1 = t || h, this.GetItem(8));
      const d = this.GetSprite(2);
      e.SetAlpha(1), e.SetUIActive(this.VR1 && this.Pe.HasVision);
      var r = d.GetAnchorOffsetY();
      if (d.SetUIActive(!1), h) {
        const U = Array.from(s.DecorationPath.keys());
        this.SetSpriteByPath(U[i.ExtraPathIndex], d, !0, void 0, () => {
          d.SetUIActive(!0)
        })
      }
      var o = e.GetAttachUIChildren(),
        a = (o.RemoveAt(0), o.Num()),
        n = Math.max(a, s.ExtraPathList.length);
      for (let t = 0; t < n; t++)
        if (t >= s.ExtraPathList.length) o.Get(t).SetUIActive(!1);
        else {
          let i = void 0;
          i = t < a ? o.Get(t) : LguiUtil_1.LguiUtil.CopyItem(d, e);
          var v = s.ExtraOffsetList.at(t) ?? 0;
          i.SetAnchorOffsetY(r + v), i.SetUIActive(!1), this.SetSpriteByPath(s.ExtraPathList[t], i, !0, void 0, () => {
            i.SetUIActive(!0)
          })
        } this.GetItem(4).SetUIActive(this.Pe.Walkable), this.GetItem(5).SetUIActive(this.Pe.Walkable), this.SetActive(!0)
    }
  }
  SetVision(i) {
    this.VR1 && this.GetItem(8).SetUIActive(i)
  }
  SetPerspectiveMode(i) {
    if (this.VR1) {
      this.rk1 = Math.max(0, this.rk1 + (i ? 1 : -1));
      var t = 0 < this.rk1;
      if (this.xL1 !== t) {
        var s = (this.xL1 = i) ? 0 : 1,
          h = this.GetItem(8).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
          e = h.Num();
        for (let i = 0; i < e; i++) {
          var r = h.Get(i);
          r.Stop(), i === s && r.Play()
        }
      }
    }
  }
}
exports.MapRogueGrid = MapRogueGrid;
//# sourceMappingURL=MapRogueGrid.js.map