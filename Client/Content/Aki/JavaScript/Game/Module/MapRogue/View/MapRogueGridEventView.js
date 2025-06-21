"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueGridEventView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GridEventCompChoice_1 = require("./Components/GridEventCompChoice"),
  GridEventCompDesc_1 = require("./Components/GridEventCompDesc"),
  GridEventCompEnding_1 = require("./Components/GridEventCompEnding"),
  SPINE_DEFAULT_ANIM_NAME = "idle";
class MapRogueGridEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.go1 = [], this.Co1 = 0, this.po1 = !0, this.AutoState = !1, this.vo1 = 0, this.OpData = void 0, this.CurrentBgId = 0, this.CurrentBgmId = 0, this.ehr = () => {
      this.po1 = !this.po1, this.GetItem(7).SetUIActive(this.po1), this.GetItem(1).SetUIActive(this.po1)
    }, this.ET1 = () => {
      var t = this.Ln1();
      t && 1 === t.StepType && (this.AutoState = !0, 2 === this.ViewState ? (this.XTt(), this.XTt()) : 3 === this.ViewState && this.XTt())
    }, this.B6e = () => {
      0 !== this.ViewState && ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd()
    }, this.$An = t => {
      "Change" === t && this.WNe()
    }, this.bzt = !1, this.w8i = t => this.bzt = !0, this.b8i = t => !(this.bzt = !1), this.XTt = () => {
      if (!this.bzt) {
        var t = this.Ln1();
        if (t) switch (t.StepType) {
          case 1:
            2 === this.ViewState ? t.MaskClick?.() : 3 === this.ViewState && (this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!1), this.GetButton(8).RootUIComp.SetUIActive(!1), this.Mo1(t.StepId, 0));
            break;
          case 2:
            break;
          case 4:
            3 === this.ViewState && (this.GetButton(8).RootUIComp.SetUIActive(!1), this.Mo1(t.StepId, 0))
        }
      }
    }, this.wn1 = (t, i) => {
      switch (i) {
        case 1:
          this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!0);
          break;
        case 2:
        case 4:
          this.GetButton(8).RootUIComp.SetUIActive(!1)
      }
      this.ViewState = 3
    }, this.Mo1 = (t, i) => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 步骤执行", ["StepId", t], ["OptionId", i]), this.OpData?.ExecuteStep(t, i)
    }, this.Io1 = t => {
      this.QCa(this.OpData.CurrentPlotBgId, !0), this.UU1(this.OpData.CurrentPlotBgmId), this.To1(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIVerticalLayout],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.SpineSkeletonAnimationComponent],
      [11, UE.UIItem]
    ], this.BtnBindInfo = [
      [4, this.ehr],
      [8, this.XTt],
      [9, this.ET1]
    ]
  }
  async OnBeforeStartAsync() {
    this.vo1 = this.OpenParam, this.OpData = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.vo1), this.OpData.EventStepUpdateFunc = this.Io1, this.GetButton(8).RootUIComp.SetUIActive(!1);
    var t = this.GetScrollViewWithScrollbar(2),
      t = (t.OnPointerBeginDragCallBack.Bind(this.w8i), t.OnPointerEndDragCallBack.Bind(this.b8i), this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!1), []),
      t = (t.push(this.zDn()), this.OpData.IsInPlot && t.push(this.To1(this.OpData.CurrentStepId)), await Promise.all(t), ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventPlotById(this.OpData.CurrentPlotId));
    t && this.lqe.SetTitleLocalText(t.Title), this.QCa(this.OpData.CurrentPlotBgId, !1), this.UU1(this.OpData.CurrentPlotBgmId)
  }
  OnStart() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  OnBeforeDestroy() {
    this.OpData && (this.OpData.EventStepUpdateFunc = void 0, this.OpData = void 0), this.go1.length = 0
  }
  async zDn() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.lqe.SetCloseCallBack(this.B6e), this.lqe.SetCurrencyItemList([ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId()])
  }
  QCa(t, i) {
    0 !== t && this.CurrentBgId !== t && (this.CurrentBgId = t, !i || this.UiViewSequence.HasSequenceNameInPlaying("Switch") ? this.WNe() : this.UiViewSequence.PlaySequence("Switch"))
  }
  WNe() {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgById(this.CurrentBgId);
    if (t) {
      const n = this.GetTexture(0);
      var i, e = this.GetItem(11),
        s = this.GetSpine(10),
        h = !StringUtils_1.StringUtils.IsEmpty(t.BgPath) || !StringUtils_1.StringUtils.IsEmpty(t.BgFemalePath),
        r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      h ? (i = 0 === r ? t.BgFemalePath : t.BgPath, this.SetTextureByPath(i, n, void 0, () => {
        n.SetSizeFromTexture()
      })) : (i = 0 === r ? t.BgSpineAtlasFemalePath : t.BgSpineAtlasPath, r = 0 === r ? t.BgSpineSkeletonFemalePath : t.BgSpineSkeletonPath, this.SetSpineAssetByPath(i, r, s), s.SetAnimation(0, SPINE_DEFAULT_ANIM_NAME, !0)), n.SetUIActive(h), e.SetUIActive(!h)
    }
  }
  UU1(t) {
    0 !== t && this.CurrentBgmId !== t && (this.CurrentBgmId = t, t = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgmById(t)) && (t = t.BgmPath, AudioSystem_1.AudioSystem.PostEvent(t))
  }
  set ViewState(t) {
    this.Co1 !== t && (this.Co1 = t)
  }
  get ViewState() {
    return this.Co1
  }
  bo1() {
    return this.GetVerticalLayout(3).RootUIComp
  }
  Ln1() {
    var t = this.go1.length;
    if (0 < t) return this.go1[t - 1]
  }
  fze(t) {
    const i = this.GetScrollViewWithScrollbar(2),
      e = (0, puerts_1.$ref)(new UE.Vector2D(i.ContentUIItem.RelativeLocation));
    TimerSystem_1.TimerSystem.Delay(() => {
      i.ScrollToBottom(e, t, !1)
    }, 100)
  }
  async CreateComponentChoice(t, i) {
    t = new GridEventCompChoice_1.GridEventChoice(t);
    t.CanInteractCallback = this.wn1, t.ExecuteStep = this.Mo1, this.go1.push(t), await t.CreateByResourceIdAsync("UiItem_RandomEventChoose", this.bo1()), await t.Refresh(i)
  }
  async CreateComponentDesc(t) {
    t = new GridEventCompDesc_1.GridEventCompDesc(t);
    t.CanInteractCallback = this.wn1, this.go1.push(t), await t.CreateByResourceIdAsync("UiItem_RandomEventDesc", this.bo1()), t.Refresh(this.AutoState)
  }
  async CreateComponentEnding(t) {
    t = new GridEventCompEnding_1.GridEventCompEnding(t);
    t.CanInteractCallback = this.wn1, this.go1.push(t), await t.CreateByResourceIdAsync("UiItem_RandomEventEnd", this.bo1()), t.Refresh()
  }
  async To1(t) {
    if (0 !== t) {
      var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(t);
      if (i) {
        switch (this.ViewState = 1, this.GetButton(8).RootUIComp.SetUIActive(!0), i.Type) {
          case 1:
            if (await this.CreateComponentDesc(t), this.AutoState) {
              const e = this.Ln1()?.GetOriginalItem?.();
              return e && this.fze(e), void this.Mo1(t, 0)
            }
            this.GetItem(5).SetUIActive(!0), this.GetItem(6).SetUIActive(!1);
            break;
          case 2:
            this.AutoState = !1, await this.CreateComponentChoice(t, this.OpData.CurrentOptions);
            break;
          case 3:
            this.AutoState = !1, this.Mo1(t, 0);
            break;
          case 4:
            this.AutoState = !1, await this.CreateComponentEnding(t);
            break;
          default:
            this.AutoState = !1, Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 37, "[MapRogue] 步骤类型生成错误", ["StepId", t])
        }
        const e = this.Ln1()?.GetOriginalItem?.();
        e && this.fze(e), this.ViewState = 2
      } else Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 37, "[MapRogue] 无法查询到对应步骤,结束执行", ["StepId", t])
    }
  }
}
exports.MapRogueGridEventView = MapRogueGridEventView;
//# sourceMappingURL=MapRogueGridEventView.js.map