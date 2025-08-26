"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGridEventView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GridEventCompChoice_1 = require("./Components/GridEventCompChoice");
const GridEventCompDesc_1 = require("./Components/GridEventCompDesc");
const GridEventCompEnding_1 = require("./Components/GridEventCompEnding");
const MapRoguePanelLv_1 = require("./Components/MapRoguePanelLv");
const MapRogueMoodBar_1 = require("./MapRogueMoodBar");
const SPINE_DEFAULT_ANIM_NAME = "idle";
class MapRogueGridEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.uZu = 0;
    this.lqe = undefined;
    this.gyu = undefined;
    this.Cyu = undefined;
    this.ko1 = [];
    this.Oo1 = 0;
    this.qo1 = true;
    this.AutoState = false;
    this.Go1 = 0;
    this.OpData = undefined;
    this.CurrentBgId = 0;
    this.CurrentBgmId = 0;
    this.ehr = () => {
      this.qo1 = !this.qo1;
      this.GetItem(7).SetUIActive(this.qo1);
      this.GetItem(1).SetUIActive(this.qo1);
    };
    this.XT1 = () => {
      var t = this.Kn1();
      if (t && t.StepType === 1) {
        this.AutoState = true;
        if (this.ViewState === 2) {
          this.XTt();
          this.XTt();
        } else if (this.ViewState === 3) {
          this.XTt();
        }
      }
    };
    this.B6e = () => {
      if (this.ViewState !== 0) {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
      }
    };
    this.$An = t => {
      if (t === "Change") {
        this.WNe();
      }
    };
    this.pyu = t => {
      this.$P1(true);
    };
    this.vyu = () => {
      this.yyu(true);
    };
    this.bzt = false;
    this.w8i = t => this.bzt = true;
    this.b8i = t => !(this.bzt = false);
    this.XTt = () => {
      if (!this.bzt) {
        var t = this.Kn1();
        if (t) {
          switch (t.StepType) {
            case 1:
              if (this.ViewState === 2) {
                t.MaskClick?.();
              } else if (this.ViewState === 3) {
                this.GetItem(5).SetUIActive(false);
                this.GetItem(6).SetUIActive(false);
                this.GetButton(8).RootUIComp.SetUIActive(false);
                this.Vo1(t.StepId, 0);
              }
              break;
            case 2:
              break;
            case 4:
              if (this.ViewState === 3) {
                this.GetButton(8).RootUIComp.SetUIActive(false);
                this.Vo1(t.StepId, 0);
              }
          }
        }
      }
    };
    this.Xn1 = (t, i) => {
      switch (i) {
        case 1:
          this.GetItem(5).SetUIActive(false);
          this.GetItem(6).SetUIActive(true);
          break;
        case 2:
        case 4:
          this.GetButton(8).RootUIComp.SetUIActive(false);
      }
      this.ViewState = 3;
    };
    this.Vo1 = (t, i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 步骤执行", ["StepId", t], ["OptionId", i]);
      }
      this.OpData?.ExecuteStep(t, i);
    };
    this.Ho1 = t => {
      this.QCa(this.OpData.CurrentPlotBgId, true);
      this.uB1(this.OpData.CurrentPlotBgmId);
      this.$o1(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIVerticalLayout], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.SpineSkeletonAnimationComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ehr], [8, this.XTt], [9, this.XT1]];
  }
  async OnBeforeStartAsync() {
    this.Go1 = this.OpenParam;
    this.OpData = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.Go1);
    this.OpData.EventStepUpdateFunc = this.Ho1;
    this.GetButton(8).RootUIComp.SetUIActive(false);
    var t = this.GetScrollViewWithScrollbar(2);
    t.OnPointerBeginDragCallBack.Bind(this.w8i);
    t.OnPointerEndDragCallBack.Bind(this.b8i);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    var t = [];
    t.push(this.zDn());
    if (this.OpData.IsInPlot) {
      t.push(this.$o1(this.OpData.CurrentStepId));
    }
    this.gyu = new MapRoguePanelLv_1.MapRoguePanelLv();
    t.push(this.gyu.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()));
    this.Cyu = new MapRogueMoodBar_1.MapRogueMoodBar();
    t.push(this.Cyu.CreateThenShowByResourceIdAsync("UiItem_MoodBar", this.GetItem(12)));
    await Promise.all(t);
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventPlotById(this.OpData.CurrentPlotId);
    if (t) {
      this.lqe.SetTitleLocalText(t.Title);
    }
    this.QCa(this.OpData.CurrentPlotBgId, false);
    this.uB1(this.OpData.CurrentPlotBgmId);
  }
  OnBeforeShow() {
    this.$P1(false);
    this.yyu(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResTeamLvChange, this.pyu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMoodChange, this.vyu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResTeamLvChange, this.pyu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMoodChange, this.vyu);
  }
  OnBeforeDestroy() {
    if (this.OpData) {
      this.OpData.EventStepUpdateFunc = undefined;
      this.OpData = undefined;
    }
    this.ko1.length = 0;
  }
  async zDn() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.lqe.SetCloseCallBack(this.B6e);
    this.lqe.SetCurrencyItemList([ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId()]);
  }
  QCa(t, i) {
    if (t !== 0 && this.CurrentBgId !== t) {
      this.CurrentBgId = t;
      if (!i || this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
        this.WNe();
      } else {
        this.UiViewSequence.PlaySequence("Switch");
      }
    }
  }
  $P1(t) {
    var i = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (i) {
      this.gyu.SetLv(i.TeamLv, t);
    }
  }
  yyu(t) {
    var i = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (i) {
      this.Cyu.SetLimit(i.MoodMin, i.MoodMax);
      if (t) {
        t = i.Mood - this.uZu;
        this.Cyu.ShowPreviewValue(t, i.Mood);
        this.uZu = i.Mood;
      } else {
        this.uZu = i.Mood;
        this.Cyu.SetCurrentValue(i.Mood);
      }
    }
  }
  WNe() {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgById(this.CurrentBgId);
    if (t) {
      const n = this.GetTexture(0);
      var i;
      var e = this.GetItem(11);
      var s = this.GetSpine(10);
      var h = !StringUtils_1.StringUtils.IsEmpty(t.BgPath) || !StringUtils_1.StringUtils.IsEmpty(t.BgFemalePath);
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      if (h) {
        i = r === 0 ? t.BgFemalePath : t.BgPath;
        this.SetTextureByPath(i, n, undefined, () => {
          n.SetSizeFromTexture();
        });
      } else {
        i = r === 0 ? t.BgSpineAtlasFemalePath : t.BgSpineAtlasPath;
        r = r === 0 ? t.BgSpineSkeletonFemalePath : t.BgSpineSkeletonPath;
        this.SetSpineAssetByPath(i, r, s);
        s.SetAnimation(0, SPINE_DEFAULT_ANIM_NAME, true);
      }
      n.SetUIActive(h);
      e.SetUIActive(!h);
    }
  }
  uB1(t) {
    if (t !== 0 && this.CurrentBgmId !== t && (this.CurrentBgmId = t, t = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgmById(t))) {
      t = t.BgmPath;
      AudioSystem_1.AudioSystem.PostEvent(t);
    }
  }
  set ViewState(t) {
    if (this.Oo1 !== t) {
      this.Oo1 = t;
    }
  }
  get ViewState() {
    return this.Oo1;
  }
  Wo1() {
    return this.GetVerticalLayout(3).RootUIComp;
  }
  Kn1() {
    var t = this.ko1.length;
    if (t > 0) {
      return this.ko1[t - 1];
    }
  }
  fze(t) {
    const i = this.GetScrollViewWithScrollbar(2);
    const e = (0, puerts_1.$ref)(new UE.Vector2D(i.ContentUIItem.RelativeLocation));
    TimerSystem_1.TimerSystem.Delay(() => {
      i.ScrollToBottom(e, t, false);
    }, 100);
  }
  async CreateComponentChoice(t, i) {
    t = new GridEventCompChoice_1.GridEventChoice(t);
    t.CanInteractCallback = this.Xn1;
    t.ExecuteStep = this.Vo1;
    this.ko1.push(t);
    await t.CreateByResourceIdAsync("UiItem_RandomEventChoose", this.Wo1());
    await t.Refresh(i);
  }
  async CreateComponentDesc(t) {
    t = new GridEventCompDesc_1.GridEventCompDesc(t);
    t.CanInteractCallback = this.Xn1;
    this.ko1.push(t);
    await t.CreateByResourceIdAsync("UiItem_RandomEventDesc", this.Wo1());
    t.Refresh(this.AutoState);
  }
  async CreateComponentEnding(t) {
    t = new GridEventCompEnding_1.GridEventCompEnding(t);
    t.CanInteractCallback = this.Xn1;
    this.ko1.push(t);
    await t.CreateByResourceIdAsync("UiItem_RandomEventEnd", this.Wo1());
    t.Refresh();
  }
  async $o1(t) {
    if (t !== 0) {
      var i = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(t);
      if (i) {
        this.ViewState = 1;
        this.GetButton(8).RootUIComp.SetUIActive(true);
        switch (i.Type) {
          case 1:
            await this.CreateComponentDesc(t);
            if (this.AutoState) {
              const e = this.Kn1()?.GetOriginalItem?.();
              if (e) {
                this.fze(e);
              }
              this.Vo1(t, 0);
              return;
            }
            this.GetItem(5).SetUIActive(true);
            this.GetItem(6).SetUIActive(false);
            break;
          case 2:
            this.AutoState = false;
            await this.CreateComponentChoice(t, this.OpData.CurrentOptions);
            break;
          case 3:
            this.AutoState = false;
            this.Vo1(t, 0);
            break;
          case 4:
            this.AutoState = false;
            await this.CreateComponentEnding(t);
            break;
          default:
            this.AutoState = false;
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RogueBattle", 37, "[MapRogue] 步骤类型生成错误", ["StepId", t]);
            }
        }
        const e = this.Kn1()?.GetOriginalItem?.();
        if (e) {
          this.fze(e);
        }
        this.ViewState = 2;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 37, "[MapRogue] 无法查询到对应步骤,结束执行", ["StepId", t]);
      }
    }
  }
}
exports.MapRogueGridEventView = MapRogueGridEventView;
//# sourceMappingURL=MapRogueGridEventView.js.map