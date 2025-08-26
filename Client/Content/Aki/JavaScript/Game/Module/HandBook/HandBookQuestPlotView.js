"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookQuestPlotView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById");
const SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiNavigationNewController_1 = require("../UiNavigation/New/UiNavigationNewController");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBookQuestPlotItem_1 = require("./HandBookQuestPlotItem");
const HandBookQuestPlotList_1 = require("./HandBookQuestPlotList");
const HandBootPlotDynamicItem_1 = require("./HandBootPlotDynamicItem");
const HandBootQuestDynamicItem_1 = require("./HandBootQuestDynamicItem");
class HandBookQuestPlotView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NodeScrollView = undefined;
    this.PlotListScrollView = undefined;
    this.n6t = undefined;
    this.xPn = undefined;
    this.PPn = undefined;
    this.wPn = [];
    this.BPn = new Map();
    this.$Bn = undefined;
    this.b9i = 0;
    this.NeedScrollIndex = 0;
    this.GPn = 0;
    this.YBn = false;
    this.CFn = "";
    this.WQs = false;
    this.zBn = "";
    this.OPn = new Map();
    this.ZBn = [];
    this.NPn = (i, t, e) => {
      var o = new HandBookQuestPlotItem_1.HandBookQuestPlotItem();
      o.BindClickCallback(this.ebn);
      o.BindIsSelectFunction(this.tbn);
      return o;
    };
    this.FPn = (i, t, e) => {
      var o = new HandBookQuestPlotList_1.HandBookQuestPlotList();
      o.BindClickOptionToggleBack(this.Zu);
      o.BindOnRefreshNode(this.ibn);
      return o;
    };
    this.pFe = () => {
      this.CloseMe();
      HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
    };
    this.ebn = (e, i) => {
      if (!this.YBn) {
        this.YBn = true;
        let t = 0;
        var o = this.wPn.length;
        for (let i = 0; i < o; i++) {
          if (this.wPn[i].NodeText === e) {
            t = i;
          }
        }
        this.PlotListScrollView?.ScrollToItemIndex(t).finally(() => {
          this.YBn = false;
          this.ibn(e);
        });
      }
    };
    this.kPn = (i = true, t) => {
      this.wPn = [];
      this.VPn();
      this.PlotListScrollView?.RefreshByData(this.wPn, i);
      this.WQs = true;
      this.PlotListScrollView?.BindLateUpdate(() => {
        this.PlotListScrollView?.UnBindLateUpdate();
        this.WQs = false;
        if (t) {
          this.ibn(t);
        }
        this.fje();
      });
    };
    this.fgd = new Map();
    this.Z9s = [];
    this.Zu = (i, t, e, o) => {
      let s = this.BPn.get(i);
      (s = s || new Map()).set(t, e);
      this.BPn.set(i, s);
      this.Z9s.push(i, t, e);
      this.NeedScrollIndex = this.PlotListScrollView?.GetDisplayGridStartIndex() ?? 0;
      this.kPn();
      HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
    };
    this.wwe = () => {
      HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
      this.b9i--;
      this.BPn.clear();
      this.Og();
    };
    this.Pwe = () => {
      HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
      this.b9i++;
      this.BPn.clear();
      this.Og();
    };
    this.ibn = t => {
      if (this.CFn !== t && !this.WQs) {
        this.CFn = t;
        let i = false;
        for (const o of this.NodeScrollView.GetScrollItemItems()) {
          if (o?.GetTidText() === t) {
            o.SetToggleState(1);
            UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForViewSameGroup(o.GetToggleItem().GetRootComponent());
            i = true;
          } else {
            o.SetToggleState(0);
          }
        }
        if (!i) {
          let i = 0;
          for (var [e] of this.OPn) {
            if (e === t) {
              break;
            }
            i++;
          }
          this.NodeScrollView?.ScrollToItemIndex(i).finally(() => {
            this.NodeScrollView?.GetScrollItemFromIndex(0)?.SetToggleState(1);
          });
        }
      }
    };
    this.tbn = i => this.CFn === i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDynScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIDynScrollViewComponent]];
    this.BtnBindInfo = [[5, this.wwe], [6, this.Pwe]];
  }
  async OnBeforeStartAsync() {
    this.PPn = new HandBootPlotDynamicItem_1.HandBootPlotDynamicItem();
    this.PlotListScrollView = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(8), this.GetItem(4), this.PPn, this.FPn);
    await this.PlotListScrollView.Init();
    this.xPn = new HandBootQuestDynamicItem_1.HandBootQuestDynamicItem();
    this.NodeScrollView = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(1), this.GetItem(2), this.xPn, this.NPn);
    await this.NodeScrollView.Init();
  }
  OnStart() {
    this.zBn = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ColonTag") ?? "";
    this.zBn = this.zBn + " ";
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.n6t.SetCloseCallBack(this.pFe);
    this.n6t.SetHelpBtnActive(false);
    var i = this.OpenParam;
    this.$Bn = i.ConfigIdList;
    this.b9i = i.Index;
    this.Og();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhotoSelect, this.$Bn[this.b9i]);
  }
  Og() {
    var e = this.$Bn?.length ?? 0;
    if (this.b9i >= e || this.b9i < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HandBook", 5, "HandBookPlot_剧情图鉴选择任务出错", ["index:", this.b9i]);
      }
    } else {
      this.GetButton(5)?.RootUIComp.SetUIActive(this.b9i > 0);
      this.GetButton(6)?.RootUIComp.SetUIActive(this.b9i + 1 < e);
      var e = this.$Bn[this.b9i];
      var o = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(e);
      if (o) {
        if (!ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(o.Type, e)?.IsRead) {
          var s = o.Type;
          const u = ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(s)?.Type;
          ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedReadRequest(u, e);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), o.Descrtption);
        var n = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(o.QuestId);
        var s = n?.TidName ? PublicUtil_1.PublicUtil.GetConfigTextByKey(n.TidName) : "";
        this.n6t.SetTitle(s);
        const u = ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(o.Type);
        e = ConfigManager_1.ConfigManager.HandBookConfig?.GetQuestTab(u.Type);
        this.n6t.SetTitleIcon(e.Icon);
        let i = [];
        for (const g of o.ShowQuestList) {
          var h = ConfigManager_1.ConfigManager.HandBookConfig.GetQuestPlotConfig(g);
          if (!h) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("HandBook", 5, "HandBookPlot_剧情图鉴获取任务对应剧情配置出错", ["questId:", g]);
            }
            return;
          }
          i = i.concat(JSON.parse(h.Data));
        }
        this.OPn.clear();
        this.ZBn = [];
        let t = "";
        for (const v of i) {
          const d = v.IsHideUi ? "" : v.TidTip;
          if (d === "") {
            if (t === "") {
              var r = n?.TidName ?? "";
              var a = this.OPn.get(r);
              if (!a) {
                (a = []).push(v);
                t = r;
                this.OPn.set(r, a);
                continue;
              }
            }
            this.OPn.get(t).push(v);
          } else if (t !== "" && d !== "" && PublicUtil_1.PublicUtil.GetConfigTextByKey(t) === PublicUtil_1.PublicUtil.GetConfigTextByKey(d)) {
            this.OPn.get(t).push(v);
          } else {
            let i = this.OPn.get(d);
            if (i) {
              i.push(v);
            } else {
              (i = []).push(v);
              t = d;
              this.OPn.set(d, i);
            }
          }
        }
        var l;
        var _ = [];
        for ([l] of this.OPn) {
          var f = new HandBookDefine_1.HandBookQuestDynamicData();
          f.TidText = l;
          _.push(f);
          this.ZBn.push(l);
        }
        this.NodeScrollView.RefreshByData(_);
        const d = _[0].TidText;
        this.kPn(false, d);
      }
    }
  }
  VPn() {
    let i = 0;
    for (var [t, e] of this.OPn) {
      var o;
      var s = new HandBookDefine_1.HandBookPlotDynamicData();
      s.NodeText = t;
      s.BelongToNode = t;
      this.wPn.push(s);
      for (const n of e) {
        if (n.Flow.FlowListName && n.Flow.FlowListName !== "" && (o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(n.Flow.FlowListName, n.Flow.FlowId, n.Flow.StateId))) {
          this.HPn(o, i++, t);
        }
      }
    }
  }
  HPn(i, t, e) {
    this.GPn = 0;
    for (const l of i) {
      if (l.Name === "PlayMovie") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HandBook", 5, "播片剧情");
        }
      } else if (l.Name === "ShowTalk") {
        var o;
        var s;
        var n = l.Params.TalkItems;
        let i = 0;
        this.fgd.clear();
        for (const _ of n) {
          this.fgd.set(_.Id, i++);
          if (this.GPn < 0) {
            return;
          }
          if (this.GPn) {
            var h = this.fgd.get(this.GPn);
            var r = this.fgd.get(_.Id);
            if (!h || r < h) {
              continue;
            }
          }
          if (_.Type === "QTE") {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("HandBook", 5, "QTE演出，屏蔽");
            }
          } else if (_.Type === "NoTextItem") {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("HandBook", 5, "无文本演出，处理跳转");
            }
            if (_.Actions && this.jPn(_.Actions, _.Id)) {
              return;
            }
          } else {
            this.GPn = 0;
            if ((_.WhoId || _.TidTalk) && _.Type !== "Option") {
              r = new HandBookDefine_1.HandBookPlotDynamicData();
              r.BelongToNode = e;
              h = _.WhoId ? SpeakerById_1.configSpeakerById.GetConfig(_.WhoId) : undefined;
              let i = "";
              if ((i = h ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, h.Id) ?? "" : i) !== " " && i !== "") {
                i += this.zBn;
              }
              r.TalkOwnerName = i;
              if (_.PlayVoice) {
                a = PlotAudioById_1.configPlotAudioById.GetConfig(_.TidTalk);
                r.PlotAudio = a;
              }
              var a = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(_.TidTalk);
              r.TalkText = a;
              r.PlotId = t;
              r.TalkItemId = _.Id;
              this.wPn.push(r);
            }
            if (_.Options && _.Options.length > 0) {
              o = this.BPn.get(t)?.get(_.Id) ?? 0;
              s = _.Options[o];
              this.jPn(s.Actions, _.Id);
              this.tVs(_.Options, o, e, t, _.Id);
            }
            if (_.Actions && this.jPn(_.Actions, _.Id)) {
              return;
            }
          }
        }
      }
    }
  }
  jPn(i, t) {
    if (i) {
      for (const n of i) {
        if (n.Name === "FinishTalk" || n.Name === "FinishState") {
          return true;
        }
        if (n.Name === "JumpTalk") {
          var e = n.Params.TalkId;
          var o = this.fgd.get(e);
          var s = this.fgd.get(t);
          if (o && o <= s) {
            this.GPn = -1;
            break;
          }
          this.GPn = e;
        }
      }
    }
    return false;
  }
  tVs(t, e, o, s, n) {
    const h = new HandBookDefine_1.HandBookPlotDynamicData();
    h.BelongToNode = o;
    h.OptionTalker = true;
    this.wPn.push(h);
    for (let i = 0; i < t.length; i++) {
      var r = t[i];
      const h = new HandBookDefine_1.HandBookPlotDynamicData();
      h.BelongToNode = o;
      h.OptionIndex = i;
      h.TalkOption = r;
      h.IsChoseOption = e === i;
      h.PlotId = s;
      h.TalkItemId = n;
      this.wPn.push(h);
    }
  }
  fje() {
    if (this.Z9s.length > 0) {
      for (const i of this.PlotListScrollView?.GetScrollItemItems()) {
        if (i.OptionData?.TalkOption && i.OptionData?.PlotId === this.Z9s[0] && i.OptionData?.TalkItemId === this.Z9s[1] && i.OptionData?.OptionIndex === this.Z9s[2]) {
          UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(i.GetOptionToggle().GetRootComponent());
          break;
        }
      }
      this.Z9s = [];
    }
  }
}
exports.HandBookQuestPlotView = HandBookQuestPlotView;
//# sourceMappingURL=HandBookQuestPlotView.js.map