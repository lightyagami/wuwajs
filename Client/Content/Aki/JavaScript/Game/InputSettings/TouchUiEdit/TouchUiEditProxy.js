"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUiEditProxy = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
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
    this.N$u = e;
    this.V$u = t;
    this.Yzt = undefined;
    this.j$u = new Map();
    this.p5l = [];
    this.bQu = 0;
    this.RQu = 0;
    this.H$u = () => {
      var i = [];
      for (const e of this.j$u.values()) {
        i.push(e.Data);
      }
      this.N$u.SaveData(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTouchUiEditSave);
    };
    this.Eqt = (i, e) => {
      var e = e.TouchType;
      var t = Number(i);
      switch (e) {
        case 0:
          this.$$u(true, t);
          break;
        case 1:
          this.$$u(false, t);
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
    for (const e of this.N$u.GetResIdList()) {
      i.push(e);
    }
    await this.ERi.LoadPanel(this.Yzt.GetAttachRoot(), i, this.N$u.GetGroupConfig());
  }
  OnStart() {
    TouchUiEditViewModel_1.TouchUiEditViewModel.SetRootItem(this.ERi.GetRootItem());
    var i = this.N$u.GetResIdList();
    var e = new Set();
    for (const h of i) {
      var t;
      var n = ConfigManager_1.ConfigManager.CommonTouchUiEditConfig.GetConfigListByPanelResId(h);
      if (n) {
        for (const p of n) {
          var s;
          var r = p.ItemIndex;
          var o = p.SubPanelIndex;
          var o = this.ERi.GetItem(h, r, o);
          if (o && (e.add(o), s = this.N$u.GetData(h, r), (o = this.V$u(o, s)).SetData(s), (s = this.N$u.GetStorageId(h, r)) && this.j$u.set(s, o), this.p5l.push(o), o.Data?.DefaultSelect && TouchUiEditViewModel_1.TouchUiEditViewModel.SetCurrentSelectedItem(o), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("TouchUiEdit", 95, "创建初始改键数据", ["configId", s], ["resId", h], ["itemIndex", r]);
          }
        }
        for (const u of this.ERi.GetRegistryItemList(h)) {
          if (!e.has(u)) {
            t = this.V$u(u, undefined);
            this.p5l.push(t);
          }
        }
      }
    }
    this.W$u();
  }
  OnBeforeDestroy() {
    this.Q$u();
    TouchUiEditViewModel_1.TouchUiEditViewModel.SetCurrentSelectedItem(undefined);
    for (const i of this.p5l) {
      i.OnViewDestroy();
    }
    this.j$u.clear();
    this.p5l.length = 0;
    this.ERi.OnViewDestroy();
  }
  OnTick(i) {
    if (!!this.Yzt && !!this.UVi && (this.bQu !== 0 || this.RQu !== 0)) {
      this.UVi.SetOffset(this.UVi.Data.OffsetX + this.bQu, this.UVi.Data.OffsetY + this.RQu);
    }
  }
  SetOffsetDeltaX(i) {
    this.bQu = i;
  }
  SetOffsetDeltaY(i) {
    this.RQu = i;
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
    if (this.K$u()) {
      (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(103)).FunctionMap.set(2, () => {
        this.H$u();
        this.Yzt?.CloseMe();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    } else {
      this.H$u();
      this.Yzt?.CloseMe();
    }
  }
  Reset() {
    for (const t of this.j$u.values()) {
      var i;
      var e = this.N$u.GetResPair(t.Data.StorageId);
      if (e && ([e, i] = e, e = this.N$u.GetDefaultData(e, i))) {
        t.SetScale(e.Scale);
        t.SetOffset(e.OffsetX, e.OffsetY);
        t.SetAlpha(e.Alpha);
        t.SetHierarchyIndex(e.HierarchyIndex);
      }
    }
    this.H$u();
  }
  K$u() {
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
  W$u() {
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  Q$u() {
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2, InputMappingsDefine_1.touchIdMappings.Touch3, InputMappingsDefine_1.touchIdMappings.Touch4, InputMappingsDefine_1.touchIdMappings.Touch5, InputMappingsDefine_1.touchIdMappings.Touch6, InputMappingsDefine_1.touchIdMappings.Touch7, InputMappingsDefine_1.touchIdMappings.Touch8, InputMappingsDefine_1.touchIdMappings.Touch9, InputMappingsDefine_1.touchIdMappings.Touch10], this.Eqt);
  }
  $$u(i, e) {
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
      var n = MathUtils_1.MathUtils.RangeClamp(t, this.N$u.MinTouchMoveDifference, this.N$u.MaxTouchMoveDifference, this.N$u.MinTouchMoveValue, this.N$u.MaxTouchMoveValue);
      var t = this.UVi.Data.Scale + n * this.N$u.ControlScaleRate;
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