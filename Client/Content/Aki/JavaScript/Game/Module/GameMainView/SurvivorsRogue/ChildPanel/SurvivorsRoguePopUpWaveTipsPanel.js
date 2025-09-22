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
    this.EId = undefined;
    this.$pt = undefined;
    this.IId = new Array(WAVE_POINT_COUNT);
    this._fe = false;
    this.RId = 0;
    this.wId = 0;
    this.x4d = false;
    this.$An = e => {
      if (e === "TipsShow") {
        if (ModelManager_1.ModelManager.SurvivorsRogueModel.IsBonusWave) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueShowBonusWaveTips);
        }
      } else if (e === "MoveLeft") {
        this._fe = true;
        this.RId = this.wId;
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
    await (this.IId[0] = t).CreateByActorAsync(this.GetItem(1).GetOwner());
    this.wId = t.GetRootItem().GetWidth();
    var i = this.GetItem(0);
    var s = [];
    for (let e = 1; e < WAVE_POINT_COUNT; e++) {
      var r = new SurvivorsRogueWavePointItem_1.SurvivorsRogueWavePointItem();
      this.IId[e] = r;
      s.push(r.CreateByActorAsync(LguiUtil_1.LguiUtil.CopyItem(t.GetRootItem(), i).GetOwner()));
    }
    await Promise.all(s);
  }
  OnStart() {
    super.OnStart();
    this.EId = this.GetText(2);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.$pt.BindSequenceCloseEvent(e => {
      if (e === "Start") {
        this.$pt.PlayOrReplaySequenceByName("Close");
      } else if (e === "Close") {
        this.IId[WAVE_POINT_START_INDEX].PlayResetSequence();
        SurvivorsRogueController_1.SurvivorsRogueController.RequestEnterStep("Prepare");
      }
    });
  }
  OnBeforeShow() {
    this.OnAddEventListener();
    this.x4d = true;
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
    this.x4d = false;
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
    this.EId.SetText(ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum.toString());
    this.$pt.PlayOrReplaySequenceByName("Start");
  }
  InitWavePointItem() {
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum - 1;
    var i = Math.max(0, WAVE_POINT_START_INDEX - t);
    let s = 0;
    for (let e = 0; e < WAVE_POINT_COUNT; e++) {
      var r;
      var n = this.IId[e];
      if (e < i) {
        n.Hide();
      } else {
        if ((r = t + s - (WAVE_POINT_START_INDEX - i)) >= ModelManager_1.ModelManager.SurvivorsRogueModel.MaxWaveNum) {
          n.Hide();
        } else {
          n.SetState(ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTypeArray[r]);
        }
        n.GetRootItem().SetAnchorOffsetX(this.wId * (i - WAVE_POINT_START_INDEX + s + 1));
        s++;
      }
    }
  }
  OnTick(e) {
    if (this.x4d && this._fe) {
      let t = WAVE_POINT_MOVE_SPEED * e;
      if (this.RId - t < 0) {
        t = this.RId;
      }
      this.RId -= t;
      if (this.RId <= 0) {
        this._fe = false;
        this.IId[WAVE_POINT_START_INDEX].PlayBubbleSequence();
      }
      for (let e = 0; e < WAVE_POINT_COUNT; e++) {
        var i = this.IId[e];
        i.GetRootItem().SetAnchorOffsetX(i.GetRootItem().GetAnchorOffsetX() - t);
      }
    }
  }
}
exports.SurvivorsRoguePopUpWaveTipsPanel = SurvivorsRoguePopUpWaveTipsPanel;
//# sourceMappingURL=SurvivorsRoguePopUpWaveTipsPanel.js.map