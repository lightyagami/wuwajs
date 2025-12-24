"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryMapLevelView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../../HonamiStory/HonamiStoryUtil");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const BattleHonamiStoryMapLevelHoverItem_1 = require("./BattleHonamiStoryMapLevelHoverItem");
const BAR_MAX_FILL = 0.186;
const BAR_MIN_YAW = 10;
const BAR_MAX_YAW = 76;
class BattleHonamiStoryMapLevelView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.cie = Rotator_1.Rotator.Create();
    this.G2e = 0;
    this.tnm = undefined;
    this.Oml = undefined;
    this.qbi = 0;
    this.f_a = undefined;
    this.wHm = () => {
      this.rnm(true);
    };
    this.inm = () => {
      this.rnm();
      this.f_a?.Refresh();
    };
    this.RQe = (e, t) => {
      if (e === 10114 && t) {
        this.SetVisible(1, true);
        this.avm();
      }
    };
    this.kqe = e => {
      this.f_a?.SetActive(e);
    };
    this.rqm = () => {
      var e = this.GetExtendToggle(9);
      if (e) {
        if (e.GetToggleState() === 1) {
          e.SetToggleState(0, true);
        } else {
          e.SetToggleState(1, true);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIExtendToggle]];
    this.BtnBindInfo = [[9, this.kqe]];
  }
  async OnBeforeStartAsync() {
    this.f_a = new BattleHonamiStoryMapLevelHoverItem_1.BattleHonamiStoryMapLevelHoverItem();
    this.f_a.RegisterOnAutoClose(this.rqm);
    await this.f_a.CreateByResourceIdAsync("UiItem_HoverTipsC", this.GetItem(8));
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.Oml = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.Oml.InitTweenAnim(6, this.GetItem(6));
    this.Oml.InitTweenAnim(7, this.GetItem(7));
    this.wHm();
    this.Ore();
    if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10114)) {
      this.SetVisible(1, false);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    }
  }
  Reset() {
    this.kre();
    this.tnm?.Remove();
    this.tnm = undefined;
    this.Oml?.Clear();
    this.Oml = undefined;
    super.Reset();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryInstInfoUpdate, this.wHm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPollutionUpdate, this.inm);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryInstInfoUpdate, this.wHm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPollutionUpdate, this.inm);
    this.avm();
  }
  avm() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    }
  }
  rnm(e = false) {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel;
    var i = ModelManager_1.ModelManager.HonamiStoryModel.PollutionMaxLevel;
    var i = i > 0 && t === i;
    var s = i ? 2 : this.onm(t);
    if (!!e || s !== this.G2e) {
      this.nnm(s);
      this.G2e = s;
    }
    var e = "#ffffff";
    this.GetSprite(0).SetColor(UE.Color.FromHex(i ? "#a02649" : e));
    this.GetTexture(1).SetColor(UE.Color.FromHex(i ? "#f54667" : e));
    this.GetText(4).SetText(i ? "Max" : t.toString());
    if (this.Oml && t > this.qbi && (this.Oml.PlayTweenAnim(6), i)) {
      this.Oml.PlayTweenAnim(7);
    }
    this.qbi = t;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryTopTower();
    if (i || s) {
      this.tnm?.Remove();
      this.tnm = undefined;
      e = i ? BAR_MAX_YAW : BAR_MIN_YAW;
      t = i ? BAR_MAX_FILL : 0;
      this.cie.Set(0, e, 0);
      this.GetSprite(2).SetFillAmount(t);
      this.GetItem(3).SetUIRelativeRotation(this.cie.ToUeRotator());
    } else {
      this.tnm ||= TimerSystem_1.GameplayTimerSystem.Forever(() => {
        var e = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel;
        var t = ModelManager_1.ModelManager.HonamiStoryModel.PollutionStarTime;
        var t = t > 0 ? TimeUtil_1.TimeUtil.GetServerStopTimeStamp() - t : 0;
        var e = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap?.get(e)?.PersistMilliseconds ?? 1;
        var i = MathUtils_1.MathUtils.RangeClamp(t, 0, e, 0, BAR_MAX_FILL);
        this.cie.Set(0, MathUtils_1.MathUtils.RangeClamp(t, 0, e, BAR_MIN_YAW, BAR_MAX_YAW), 0);
        this.GetSprite(2).SetFillAmount(i);
        this.GetItem(3).SetUIRelativeRotation(this.cie.ToUeRotator());
      }, 500);
    }
  }
  nnm(e) {
    let t = "";
    let i = "";
    i = e === 0 ? (t = "#bbf0b4", "#ffffff") : e === 1 ? (t = "#e9ce83", "#fff6c9") : (t = "#f54667", "#f51818");
    var e = UE.Color.FromHex(t);
    var s = UE.Color.FromHex(i);
    this.GetSprite(2).SetColor(e);
    this.GetText(4).SetColor(e);
    this.GetTexture(5).SetColor(s);
  }
  onm(e) {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.PollutionWarningLevel;
    var i = ModelManager_1.ModelManager.HonamiStoryModel.PollutionDangerLevel;
    if (i > 0 && i <= e) {
      return 2;
    } else if (t > 0 && t <= e) {
      return 1;
    } else {
      return 0;
    }
  }
}
exports.BattleHonamiStoryMapLevelView = BattleHonamiStoryMapLevelView;
//# sourceMappingURL=BattleHonamiStoryMapLevelView.js.map