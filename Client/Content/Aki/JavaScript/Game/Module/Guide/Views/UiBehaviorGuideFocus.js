"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviorGuideFocus = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GuideDefine_1 = require("../GuideDefine");
const GuidePrefabDefine_1 = require("./GuidePrefabDefine");
class UiBehaviorGuideFocus {
  constructor(i) {
    this.RZt = undefined;
    this.UZt = undefined;
    this.AZt = undefined;
    this.PZt = undefined;
    this.OQt = undefined;
    this.wmm = undefined;
    this.OQt = i;
    this.wmm = this.OQt?.GetRootActor()?.GetComponentByClass(UE.UIGuideMarkComponent.StaticClass());
  }
  SetOwner(i) {
    this.OQt = i;
    this.wmm = this.OQt?.GetRootActor()?.GetComponentByClass(UE.UIGuideMarkComponent.StaticClass());
  }
  SetParam(...i) {
    this.RZt = i[0];
    this.PZt = this.RZt.ViewData.ViewConf;
    if (this.PZt.DynamicTabName) {
      this.UZt = this.PZt.DynamicTabName;
    } else {
      this.UZt = this.PZt.ViewName;
    }
    i = this.OQt;
    if (i instanceof UiViewBase_1.UiViewBase) {
      this.AZt = i.Info?.Name;
    } else if (i instanceof UiTabViewBase_1.UiTabViewBase || (0, GuideDefine_1.isCustomTabViewForGuide)(i)) {
      this.AZt = i.GetViewName();
    }
  }
  OnAfterUiShow() {
    if (this.RZt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "[UiBehaviorGuideFocus] OnShow", ["引导组id", this.RZt.OwnerGroup.Id], ["聚焦引导Id", this.RZt.Id]);
      }
      if (this.RZt.StateMachine.CurrentState !== 1) {
        this.RZt.TryEnterExecuting();
      } else {
        this.RZt.GuideView?.Show();
      }
    }
  }
  OnBeforeUiHide() {
    if (this.RZt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "[UiBehaviorGuideFocus] OnHide", ["引导组id", this.RZt.OwnerGroup.Id], ["聚焦引导Id", this.RZt.Id]);
      }
      this.RZt.GuideView?.Hide();
    }
  }
  CleanGuideStep() {
    this.RZt = undefined;
  }
  OnBeforeDestroy() {
    var i;
    if (this.RZt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "[UiBehaviorGuideFocus] OnDestroy", ["引导组id", this.RZt.OwnerGroup.Id], ["步骤Id", this.RZt.Id]);
      }
      this.AZt = undefined;
      this.UZt = undefined;
      if ((i = this.RZt?.StateMachine?.CurrentState) && i === 1) {
        this.RZt.SwitchState(3);
      }
      this.RZt = undefined;
    }
  }
  PrepareForOpenGuideFocus() {
    var i;
    this.RZt.ViewData.ResetAttachedUiItem();
    if (this.AZt !== this.UZt) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "聚焦引导配置依附的界面与实际打开的界面不一致", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", this.RZt.OwnerGroup.Id], ["聚焦引导Id", this.RZt.Id]);
      }
      return false;
    } else if (this.xZt()) {
      return !!(i = this.RZt.ViewData.GetAttachedView())?.GetRootActor() && !!i?.GetActive() || (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "聚焦引导步骤  附着界面不可见而挂起", ["this.GuideStepInfo!.Id", this.RZt.Id]), false);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "聚焦引导步骤  因找不到挂点ui而挂起", ["this.GuideStepInfo!.Id", this.RZt.Id]);
      }
      return false;
    }
  }
  xZt() {
    if (this.OQt) {
      if (this.OQt.GetRootItem() && this.OQt.GetActive()) {
        return !!this.uvm() || !!this.Lmm() || !!this.Pmm() || !!this.Amm();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 16, `聚焦引导 ${this.RZt.Id} 依附界面还没打开, 打开后再来`);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, `聚焦引导 ${this.RZt.Id} AttachedUiComponentAction为空`);
      }
      return false;
    }
  }
  uvm() {
    var i = this.RZt;
    var t = this.PZt.MultiGuideBox;
    if (!t || t.length === 0) {
      return false;
    }
    if (!this.wmm) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "未挂载UiGuideMark组件", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.wmm.Type !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "UiGuideMark组件类型错误, 应为Parent, 请检查预制体", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.wmm.Children.Num() === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "UiGuideMark组件下节点列表为空", ["步骤Id", i.Id]);
      }
      return false;
    }
    var e = [];
    for (const r of t) {
      var s = this.wmm.Children.Get(r);
      if (!s || !s.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 74, "UiGuideMark组件下未找到指定名称的节点", ["步骤Id", i.Id], ["节点名称", r]);
        }
        return false;
      }
      s = s.GetUIItem();
      if (!s) {
        return false;
      }
      e.push(s);
    }
    i.ViewData.SetMultiAttachItems(e);
    i.ViewData.SetAttachedUiItem(e[0]);
    i.ViewData.SetAttachedUiItemForShow(e[0]);
    return true;
  }
  Lmm() {
    var i = this.RZt;
    var t = this.PZt.GuideMarkName;
    let e = this.PZt.GuideMarkNameForShow;
    if (!t) {
      return false;
    }
    e = e || t;
    if (!this.wmm) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "未挂载UiGuideMark组件, 尝试其他方式获取聚焦控件", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.wmm.Type !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "UiGuideMark组件类型错误, 应为Parent, 请检查预制体", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.wmm.Children.Num() === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "UiGuideMark组件下节点列表为空", ["步骤Id", i.Id]);
      }
      return false;
    }
    t = this.wmm.Children.Get(t);
    if (!t || !t.IsValid()) {
      return false;
    }
    t = t.GetUIItem();
    if (!t) {
      return false;
    }
    i.ViewData.SetAttachedUiItem(t);
    var t = this.wmm.Children.Get(e);
    return !!t && !!t.IsValid() && !!(t = t.GetUIItem()) && !(i.ViewData.SetAttachedUiItemForShow(t), 0);
  }
  Pmm() {
    var i = this.RZt;
    var t = this.PZt.ExtraParam;
    return t.length > 0 && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 16, "聚焦引导步骤配置了额外参数, 走扩展逻辑", ["步骤Id", i.Id]), (t = this.OQt.GetGuideUiItemAndUiItemForShowEx(t))?.length !== 2 ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "聚焦引导  额外参数解析失败", ["stepInfo!.Id", i.Id]), false) : ((i = i.ViewData).SetAttachedUiItem(t[0]), i.SetAttachedUiItemForShow(t[1]), (t = this.OQt.GetGuideScrollViewToLock()) && i.TryLockScrollView(t), true));
  }
  Amm() {
    var i = this.RZt;
    var t = this.PZt.HookName;
    var e = this.OQt.GetGuideUiItem(t);
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "挂接组件(GuideHookRegistry)未找到该挂接点名称，可能是等待出现或配置错误", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", i.OwnerGroup.Id], ["聚焦引导Id", i.Id], ["出错的挂点名称", t]);
      }
      return false;
    }
    let s = this.PZt.HookNameForShow;
    s = (s = StringUtils_1.StringUtils.IsEmpty(s) ? t : s).replace(GuidePrefabDefine_1.NEW_TAG, "");
    t = this.OQt.GetGuideUiItem(s);
    if (t) {
      i.ViewData.SetAttachedUiItem(e);
      i.ViewData.SetAttachedUiItemForShow(t);
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "挂接组件(GuideHookRegistry)未找到该挂接点（展示用）名称，可能是等待出现或配置错误", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", i.OwnerGroup.Id], ["聚焦引导Id", i.Id], ["出错的挂点名称", s]);
      }
      return false;
    }
  }
}
exports.UiBehaviorGuideFocus = UiBehaviorGuideFocus;
//# sourceMappingURL=UiBehaviorGuideFocus.js.map