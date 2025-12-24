"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationViewManager = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiNavigationDefine_1 = require("./UiNavigationDefine");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationViewHandle_1 = require("./UiNavigationViewHandle");
class UiNavigationViewManager {
  static Initialize() {
    this.dde();
    this.v0t();
  }
  static Clear() {
    this.Cde();
    this.S0t();
  }
  static v0t() {
    this.s4_ = TickSystem_1.TickSystem.Add(UiNavigationViewManager.a4_, "UiNavigationViewManager", 0, true, undefined, true).Id;
    this.h4_ = TickSystem_1.TickSystem.Add(UiNavigationViewManager.l4_, "UiNavigationViewManager", 3, true, undefined, true).Id;
  }
  static S0t() {
    if (this.s4_ !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.s4_);
      this.s4_ = TickSystem_1.TickSystem.InvalidId;
    }
    if (this.h4_ !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.h4_);
      this.h4_ = TickSystem_1.TickSystem.InvalidId;
    }
  }
  static dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationViewCreate, this.Bbo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationViewDestroy, this.bbo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetNavigationListener, this.qbo);
  }
  static Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationViewCreate, this.Bbo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationViewDestroy, this.bbo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetNavigationListener, this.qbo);
  }
  static Gbo(a, t) {
    if (t.ViewName !== UiNavigationDefine_1.POP_TAG) {
      UiNavigationViewManager.Nbo(a, t);
    } else {
      var i;
      var e = UE.LGUIBPLibrary.GetComponentsInChildren(t.GetOwner(), UE.TsUiNavigationPanelConfig_C.StaticClass(), false);
      if (e.Num() <= 0) {
        if (UiNavigationViewManager.kbo.size > 0) {
          if (i = UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(t.GetOwner())) {
            UiNavigationViewManager.kbo.set([a, t], i);
          }
          return;
        } else {
          if (!UiNavigationViewManager.Nbo(a, t)) {
            if (i = UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(t.GetOwner())) {
              UiNavigationViewManager.kbo.set([a, t], i);
            }
          }
          return;
        }
      }
      for (let i = e.Num() - 1; i >= 0; --i) {
        var n = e.Get(i);
        if (n.Independent && n.ViewName === UiNavigationDefine_1.POP_TAG) {
          if (UiNavigationViewManager.Obo(n)) {
            UiNavigationViewManager.Nbo(a, t);
          } else {
            UiNavigationViewManager.kbo.set([a, t], n);
          }
          break;
        }
      }
    }
  }
  static Fbo(i, a) {
    var t = new UiNavigationViewHandle_1.UiNavigationViewHandle(i, a);
    t.AddPanelConfig(i, a);
    this.Vbo.set(i, t);
    this.hbo.set(i, t);
  }
  static Obo(i) {
    for (const a of this.Vbo.values()) {
      if (a.MainPanel === i) {
        return true;
      }
    }
    return false;
  }
  static Hbo(i, a) {
    let t = undefined;
    for (const e of this.Vbo.values()) {
      if (e.ViewName === a.ViewName) {
        t = e;
      }
    }
    return !!t && (t.AddPanelConfig(i, a), this.hbo.set(i, t), true);
  }
  static Nbo(i, a) {
    if (UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel) {
      this.jbo.set(i, a);
      return true;
    } else {
      return this.Hbo(i, a);
    }
  }
  static Wbo(i) {
    var a = this.hbo.get(i);
    return !!a && (this.hbo.delete(i), a.DeletePanelConfig(i), i === a.TagId);
  }
  static Kbo(i) {
    var a = this.Vbo.get(i);
    if (a) {
      this.Vbo.delete(i);
      for (const t of a.GetPanelConfigMap().keys()) {
        this.hbo.delete(t);
      }
      a.ClearPanelConfig();
      return true;
    }
    return false;
  }
  static Qbo(i) {
    if (this.Xbo) {
      if (this.Xbo.TagId === i) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiNavigation", 10, "当前导航面板销毁,将导航对象置为空");
        }
        UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(undefined);
        this.Xbo = undefined;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "当前导航面板不存在,将导航对象置为空");
      }
      UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(undefined);
    }
  }
  static MarkCalculateCurrentPanelDirty() {
    UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel = true;
  }
  static $bo() {
    if (UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel) {
      UiNavigationGlobalData_1.UiNavigationGlobalData.NeedCalculateCurrentPanel = false;
      this.Ybo();
    }
  }
  static Jbo(i, a) {
    i = i.GetDepth();
    a = a.GetDepth();
    return i !== -1 && a !== -1;
  }
  static Ybo() {
    if (this.Vbo.size <= 0) {
      this.Xbo = undefined;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "当前没有导航面板,将导航对象置为空");
      }
      UiNavigationLogic_1.UiNavigationLogic.UpdateNavigationListener(undefined);
    } else {
      let i = undefined;
      let a = true;
      for (const t of this.Vbo.values()) {
        if (t.GetIsActive() && t.GetIsUsable()) {
          if (i) {
            if (!this.Jbo(t, i)) {
              a = false;
              break;
            }
            if (t.GetDepth() > i.GetDepth()) {
              i = t;
            } else {
              t.SetIsInController(false);
            }
          } else {
            i = t;
          }
        }
      }
      if (a) {
        if (this.Xbo !== i) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiNavigation", 10, "查找当前导航界面句柄", ["名字", i?.ViewName]);
          }
          this.Xbo?.SetIsInController(false);
          this.Xbo?.CanOverridePositionByGamepad(false);
          i?.SetIsInController(true);
          i?.CanOverridePositionByGamepad(true);
          i?.ResetStateIfNullFocus();
          this.Xbo = i;
        }
      } else {
        this.MarkCalculateCurrentPanelDirty();
      }
    }
  }
  static zbo() {
    if (this.Xbo) {
      this.Xbo.FindDefaultNavigation();
    }
  }
  static Zbo() {
    if (UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshPanelId !== 0) {
      if (this.Xbo && this.Xbo.TagId === UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshPanelId) {
        UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshPanelId = 0;
        if (this.Xbo) {
          if (this.Xbo.HasAnyPanelActive()) {
            this.Xbo.FindAddPanelConfigNavigation();
          } else {
            this.MarkCalculateCurrentPanelDirty();
          }
        }
      } else {
        UiNavigationGlobalData_1.UiNavigationGlobalData.NeedRefreshPanelId = 0;
      }
    }
  }
  static eqo() {
    if (!(this.jbo.size <= 0)) {
      for (var [i, a] of this.jbo) {
        this.Hbo(i, a);
      }
      this.jbo.clear();
    }
  }
  static tqo() {
    if (!(this.kbo.size <= 0) && this.Xbo) {
      var i;
      var a;
      var t = [];
      for ([i, a] of this.kbo) {
        if (a === this.Xbo.MainPanel) {
          t.push(i);
          this.Nbo(i[0], i[1]);
        }
      }
      for (const e of t) {
        this.kbo.delete(e);
      }
    }
  }
  static iqo(i) {
    if (this.Xbo) {
      this.Xbo.TickViewHandle(i);
    }
  }
  static GetCurrentViewHandle() {
    return this.Xbo;
  }
  static RefreshCurrentHotKey() {
    if (this.Xbo) {
      this.Xbo.MarkRefreshHotKeyDirty();
    }
  }
  static RefreshCurrentHotKeyTextId() {
    if (this.Xbo) {
      this.Xbo.MarkRefreshHotKeyTextIdDirty();
    }
  }
  static CanFocusViewHandle(i) {
    return !this.Xbo?.HasGamepadControlMouse() || this.Xbo === i;
  }
  static b2m(i, a = false) {
    if (!Info_1.Info.IsInTouch()) {
      if (i?.IsValid()) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(i, a);
        this.CacheUiItem = undefined;
        this.CacheCheckDirty = false;
      }
    }
  }
  static SetNavigationFocusForView(i, a = false) {
    if (!Info_1.Info.IsInTouch()) {
      this.CacheUiItem = i;
      this.CacheCheckDirty = a;
    }
  }
}
exports.UiNavigationViewManager = UiNavigationViewManager;
(_a = UiNavigationViewManager).Xbo = undefined;
UiNavigationViewManager.Vbo = new Map();
UiNavigationViewManager.hbo = new Map();
UiNavigationViewManager.jbo = new Map();
UiNavigationViewManager.kbo = new Map();
UiNavigationViewManager.s4_ = TickSystem_1.TickSystem.InvalidId;
UiNavigationViewManager.h4_ = TickSystem_1.TickSystem.InvalidId;
UiNavigationViewManager.a4_ = () => {
  UiNavigationViewManager.zbo();
};
UiNavigationViewManager.l4_ = i => {
  UiNavigationViewManager.Zbo();
  UiNavigationViewManager.iqo(i);
  UiNavigationViewManager.$bo();
  UiNavigationViewManager.eqo();
  UiNavigationViewManager.tqo();
  UiNavigationViewManager.b2m(_a.CacheUiItem, _a.CacheCheckDirty);
};
UiNavigationViewManager.Bbo = (i, a) => {
  a = a.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass());
  if (a) {
    if (Info_1.Info.IsInTouch()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "移动端出现PC配置", ["ViewName", a.ViewName]);
      }
    } else if (a.Independent) {
      UiNavigationViewManager.Fbo(i, a);
      UiNavigationViewManager.MarkCalculateCurrentPanelDirty();
    } else {
      _a.Gbo(i, a);
    }
  }
};
UiNavigationViewManager.bbo = (i, a) => {
  if (a && UiNavigationViewManager.Wbo(i)) {
    UiNavigationViewManager.Kbo(i);
    UiNavigationViewManager.Qbo(i);
    UiNavigationViewManager.MarkCalculateCurrentPanelDirty();
  }
};
UiNavigationViewManager.qbo = () => {
  if (_a.Xbo) {
    _a.Xbo.ResetNavigationListener();
    ModelManager_1.ModelManager.UiNavigationModel.MarkMoveInstantly();
  }
};
UiNavigationViewManager.CacheUiItem = undefined;
UiNavigationViewManager.CacheCheckDirty = false; //# sourceMappingURL=UiNavigationViewManager.js.map