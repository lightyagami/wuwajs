"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeFloaterShooterView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const DeadEyeAimItem_1 = require("./DeadEyeAimItem");
const DeadEyeFloaterShooterTargetItem_1 = require("./DeadEyeFloaterShooterTargetItem");
const END_AUDIO_NAME = "play_sfx_motorcycle_dead_eye_slow_motion_end";
class DeadEyeFloaterShooterView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.UZd = undefined;
    this.Kti = [];
    this.QYm = 0;
    this.wIf = 0;
    this.qYf = undefined;
    this.m_g = 0;
    this.KYm = () => {
      if (!(this.QYm >= this.Kti.length)) {
        this.XYm().then(this.KYm);
      }
    };
    this.RIf = () => {
      if (ModelManager_1.ModelManager.DeadEyeModeModel.CurrentEnergy === 0 || this.wIf !== 0) {
        if (ModelManager_1.ModelManager.DeadEyeModeModel.CurDeadEyeModeStage !== 3) {
          this.OYf().then(() => {
            this.CloseMe();
          });
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.RIf]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetButton(2);
    this.qYf = new LevelSequencePlayer_1.LevelSequencePlayer(e.RootUIComp);
    var e = ModelManager_1.ModelManager.DeadEyeModeModel;
    var t = e.GetFocusEntities();
    var e = e.GetTargetLocations();
    await this.$Zd();
    await this.WZd(t, e);
  }
  OnAfterShow() {
    this.UZd?.ShowAsync();
  }
  OnTick(e) {
    this.wIf = 0;
    this.m_g += e;
    for (const i of this.Kti) {
      i.OnTick(e);
      if (i.IsLocked) {
        this.wIf++;
      }
    }
    var t = this.wIf === this.Kti.length;
    this.GetButton(2)?.RootUIComp.SetUIActive(t);
    if (this.m_g * TimeUtil_1.TimeUtil.Millisecond * ModelManager_1.ModelManager.DeadEyeModeModel.TimeConsumption >= ModelManager_1.ModelManager.DeadEyeModeModel.MaxEnergy) {
      this.RIf();
    }
  }
  async $Zd() {
    this.UZd = new DeadEyeAimItem_1.DeadEyeAimItem();
    await this.UZd.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  async WZd(e, t) {
    this.Kti.length = 0;
    var i;
    var s = this.GetItem(1);
    var r = [];
    for (const o of e) {
      if (o.Valid && o.Entity?.IsInit && (i = o.Entity.GetComponent(1))) {
        i = new DeadEyeFloaterShooterTargetItem_1.DeadEyeFloaterShooterTargetItem(i.ActorLocation, this.UZd.GetAimRange(), o);
        r.push(i.CreateByResourceIdAsync("UiItem_PointNew", s));
        this.Kti.push(i);
      }
    }
    for (const h of t) {
      var a = new DeadEyeFloaterShooterTargetItem_1.DeadEyeFloaterShooterTargetItem(h.ToUeVector(), this.UZd.GetAimRange());
      r.push(a.CreateThenShowByResourceIdAsync("UiItem_PointNew", s));
      this.Kti.push(a);
    }
    await Promise.all(r);
  }
  async XYm() {
    this.Kti[this.QYm].ShowAsync();
    await TimerSystem_1.GameplayTimerSystem.Wait(200);
    this.QYm++;
  }
  OnAfterDestroy() {
    AudioSystem_1.AudioSystem.PostEvent(END_AUDIO_NAME);
    ModelManager_1.ModelManager.DeadEyeModeModel.EnterNextStage();
  }
  async OYf() {
    var e = [];
    for (const t of this.Kti) {
      if (!t.IsLocked) {
        e.push(t.PlayClickSequence());
      }
    }
    e.push(this.UZd?.HideAsync());
    this.qYf?.PlayLevelSequenceByName("Close");
    ModelManager_1.ModelManager.DeadEyeModeModel.EnterNextStage();
    await Promise.all(e);
  }
}
exports.DeadEyeFloaterShooterView = DeadEyeFloaterShooterView;
//# sourceMappingURL=DeadEyeFloaterShooterView.js.map