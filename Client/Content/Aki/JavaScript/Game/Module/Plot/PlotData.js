"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlotFlow = exports.PlotCenterText = exports.PlotFlowStateItem = exports.PlotResultInfo = exports.PlotStateInfo = exports.PlotInfo = void 0;
const Pool_1 = require("../../../Core/Container/Pool"),
  SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  CAPACITY = 20;
class PlotInfo {
  constructor() {
    this.FlowListName = "", this.FlowId = 0, this.StateId = 0, this.StateActions = void 0, this.KeepMusic = !1, this.Context = void 0, this.IsServerNotify = !1, this.FlowIncId = void 0, this.IsBackground = !1, this.IsBreakdown = !1, this.IsServerEnd = !1, this.IsAsync = !1, this.PlotLevel = "LevelC", this.IsWaitAnim = !1, this.UiParam = void 0, this.CanBeAbandoned = !1, this.FadeBegin = void 0, this.Pos = void 0, this.KeepMainRolePose = !1, this.CheckPreload = !1, this.Seamless = !1, this.EndSeamlessShowTalkId = 0, this.PreloadSequenceUiData = new Array, this.AE1 = void 0
  }
  Init(t, i, s, o, e, h, r, l, n, d = {}, v = !1, a = !1, c, P = !1) {
    this.FlowListName = s, this.FlowId = o, this.StateId = e, this.StateActions = h, this.KeepMusic = r, this.IsServerNotify = t, this.Context = l, this.FlowIncId = i, this.IsBackground = a, this.IsBreakdown = !1, this.IsAsync = n, this.UiParam = d, this.CanBeAbandoned = v, this.Pos = c, this.CheckPreload = P, this.Seamless = P, PlotInfo.AnalyzeLevel(this, h)
  }
  static AnalyzeLevel(i, s) {
    let t = "LevelC",
      o = !1,
      e = !1,
      h = void 0,
      r = !1;
    var l, n;
    if (0 < s.length && "SetPlotMode" === (l = s[0]).Name && (l = l.Params, t = l.Mode, o = l.WaitForPlayerMotionEnd ?? !1, e = l.NoUiEnterAnimation ?? !1, l.FastFadeIn && (h = l.FastFadeIn.ScreenType ?? IAction_1.EFadeInScreenShowType.Black), l.KeepMainRolePose) && (r = !0), !h && 1 < s.length && "FadeInScreen" === (l = s[1]).Name && (l = l.Params, h = l.ScreenType ?? IAction_1.EFadeInScreenShowType.Black), i.Seamless) {
      let t = "";
      for (const d of s) "SetPlotMode" === d.Name ? (n = d.Params, t = n.Mode) : "ShowTalk" !== d.Name || "LevelB" !== t && "LevelA" !== t || (i.EndSeamlessShowTalkId = d.ActionId, i.PreloadSequenceUiData.push(d.Params.SequenceDataAsset))
    }
    i.PlotLevel = t, i.IsWaitAnim = o, i.UiParam.DisableAnim = e, i.FadeBegin = h, i.KeepMainRolePose = r, "LevelD" !== t && "Prompt" !== t || i.UiParam.ViewName || (i.UiParam.ViewName = "BattleView"), "Prompt" === t && this.pbn(s, i)
  }
  static pbn(t, i) {
    var s, o, e = new Map;
    for (const h of t)
      if ("ShowTalk" === h.Name)
        for (const r of h.Params.TalkItems) r.WhoId && (s = SpeakerById_1.configSpeakerById.GetConfig(r.WhoId), StringUtils_1.StringUtils.IsEmpty(s?.HeadRoundIconAsset) ? (o = StringUtils_1.StringUtils.Format("{0},{1},{2}", i.FlowListName, i.FlowId.toString(), i.StateId.toString()), ControllerHolder_1.ControllerHolder.FlowController.LogError("[PlotTips]  没有头像路径，检查对话人配置", ["id", r.WhoId], ["flow", o])) : e.set(s.Id, s.HeadRoundIconAsset));
    i.UiParam.TipsTalkTexturePaths = e
  }
  Clear() {
    this.FlowListName = void 0, this.StateId = void 0, this.StateActions = void 0, this.KeepMusic = !1, this.FlowId = void 0, this.Context = void 0, this.IsServerNotify = void 0, this.FlowIncId = void 0, this.IsBackground = !1, this.IsBreakdown = !1, this.IsServerEnd = !1, this.IsAsync = !1, this.UiParam = void 0, this.CanBeAbandoned = !1, this.FadeBegin = void 0, this.Pos = void 0, this.Seamless = !1, this.EndSeamlessShowTalkId = 0, this.PreloadSequenceUiData.length = 0
  }
  static Create() {
    let t = PlotInfo.RUe.Get();
    return t = t || PlotInfo.RUe.Create()
  }
  Recycle() {
    this.Clear(), PlotInfo.RUe.Put(this)
  }
  get FormatId() {
    return this.AE1 || (this.AE1 = StringUtils_1.StringUtils.Format("{0},{1},{2}", this.FlowListName, this.FlowId.toString(), this.StateId.toString())), this.AE1
  }
}(exports.PlotInfo = PlotInfo).RUe = new Pool_1.Pool(CAPACITY, () => new PlotInfo);
class PlotStateInfo {
  constructor() {
    this.StateMap = new Map
  }
  Reset() {
    this.StateMap.clear()
  }
}
exports.PlotStateInfo = PlotStateInfo;
class PlotResultInfo {
  constructor() {
    this.FlowListName = "", this.FlowId = 0, this.StateId = 0, this.FlowIncId = 0, this.ResultCode = 0
  }
  Reset() {
    this.ResultCode = 0
  }
}
exports.PlotResultInfo = PlotResultInfo;
class PlotFlowStateItem {
  constructor(t, i, s, o) {
    this.PbDataId = t, this.FlowListName = i, this.FlowId = s, this.StateId = o
  }
}
exports.PlotFlowStateItem = PlotFlowStateItem;
class PlotCenterText {
  constructor() {
    this.Text = "", this.AudioId = "", this.AutoClose = !1, this.UniversalTone = void 0, this.TalkAkEvent = void 0, this.TalkEndAkEvent = void 0, this.Config = void 0, this.Callback = void 0
  }
  Clear() {
    this.Text = void 0, this.AudioId = "", this.AutoClose = !1, this.UniversalTone = void 0, this.TalkAkEvent = void 0, this.Config = void 0, this.Callback = void 0
  }
}
exports.PlotCenterText = PlotCenterText;
class PlotFlow {
  constructor(t, i, s) {
    this.FlowListName = void 0, this.FlowId = void 0, this.StateId = void 0, this.FlowListName = t, this.FlowId = i, this.StateId = s
  }
}
exports.PlotFlow = PlotFlow;
//# sourceMappingURL=PlotData.js.map