"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TermExplanationController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Pool_1 = require("../../../Core/Container/Pool");
const TermConfigById_1 = require("../../../Core/Define/ConfigQuery/TermConfigById");
const TermExplanationViewStyleById_1 = require("../../../Core/Define/ConfigQuery/TermExplanationViewStyleById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiManager_1 = require("../../Ui/UiManager");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const TermExplanationDefine_1 = require("./TermExplanationDefine");
const POOL_CAPACITY = 5;
class TermTextRegistryHandle {
  constructor() {
    this.Id = 0;
    this.xr1 = undefined;
    this.l7 = true;
    this.f8o = 0;
    this.ViewId = 0;
    this.AttachDir = 0;
    this.AttachItem = undefined;
    this.OnDisableClick = undefined;
    this.Offset = [0, 0];
    this.NeedHighlight = true;
    this.LastText = "";
    this.Group = 0;
    this.Priority = 0;
    this.IsEnableStateDirty = false;
    this.Style = 1;
    this.ReportType = undefined;
  }
  get UiText() {
    return this.xr1;
  }
  get Enable() {
    return this.l7;
  }
  get Type() {
    return this.f8o;
  }
  SetEnable(t) {
    this.l7 = t;
    this.IsEnableStateDirty = true;
  }
  SetUiText(t) {
    this.xr1 = t;
  }
  SetType(t) {
    this.f8o = t;
  }
  Clear() {
    this.UiText?.GetOwner()?.OnDestroyed?.Clear();
    if (this.UiText?.IsValid()) {
      this.UiText.OnHyperLinkClickCallBack.Unbind();
    }
    this.SetEnable(true);
    this.SetUiText(undefined);
    this.SetType(0);
    this.OnDisableClick = undefined;
    this.ViewId = 0;
    this.AttachDir = 0;
    this.AttachItem = undefined;
    this.Offset = [0, 0];
    this.NeedHighlight = true;
    this.Group = 0;
    this.Priority = 0;
    this.IsEnableStateDirty = false;
    this.Style = 1;
    this.ReportType = undefined;
    this.Id = 0;
  }
}
class TermExplanationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.M01);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewBeforeStart, this.dM1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetToBattleView, this.Gto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange, this.ePt);
    return true;
  }
  static OnClear() {
    for (var [, t] of this.Dr1.entries()) {
      this.Ur1.Put(t);
    }
    this.Br1 = 0;
    this.mM1 = undefined;
    this.Dr1.clear();
    this.Ur1.Clear();
    this.hW1.length = 0;
    this.cj1 = 0;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.M01);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewBeforeStart, this.dM1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetToBattleView, this.Gto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange, this.ePt);
    return true;
  }
  static OnTick(t) {
    let e = false;
    let i = false;
    var r;
    var n = [];
    for ([, r] of this.Dr1.entries()) {
      if (r.UiText && r.UiText.IsValid() && r.UiText.IsUIActiveInHierarchy() && (r.LastText !== r.UiText.text && (r.LastText = r.UiText.text, e = true, n.push(r.Id)), r.IsEnableStateDirty)) {
        r.IsEnableStateDirty = false;
        i = true;
        n.push(r.Id);
      }
    }
    if (e || i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange, n);
    }
  }
  static RegisterTextHyperlinkByParam(t) {
    return this.RegisterTextHyperlink(t.UiText, t.ViewType, t.ReportType, t.AttachDirection, t.AttachItem, t.OnDisableClick, t.CustomOffset, t.Group, t.Priority, t.Style);
  }
  static RegisterTextHyperlink(t, e, i, r = 0, n, o, a, s = 0, _ = 0, h = 1) {
    if (this.kr1(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("TermExplanation", 74, "术语解释文本控件注册失败: 控件重复注册");
      }
      return 0;
    }
    this.lW1(s);
    if (this.cj1 !== s) {
      this._W1(s);
    }
    const l = this.Ur1.Get() ?? this.Ur1.Create();
    l.SetUiText(t);
    l.SetType(e);
    l.OnDisableClick = o;
    l.AttachDir = r;
    l.AttachItem = n ?? t;
    l.Group = s;
    l.Priority = _;
    l.Style = h;
    l.ReportType = i;
    if (a) {
      l.Offset = a;
    }
    this.Dr1.set(++this.Br1, l);
    l.Id = this.Br1;
    t.OnHyperLinkClickCallBack.Bind(t => this.Or1(l, t));
    t.SetRichText(true);
    t.SetEnableHyperLinksHighlight(true);
    t.HyperLinksHoverColor = UE.Color.FromHex(TermExplanationDefine_1.DEFAULT_HYPERLINK_HOVER_COLOR_HEX);
    t.bFilterHyperLinks = false;
    t.GetOwner().OnDestroyed.Add(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TermExplanation", 74, "存在文本控件销毁前未解注册!");
      }
      this.UnRegisterTextHyperlink(t);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange, [l.Id]);
    return this.Br1;
  }
  static UnRegisterTextHyperlink(t) {
    t = this.kr1(t);
    if (t) {
      this.UnRegisterTextHyperlinkById(t);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TermExplanation", 74, "解注册失败: 未注册的text控件");
    }
  }
  static UnRegisterTextHyperlinkById(t) {
    var e = this.Dr1.get(t);
    if (e) {
      this.uW1(e.Group);
      e.Clear();
      this.Dr1.delete(t);
      this.Ur1.Put(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TermExplanation", 74, "解注册失败: 不存在此id", ["id", t]);
    }
  }
  static SetEnableHyperLink(t, e) {
    t = this.kr1(t);
    if (t) {
      this.SetEnableHyperLinkById(t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TermExplanation", 74, "设置启禁用失败: 未注册的text控件");
    }
  }
  static SetEnableHyperLinkById(t, e) {
    var i = this.Dr1.get(t);
    if (i) {
      if (i.Enable !== e) {
        i.SetEnable(e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TermExplanation", 74, "设置启禁用失败: 不存在此id", ["id", t]);
    }
  }
  static OpenTermExplanationView(t) {
    var e;
    var i = this.kr1(t);
    if (i) {
      if (e = this.Dr1.get(i)) {
        if ((t = this.qr1(t.text)).length === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 文本中无超链接", ["id", i]);
          }
          return false;
        } else {
          return this.Or1(e, t[0]);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 不存在此id", ["id", i]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 未注册的text控件");
      }
      return false;
    }
  }
  static OpenTermExplanationViewDirectly() {
    var t;
    var e;
    var i = [];
    let r = undefined;
    for (const o of this.dj1(this.cj1)) {
      var n = this.qr1(o.UiText.text, false);
      for (const a of n) {
        i.push(a);
      }
      if (n.length > 0 && !r) {
        r = o;
      }
    }
    if (i.length !== 0 && r) {
      if (r.Enable) {
        r.NeedHighlight = false;
        if (r.ReportType) {
          this.r7c(r.ReportType);
        }
        this.mM1 = r;
        t = {
          HyperLinkList: Array.from(new Set(i))
        };
        e = this.cbu(r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewOpening, r.Type);
        UiManager_1.UiManager.OpenView(e, t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 当前文本术语功能已被手动设为失效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 当前文本中无超链接");
    }
  }
  static HasAnyTermInCurrentTexts() {
    for (var [, t] of this.Dr1.entries()) {
      if (t.UiText && t.UiText.IsValid() && t.UiText.IsUIActiveInHierarchy() && t.Enable) {
        if (this.qr1(t.UiText.text).length > 0) {
          return true;
        }
      }
    }
    return false;
  }
  static IsUiTextRegistered(t) {
    return this.kr1(t) !== 0;
  }
  static lW1(e) {
    let i = -1;
    for (let t = 0; t < this.hW1.length; ++t) {
      if (this.hW1[t][0] === e) {
        i = t;
        break;
      }
    }
    var t;
    if (i === -1) {
      this.hW1.push([e, 0]);
    } else {
      t = this.hW1[i][1] + 1;
      this.hW1.splice(i);
      this.hW1.push([e, t]);
    }
  }
  static uW1(e) {
    let i = -1;
    for (let t = 0; t < this.hW1.length; ++t) {
      if (this.hW1[t][0] === e) {
        i = t;
        break;
      }
    }
    var t;
    if (i !== -1) {
      if ((t = this.hW1[i][1] - 1) <= 0) {
        this.hW1.splice(i);
        if (this.cj1 === e) {
          if (this.hW1.length === 0) {
            this.cj1 = 0;
          } else {
            this._W1(this.hW1[this.hW1.length - 1][0]);
          }
        }
      } else {
        this.hW1[i][1] = t;
      }
    }
  }
  static _W1(e) {
    let i = -1;
    for (let t = 0; t < this.hW1.length; ++t) {
      if (this.hW1[t][0] === e) {
        i = t;
        break;
      }
    }
    var t;
    if (i === -1) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("TermExplanation", 74, "术语解释组不存在: ", ["Group", e]);
      }
    } else {
      this.cj1 = e;
      t = this.hW1[i];
      this.hW1.splice(i);
      this.hW1.push(t);
    }
  }
  static dj1(t, e = true) {
    var i;
    var r = [];
    for ([, i] of this.Dr1.entries()) {
      if (i.Group === t && i.UiText && i.UiText.IsValid()) {
        if (!e || !!i.UiText.IsUIActiveInHierarchy()) {
          r.push(i);
        }
      }
    }
    r.sort((t, e) => t.Priority - e.Priority);
    return r;
  }
  static kr1(t) {
    for (var [e, i] of this.Dr1.entries()) {
      if (i.UiText === t) {
        return e;
      }
    }
    return 0;
  }
  static Or1(t, e) {
    if (t.ReportType) {
      this.r7c(t.ReportType);
    }
    if (t.Enable) {
      if (this.nHc(e)) {
        t.NeedHighlight = true;
        this._W1(t.Group);
        this.mM1 = t;
        var i = this.cbu(t);
        var r = [];
        for (const t of this.dj1(this.cj1)) {
          for (const n of this.qr1(t.UiText.text, false)) {
            if (!!this.nHc(n) || !Info_1.Info.IsBuildShipping) {
              r.push(n);
            }
          }
        }
        e = {
          HyperLinkList: Array.from(new Set(r)),
          FocusedHyperLink: e
        };
        UiManager_1.UiManager.OpenView(i, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewOpening, t.Type);
      }
    } else if (t.OnDisableClick) {
      t.OnDisableClick();
    }
    return true;
  }
  static qr1(t, e = true) {
    var i = [];
    for (const r of Array.from(t.matchAll(/href\s*=\s*(["']?)([^"'\s>]+)\1/gi))) {
      if (r[2]) {
        i.push(r[2]);
      }
    }
    if (e) {
      return Array.from(new Set(i));
    } else {
      return i;
    }
  }
  static Fr1(t) {
    if (t.AttachDir !== 0) {
      if (t.Type === 1) {
        this.Nr1(t);
      } else if (t.Type === 0) {
        this.Vr1(t);
      }
      this.Xd1(t);
    }
  }
  static nHc(t) {
    var e = Number(t);
    if (isNaN(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TermExplanation", 74, "超链接id无法转换为数字id", ["Id", t]);
      }
      return false;
    } else {
      return !!TermConfigById_1.configTermConfigById.GetConfig(e) || (Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "词条未在表s.术语中注册", ["词条", t]), false);
    }
  }
  static Nr1(t) {
    var e;
    var i;
    var r;
    var n = UiManager_1.UiManager.GetView(t.ViewId);
    if (n) {
      if (t.AttachDir !== 1 && t.AttachDir !== 2) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("TermExplanation", 74, "界面吸附失败: 吸附方向与界面类型不匹配");
        }
      } else {
        e = t.AttachDir === 1 ? -1 : 1;
        i = (n = n.GetTipItem()).GetLGUISpaceAbsolutePosition();
        r = (t = t.AttachItem).GetLGUISpaceAbsolutePosition().X;
        r += (0.5 - t.GetPivot().X) * t.Width;
        n.SetLGUISpaceAbsolutePosition(new UE.Vector(r + e * ((t.Width + n.Width) / 2), i.Y, i.Z));
      }
    }
  }
  static Vr1(t) {
    var e;
    var i;
    var r;
    var n;
    var o = UiManager_1.UiManager.GetView(t.ViewId);
    if (o) {
      if (t.AttachDir !== 3 && t.AttachDir !== 4) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("TermExplanation", 74, "界面吸附失败: 吸附方向与界面类型不匹配");
        }
      } else {
        e = t.AttachDir === 3 ? 1 : -1;
        r = (i = (o = o.GetTipItem()).GetParentAsUIItem()).GetLGUISpaceAbsolutePosition();
        n = (t = t.AttachItem).GetLGUISpaceAbsolutePosition().Y;
        n += (0.5 - t.GetPivot().Y) * t.Height;
        i.SetLGUISpaceAbsolutePosition(new UE.Vector(r.X, n + e * ((t.Height + o.Height) / 2), r.Z));
      }
    }
  }
  static Xd1(t) {
    var e;
    var i = UiManager_1.UiManager.GetView(t.ViewId);
    if (i) {
      e = (i = i.GetTipItem()).GetLGUISpaceAbsolutePosition();
      i.SetLGUISpaceAbsolutePosition(new UE.Vector(e.X + t.Offset[0], e.Y + t.Offset[1], e.Z));
    }
  }
  static cbu(t) {
    var e = t.Type;
    var t = t.Style;
    var i = TermExplanationViewStyleById_1.configTermExplanationViewStyleById.GetConfig(t);
    if (i) {
      if (e === 0) {
        return i.CenterView;
      } else {
        return i.SideView;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TermExplanation", 74, "术语解释风格化配置不存在: ", ["id", t]);
      }
      return this.Gr1[e];
    }
  }
  static o7c(t) {
    var e = new LogReportDefine_1.EnterViewWithTermsEvent();
    e.i_scene = t;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TermExplanation", 74, "术语解释埋点: 进入带有术语的界面", ["场景类型", t]);
    }
  }
  static r7c(t) {
    var e = new LogReportDefine_1.ClickTermExplanationEvent();
    e.i_scene = t;
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TermExplanation", 74, "术语解释埋点: 点击超链接", ["场景类型", t]);
    }
  }
}
exports.TermExplanationController = TermExplanationController;
(_a = TermExplanationController).IsTickEvenPausedInternal = true;
TermExplanationController.Br1 = 0;
TermExplanationController.mM1 = undefined;
TermExplanationController.cj1 = 0;
TermExplanationController.hW1 = [];
TermExplanationController.Gr1 = {
  [0]: "TermExplanationCenterView",
  1: "TermExplanationSideView"
};
TermExplanationController.Dr1 = new Map();
TermExplanationController.Ur1 = new Pool_1.Pool(POOL_CAPACITY, () => new TermTextRegistryHandle(), t => {
  t.Clear();
});
TermExplanationController.ePt = t => {
  for (const i of t) {
    var e = _a.Dr1.get(i);
    if (e && _a.qr1(e.UiText.text).length > 0) {
      _a.o7c(e.ReportType);
    }
  }
};
TermExplanationController.M01 = () => {
  for (var [, t] of _a.Dr1.entries()) {
    if (t.UiText && t.UiText.IsValid()) {
      t.UiText.SetHyperLinksHoverSpiteActive(false);
      t.UiText.SetEnableHyperLinksHighlight(true);
    }
  }
};
TermExplanationController.dM1 = t => {
  if (_a.mM1) {
    _a.mM1.ViewId = t;
    if (_a.mM1.NeedHighlight) {
      _a.mM1.UiText?.SetEnableHyperLinksHighlight(false);
      _a.mM1.UiText?.SetHyperLinksHoverSpiteActive(true);
    }
    _a.Fr1(_a.mM1);
  }
};
TermExplanationController.Gto = () => {
  UiManager_1.UiManager.CloseView("TermExplanationSideView");
  UiManager_1.UiManager.CloseView("TermExplanationCenterView");
  UiManager_1.UiManager.CloseView("FloroRanchTermExplanationCenterView");
}; //# sourceMappingURL=TermExplanationController.js.map