"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeModeView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const DeadEyeAimItem_1 = require("./DeadEyeAimItem");
const DeadEyeProgressItem_1 = require("./DeadEyeProgressItem");
const DeadEyeTargetItem_1 = require("./DeadEyeTargetItem");
class DeadEyeModeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.UZd = undefined;
    this.Acm = undefined;
    this.Kti = [];
    this.TKm = 0;
    this.GSf = 0;
    this.R8f = undefined;
    this.m2n = undefined;
    this.AYf = () => {
      this.GSf = 0;
      for (const t of this.Kti) {
        if (t.IsLocked) {
          this.GSf++;
        }
      }
      var e = this.GSf === this.Kti.length;
      this.GetButton(5)?.SetEnable(this.GSf > 0);
      if (e && ModelManager_1.ModelManager.DeadEyeModeModel.CurDeadEyeModeStage === 2) {
        this.GetItem(4)?.SetUIActive(true);
        this.m2n?.PlayLevelSequenceByName("Start");
      }
    };
    this.bKm = () => {
      if (!(this.TKm >= this.Kti.length)) {
        this.RKm().then(this.bKm);
      }
    };
    this.FSf = () => {
      if (ModelManager_1.ModelManager.DeadEyeModeModel.CurrentEnergy === 0 || this.GSf !== 0) {
        if (ModelManager_1.ModelManager.DeadEyeModeModel.CurDeadEyeModeStage !== 3) {
          this.L8f().then(() => {
            this.CloseMe();
          });
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.FSf]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4);
    this.m2n = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    e?.SetUIActive(false);
    var e = this.GetButton(5);
    this.R8f = new LevelSequencePlayer_1.LevelSequencePlayer(e.RootUIComp);
    var e = ModelManager_1.ModelManager.DeadEyeModeModel;
    var t = e.GetFocusEntities();
    var e = e.GetTargetLocations();
    await this.$Zd();
    await this.yfl();
    await this.WZd(t, e);
    this.GSf = 0;
    this.GetButton(5)?.SetEnable(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DeadEyeModeTargetPointLocked, this.AYf);
  }
  OnAfterShow() {
    this.wKm();
    this.Acm?.Show();
    this.UZd?.ShowAsync();
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DeadEyeModeTargetPointLocked, this.AYf);
    ModelManager_1.ModelManager.DeadEyeModeModel.EnterNextStage();
  }
  OnTick(e) {
    for (const t of this.Kti) {
      t.OnTick(e);
    }
    this.Acm?.OnTick(e);
    if (ModelManager_1.ModelManager.DeadEyeModeModel.CurrentEnergy === 0) {
      this.FSf();
    }
  }
  async $Zd() {
    this.UZd = new DeadEyeAimItem_1.DeadEyeAimItem();
    await this.UZd.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  async yfl() {
    this.Acm = new DeadEyeProgressItem_1.DeadEyeProgressItem();
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.IsLinkTimeNodeActivated();
    var t = this.GetItem(2);
    var i = this.GetItem(3);
    t.SetUIActive(!e);
    i.SetUIActive(e);
    var e = e ? i : t;
    await this.Acm.CreateByActorAsync(e.GetOwner());
  }
  async WZd(e, t) {
    this.Kti.length = 0;
    var i;
    var s = this.GetItem(1);
    var a = [];
    for (const o of e) {
      if (o.Valid && o.Entity?.IsInit && (i = o.Entity.GetComponent(1))) {
        i = new DeadEyeTargetItem_1.DeadEyeTargetItem(i.ActorLocation, this.UZd.GetAimRange(), o);
        a.push(i.CreateByResourceIdAsync("UiItem_LaHaiLuoTiaoTaiPointNew", s));
        this.Kti.push(i);
      }
    }
    for (const h of t) {
      var r = new DeadEyeTargetItem_1.DeadEyeTargetItem(h.ToUeVector(), this.UZd.GetAimRange());
      a.push(r.CreateThenShowByResourceIdAsync("UiItem_LaHaiLuoTiaoTaiPointNew", s));
      this.Kti.push(r);
    }
    await Promise.all(a);
  }
  wKm() {
    this.Kti.sort((e, t) => e.GetScreenPositionWithoutClamp().X - t.GetScreenPositionWithoutClamp().X);
    this.TKm = 0;
    if (this.Kti.length) {
      this.bKm();
    }
  }
  async RKm() {
    this.Kti[this.TKm].ShowAsync();
    await TimerSystem_1.GameplayTimerSystem.Wait(200);
    this.TKm++;
  }
  async L8f() {
    var e = [];
    for (const i of this.Kti) {
      if (i.IsLocked) {
        e.push(i.PlayClickSequence());
      } else {
        e.push(i.HideAsync());
      }
    }
    e.push(this.UZd?.HideAsync());
    e.push(this.Acm?.HideAsync());
    this.R8f?.PlayLevelSequenceByName("Close");
    var t = new CustomPromise_1.CustomPromise();
    this.m2n?.PlaySequenceAsync("Close", t);
    e.push(t);
    ModelManager_1.ModelManager.DeadEyeModeModel.EnterNextStage();
    await Promise.all(e);
  }
}
exports.DeadEyeModeView = DeadEyeModeView;
//# sourceMappingURL=DeadEyeModeView.js.map