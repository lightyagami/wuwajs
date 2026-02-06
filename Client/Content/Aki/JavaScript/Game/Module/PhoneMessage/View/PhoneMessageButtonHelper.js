"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMessageButtonHelper = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PhoneMessageButtonHelper {
  constructor(i, t, e, h, s, n, o, a, r) {
    this.xTt = i;
    this.Lrc = t;
    this.rGi = e;
    this.$ug = h;
    this.Wug = s;
    this.Qug = n;
    this.wfg = o;
    this.wgg = a;
    this.Kug = r;
    this.SPe = undefined;
    this.W_g = 1;
    this.Q_g = 1;
    this.K_g = undefined;
    this.X_g = undefined;
    this.JTt = i => {
      if (i === "Phone_Circle_In") {
        if (!this.Hhg()) {
          this.HideHeadIcon();
          return;
        }
        this.PopShowHeadIcon();
      }
      if (i === "Phone_Icon_Out") {
        if (!this.Hhg()) {
          this.HideHeadIcon();
          return;
        }
        this.PopShowHeadIcon();
      }
      if (i === "Phone_Icon_In") {
        if (this.Hhg()) {
          this.Qzf("Phone_Icon_Out");
        } else {
          this.Ecf();
        }
      }
    };
    this.Wpu = (i, t) => {
      if (t === "Phone_Circle_Switch") {
        this.PopShowHeadIcon();
      }
    };
  }
  Init() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.xTt);
    this.SPe.BindSequenceCloseEvent(this.JTt);
    this.Lrc.OnSequencePlayEvent.Bind(this.Wpu);
    this.W_g = this.rGi.GetAlpha();
    this.K_g = this.rGi.GetRelativeTransform().GetScale3D();
    this.Q_g = this.$ug.GetAlpha();
    this.X_g = this.$ug.GetRelativeTransform().GetScale3D();
  }
  OnShowBattleChildView() {
    if (this.SPe?.GetCurrentSequence() !== "Phone_Icon_Out") {
      if (ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead === 0) {
        if (this.Hhg()) {
          this.PopShowHeadIcon();
        } else {
          this.SPe?.StopCurrentSequence();
          this.Wug.SetUIActive(false);
          this.$ug.SetUIActive(true);
          this.Ecf();
        }
      } else {
        this.SPe?.ResumeSequence();
      }
    }
  }
  OnHideBattleChildView() {
    this.SPe?.PauseSequence();
  }
  Clear() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  CheckAndPlayPhoneSequence() {
    if (this.SPe?.GetCurrentSequence() === undefined && this.Hhg()) {
      this.Qzf("Phone_Icon_Out");
    }
  }
  PopShowHeadIcon() {
    var i;
    var t;
    if (this.Hhg()) {
      t = (i = ModelManager_1.ModelManager.PhoneMsgModel).CurrentToBeNotifiedMsgInSmallHeadQueue.shift();
      i.CurrentShowingMsgIdInSmallHead = t;
      this.Pgg(t);
    }
  }
  Pgg(i) {
    i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(i);
    i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(i.WhichChat).IconSmall;
    this.Wug.SetUIActive(true);
    this.wfg.SetUIActive(true);
    this.Kug(i, this.Qug);
    this.Qzf("Phone_Circle_In");
  }
  HideHeadIcon() {
    this.Qzf("Phone_Icon_In");
    this.wfg.SetUIActive(false);
    ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead = 0;
  }
  Ecf() {
    this.$ug.SetUIActive(true);
    this.Wug.SetUIActive(false);
    this.wgg.SetUIActive(false);
    this.rGi.SetAlpha(this.W_g);
    if (this.K_g) {
      this.rGi.SetUIItemScale(this.K_g);
    }
    this.$ug.SetAlpha(this.Q_g);
    if (this.X_g) {
      this.$ug.SetUIItemScale(this.X_g);
    }
  }
  Qzf(i) {
    if (this.SPe?.CheckSeqActorIsUnStopped(i)) {
      this.SPe?.ReplaySequenceByKey(i);
    } else {
      this.SPe?.PlaySequencePurely(i, false, undefined, undefined, undefined);
    }
  }
  Hhg() {
    return ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgInSmallHeadQueue.length > 0;
  }
}
exports.PhoneMessageButtonHelper = PhoneMessageButtonHelper;
//# sourceMappingURL=PhoneMessageButtonHelper.js.map