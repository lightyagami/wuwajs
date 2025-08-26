"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotFlow = exports.PlotCenterText = exports.PlotFlowStateItem = exports.PlotResultInfo = exports.PlotStateInfo = exports.PlotInfo = undefined;
const Pool_1 = require("../../../Core/Container/Pool");
const SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiModel_1 = require("../../Ui/UiModel");
const CAPACITY = 20;
class PlotInfo {
  constructor() {
    this.FlowListName = "";
    this.FlowId = 0;
    this.StateId = 0;
    this.StateActions = undefined;
    this.KeepMusic = false;
    this.Context = undefined;
    this.IsServerNotify = false;
    this.FlowIncId = undefined;
    this.IsBackground = false;
    this.IsBreakdown = false;
    this.IsServerEnd = false;
    this.IsAsync = false;
    this.PlotLevel = "LevelC";
    this.IsWaitAnim = false;
    this.UiParam = undefined;
    this.CanBeAbandoned = false;
    this.FadeBegin = undefined;
    this.Pos = undefined;
    this.KeepMainRolePose = false;
    this.CheckPreload = false;
    this.Seamless = false;
    this.EndSeamlessShowTalkId = 0;
    this.PreloadSequenceUiData = new Array();
    this.tI1 = undefined;
  }
  Init(t, i, s, o, e, h, r, l, n, d = {}, v = false, a = false, c, P = false) {
    this.FlowListName = s;
    this.FlowId = o;
    this.StateId = e;
    this.StateActions = h;
    this.KeepMusic = r;
    this.IsServerNotify = t;
    this.Context = l;
    this.FlowIncId = i;
    this.IsBackground = a;
    this.IsBreakdown = false;
    this.IsAsync = n;
    this.UiParam = d;
    this.CanBeAbandoned = v;
    this.Pos = c;
    this.CheckPreload = P;
    this.Seamless = P;
    PlotInfo.AnalyzeLevel(this, h);
  }
  static AnalyzeLevel(i, s) {
    let t = "LevelC";
    let o = false;
    let e = false;
    let h = undefined;
    let r = false;
    var l;
    var n;
    if (s.length > 0 && (l = s[0]).Name === "SetPlotMode" && (l = l.Params, t = l.Mode, o = l.WaitForPlayerMotionEnd ?? false, e = l.NoUiEnterAnimation ?? false, l.FastFadeIn && (h = l.FastFadeIn.ScreenType ?? IAction_1.EFadeInScreenShowType.Black), l.KeepMainRolePose)) {
      r = true;
    }
    if (!h && s.length > 1 && (l = s[1]).Name === "FadeInScreen") {
      l = l.Params;
      h = l.ScreenType ?? IAction_1.EFadeInScreenShowType.Black;
    }
    if (i.Seamless) {
      let t = "";
      for (const d of s) {
        if (d.Name === "SetPlotMode") {
          n = d.Params;
          t = n.Mode;
        } else if (d.Name === "ShowTalk" && (t === "LevelB" || t === "LevelA")) {
          i.EndSeamlessShowTalkId = d.ActionId;
          i.PreloadSequenceUiData.push(d.Params.SequenceDataAsset);
        }
      }
    }
    i.PlotLevel = t;
    i.IsWaitAnim = o;
    i.UiParam.DisableAnim = e;
    i.FadeBegin = h;
    i.KeepMainRolePose = r;
    if ((t === "LevelD" || t === "Prompt") && !i.UiParam.ViewName) {
      i.UiParam.ViewName = UiModel_1.UiModel.MainViewName;
    }
    if (t === "Prompt") {
      this.pbn(s, i);
    }
  }
  static pbn(t, i) {
    var s;
    var o;
    var e = new Map();
    for (const h of t) {
      if (h.Name === "ShowTalk") {
        for (const r of h.Params.TalkItems) {
          if (r.WhoId) {
            s = SpeakerById_1.configSpeakerById.GetConfig(r.WhoId);
            if (StringUtils_1.StringUtils.IsEmpty(s?.HeadRoundIconAsset)) {
              o = StringUtils_1.StringUtils.Format("{0},{1},{2}", i.FlowListName, i.FlowId.toString(), i.StateId.toString());
              ControllerHolder_1.ControllerHolder.FlowController.LogError("[PlotTips]  没有头像路径，检查对话人配置", ["id", r.WhoId], ["flow", o]);
            } else {
              e.set(s.Id, s.HeadRoundIconAsset);
            }
          }
        }
      }
    }
    i.UiParam.TipsTalkTexturePaths = e;
  }
  Clear() {
    this.FlowListName = undefined;
    this.StateId = undefined;
    this.StateActions = undefined;
    this.KeepMusic = false;
    this.FlowId = undefined;
    this.Context = undefined;
    this.IsServerNotify = undefined;
    this.FlowIncId = undefined;
    this.IsBackground = false;
    this.IsBreakdown = false;
    this.IsServerEnd = false;
    this.IsAsync = false;
    this.UiParam = undefined;
    this.CanBeAbandoned = false;
    this.FadeBegin = undefined;
    this.Pos = undefined;
    this.Seamless = false;
    this.EndSeamlessShowTalkId = 0;
    this.PreloadSequenceUiData.length = 0;
  }
  static Create() {
    let t = PlotInfo.RUe.Get();
    return t = t || PlotInfo.RUe.Create();
  }
  Recycle() {
    this.Clear();
    PlotInfo.RUe.Put(this);
  }
  get FormatId() {
    this.tI1 ||= StringUtils_1.StringUtils.Format("{0},{1},{2}", this.FlowListName, this.FlowId.toString(), this.StateId.toString());
    return this.tI1;
  }
}
(exports.PlotInfo = PlotInfo).RUe = new Pool_1.Pool(CAPACITY, () => new PlotInfo());
class PlotStateInfo {
  constructor() {
    this.StateMap = new Map();
  }
  Reset() {
    this.StateMap.clear();
  }
}
exports.PlotStateInfo = PlotStateInfo;
class PlotResultInfo {
  constructor() {
    this.FlowListName = "";
    this.FlowId = 0;
    this.StateId = 0;
    this.FlowIncId = 0;
    this.ResultCode = 0;
  }
  Reset() {
    this.ResultCode = 0;
  }
}
exports.PlotResultInfo = PlotResultInfo;
class PlotFlowStateItem {
  constructor(t, i, s, o) {
    this.PbDataId = t;
    this.FlowListName = i;
    this.FlowId = s;
    this.StateId = o;
  }
}
exports.PlotFlowStateItem = PlotFlowStateItem;
class PlotCenterText {
  constructor() {
    this.Text = "";
    this.AudioId = "";
    this.AutoClose = false;
    this.UniversalTone = undefined;
    this.TalkAkEvent = undefined;
    this.TalkEndAkEvent = undefined;
    this.Config = undefined;
    this.Callback = undefined;
  }
  Clear() {
    this.Text = undefined;
    this.AudioId = "";
    this.AutoClose = false;
    this.UniversalTone = undefined;
    this.TalkAkEvent = undefined;
    this.Config = undefined;
    this.Callback = undefined;
  }
}
exports.PlotCenterText = PlotCenterText;
class PlotFlow {
  constructor(t, i, s) {
    this.FlowListName = undefined;
    this.FlowId = undefined;
    this.StateId = undefined;
    this.FlowListName = t;
    this.FlowId = i;
    this.StateId = s;
  }
}
exports.PlotFlow = PlotFlow;
//# sourceMappingURL=PlotData.js.map