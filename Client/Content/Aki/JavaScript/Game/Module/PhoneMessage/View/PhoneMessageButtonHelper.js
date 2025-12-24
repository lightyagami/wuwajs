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
    this.lYf = h;
    this._Yf = s;
    this.uYf = n;
    this.zYf = o;
    this.Bzf = a;
    this.cYf = r;
    this.SPe = undefined;
    this.UXf = 1;
    this.xXf = 1;
    this.BXf = undefined;
    this.kXf = undefined;
    this.JTt = i => {
      if (i === "Phone_Circle_In") {
        if (!this.dKf()) {
          this.HideHeadIcon();
          return;
        }
        this.PopShowHeadIcon();
      }
      if (i === "Phone_Icon_Out") {
        if (!this.dKf()) {
          this.HideHeadIcon();
          return;
        }
        this.PopShowHeadIcon();
      }
      if (i === "Phone_Icon_In") {
        if (this.dKf()) {
          this.P6f("Phone_Icon_Out");
        } else {
          this.u_f();
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
    this.UXf = this.rGi.GetAlpha();
    this.BXf = this.rGi.GetRelativeTransform().GetScale3D();
    this.xXf = this.lYf.GetAlpha();
    this.kXf = this.lYf.GetRelativeTransform().GetScale3D();
  }
  OnShowBattleChildView() {
    if (this.SPe?.GetCurrentSequence() !== "Phone_Icon_Out") {
      if (ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead === 0) {
        if (this.dKf()) {
          this.PopShowHeadIcon();
        } else {
          this.SPe?.StopCurrentSequence();
          this._Yf.SetUIActive(false);
          this.lYf.SetUIActive(true);
          this.u_f();
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
    if (this.SPe?.GetCurrentSequence() === undefined && this.dKf()) {
      this.P6f("Phone_Icon_Out");
    }
  }
  PopShowHeadIcon() {
    var i;
    var t;
    if (this.dKf()) {
      t = (i = ModelManager_1.ModelManager.PhoneMsgModel).CurrentToBeNotifiedMsgInSmallHeadQueue.shift();
      i.CurrentShowingMsgIdInSmallHead = t;
      this.kzf(t);
    }
  }
  kzf(i) {
    i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(i);
    i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(i.WhichChat).IconSmall;
    this._Yf.SetUIActive(true);
    this.zYf.SetUIActive(true);
    this.cYf(i, this.uYf);
    this.P6f("Phone_Circle_In");
  }
  HideHeadIcon() {
    this.P6f("Phone_Icon_In");
    this.zYf.SetUIActive(false);
    ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead = 0;
  }
  u_f() {
    this.lYf.SetUIActive(true);
    this._Yf.SetUIActive(false);
    this.Bzf.SetUIActive(false);
    this.rGi.SetAlpha(this.UXf);
    if (this.BXf) {
      this.rGi.SetUIItemScale(this.BXf);
    }
    this.lYf.SetAlpha(this.xXf);
    if (this.kXf) {
      this.lYf.SetUIItemScale(this.kXf);
    }
  }
  P6f(i) {
    if (this.SPe?.CheckSeqActorIsUnStopped(i)) {
      this.SPe?.ReplaySequenceByKey(i);
    } else {
      this.SPe?.PlaySequencePurely(i, false, undefined, undefined, undefined);
    }
  }
  dKf() {
    return ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgInSmallHeadQueue.length > 0;
  }
}
exports.PhoneMessageButtonHelper = PhoneMessageButtonHelper;
//# sourceMappingURL=PhoneMessageButtonHelper.js.map