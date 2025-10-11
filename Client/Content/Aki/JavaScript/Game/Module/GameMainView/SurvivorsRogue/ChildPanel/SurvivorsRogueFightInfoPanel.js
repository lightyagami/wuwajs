"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueFightInfoPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SurvivorsRogueController_1 = require("../../../SurvivorsRogue/SurvivorsRogueController");
const SurvivorsRogueModel_1 = require("../../../SurvivorsRogue/SurvivorsRogueModel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueCollectionItem_1 = require("../ChildItem/SurvivorsRogueCollectionItem");
const DEFAULT_COMBO_DURATION_TIME = 5000;
class SurvivorsRogueFightInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.JPd = undefined;
    this.ZPd = undefined;
    this.hId = undefined;
    this.lId = undefined;
    this.eAd = undefined;
    this.uId = undefined;
    this.tAd = undefined;
    this.dId = undefined;
    this.mId = undefined;
    this.fId = undefined;
    this.l6d = undefined;
    this.CId = undefined;
    this.mqd = 0;
    this.iAd = undefined;
    this.mNe = 0;
    this.P9d = 0;
    this.A9d = 0;
    this._fe = false;
    this.x4d = false;
    this.mzd = 0;
    this.fzd = false;
    this.SId = () => {
      SurvivorsRogueController_1.SurvivorsRogueController.OpenLeaveInstanceView();
    };
    this.xNi = () => {
      UiManager_1.UiManager.OpenView("MenuView");
    };
  }
  get yId() {
    if (this.mqd === 0) {
      return DEFAULT_COMBO_DURATION_TIME;
    } else {
      return this.mqd;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIArtText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.SId], [8, this.xNi]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.JPd = new SurvivorsRogueCollectionItem_1.SurvivorsRogueCollectionItem();
    await this.JPd.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.hId = new SurvivorsRogueCollectionItem_1.SurvivorsRogueCollectionItem();
    await this.hId.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    this.lId = this.GetItem(9);
    this.uId = this.GetItem(10);
    this.dId = this.GetArtText(4);
    this.mId = this.GetSprite(3);
    this.fId = this.GetTexture(5);
    this.l6d = this.GetText(6);
    this.CId = this.GetSprite(7);
    this.ZPd = new LevelSequencePlayer_1.LevelSequencePlayer(this.JPd.GetRootItem());
    this.ZPd.BindSequenceCloseEvent(() => {
      this.ZPd.PlayOrReplaySequenceByName("Close");
    });
    this.eAd = new LevelSequencePlayer_1.LevelSequencePlayer(this.lId);
    this.eAd.BindSequenceCloseEvent(i => {
      if (i === "Close") {
        this.lId.SetUIActive(false);
      }
    });
    this.tAd = new LevelSequencePlayer_1.LevelSequencePlayer(this.uId);
    this.tAd.BindSequenceCloseEvent(i => {
      if (i === "Close") {
        this.uId.SetUIActive(false);
      }
    });
    this.iAd = [() => {
      this.eAd.StopPlayingSequence();
      this.eAd.PlayOrReplaySequenceByName("KillNor");
    }, () => {
      this.eAd.StopPlayingSequence();
      this.eAd.PlayOrReplaySequenceByName("KillMore");
    }, () => {
      this.eAd.StopPlayingSequence();
      this.eAd.PlayOrReplaySequenceByName("KillMost");
    }, () => {
      this.eAd.StopPlayingSequence();
      this.eAd.PlayOrReplaySequenceByName("KillMost");
    }];
    if (this.iAd.length !== SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH && Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 79, "幸存者连杀等级配置数量不匹配", ["合法数量", SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH], ["实际数量", this.iAd.length]);
    }
    this.lId.SetUIActive(false);
    this.uId.SetUIActive(false);
    this.JPd.SetUiActive(true);
    this.hId.SetUiActive(false);
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData;
    this.RefreshCurrencyNum(i.GetCurrencyCount(), false);
    this.RefreshChestNum(i.GetChestCount(), false);
    this.x4d = true;
  }
  OnBeforeHide() {
    this.x4d = false;
  }
  OnTick(i) {
    if (this.x4d && this._fe) {
      if (this.P9d > 0) {
        this.P9d -= i;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SurvivorsRogue", 79, "连杀时间冻结中", ["剩余冻结时间", this.P9d]);
        }
      } else {
        this.mNe -= i;
        if (this.mNe <= 0) {
          this._fe = false;
          this.MId(0);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SurvivorsRogue", 79, "连杀时间进度更新", ["RemainTime", this.mNe], ["ComboDurationTime", this.yId], ["Percent", this.mNe / this.yId]);
          }
          this.MId(this.mNe / this.yId);
        }
      }
    }
  }
  ResetFightInfo() {
    this.RefreshComboNum(0);
    this.RefreshPositiveArea(0);
  }
  RefreshComboNum(i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "RefreshComboNum", ["ComboNum", i]);
    }
    if (i === 0) {
      this.P9d = 0;
      this.mNe = 0;
      this.MId(0);
      this.SetComboAreaActive(false, this.mzd > 0);
      this._fe = false;
      this.mzd = 0;
    } else {
      this.dId.SetText(i.toString());
      this.MId(1);
      this.SetComboAreaActive(true, this.mzd === 0);
      this._fe = true;
      this.mzd = i;
    }
    this.D9d(i);
  }
  D9d(e) {
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel;
    var i = t.CurComboConfig;
    if (i) {
      var s = i.ComboNum;
      var o = i.ComboDuration;
      if (o.length !== s.length || s.length !== SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SurvivorsRogue", 79, "幸存者连杀等级配置数量不匹配", ["连杀阈值配置数量", s.length], ["连杀时间配置数量", o.length], ["合法数量", SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH]);
        }
      } else {
        var h = t.ComboTimerFreezeTimeCfg;
        var r = SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH - 1;
        for (let i = 0; i < r; i++) {
          if (e >= s[i] && e < s[i + 1]) {
            this.U9d(i, o[i], t.ComboDurationAdditionCfg[i], h[i]);
            return;
          }
        }
        this.U9d(r, o[r], t.ComboDurationAdditionCfg[r], h[r]);
      }
    }
  }
  U9d(i, e, t, s) {
    this.iAd[i]();
    this.mqd = (e + t) * TimeUtil_1.TimeUtil.InverseMillisecond;
    if (this.A9d !== i) {
      this.A9d = i;
      this.P9d += s * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    this.mNe = this.mqd;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "幸存者连杀时间刷新", ["基础时间", e], ["额外时间", t], ["冻结时间", s], ["剩余时间", this.mNe], ["最大时间", this.yId], ["连杀进度条百分比", this.mNe / this.yId]);
    }
  }
  RefreshCurrencyNum(i, e = true) {
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetGoldGainEfficiency() > 0;
    this.JPd.Refresh(i, t, e);
  }
  RefreshChestNum(i, e = true) {
    this.hId.Refresh(i, false, e);
  }
  SetChestActive(i) {
    this.hId.SetUiActive(i);
    this.eAd.StopPlayingSequence();
    this.eAd.PlayOrReplaySequenceByName("Start");
  }
  SetComboAreaActive(i, e = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "SetComboAreaActive", ["Active", i], ["PlaySequence", e]);
    }
    this.eAd.StopPlayingSequence();
    if (i) {
      this.lId.SetUIActive(true);
      if (e) {
        this.eAd.PlayOrReplaySequenceByName("Start");
      }
    } else if (e) {
      this.eAd.StopPlayingSequence();
      this.eAd.PlayOrReplaySequenceByName("Close");
    } else {
      this.lId.SetUIActive(false);
    }
  }
  SetPositiveAreaActive(i, e = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "SetPositiveAreaActive", ["Active", i], ["PlaySequence", e]);
    }
    this.tAd.StopPlayingSequence();
    if (i) {
      this.uId.SetUIActive(true);
      this.fId.SetUIActive(true);
      this.CId.SetUIActive(true);
      this.tAd.PlayOrReplaySequenceByName("Start");
    } else if (e) {
      this.tAd.PlayOrReplaySequenceByName("Close");
    } else {
      this.uId.SetUIActive(false);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueComboBuffShow, i);
  }
  RefreshPositiveArea(i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "RefreshPositiveArea", ["Value", i]);
    }
    var e = i > 0;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.l6d, "SurvivorsCombat_IncomeBuff", Math.ceil(i / 100));
    this.SetPositiveAreaActive(e, this.fzd !== e);
    this.fzd = e;
  }
  MId(i) {
    if (this.mId.bIsUIActive) {
      this.mId.SetFillAmount(i);
    }
  }
}
exports.SurvivorsRogueFightInfoPanel = SurvivorsRogueFightInfoPanel;
//# sourceMappingURL=SurvivorsRogueFightInfoPanel.js.map