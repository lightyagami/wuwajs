"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const HelpController_1 = require("../../Module/Help/HelpController");
const GenericLayout_1 = require("../../Module/Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const TuningStandBubbleNode_1 = require("./Item/TuningStandBubbleNode");
const TuningStandGridItem_1 = require("./Item/TuningStandGridItem");
const TuningStandDefine_1 = require("./TuningStandDefine");
const TuningStandNodeTween_1 = require("./TuningStandNodeTween");
class TuningStandView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.MusicItem = undefined;
    this.MusicItemPlay = undefined;
    this.GuideItem = undefined;
    this.CaptionItem = undefined;
    this.Config = undefined;
    this.IsTuning = false;
    this.GridLayout = undefined;
    this.FinishCb = undefined;
    this.TooLongHandle = undefined;
    this.FloroSequencer = undefined;
    this.IsFloroTalking = false;
    this.MainSequencer = undefined;
    this.IsMainTalking = false;
    this.BubbleTimer = undefined;
    this.eku = 0;
    this.LightButtonLeft = undefined;
    this.LightButtonRight = undefined;
    this.r5u = undefined;
    this.o5u = undefined;
    this.n5u = false;
    this.mQc = false;
    this.I5t = () => {
      this.UiViewSequence.CloseSequenceName = "Close";
      if (this.mQc) {
        this.OnClearClose();
      } else {
        this.CloseMe();
      }
    };
    this.fFo = () => {
      HelpController_1.HelpController.OpenHelpById(TuningStandDefine_1.TUNINGSTAND_HELP_ID);
    };
    this.V2e = () => {
      return new TuningStandGridItem_1.TuningStandGridItem();
    };
    this.Jbu = e => {
      var t = this.GridLayout.GetLayoutItemList();
      if (e !== undefined) {
        t[e].RefreshGrid();
      } else {
        for (const i of t) {
          i.RefreshGrid();
        }
      }
    };
    this.Zbu = () => {
      if (this.TooLongHandle) {
        if (TimerSystem_1.GameplayTimerSystem.Has(this.TooLongHandle)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.TooLongHandle);
        }
        this.TooLongHandle = undefined;
      }
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.ResetNavigationFocusForViewWithDirtyCheck();
      this.mQc = true;
      this.GetItem(19).SetUIActive(true);
      if (this.IsTuning) {
        ModelManager_1.ModelManager.TuningStandModel.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.LinkComplete);
      }
    };
    this.eVu = t => {
      var e;
      var i = this.GridLayout.GetLayoutItemList();
      var s = ModelManager_1.ModelManager.TuningStandModel.GetGridList();
      let n = false;
      for (let e = 0; e < i.length; e++) {
        if (!t.includes(e)) {
          i[e].StartRevolving();
        }
      }
      for (const o of t) {
        const _ = i[o];
        var h = s[o].GridType;
        var r = this.MusicItem.GetActiveNode(h);
        const a = _.GetRootItem().D_K2_GetComponentLocation();
        const v = r.D_K2_GetComponentLocation();
        if (h === IAction_1.ETuningStandGridType.Start1) {
          TimerSystem_1.TimerSystem.Delay(() => {
            this.r5u?.PlayTween(a, v);
            _.StartRevolving();
          }, 250);
        }
        if (h === IAction_1.ETuningStandGridType.Start2) {
          n = true;
          _.StartRevolving();
          this.o5u?.PlayTween(a, v);
        }
      }
      if (!n) {
        e = this.GetItem(0).D_K2_GetComponentLocation();
        this.o5u?.PlayTween(e, e, false);
      }
    };
    this.tVu = () => {
      if (!this.n5u) {
        this.n5u = true;
        this.MusicItem.OnBeforeLinkComplete().then(() => {
          var e = this.Config.CompleteMusic;
          if (e) {
            AudioSystem_1.AudioSystem.PostEvent(e);
          }
          this.UiViewSequence.PlaySequence("Success");
          this.MusicItemPlay?.OnLinkComplete().then(this.l4u);
        });
      }
    };
    this.eRu = () => {
      var e;
      if (!this.mQc) {
        ModelManager_1.ModelManager.TuningStandModel.ResetGrid();
        e = ModelManager_1.ModelManager.TuningStandModel.GetGridList();
        this.GridLayout.RefreshByData(e);
        TimerSystem_1.TimerSystem.Delay(() => {
          this.SetFocusOnStart();
        }, 500);
      }
    };
    this.uxu = e => {
      if (e === IAction_1.ETuningStandBubbleTriggerType.Enter) {
        this.fxu();
      }
    };
    this.gxu = e => {
      if (this.IsTuning) {
        this.GetButton(5)?.RootUIComp.SetUIActive(!e);
        this.GetButton(9)?.RootUIComp.SetUIActive(e);
        (e ? this.LightButtonRight : this.LightButtonLeft).PlayLevelSequenceByName("Start");
      }
    };
    this.Cxu = e => {
      if (this.BubbleTimer) {
        if (TimerSystem_1.GameplayTimerSystem.Has(this.BubbleTimer)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.BubbleTimer);
        }
        this.BubbleTimer = undefined;
      }
      if (e.MainRoleTex) {
        this.SetTextureByPath(e.MainRoleTex, this.GetTexture(8));
      }
      if (e.FloroTex) {
        this.SetTextureByPath(e.FloroTex, this.GetTexture(4));
      }
      if (e.MainRoleTalk) {
        if (!this.GetText(10)?.IsUIActiveSelf()) {
          this.GetText(10)?.SetUIActive(true);
        }
        this.IsMainTalking = true;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.MainRoleTalk);
        this.dUu(this.MainSequencer);
      } else if (this.IsMainTalking) {
        this.IsMainTalking = false;
        this.mUu(this.MainSequencer);
      }
      if (e.FloroTalk) {
        if (!this.GetText(6)?.IsUIActiveSelf()) {
          this.GetText(6)?.SetUIActive(true);
        }
        this.IsFloroTalking = true;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.FloroTalk);
        this.dUu(this.FloroSequencer);
      } else if (this.IsFloroTalking) {
        this.IsFloroTalking = false;
        this.mUu(this.FloroSequencer);
      }
      e = (e.WaitTime > 1.5 ? e.WaitTime - 0.5 : e.WaitTime) * 1000;
      this.BubbleTimer = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.fUu();
      }, e);
    };
    this.gUu = () => {
      this.GetItem(14)?.SetUIActive(true);
    };
    this.a4u = () => {
      this.GetItem(14)?.SetUIActive(false);
    };
    this.h4u = () => {
      if (this.IsTuning && !ModelManager_1.ModelManager.TuningStandModel.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.Enter)) {
        this.fxu();
      }
      TimerSystem_1.TimerSystem.Next(() => {
        this.SetFocusOnStart();
      });
    };
    this.l4u = () => {
      this.UiViewSequence.CloseSequenceName = "Close2";
      this.OnClearClose();
    };
    this.Ucu = e => {
      if (e === "In") {
        this.MusicItem?.OnStartAnim();
        for (const t of this.GridLayout.GetLayoutItemList()) {
          t.PlayShowAnim();
        }
      }
    };
    this._4u = e => {
      for (const t of this.GridLayout.GetLayoutItemList()) {
        t.OnLinkMiss(e);
      }
    };
    this.lqt = () => {
      if (Info_1.Info.IsInGamepad() && !this.mQc) {
        TimerSystem_1.TimerSystem.Next(() => {
          this.SetFocusOnStart();
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIButtonComponent], [10, UE.UIText], [11, UE.UIGridLayout], [12, UE.UIText], [13, UE.UIButtonComponent], [14, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIItem], [22, UE.UIItem]];
    this.BtnBindInfo = [[13, this.eRu], [5, this.gUu], [9, this.gUu], [20, this.a4u]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.Config = e.Config;
    this.FinishCb = e.Cb;
    ModelManager_1.ModelManager.TuningStandModel.LoadData(this.Config);
    this.GridLayout = new GenericLayout_1.GenericLayout(this.GetGridLayout(11), this.V2e);
    var e = ModelManager_1.ModelManager.TuningStandModel.GetGridList();
    await this.GridLayout.RefreshByDataAsync(e);
    var t = [];
    for (const i of this.GridLayout.GetLayoutItemList()) {
      t.push(i.CreateGrid());
    }
    e = this.Config.GuidancePath;
    if (e) {
      this.GuideItem = new UiPanelBase_1.UiPanelBase();
      t.push(this.GuideItem.CreateThenShowByResourceIdAsync(e, this.GetItem(14)));
    }
    e = this.Config.MusicScorePath;
    if (e) {
      this.MusicItem = new TuningStandBubbleNode_1.TuningStandLineItem(e);
      t.push(this.MusicItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
      this.MusicItemPlay = new TuningStandBubbleNode_1.TuningStandLineItem(e);
      t.push(this.MusicItemPlay.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()));
    }
    this.r5u = new TuningStandNodeTween_1.TuningStandNodeTween(this.GetItem(21), "TuningTrail01");
    t.push(this.r5u.InitCurveDamage());
    this.o5u = new TuningStandNodeTween_1.TuningStandNodeTween(this.GetItem(22), "TuningTrail02");
    t.push(this.o5u.InitCurveDamage());
    await Promise.all(t);
  }
  OnStart() {
    var e;
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.CaptionItem.SetCloseCallBack(this.I5t);
    this.CaptionItem.SetHelpCallBack(this.fFo);
    this.IsTuning = this.Config.VisualType === IAction_1.ETuningStandVisualType.Tuning;
    this.GetItem(3)?.SetUIActive(this.IsTuning);
    this.GetItem(7)?.SetUIActive(this.IsTuning);
    if (this.IsTuning) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("IconRoleHeadMemes_FLL") ?? "";
      this.SetTextureByPath(e, this.GetTexture(4));
      e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? "IconRoleHeadMemes_Nv" : "IconRoleHeadMemes_Nan";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e) ?? "";
      this.SetTextureByPath(e, this.GetTexture(8));
    }
    this.GetItem(19)?.SetUIActive(false);
    this.FloroSequencer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3));
    this.MainSequencer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7));
    this.LightButtonLeft = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(5).RootUIComp);
    this.LightButtonRight = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(9).RootUIComp);
    this.UiViewSequence.AddSequenceFinishEvent("Start", this.h4u);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandUpdate, this.Jbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandSuccess, this.Zbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandSuccessShowStart, this.eVu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandSuccessShowEnd, this.tVu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandTooLongTime, this.gxu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandBubbleUpdate, this.Cxu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandBubbleEnd, this.uxu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TuningStandOnLinkMiss, this._4u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandUpdate, this.Jbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandSuccess, this.Zbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandSuccessShowStart, this.eVu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandSuccessShowEnd, this.tVu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandTooLongTime, this.gxu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandBubbleUpdate, this.Cxu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandBubbleEnd, this.uxu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TuningStandOnLinkMiss, this._4u);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  OnBeforeHide() {
    if (!this.LastHide) {
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    if (this.TooLongHandle) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.TooLongHandle)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.TooLongHandle);
      }
      this.TooLongHandle = undefined;
    }
    this.MusicItem = undefined;
    this.MusicItemPlay = undefined;
    this.GuideItem = undefined;
    ModelManager_1.ModelManager.TuningStandModel.UnloadData();
    this.r5u?.Clear();
    this.r5u = undefined;
    this.o5u?.Clear();
    this.o5u = undefined;
  }
  fxu() {
    this.tku();
  }
  tku() {
    this.eku++;
    if (this.eku > TuningStandDefine_1.TOOLONG_DELAY_MIN) {
      ModelManager_1.ModelManager.TuningStandModel.ProcessTooLong();
    } else {
      this.TooLongHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.tku();
      }, TuningStandDefine_1.TOOLONG_DELAY);
    }
  }
  dUu(e) {
    if (e) {
      if (e.IsPlayingSequence("Off")) {
        e.StopSequenceByKey("Off");
      }
      if (e.IsPlayingSequence("On")) {
        e.ReplaySequenceByKey("On");
      } else {
        e.PlayLevelSequenceByName("On");
      }
    }
  }
  mUu(e) {
    if (e) {
      if (e.IsPlayingSequence("On")) {
        e.StopSequenceByKey("On");
      }
      if (e.IsPlayingSequence("Off")) {
        e.ReplaySequenceByKey("Off");
      } else {
        e.PlayLevelSequenceByName("Off");
      }
    }
  }
  fUu() {
    if (this.BubbleTimer) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.BubbleTimer)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.BubbleTimer);
      }
      this.BubbleTimer = undefined;
    }
    if (this.IsMainTalking) {
      this.IsMainTalking = false;
      this.mUu(this.MainSequencer);
    }
    if (this.IsFloroTalking) {
      this.IsFloroTalking = false;
      this.mUu(this.FloroSequencer);
    }
  }
  GetFirstStartItem() {
    var e = this.GridLayout.GetLayoutItemList();
    let t = 0;
    for (const i of ModelManager_1.ModelManager.TuningStandModel.GetGridList()) {
      if (i.GridMainType === 1) {
        t = i.Index;
        break;
      }
    }
    return e[t].GetGrid();
  }
  SetFocusOnStart() {
    var e = this.GetFirstStartItem();
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e.GetRootItem(), true);
  }
  OnClearClose() {
    if (this.FinishCb) {
      this.FinishCb();
      this.FinishCb = undefined;
    }
    this.CloseMe();
  }
}
exports.TuningStandView = TuningStandView;
//# sourceMappingURL=TuningStandView.js.map