"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoguePopUpWaveTipsPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SurvivorsRogueController_1 = require("../../../SurvivorsRogue/SurvivorsRogueController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueWavePointItem_1 = require("../ChildItem/SurvivorsRogueWavePointItem");
const WAVE_POINT_COUNT = 12;
const WAVE_POINT_START_INDEX = 6;
const WAVE_POINT_MOVE_SPEED = 0.25;
class SurvivorsRoguePopUpWaveTipsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xbd = undefined;
    this.$pt = undefined;
    this.Ybd = new Array(WAVE_POINT_COUNT);
    this._fe = false;
    this.Zbd = 0;
    this.eRd = 0;
    this.tHd = false;
    this.$An = e => {
      if (e === "TipsShow") {
        if (ModelManager_1.ModelManager.SurvivorsRogueModel.IsEndlessWave) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueShowEndlessWaveTips);
        }
        if (ModelManager_1.ModelManager.SurvivorsRogueModel.IsBonusWave) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueShowBonusWaveTips);
        }
      } else if (e === "MoveLeft") {
        this._fe = true;
        this.Zbd = this.eRd;
      }
    };
    this.FQe = e => {
      if (e === "SurvivorsRogueExitView") {
        this.$pt.PauseSequence();
      }
    };
    this.$Ge = e => {
      if (e === "SurvivorsRogueExitView") {
        this.$pt.ResumeSequence();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = new SurvivorsRogueWavePointItem_1.SurvivorsRogueWavePointItem();
    await (this.Ybd[0] = t).CreateByActorAsync(this.GetItem(1).GetOwner());
    this.eRd = t.GetRootItem().GetWidth();
    var i = this.GetItem(0);
    var s = [];
    for (let e = 1; e < WAVE_POINT_COUNT; e++) {
      var r = new SurvivorsRogueWavePointItem_1.SurvivorsRogueWavePointItem();
      this.Ybd[e] = r;
      s.push(r.CreateByActorAsync(LguiUtil_1.LguiUtil.CopyItem(t.GetRootItem(), i).GetOwner()));
    }
    await Promise.all(s);
  }
  OnStart() {
    super.OnStart();
    this.Xbd = this.GetText(2);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.$pt.BindSequenceCloseEvent(e => {
      if (e === "Start") {
        this.$pt.PlayOrReplaySequenceByName("Close");
      } else if (e === "Close") {
        this.Ybd[WAVE_POINT_START_INDEX].PlayResetSequence();
        SurvivorsRogueController_1.SurvivorsRogueController.RequestEnterStep("Prepare");
      }
    });
  }
  OnBeforeShow() {
    this.OnAddEventListener();
    this.tHd = true;
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
    this.tHd = false;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  ShowWaveTips() {
    this.Show();
    this.InitWavePointItem();
    this.Xbd.SetText(ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum.toString());
    this.$pt.PlayOrReplaySequenceByName("Start");
  }
  InitWavePointItem() {
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum - 1;
    var i = Math.max(0, WAVE_POINT_START_INDEX - t);
    let s = 0;
    for (let e = 0; e < WAVE_POINT_COUNT; e++) {
      var r;
      var n = this.Ybd[e];
      if (e < i) {
        n.Hide();
      } else {
        if ((r = t + s - (WAVE_POINT_START_INDEX - i)) >= ModelManager_1.ModelManager.SurvivorsRogueModel.MaxWaveNum) {
          n.Hide();
        } else {
          n.SetState(ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTypeArray[r]);
        }
        n.GetRootItem().SetAnchorOffsetX(this.eRd * (i - WAVE_POINT_START_INDEX + s + 1));
        s++;
      }
    }
  }
  OnTick(e) {
    if (this.tHd && this._fe) {
      let t = WAVE_POINT_MOVE_SPEED * e;
      if (this.Zbd - t < 0) {
        t = this.Zbd;
      }
      this.Zbd -= t;
      if (this.Zbd <= 0) {
        this._fe = false;
        this.Ybd[WAVE_POINT_START_INDEX].PlayBubbleSequence();
      }
      for (let e = 0; e < WAVE_POINT_COUNT; e++) {
        var i = this.Ybd[e];
        i.GetRootItem().SetAnchorOffsetX(i.GetRootItem().GetAnchorOffsetX() - t);
      }
    }
  }
}
exports.SurvivorsRoguePopUpWaveTipsPanel = SurvivorsRoguePopUpWaveTipsPanel;
//# sourceMappingURL=SurvivorsRoguePopUpWaveTipsPanel.js.map