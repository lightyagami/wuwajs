"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class MapRogueGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Uk1 = 0;
    this.ow1 = false;
    this.OnExtendTogglePointerDown = undefined;
    this.OnExtendToggleStateChanged = undefined;
    this.OnCanExecuteChangeFunc = undefined;
    this.OnHoverFunc = undefined;
    this.OnUnHoverFunc = undefined;
    this.Ngo = i => {
      this.OnExtendTogglePointerDown?.(i, this.Pe);
    };
    this.PPt = i => {
      this.OnExtendToggleStateChanged?.(i, this.Pe);
    };
    this.Lke = () => !this.OnCanExecuteChangeFunc || this.OnCanExecuteChangeFunc(this.GetExtendToggle(0).GetToggleState(), this.Pe);
    this._ui = () => {
      this.OnHoverFunc?.(this.Pe);
    };
    this.uui = () => {
      this.OnUnHoverFunc?.(this.Pe);
    };
    this.mL1 = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnStart() {
    var i = this.GetExtendToggle(0);
    i.OnPointDownCallBack.Unbind();
    i.OnPointDownCallBack.Bind(this.Ngo);
    i.OnStateChange.Clear();
    i.OnStateChange.Add(this.PPt);
    i.CanExecuteChange.Unbind();
    i.CanExecuteChange.Bind(this.Lke);
    i.OnHover.Clear();
    i.OnHover.Add(this._ui);
    i.OnUnHover.Clear();
    i.OnUnHover.Add(this.uui);
  }
  OnBeforeDestroy() {}
  SetGridToggleState(i, t = false) {
    if (this.Pe.Walkable) {
      i = i ? 1 : 0;
      this.GetExtendToggle(0).SetToggleStateForce(i, t);
    }
  }
  SetToggleMoveEnable(i) {
    if (this.Pe.Walkable) {
      this.GetItem(4).SetUIActive(i);
      this.GetItem(5).SetUIActive(i);
      this.GetItem(6).SetUIActive(!i);
      this.GetItem(7).SetUIActive(!i);
    }
  }
  GetPanelEvent() {
    return this.GetItem(3);
  }
  Refresh(i) {
    this.Pe = i;
    var s = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(this.Pe.GridTypeId);
    if (s) {
      const U = Array.from(s.GroundPath.keys());
      const l = this.GetSprite(1);
      l.SetUIActive(false);
      this.SetSpriteByPath(U[i.GroundPathIndex], l, true, undefined, () => {
        l.SetUIActive(true);
      });
      var t = s.ExtraPathList.length > 0;
      var h = this.Pe.ExtraPathIndex >= 0;
      this.mL1 = t || h;
      var e = this.GetItem(8);
      const d = this.GetSprite(2);
      e.SetAlpha(1);
      e.SetUIActive(this.mL1 && this.Pe.HasVision);
      var r = d.GetAnchorOffsetY();
      d.SetUIActive(false);
      if (h) {
        const U = Array.from(s.DecorationPath.keys());
        this.SetSpriteByPath(U[i.ExtraPathIndex], d, true, undefined, () => {
          d.SetUIActive(true);
        });
      }
      var o = e.GetAttachUIChildren();
      o.RemoveAt(0);
      var a = o.Num();
      var n = Math.max(a, s.ExtraPathList.length);
      for (let t = 0; t < n; t++) {
        if (t >= s.ExtraPathList.length) {
          o.Get(t).SetUIActive(false);
        } else {
          let i = undefined;
          i = t < a ? o.Get(t) : LguiUtil_1.LguiUtil.CopyItem(d, e);
          var v = s.ExtraOffsetList.at(t) ?? 0;
          i.SetAnchorOffsetY(r + v);
          i.SetUIActive(false);
          this.SetSpriteByPath(s.ExtraPathList[t], i, true, undefined, () => {
            i.SetUIActive(true);
          });
        }
      }
      this.GetItem(4).SetUIActive(this.Pe.Walkable);
      this.GetItem(5).SetUIActive(this.Pe.Walkable);
      this.SetActive(true);
    }
  }
  SetVision(i) {
    if (this.mL1) {
      this.GetItem(8).SetUIActive(i);
    }
  }
  SetPerspectiveMode(i) {
    if (this.mL1) {
      this.Uk1 = Math.max(0, this.Uk1 + (i ? 1 : -1));
      var t = this.Uk1 > 0;
      if (this.ow1 !== t) {
        var s = (this.ow1 = i) ? 0 : 1;
        var h = this.GetItem(8).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
        var e = h.Num();
        for (let i = 0; i < e; i++) {
          var r = h.Get(i);
          r.Stop();
          if (i === s) {
            r.Play();
          }
        }
      }
    }
  }
}
exports.MapRogueGrid = MapRogueGrid;
//# sourceMappingURL=MapRogueGrid.js.map