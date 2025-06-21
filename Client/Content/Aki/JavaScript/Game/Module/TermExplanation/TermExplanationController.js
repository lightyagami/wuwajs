"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TermExplanationController = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Pool_1 = require("../../../Core/Container/Pool"),
  TermById_1 = require("../../../Core/Define/ConfigQuery/TermById"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiManager_1 = require("../../Ui/UiManager"),
  TermExplanationDefine_1 = require("./TermExplanationDefine"),
  POOL_CAPACITY = 5;
class TermTextRegistryHandle {
  constructor() {
    this.FFe = 0, this.ur1 = void 0, this.l7 = !0, this.f8o = 0, this.ViewId = 0, this.AttachDir = 0, this.AttachItem = void 0, this.OnDisableClick = void 0, this.Offset = [0, 0], this.NeedHighlight = !0, this.LastText = "", this.Group = 0, this.Priority = 0, this.IsEnableStateDirty = !1
  }
  get Id() {
    return this.FFe
  }
  get UiText() {
    return this.ur1
  }
  get Enable() {
    return this.l7
  }
  get Type() {
    return this.f8o
  }
  SetEnable(t) {
    this.l7 = t, this.IsEnableStateDirty = !0
  }
  SetUiText(t) {
    this.ur1 = t
  }
  SetType(t) {
    this.f8o = t
  }
  Clear() {
    this.UiText?.GetOwner()?.OnDestroyed?.Clear(), this.UiText?.IsValid() && this.UiText.OnHyperLinkClickCallBack.Unbind(), this.SetEnable(!0), this.SetUiText(void 0), this.SetType(0), this.OnDisableClick = void 0, this.ViewId = 0, this.AttachDir = 0, this.AttachItem = void 0, this.Offset = [0, 0], this.NeedHighlight = !0, this.Group = 0, this.Priority = 0, this.IsEnableStateDirty = !1
  }
}
class TermExplanationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.ZC1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTermExplanationViewBeforeStart, this.jS1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetToBattleView, this.Gto), !0
  }
  static OnClear() {
    for (var [, t] of this.dr1.entries()) this.mr1.Put(t);
    return this.fr1 = 0, this.HS1 = void 0, this.dr1.clear(), this.mr1.Clear(), this.T$1.length = 0, this.U81 = 0, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewClosed, this.ZC1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTermExplanationViewBeforeStart, this.jS1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetToBattleView, this.Gto), !0
  }
  static OnTick(t) {
    let e = !1,
      i = !1;
    for (var [, r] of this.dr1.entries()) r.UiText && r.UiText.IsValid() && r.UiText.IsUIActiveInHierarchy() && (r.LastText !== r.UiText.text && (r.LastText = r.UiText.text, e = !0), r.IsEnableStateDirty) && (r.IsEnableStateDirty = !1, i = !0);
    (e || i) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange)
  }
  static RegisterTextHyperlinkByParam(t) {
    return this.RegisterTextHyperlink(t.UiText, t.ViewType, t.AttachDirection, t.AttachItem, t.OnDisableClick, t.CustomOffset, t.Group, t.Priority)
  }
  static RegisterTextHyperlink(t, e, i = 0, r, n, s, a = 0, o = 0) {
    if (this.gr1(t)) return Log_1.Log.CheckWarn() && Log_1.Log.Warn("TermExplanation", 74, "术语解释文本控件注册失败: 控件重复注册"), 0;
    this.b$1(a), this.U81 !== a && this.R$1(a);
    const h = this.mr1.Get() ?? this.mr1.Create();
    h.SetUiText(t), h.SetType(e), h.OnDisableClick = n, h.AttachDir = i, h.AttachItem = r ?? t, h.Group = a, h.Priority = o, s && (h.Offset = s), this.dr1.set(++this.fr1, h);
    return t.OnHyperLinkClickCallBack.Bind(t => this.Cr1(h, t)), t.SetEnableHyperLinksHighlight(!0), t.HyperLinksHoverColor = UE.Color.FromHex(TermExplanationDefine_1.DEFAULT_HYPERLINK_HOVER_COLOR_HEX), t.bFilterHyperLinks = !1, t.GetOwner().OnDestroyed.Add(() => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("TermExplanation", 74, "存在文本控件销毁前未解注册!"), this.UnRegisterTextHyperlink(t)
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange), this.fr1
  }
  static UnRegisterTextHyperlink(t) {
    t = this.gr1(t);
    t ? this.UnRegisterTextHyperlinkById(t) : Log_1.Log.CheckInfo() && Log_1.Log.Info("TermExplanation", 74, "解注册失败: 未注册的text控件")
  }
  static UnRegisterTextHyperlinkById(t) {
    var e = this.dr1.get(t);
    e ? (this.L$1(e.Group), e.Clear(), this.dr1.delete(t), this.mr1.Put(e)) : Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "解注册失败: 不存在此id", ["id", t])
  }
  static SetEnableHyperLink(t, e) {
    t = this.gr1(t);
    t ? this.SetEnableHyperLinkById(t, e) : Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "设置启禁用失败: 未注册的text控件")
  }
  static SetEnableHyperLinkById(t, e) {
    var i = this.dr1.get(t);
    i ? i.Enable !== e && i.SetEnable(e) : Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "设置启禁用失败: 不存在此id", ["id", t])
  }
  static OpenTermExplanationView(t) {
    var e, i = this.gr1(t);
    return i ? (e = this.dr1.get(i)) ? 0 === (t = this.pr1(t.text)).length ? (Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 文本中无超链接", ["id", i]), !1) : this.Cr1(e, t[0]) : (Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 不存在此id", ["id", i]), !1) : (Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 未注册的text控件"), !1)
  }
  static OpenTermExplanationViewDirectly() {
    var t, e, i = [];
    let r = void 0;
    for (const s of this.B81(this.U81)) {
      var n = this.pr1(s.UiText.text, !1);
      for (const a of n) i.push(a);
      0 < n.length && !r && (r = s)
    }
    0 !== i.length && r ? r.Enable ? (r.NeedHighlight = !1, this.HS1 = r, t = {
      HyperLinkList: Array.from(new Set(i))
    }, e = this.vr1[r.Type], EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewOpening, r.Type), UiManager_1.UiManager.OpenView(e, t)) : Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 当前文本术语功能已被手动设为失效") : Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 当前文本中无超链接")
  }
  static HasAnyTermInCurrentTexts() {
    for (var [, t] of this.dr1.entries())
      if (t.UiText && t.UiText.IsValid() && t.UiText.IsUIActiveInHierarchy() && t.Enable)
        if (0 < this.pr1(t.UiText.text).length) return !0;
    return !1
  }
  static IsUiTextRegistered(t) {
    return 0 !== this.gr1(t)
  }
  static b$1(e) {
    let i = -1;
    for (let t = 0; t < this.T$1.length; ++t)
      if (this.T$1[t][0] === e) {
        i = t;
        break
      } var t; - 1 === i ? this.T$1.push([e, 0]) : (t = this.T$1[i][1] + 1, this.T$1.splice(i), this.T$1.push([e, t]))
  }
  static L$1(e) {
    let i = -1;
    for (let t = 0; t < this.T$1.length; ++t)
      if (this.T$1[t][0] === e) {
        i = t;
        break
      } var t; - 1 !== i && ((t = this.T$1[i][1] - 1) <= 0 ? (this.T$1.splice(i), this.U81 === e && (0 === this.T$1.length ? this.U81 = 0 : this.R$1(this.T$1[this.T$1.length - 1][0]))) : this.T$1[i][1] = t)
  }
  static R$1(e) {
    let i = -1;
    for (let t = 0; t < this.T$1.length; ++t)
      if (this.T$1[t][0] === e) {
        i = t;
        break
      } var t; - 1 === i ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("TermExplanation", 74, "术语解释组不存在: ", ["Group", e]) : (this.U81 = e, t = this.T$1[i], this.T$1.splice(i), this.T$1.push(t))
  }
  static B81(t, e = !0) {
    var i, r = [];
    for ([, i] of this.dr1.entries()) i.Group === t && i.UiText && i.UiText.IsValid() && (e && !i.UiText.IsUIActiveInHierarchy() || r.push(i));
    return r.sort((t, e) => t.Priority - e.Priority), r
  }
  static gr1(t) {
    for (var [e, i] of this.dr1.entries())
      if (i.UiText === t) return e;
    return 0
  }
  static Cr1(t, e) {
    if (t.Enable) {
      var i = Number(e);
      if (void 0 === i || isNaN(i)) Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 超链接id无法转换为数字id", ["Id", e]);
      else if (TermById_1.configTermById.GetConfig(i)) {
        t.NeedHighlight = !0, this.R$1(t.Group), this.HS1 = t;
        var i = this.vr1[t.Type],
          r = [];
        for (const t of this.B81(this.U81))
          for (const s of this.pr1(t.UiText.text, !1)) r.push(s);
        var n = {
          HyperLinkList: Array.from(new Set(r)),
          FocusedHyperLink: e
        };
        UiManager_1.UiManager.OpenView(i, n), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewOpening, t.Type)
      } else Log_1.Log.CheckError() && Log_1.Log.Error("TermExplanation", 74, "术语解释打开失败: 该文本未在表s.术语中注册", ["文本", e])
    } else t.OnDisableClick && t.OnDisableClick();
    return !0
  }
  static pr1(t, e = !0) {
    var i = [];
    for (const r of Array.from(t.matchAll(/href\s*=\s*(["']?)([^"'\s>]+)\1/gi))) r[2] && i.push(r[2]);
    return e ? Array.from(new Set(i)) : i
  }
  static yr1(t) {
    0 !== t.AttachDir && (1 === t.Type ? this.Sr1(t) : 0 === t.Type && this.Mr1(t), this.Ed1(t))
  }
  static Sr1(t) {
    var e, i, r, n = UiManager_1.UiManager.GetView(t.ViewId);
    n && (1 !== t.AttachDir && 2 !== t.AttachDir ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("TermExplanation", 74, "界面吸附失败: 吸附方向与界面类型不匹配") : (e = 1 === t.AttachDir ? -1 : 1, i = (n = n.GetTipItem()).GetLGUISpaceAbsolutePosition(), r = (t = t.AttachItem).GetLGUISpaceAbsolutePosition().X, r += (.5 - t.GetPivot().X) * t.Width, n.SetLGUISpaceAbsolutePosition(new UE.Vector(r + e * ((t.Width + n.Width) / 2), i.Y, i.Z))))
  }
  static Mr1(t) {
    var e, i, r, n, s = UiManager_1.UiManager.GetView(t.ViewId);
    s && (3 !== t.AttachDir && 4 !== t.AttachDir ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("TermExplanation", 74, "界面吸附失败: 吸附方向与界面类型不匹配") : (e = 3 === t.AttachDir ? 1 : -1, r = (i = (s = s.GetTipItem()).GetParentAsUIItem()).GetLGUISpaceAbsolutePosition(), n = (t = t.AttachItem).GetLGUISpaceAbsolutePosition().Y, n += (.5 - t.GetPivot().Y) * t.Height, i.SetLGUISpaceAbsolutePosition(new UE.Vector(r.X, n + e * ((t.Height + s.Height) / 2), r.Z))))
  }
  static Ed1(t) {
    var e, i = UiManager_1.UiManager.GetView(t.ViewId);
    i && (e = (i = i.GetTipItem()).GetLGUISpaceAbsolutePosition(), i.SetLGUISpaceAbsolutePosition(new UE.Vector(e.X + t.Offset[0], e.Y + t.Offset[1], e.Z)))
  }
}
exports.TermExplanationController = TermExplanationController, (_a = TermExplanationController).IsTickEvenPausedInternal = !0, TermExplanationController.fr1 = 0, TermExplanationController.HS1 = void 0, TermExplanationController.U81 = 0, TermExplanationController.T$1 = [], TermExplanationController.vr1 = {
  [0]: "TermExplanationCenterView",
  1: "TermExplanationSideView"
}, TermExplanationController.dr1 = new Map, TermExplanationController.mr1 = new Pool_1.Pool(POOL_CAPACITY, () => new TermTextRegistryHandle, t => {
  t.Clear()
}), TermExplanationController.ZC1 = () => {
  for (var [, t] of _a.dr1.entries()) t.UiText && t.UiText.IsValid() && (t.UiText.SetHyperLinksHoverSpiteActive(!1), t.UiText.SetEnableHyperLinksHighlight(!0))
}, TermExplanationController.jS1 = t => {
  _a.HS1 && (_a.HS1.ViewId = t, _a.HS1.NeedHighlight && (_a.HS1.UiText?.SetEnableHyperLinksHighlight(!1), _a.HS1.UiText?.SetHyperLinksHoverSpiteActive(!0)), _a.yr1(_a.HS1))
}, TermExplanationController.Gto = () => {
  UiManager_1.UiManager.CloseView("TermExplanationSideView")
};
//# sourceMappingURL=TermExplanationController.js.map