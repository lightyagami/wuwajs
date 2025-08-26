"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUiEditProxy = undefined;
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const TouchUiEditViewModel_1 = require("./TouchUiEditViewModel");
class TouchUiEditProxy {
  constructor(i, e, t) {
    this.ERi = i;
    this.fHu = e;
    this.gHu = t;
    this.Yzt = undefined;
    this.CHu = new Map();
    this.p5l = [];
    this.pHu = 0;
    this.vHu = 0;
    this.yHu = () => {
      var i = [];
      for (const e of this.CHu.values()) {
        i.push(e.Data);
      }
      this.fHu.SaveData(i);
    };
    this.Eqt = (i, e) => {
      var e = e.TouchType;
      var t = Number(i);
      switch (e) {
        case 0:
          this.SHu(true, t);
          break;
        case 1:
          this.SHu(false, t);
          break;
        case 2:
          this.imr(t);
      }
    };
  }
  get UVi() {
    return TouchUiEditViewModel_1.TouchUiEditViewModel.GetCurrentSelectedItem();
  }
  SetView(i) {
    this.Yzt = i;
  }
  async OnBeforeStartAsync() {
    var i = [];
    for (const e of this.fHu.GetResIdList()) {
      i.push(e);
    }
    await this.ERi.LoadPanel(this.Yzt.GetAttachRoot(), i);
  }
  OnStart() {
    TouchUiEditViewModel_1.TouchUiEditViewModel.SetRootItem(this.ERi.GetRootItem());
    for (const s of this.fHu.GetResIdList()) {
      var e = this.ERi.GetItemList(s);
      for (let i = 0; i < e.length; i++) {
        var t = e[i];
        var n = this.fHu.GetData(s, i);
        var t = this.gHu(t, n);
        t.SetData(n);
        var n = this.fHu.GetStorageId(s, i);
        if (n) {
          this.CHu.set(n, t);
        }
        this.p5l.push(t);
        if (t.Data?.DefaultSelect) {
          TouchUiEditViewModel_1.TouchUiEditViewModel.SetCurrentSelectedItem(t);
        }
      }
    }
    this.MHu();
  }
  OnBeforeDestroy() {
    this.EHu();
    TouchUiEditViewModel_1.TouchUiEditViewModel.SetCurrentSelectedItem(undefined);
    for (const i of this.p5l) {
      i.OnViewDestroy();
    }
    this.CHu.clear();
    this.p5l.length = 0;
    this.ERi.OnViewDestroy();
  }
  OnTick(i) {
    if (!!this.Yzt && !!this.UVi && (this.pHu !== 0 || this.vHu !== 0)) {
      this.UVi.SetOffset(this.UVi.Data.OffsetX + this.pHu, this.UVi.Data.OffsetY + this.vHu);
    }
  }
  SetOffsetDeltaX(i) {
    this.pHu = i;
  }
  SetOffsetDeltaY(i) {
    this.vHu = i;
  }
  SetScale(i) {
    this.UVi?.SetScale(i);
  }
  SetAlpha(i) {
    this.UVi?.SetAlpha(i);
  }
  SetHierarchyIndex(i) {
    this.UVi?.SetHierarchyIndex(i);
  }
  Save() {
    var i;
    if (this.IHu()) {
      (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(103)).FunctionMap.set(2, () => {
        this.yHu();
        this.Yzt?.CloseMe();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    } else {
      this.yHu();
      this.Yzt?.CloseMe();
    }
  }
  Reset() {
    for (const t of this.CHu.values()) {
      var i;
      var e = this.fHu.GetResPair(t.Data.StorageId);
      if (e && ([e, i] = e, e = this.fHu.GetDefaultData(e, i))) {
        t.SetScale(e.Scale);
        t.SetOffset(e.OffsetX, e.OffsetY);
        t.SetAlpha(e.Alpha);
        t.SetHierarchyIndex(e.HierarchyIndex);
      }
    }
    this.yHu();
  }
  IHu() {
    for (let e = 0; e < this.p5l.length; e++) {
      var t = this.p5l[e];
      if (t.Data?.ShouldCheckOverlap && t.RootItem.IsUIActiveInHierarchy() && t.RootItem.IsRaycastTarget()) {
        for (let i = e + 1; i < this.p5l.length; i++) {
          var n = this.p5l[i];
          if (t.RootItem.GetOverlapWith(n.RootItem)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  MHu() {
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  EHu() {
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  SHu(i, e) {
    e = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e);
    if (e) {
      if (i) {
        TouchUiEditViewModel_1.TouchUiEditViewModel.AddTouchFingerData(e);
      } else {
        TouchUiEditViewModel_1.TouchUiEditViewModel.RemoveTouchFingerData(e);
      }
    }
  }
  imr(i) {
    if (this.UVi && !(TouchUiEditViewModel_1.TouchUiEditViewModel.GetTouchFingerDataCount() < 2)) {
      var e;
      var t = TouchUiEditViewModel_1.TouchUiEditViewModel.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.One);
      var n = TouchUiEditViewModel_1.TouchUiEditViewModel.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.Two);
      var t = t.GetFingerIndex();
      var n = n.GetFingerIndex();
      var t = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(t, n);
      var n = MathUtils_1.MathUtils.RangeClamp(t, this.fHu.MinTouchMoveDifference, this.fHu.MaxTouchMoveDifference, this.fHu.MinTouchMoveValue, this.fHu.MaxTouchMoveValue);
      var t = this.UVi.Data.Scale + n * this.fHu.ControlScaleRate;
      var n = this.Yzt.GetScaleSlider();
      let i = t;
      if (n) {
        e = n.MinValue;
        n = n.MaxValue;
        i = MathUtils_1.MathUtils.Clamp(t, e, n);
      }
      this.UVi.SetScale(i);
    }
  }
}
exports.TouchUiEditProxy = TouchUiEditProxy;
//# sourceMappingURL=TouchUiEditProxy.js.map