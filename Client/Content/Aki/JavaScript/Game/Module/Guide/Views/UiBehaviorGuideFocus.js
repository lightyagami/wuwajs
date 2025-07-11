"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviorGuideFocus = undefined;
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
    this.OQt = i;
  }
  SetOwner(i) {
    this.OQt = i;
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
    if (!this.OQt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, `聚焦引导 ${this.RZt.Id} AttachedUiComponentAction为空`);
      }
      return false;
    }
    if (!this.OQt.GetRootItem() || !this.OQt.GetActive()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, `聚焦引导 ${this.RZt.Id} 依附界面还没打开, 打开后再来`);
      }
      return false;
    }
    var i = this.RZt;
    var e = this.PZt.ExtraParam;
    if (e.length > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "聚焦引导步骤配置了额外参数, 走扩展逻辑", ["步骤Id", i.Id]);
      }
      if ((e = this.OQt.GetGuideUiItemAndUiItemForShowEx(e))?.length !== 2) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Guide", 16, "聚焦引导  额外参数解析失败", ["stepInfo!.Id", i.Id]);
        }
        return false;
      } else {
        (t = i.ViewData).SetAttachedUiItem(e[0]);
        t.SetAttachedUiItemForShow(e[1]);
        if (e = this.OQt.GetGuideScrollViewToLock()) {
          t.TryLockScrollView(e);
        }
        return true;
      }
    }
    var t = this.PZt.HookName;
    var e = this.OQt.GetGuideUiItem(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", i.OwnerGroup.Id], ["聚焦引导Id", i.Id], ["出错的挂点名称", t]);
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
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件", ["当前打开的界面名称", this.AZt], ["引导应该依附的界面", this.UZt], ["引导组id", i.OwnerGroup.Id], ["聚焦引导Id", i.Id], ["出错的挂点名称", s]);
      }
      return false;
    }
  }
}
exports.UiBehaviorGuideFocus = UiBehaviorGuideFocus;
//# sourceMappingURL=UiBehaviorGuideFocus.js.map