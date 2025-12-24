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
    this.UUd = undefined;
    this.xUd = undefined;
    this.Ubd = undefined;
    this.Bbd = undefined;
    this.BUd = undefined;
    this.Obd = undefined;
    this.kUd = undefined;
    this.Gbd = undefined;
    this.Fbd = undefined;
    this.Nbd = undefined;
    this.CKd = undefined;
    this.jbd = undefined;
    this.NNd = 0;
    this.OUd = undefined;
    this.mNe = 0;
    this.ztm = 0;
    this.Jtm = 0;
    this._fe = false;
    this.tHd = false;
    this.uqm = 0;
    this.cqm = false;
    this.Qbd = () => {
      SurvivorsRogueController_1.SurvivorsRogueController.OpenLeaveInstanceView();
    };
    this.xNi = () => {
      UiManager_1.UiManager.OpenView("MenuView");
    };
  }
  get Wbd() {
    if (this.NNd === 0) {
      return DEFAULT_COMBO_DURATION_TIME;
    } else {
      return this.NNd;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIArtText], [5, UE.UITexture], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Qbd], [8, this.xNi]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.UUd = new SurvivorsRogueCollectionItem_1.SurvivorsRogueCollectionItem();
    await this.UUd.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.Ubd = new SurvivorsRogueCollectionItem_1.SurvivorsRogueCollectionItem();
    await this.Ubd.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    this.Bbd = this.GetItem(9);
    this.Obd = this.GetItem(10);
    this.Gbd = this.GetArtText(4);
    this.Fbd = this.GetSprite(3);
    this.Nbd = this.GetTexture(5);
    this.CKd = this.GetText(6);
    this.jbd = this.GetSprite(7);
    this.xUd = new LevelSequencePlayer_1.LevelSequencePlayer(this.UUd.GetRootItem());
    this.xUd.BindSequenceCloseEvent(() => {
      this.xUd.PlayOrReplaySequenceByName("Close");
    });
    this.BUd = new LevelSequencePlayer_1.LevelSequencePlayer(this.Bbd);
    this.BUd.BindSequenceCloseEvent(i => {
      if (i === "Close") {
        this.Bbd.SetUIActive(false);
      }
    });
    this.kUd = new LevelSequencePlayer_1.LevelSequencePlayer(this.Obd);
    this.kUd.BindSequenceCloseEvent(i => {
      if (i === "Close") {
        this.Obd.SetUIActive(false);
      }
    });
    this.OUd = [() => {
      this.BUd.StopPlayingSequence();
      this.BUd.PlayOrReplaySequenceByName("KillNor");
    }, () => {
      this.BUd.StopPlayingSequence();
      this.BUd.PlayOrReplaySequenceByName("KillMore");
    }, () => {
      this.BUd.StopPlayingSequence();
      this.BUd.PlayOrReplaySequenceByName("KillMost");
    }, () => {
      this.BUd.StopPlayingSequence();
      this.BUd.PlayOrReplaySequenceByName("KillMost");
    }];
    if (this.OUd.length !== SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH && Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 79, "幸存者连杀等级配置数量不匹配", ["合法数量", SurvivorsRogueModel_1.COMBO_LEVEL_CONFIG_LENGTH], ["实际数量", this.OUd.length]);
    }
    this.Bbd.SetUIActive(false);
    this.Obd.SetUIActive(false);
    this.UUd.SetUiActive(true);
    this.Ubd.SetUiActive(false);
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData;
    this.RefreshCurrencyNum(i.GetCurrencyCount(), false);
    this.RefreshChestNum(i.GetChestCount(), false);
    this.tHd = true;
  }
  OnBeforeHide() {
    this.tHd = false;
  }
  OnTick(i) {
    if (this.tHd && this._fe) {
      if (this.ztm > 0) {
        this.ztm -= i;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SurvivorsRogue", 79, "连杀时间冻结中", ["剩余冻结时间", this.ztm]);
        }
      } else {
        this.mNe -= i;
        if (this.mNe <= 0) {
          this._fe = false;
          this.Kbd(0);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SurvivorsRogue", 79, "连杀时间进度更新", ["RemainTime", this.mNe], ["ComboDurationTime", this.Wbd], ["Percent", this.mNe / this.Wbd]);
          }
          this.Kbd(this.mNe / this.Wbd);
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
      this.ztm = 0;
      this.mNe = 0;
      this.Kbd(0);
      this.SetComboAreaActive(false, this.uqm > 0);
      this._fe = false;
      this.uqm = 0;
    } else {
      this.Gbd.SetText(i.toString());
      this.Kbd(1);
      this.SetComboAreaActive(true, this.uqm === 0);
      this._fe = true;
      this.uqm = i;
    }
    this.Ztm(i);
  }
  Ztm(e) {
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
            this.eim(i, o[i], t.ComboDurationAdditionCfg[i], h[i]);
            return;
          }
        }
        this.eim(r, o[r], t.ComboDurationAdditionCfg[r], h[r]);
      }
    }
  }
  eim(i, e, t, s) {
    this.OUd[i]();
    this.NNd = (e + t) * TimeUtil_1.TimeUtil.InverseMillisecond;
    if (this.Jtm !== i) {
      this.Jtm = i;
      this.ztm += s * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    this.mNe = this.NNd;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "幸存者连杀时间刷新", ["基础时间", e], ["额外时间", t], ["冻结时间", s], ["剩余时间", this.mNe], ["最大时间", this.Wbd], ["连杀进度条百分比", this.mNe / this.Wbd]);
    }
  }
  RefreshCurrencyNum(i, e = true) {
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetGoldGainEfficiency() > 0;
    this.UUd.Refresh(i, t, e);
  }
  RefreshChestNum(i, e = true) {
    this.Ubd.Refresh(i, false, e);
  }
  SetChestActive(i) {
    this.Ubd.SetUiActive(i);
    this.BUd.StopPlayingSequence();
    this.BUd.PlayOrReplaySequenceByName("Start");
  }
  SetComboAreaActive(i, e = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "SetComboAreaActive", ["Active", i], ["PlaySequence", e]);
    }
    this.BUd.StopPlayingSequence();
    if (i) {
      this.Bbd.SetUIActive(true);
      if (e) {
        this.BUd.PlayOrReplaySequenceByName("Start");
      }
    } else if (e) {
      this.BUd.StopPlayingSequence();
      this.BUd.PlayOrReplaySequenceByName("Close");
    } else {
      this.Bbd.SetUIActive(false);
    }
  }
  SetPositiveAreaActive(i, e = true) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "SetPositiveAreaActive", ["Active", i], ["PlaySequence", e]);
    }
    this.kUd.StopPlayingSequence();
    if (i) {
      this.Obd.SetUIActive(true);
      this.Nbd.SetUIActive(true);
      this.jbd.SetUIActive(true);
      this.kUd.PlayOrReplaySequenceByName("Start");
    } else if (e) {
      this.kUd.PlayOrReplaySequenceByName("Close");
    } else {
      this.Obd.SetUIActive(false);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueComboBuffShow, i);
  }
  RefreshPositiveArea(i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SurvivorsRogue", 79, "RefreshPositiveArea", ["Value", i]);
    }
    var e = i > 0;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.CKd, "SurvivorsCombat_IncomeBuff", Math.ceil(i / 100));
    this.SetPositiveAreaActive(e, this.cqm !== e);
    this.cqm = e;
  }
  Kbd(i) {
    if (this.Fbd.bIsUIActive) {
      this.Fbd.SetFillAmount(i);
    }
  }
}
exports.SurvivorsRogueFightInfoPanel = SurvivorsRogueFightInfoPanel;
//# sourceMappingURL=SurvivorsRogueFightInfoPanel.js.map