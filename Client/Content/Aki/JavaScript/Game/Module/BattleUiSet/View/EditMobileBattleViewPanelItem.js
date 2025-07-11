"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditMobileBattleViewPanelItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BattleUiSetDefine_1 = require("../BattleUiSetDefine");
class EditMobileBattleViewPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xot = new UE.Vector();
    this.vgt = undefined;
    this.pgt = undefined;
    this.Agt = t => {
      var i;
      var s;
      if (!!this.PanelItemData && !!this.pgt && !(ModelManager_1.ModelManager.BattleUiSetModel.GetTouchFingerDataCount() >= 2)) {
        i = t.GetLocalPointInPlane();
        t = t.dragComponent.GetOwner().D_GetActorScale3D();
        s = (i.X - this.pgt.X) * t.X;
        t = (i.Y - this.pgt.Y) * t.Z;
        if (s != 0 && t != 0) {
          this.vgt.X += s;
          this.vgt.Y += t;
          this.vgt.Z = 0;
          this.SetRelativeLocation(this.vgt);
          this.pgt = i;
        }
      }
    };
    this.Pgt = t => {
      if (this.PanelItemData && this.PanelItemData.CanEdit) {
        this.pgt = t.GetLocalPointInPlane();
        this.vgt = new UE.VectorDouble(this.RootItem.RelativeLocation);
        ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(this.PanelItemData);
      }
    };
    this.xgt = () => {
      this.pgt = undefined;
    };
    this.$gt = () => {
      if (this.PanelItemData && this.PanelItemData.CanEdit) {
        this.pgt = undefined;
        ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(this.PanelItemData);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotEdit");
      }
    };
    this.Ygt = () => {
      this.pgt = undefined;
    };
    this.Jgt = t => {
      if (this.PanelItemData && this.PanelItemData.CanEdit && t === 1) {
        ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(this.PanelItemData);
      }
    };
    this.zgt = () => {
      var t;
      if (this.PanelItemData && this.PanelItemData.CanEdit) {
        return !(t = ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData) || t.ConfigId !== this.PanelItemData.ConfigId;
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotEdit");
        return false;
      }
    };
  }
  OnStart() {
    var t = this.OpenParam;
    this.aGe(t.PanelItemData, t.PanelItem, t.BattleViewBaseActor);
  }
  aGe(t, i, s) {
    this.PanelItemData = t;
    this.PanelItem = i;
    this.Xgt = s;
    this.Zgt = this.RootActor.GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    this.e0t = this.RootActor.GetComponentByClass(UE.UIButtonComponent.StaticClass());
    this.$Ve = this.RootActor.GetComponentByClass(UE.UIExtendToggle.StaticClass());
    this.Ore();
    if (t) {
      this.Refresh();
    }
  }
  OnBeforeDestroy() {
    this.kre();
    this.PanelItemData = undefined;
    this.Zgt = undefined;
    this.e0t = undefined;
    this.Xot = undefined;
    this.$Ve = undefined;
    this.Xgt = undefined;
    this.PanelItem = undefined;
  }
  Ore() {
    if (this.Zgt) {
      this.Zgt.OnPointerDragCallBack.Bind(this.Agt);
      this.Zgt.OnPointerBeginDragCallBack.Bind(this.Pgt);
      this.Zgt.OnPointerEndDragCallBack.Bind(this.xgt);
    }
    if (this.e0t) {
      this.e0t.OnPointDownCallBack.Bind(this.$gt);
      this.e0t.OnPointUpCallBack.Bind(this.Ygt);
    }
    if (this.$Ve) {
      this.$Ve.OnStateChange.Add(this.Jgt);
      this.$Ve.CanExecuteChange.Bind(this.zgt);
    }
  }
  kre() {
    if (this.Zgt) {
      this.Zgt.OnPointerDragCallBack.Unbind();
    }
    if (this.e0t) {
      this.e0t.OnPointDownCallBack.Unbind();
      this.e0t.OnPointUpCallBack.Unbind();
    }
    if (this.$Ve) {
      this.$Ve.OnStateChange.Remove(this.Jgt);
      this.$Ve.CanExecuteChange.Unbind();
    }
  }
  RefreshRelativeLocation() {
    var t = this.GetRelativeLocation();
    this.SetRelativeLocation(t);
  }
  SetRelativeLocation(t) {
    t = this.t0t(t);
    this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX();
    this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY();
    this.RootItem.D_K2_SetRelativeLocation(t, false, undefined, false);
  }
  GetRelativeLocation() {
    return this.vgt;
  }
  OnSave() {
    if (this.PanelItemData) {
      this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX();
      this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY();
    }
  }
  t0t(t) {
    var i = this.RootActor.D_GetActorScale3D().X;
    var s = this.RootItem.GetPivot();
    var h = s.Y;
    var s = s.X;
    var e = this.Xgt.GetUIItem();
    var r = e.Width / 2;
    var e = e.Height / 2;
    var a = this.RootItem.Width * i;
    var i = this.RootItem.Height * i;
    var o = a * s - r;
    var r = r - a * (1 - s);
    var a = i * h - e;
    var s = e - i * (1 - h);
    t.X = MathUtils_1.MathUtils.Clamp(t.X, o, r);
    t.Y = MathUtils_1.MathUtils.Clamp(t.Y, a, s);
    return t;
  }
  Refresh() {
    var t;
    if (this.PanelItemData) {
      t = this.PanelItemData.Size;
      this.Xot.X = t;
      this.Xot.Y = t;
      this.Xot.Z = t;
      this.RootItem.SetUIItemScale(this.Xot);
      this.RootItem.SetAnchorOffsetX(this.PanelItemData.OffsetX);
      this.RootItem.SetAnchorOffsetY(this.PanelItemData.OffsetY);
      this.RootItem.SetUIItemAlpha(this.PanelItemData.Alpha);
      this.RootItem.SetHierarchyIndex(this.PanelItemData.HierarchyIndex);
      this.vgt = new UE.VectorDouble(this.RootItem.RelativeLocation);
    }
  }
  Reset() {
    var t;
    if (this.PanelItemData) {
      t = this.PanelItemData.SourceSize;
      this.Xot.X = t;
      this.Xot.Y = t;
      this.Xot.Z = t;
      this.RootItem.SetUIItemScale(this.Xot);
      this.RootItem.SetAnchorOffsetX(this.PanelItemData.SourceOffsetX);
      this.RootItem.SetAnchorOffsetY(this.PanelItemData.SourceOffsetY);
      this.RootItem.SetUIItemAlpha(this.PanelItemData.SourceAlpha);
      this.RootItem.SetHierarchyIndex(this.PanelItemData.SourceHierarchyIndex);
      this.vgt = new UE.VectorDouble(this.RootItem.RelativeLocation);
    }
  }
  SetSelected(t) {
    if (this.$Ve) {
      if (t) {
        this.$Ve.SetToggleState(1, false);
      } else {
        this.$Ve.SetToggleState(0, false);
      }
    }
  }
  ApplyTopIndex() {
    this.GetRootItem().SetHierarchyIndex(BattleUiSetDefine_1.MAX_HIERACHY_INDEX);
  }
}
exports.EditMobileBattleViewPanelItem = EditMobileBattleViewPanelItem;
//# sourceMappingURL=EditMobileBattleViewPanelItem.js.map