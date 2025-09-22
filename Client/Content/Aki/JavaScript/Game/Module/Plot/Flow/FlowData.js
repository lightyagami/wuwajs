"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowContext = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Pool_1 = require("../../../../Core/Container/Pool");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CAPACITY = 20;
class FlowContext {
  constructor() {
    this.IsServerNotify = false;
    this.FlowListName = "";
    this.FlowId = 0;
    this.FlowStateId = 0;
    this.Context = undefined;
    this.CurActionId = 0;
    this.IsWaitRenderData = true;
    this.CurSubActionId = 0;
    this.CurShowTalk = undefined;
    this.CurShowTalkActionId = 0;
    this.CurTalkId = -1;
    this.CurOptionId = -1;
    this.IsBackground = false;
    this.IsFadeSkip = false;
    this.IsBreakdown = false;
    this.IsServerEnd = false;
    this.IsAsync = false;
    this.FlowIncId = 0;
    this.HasAdjustCamera = false;
    this.CanSkip = false;
    this.TalkHistory = new Array();
    this.OptionsHistory = new Map();
    this.OptionsCollection = [];
    this.UiParam = undefined;
    this.FormatIdInner = undefined;
    this.Pos = undefined;
    this.RollbackRecord = [];
    this.KeepMainRolePose = false;
    this.SeamlessPlot = false;
    this.EndSeamlessShowTalkId = 0;
    this.NeedPreloadUiSequenceData = undefined;
    this.PromptStyle = undefined;
  }
  Init(t, i) {
    this.ht();
    this.IsServerNotify = t.IsServerNotify;
    this.FlowIncId = t.FlowIncId;
    this.FlowListName = t.FlowListName;
    this.FlowId = t.FlowId;
    this.IsBackground = i;
    this.IsBreakdown = t.IsBreakdown;
    this.Context = t.Context;
    this.IsAsync = t.IsAsync;
    this.UiParam = t.UiParam;
    this.FlowStateId = t.StateId;
    this.Pos = t.Pos;
    this.KeepMainRolePose = t.KeepMainRolePose;
    this.SeamlessPlot = t.Seamless;
    this.EndSeamlessShowTalkId = t.EndSeamlessShowTalkId;
    if (t.PreloadSequenceUiData) {
      this.NeedPreloadUiSequenceData = [...t.PreloadSequenceUiData];
    }
    this.PromptStyle = t.PromptStyle;
  }
  ht() {
    this.FlowIncId = -1;
    this.Context = undefined;
    this.CurActionId = 0;
    this.CurSubActionId = 0;
    this.IsAsync = false;
    this.CurShowTalk = undefined;
    this.CurTalkId = -1;
    this.CurOptionId = -1;
    this.IsBackground = false;
    this.IsBreakdown = false;
    this.IsServerEnd = false;
    this.HasAdjustCamera = false;
    this.TalkHistory.length = 0;
    this.OptionsHistory.clear();
    this.OptionsCollection.length = 0;
    this.UiParam = undefined;
    this.FlowListName = "";
    this.FlowId = 0;
    this.FlowStateId = 0;
    this.FormatIdInner = undefined;
    this.CanSkip = false;
    this.CurShowTalkActionId = 0;
    this.IsFadeSkip = false;
    this.Pos = undefined;
    this.RollbackRecord.length = 0;
    this.KeepMainRolePose = false;
    this.SeamlessPlot = false;
    this.EndSeamlessShowTalkId = 0;
    this.NeedPreloadUiSequenceData = undefined;
  }
  static Create() {
    let t = FlowContext.Pool.Get();
    return t = t || FlowContext.Pool.Create();
  }
  Recycle() {
    this.ht();
    FlowContext.Pool.Put(this);
  }
  get FormatId() {
    this.FormatIdInner ||= StringUtils_1.StringUtils.Format("{0},{1},{2}", this.FlowListName, this.FlowId.toString(), this.FlowStateId.toString());
    return this.FormatIdInner;
  }
  LogError(t, ...i) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 26, StringUtils_1.StringUtils.Format("[Flow] {0}", t), ...i, ["IncId", this.FlowIncId], ["Id", this.FormatId], ["ActionId", this.CurActionId], ["SubActionId", this.CurSubActionId], ["TalkId", this.CurTalkId]);
    }
  }
}
(exports.FlowContext = FlowContext).Pool = new Pool_1.Pool(CAPACITY, () => new FlowContext());
//# sourceMappingURL=FlowData.js.map