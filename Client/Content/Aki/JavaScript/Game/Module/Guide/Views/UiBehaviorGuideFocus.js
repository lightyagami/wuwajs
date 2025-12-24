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
    this.mvm = undefined;
    this.OQt = i;
    this.mvm = this.OQt?.GetRootActor()?.GetComponentByClass(UE.UIGuideMarkComponent.StaticClass());
  }
  SetOwner(i) {
    this.OQt = i;
    this.mvm = this.OQt?.GetRootActor()?.GetComponentByClass(UE.UIGuideMarkComponent.StaticClass());
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
        return !!this.mwm() || !(this.fvm() ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 95, "聚焦引导索引完成[GuideMark]"), 0) : this.gvm() ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 95, "聚焦引导索引完成[ExtraParam]"), 0) : !this.Cvm() || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 95, "聚焦引导索引完成[HookName]"), 0));
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
  mwm() {
    var i = this.RZt;
    var e = this.PZt.MultiGuideBox;
    if (!e || e.length === 0) {
      return false;
    }
    if (!this.mvm) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "未挂载UiGuideMark组件", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.mvm.Type !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "UiGuideMark组件类型错误, 应为Parent, 请检查预制体", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.mvm.Children.Num() === 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 74, "UiGuideMark组件下节点列表为空@2,这可能是对应节点还未生成", ["步骤Id", i.Id]);
      }
      return false;
    }
    var t = [];
    for (const o of e) {
      var r = this.mvm.Children.Get(o);
      if (!r || !r.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 74, "UiGuideMark组件下未找到指定名称的节点", ["步骤Id", i.Id], ["节点名称", o]);
        }
        return false;
      }
      r = r.GetUIItem();
      if (!r) {
        return false;
      }
      t.push(r);
    }
    i.ViewData.SetMultiAttachItems(t);
    i.ViewData.SetAttachedUiItem(t[0]);
    i.ViewData.SetAttachedUiItemForShow(t[0]);
    return true;
  }
  fvm() {
    var i = this.RZt;
    var e = this.PZt.GuideMarkName;
    let t = this.PZt.GuideMarkNameForShow;
    if (!e) {
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "寻找聚焦目标 [GuideMark]", ["步骤Id", i.Id], ["GuideMarkName", e], ["GuideMarkNameForShow", t]);
    }
    t = t || e;
    if (!this.mvm) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "未挂载UiGuideMark组件, 尝试其他方式获取聚焦控件", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.mvm.Type !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 74, "UiGuideMark组件类型错误, 应为Parent, 请检查预制体", ["步骤Id", i.Id]);
      }
      return false;
    }
    if (this.mvm.Children.Num() === 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 74, "UiGuideMark组件下节点列表为空@1,这可能是对应节点还未生成", ["步骤Id", i.Id]);
      }
      return false;
    }
    var r = this.mvm.Children.Get(e);
    if (!r || !r.IsValid()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 95, "UiGuideMark索引-没找到对应目标或目标无效,这可能是对应节点还未生成", ["步骤Id", i.Id], ["要寻找的Mark名字", e]);
      }
      return false;
    }
    e = r.GetUIItem();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 95, "UiGuideMark索引-目标无效@2", ["步骤Id", i.Id]);
      }
      return false;
    }
    i.ViewData.SetAttachedUiItem(e);
    r = this.mvm.Children.Get(t);
    if (r && r.IsValid()) {
      if (e = r.GetUIItem()) {
        i.ViewData.SetAttachedUiItemForShow(e);
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 95, "UiGuideMark索引-目标无效@4", ["步骤Id", i.Id]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 95, "UiGuideMark索引-目标无效@3", ["步骤Id", i.Id]);
      }
      return false;
    }
  }
  gvm() {
    var i = this.RZt;
    var e = this.PZt.ExtraParam;
    return e.length > 0 && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Guide", 16, "寻找聚焦目标 [ExtraParam]", ["步骤Id", i.Id], ["参数", e]), (e = this.OQt.GetGuideUiItemAndUiItemForShowEx(e))?.length !== 2 ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Guide", 16, "聚焦引导  额外参数解析失败", ["stepInfo!.Id", i.Id]), false) : ((i = i.ViewData).SetAttachedUiItem(e[0]), i.SetAttachedUiItemForShow(e[1]), (e = this.OQt.GetGuideScrollViewToLock()) && i.TryLockScrollView(e), true));
  }
  Cvm() {
    var i;
    var e = this.RZt;
    var t = this.PZt.HookName;
    var r = this.OQt.GetGuideUiItem(t);
    let o = this.PZt.HookNameForShow;
    o = (o = StringUtils_1.StringUtils.IsEmpty(o) ? t : o)?.replace(GuidePrefabDefine_1.NEW_TAG, "");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Guide", 16, "寻找聚焦目标 [HookName]", ["步骤Id", e.Id], ["HookName", t], ["HookNameForShow", o]);
    }
    if (r) {
      if (i = this.OQt.GetGuideUiItem(o)) {
        e.ViewData.SetAttachedUiItem(r);
        e.ViewData.SetAttachedUiItemForShow(i);
        return true;
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "挂接组件(GuideHookRegistry)未找到该挂接点（展示用）名称，可能是等待出现或配置错误", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", e.OwnerGroup.Id], ["聚焦引导Id", e.Id], ["出错的挂点名称", o]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Guide", 16, "挂接组件(GuideHookRegistry)未找到该挂接点名称，可能是等待出现或配置错误", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", e.OwnerGroup.Id], ["聚焦引导Id", e.Id], ["出错的挂点名称", t]);
      }
      return false;
    }
  }
}
exports.UiBehaviorGuideFocus = UiBehaviorGuideFocus;
//# sourceMappingURL=UiBehaviorGuideFocus.js.map