"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGrid = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
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
    this.SelectPanel = [];
    this._Bd = true;
    this.Ngo = t => {
      this.SelectPanel.forEach(t => {
        t[0].PlaySequence("Pre");
        t[1].PlaySequence("Pre");
      });
      this.OnExtendTogglePointerDown?.(t, this.Pe);
    };
    this.GFo = t => {
      this.SelectPanel.forEach(t => {
        t[0].PlaySequence("PreUp");
        t[1].PlaySequence("PreUp");
      });
    };
    this.PPt = t => {
      const i = t === 1 ? "Sle" : "UnSle";
      this.SelectPanel.forEach(t => {
        t[0].PlaySequence(i, true);
        t[1].PlaySequence(i, true);
      });
      this.OnExtendToggleStateChanged?.(t, this.Pe);
    };
    this.Lke = () => !this.OnCanExecuteChangeFunc || this.OnCanExecuteChangeFunc(this.GetExtendToggle(0).GetToggleState(), this.Pe);
    this._ui = () => {
      this.OnHoverFunc?.(this.Pe);
      if (!Info_1.Info.IsInTouch()) {
        this.SelectPanel.forEach(t => {
          t[0].PlaySequence("Float");
          t[1].PlaySequence("Float");
        });
      }
    };
    this.uui = () => {
      this.SelectPanel.forEach(t => {
        t[0].PlaySequence("Move");
        t[1].PlaySequence("Move");
      });
      this.OnUnHoverFunc?.(this.Pe);
    };
    this.mL1 = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    var t = this.GetExtendToggle(0);
    t.OnPointDownCallBack.Unbind();
    t.OnPointDownCallBack.Bind(this.Ngo);
    t.OnPointUpCallBack.Unbind();
    t.OnPointUpCallBack.Bind(this.GFo);
    t.OnStateChange.Clear();
    t.OnStateChange.Add(this.PPt);
    t.CanExecuteChange.Unbind();
    t.CanExecuteChange.Bind(this.Lke);
    t.OnHover.Clear();
    t.OnHover.Add(this._ui);
    t.OnUnHover.Clear();
    t.OnUnHover.Add(this.uui);
  }
  OnBeforeDestroy() {}
  SetGridToggleState(t, i = false) {
    if (this.Pe.Walkable) {
      var s = this.GetExtendToggle(0).GetToggleState() === 1;
      var e = t ? 1 : 0;
      this.GetExtendToggle(0).SetToggleStateForce(e, i);
      if (s !== t) {
        const h = t ? "Sle" : "UnSle";
        this.SelectPanel.forEach(t => {
          t[0].PlaySequence(h, true);
          t[1].PlaySequence(h, true);
        });
      }
    }
  }
  SetToggleMoveEnable(i) {
    if (this.Pe.Walkable) {
      this._Bd = i;
      this.SelectPanel.forEach(t => {
        t[0].SetState(i);
        t[1].SetState(i);
      });
    }
  }
  SetSelectPanel(t, i) {
    t.GetRootItem().SetUIParent(this.GetPanelSelectBack());
    i.GetRootItem().SetUIParent(this.GetPanelSelectFront());
    t.ResetAllSequence();
    i.ResetAllSequence();
    this.SelectPanel.push([t, i]);
    const s = this.GetExtendToggle(0).GetToggleState() === 1;
    this.SelectPanel.forEach(t => {
      t[0].SetSelected(s);
      t[1].SetSelected(s);
      t[0].SetState(this._Bd);
      t[1].SetState(this._Bd);
    });
    t.SetUiActive(true);
    i.SetUiActive(true);
  }
  ClearSelectPanel() {
    this.SelectPanel.length = 0;
  }
  GetPanelEvent() {
    return this.GetItem(3);
  }
  GetPanelSelectFront() {
    return this.GetItem(5);
  }
  GetPanelSelectBack() {
    return this.GetItem(4);
  }
  Refresh(t) {
    this.Pe = t;
    var s = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(this.Pe.GridTypeId);
    if (s) {
      const v = Array.from(s.GroundPath.keys());
      const U = this.GetSprite(1);
      U.SetUIActive(false);
      this.SetSpriteByPath(v[t.GroundPathIndex], U, true, undefined, () => {
        U.SetUIActive(true);
      });
      var i = s.ExtraPathList.length > 0;
      var e = this.Pe.ExtraPathIndex >= 0;
      this.mL1 = i || e;
      var h = this.GetItem(6);
      const c = this.GetSprite(2);
      h.SetAlpha(1);
      h.SetUIActive(this.mL1 && this.Pe.HasVision);
      var r = c.GetAnchorOffsetY();
      c.SetUIActive(false);
      if (e) {
        const v = Array.from(s.DecorationPath.keys());
        this.SetSpriteByPath(v[t.ExtraPathIndex], c, true, undefined, () => {
          c.SetUIActive(true);
        });
      }
      var o = h.GetAttachUIChildren();
      o.RemoveAt(0);
      var a = o.Num();
      var n = Math.max(a, s.ExtraPathList.length);
      for (let i = 0; i < n; i++) {
        if (i >= s.ExtraPathList.length) {
          o.Get(i).SetUIActive(false);
        } else {
          let t = undefined;
          t = i < a ? o.Get(i) : LguiUtil_1.LguiUtil.CopyItem(c, h);
          var l = s.ExtraOffsetList.at(i) ?? 0;
          t.SetAnchorOffsetY(r + l);
          t.SetUIActive(false);
          this.SetSpriteByPath(s.ExtraPathList[i], t, true, undefined, () => {
            t.SetUIActive(true);
          });
        }
      }
      this._Bd = this.Pe.Walkable;
      const u = this.GetExtendToggle(0).GetToggleState() === 1;
      this.SelectPanel.forEach(t => {
        t[0].SetSelected(u);
        t[1].SetSelected(u);
        t[0].SetState(this._Bd);
        t[1].SetState(this._Bd);
      });
      this.SetActive(true);
    }
  }
  SetVision(t) {
    if (this.mL1) {
      this.GetItem(6).SetUIActive(t);
    }
  }
  SetPerspectiveMode(t) {
    if (this.mL1) {
      this.Uk1 = Math.max(0, this.Uk1 + (t ? 1 : -1));
      var i = this.Uk1 > 0;
      if (this.ow1 !== i) {
        var s = (this.ow1 = t) ? 0 : 1;
        var e = this.GetItem(6).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
        var h = e.Num();
        for (let t = 0; t < h; t++) {
          var r = e.Get(t);
          r.Stop();
          if (t === s) {
            r.Play();
          }
        }
      }
    }
  }
}
exports.MapRogueGrid = MapRogueGrid;
//# sourceMappingURL=MapRogueGrid.js.map