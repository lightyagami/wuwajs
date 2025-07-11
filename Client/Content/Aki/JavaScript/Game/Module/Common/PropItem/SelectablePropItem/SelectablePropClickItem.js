"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropClickItem = exports.RoleHead = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const SelectablePropItemBase_1 = require("./SelectablePropItemBase");
class RoleHead extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.TBt = this.CreateThenShowByResourceIdAsync("UiItem_ItemRole", t, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    var t = this.GetRootItem();
    t.SetAnchorAlign(1, 1);
    t.SetPivot(new UE.Vector2D(0, 1));
    t.SetUIRelativeLocation(new UE.Vector(11, -13, 0));
  }
  async Update(t) {
    var e;
    await this.TBt;
    if (t.RoleId === 0) {
      this.SetActive(false);
    } else {
      this.SetActive(true);
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId);
      this.SetRoleIcon(e.RoleHeadIcon, this.GetTexture(0), t.RoleId);
    }
  }
}
exports.RoleHead = RoleHead;
class SelectablePropClickItem extends SelectablePropItemBase_1.SelectablePropItemBase {
  constructor(t = 1, e = false) {
    super(t);
    this.j5e = undefined;
    this.LBt = undefined;
    this.DBt = false;
    this.RBt = undefined;
    this.IsSelectableProp = true;
    this.OnToggleClick = t => {
      if (t === 1) {
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
      }
    };
    this.Lke = () => {
      var t = this.LBt?.(this.PropData.IncId, this.DBt) ?? false;
      this.DBt = false;
      return t;
    };
    this.UBt = e;
  }
  OnStart() {
    this.GetControlItem()?.SetUIActive(false);
    this.GetSelectItem()?.SetUIActive(false);
    this.GetSelectableToggle().CanExecuteChange.Bind(this.Lke);
    if (this.UBt) {
      this.RBt = new RoleHead(this.GetRootItem());
    }
  }
  SetToggleStateForce(t, e = false) {
    var s = this.GetSelectableToggle();
    if (s) {
      if (t !== s.GetToggleState()) {
        this.DBt = true;
      }
      s.SetToggleState(t, e);
    }
  }
  OnBeforeDestroy() {
    this.GetSelectableToggle()?.CanExecuteChange.Unbind();
    this.RBt?.Destroy();
    this.RBt = undefined;
  }
  OnRefresh(t, e) {
    this.SetToggleStateForce(t ? 1 : 0);
    this.ShowDefaultDownText();
    this.RefreshRightDownLockSprite(this.PropData.GetIsLock());
    this.RBt?.Update(this.PropData);
  }
  OnSelected(t) {
    if (t) {
      this.SetToggleStateForce(1);
      this.SetRoleIconState();
      this.j5e?.(this.PropData.IncId);
    }
  }
  OnDeselected(t) {
    if (t) {
      this.SetToggleStateForce(0);
      this.SetRoleIconState();
    }
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.LBt = t;
  }
  GetPropData() {
    return this.PropData;
  }
}
exports.SelectablePropClickItem = SelectablePropClickItem;
//# sourceMappingURL=SelectablePropClickItem.js.map