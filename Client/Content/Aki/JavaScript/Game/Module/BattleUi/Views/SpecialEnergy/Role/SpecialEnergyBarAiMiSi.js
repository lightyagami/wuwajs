"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarAiMiSi = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarKeyItem_1 = require("../SpecialEnergyBarKeyItem");
const SpecialEnergyBarAiMiSiSlot_1 = require("./SpecialEnergyBarAiMiSiSlot");
const SUB_CONFIG_ID = 121001;
const modeTag = 1140274167;
const burstTag = -844145458;
class SpecialEnergyBarAiMiSi extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.sdm = undefined;
    this.pMc = undefined;
    this.bst = undefined;
    this.p2a = 0;
    this.adm = false;
    this.hdm = -1;
    this.C6g = undefined;
    this.Nml = false;
    this.zlc = 0;
    this.uFg = false;
    this.p6g = false;
    this.bIu = false;
    this.x9g = [];
    this.tqt = [];
    this.B9g = false;
    this.k9g = undefined;
    this._dm = (t, i) => {
      this.adm = i;
      this.WOg();
    };
    this.cFg = (t, i) => {
      this.uFg = i;
      this.dFg();
    };
    this.qju = (t, i) => {
      if (this.p6g !== i) {
        this.p6g = i;
        this.v6g();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UITexture], [18, UE.UITexture], [19, UE.UITexture], [20, UE.UITexture], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem]];
  }
  OnInitData() {
    this.sdm = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(SUB_CONFIG_ID);
    this.MaxAttributeId = this.sdm.MaxAttributeId;
    this.AttributeId = this.sdm.AttributeId;
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(this.sdm.KeyEnableTagId, this._dm);
    this.ListenForTagAddOrRemoveChanged(modeTag, this.cFg);
    this.ListenForTagAddOrRemoveChanged(burstTag, this.qju);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    t.push(this.InitKeyItem(this.GetItem(25)));
    await Promise.all(t);
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarAiMiSiSlot_1.SpecialEnergyBarAiMiSiSlot();
    this.pMc.InitData(this.RoleData, this.Config);
    this.pMc.ForceHideBottomLine = true;
    await this.pMc.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  async InitKeyItem(t) {
    if (!Info_1.Info.IsInTouch()) {
      this.KeyItem = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
      this.KeyItem.SetConfig(this.sdm);
      await this.KeyItem.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", t);
    }
  }
  OnStart() {
    for (let t = 4; t <= 16; t++) {
      this.InitTweenAnim(t);
    }
    this.x9g.length = 0;
    for (let t = this.tqt.length = 0; t < 4; t++) {
      this.x9g.push(this.GetTexture(17 + t));
      this.tqt.push(this.GetItem(21 + t));
    }
    this.PlayTweenAnim(4);
    this.C6g = this.GetTexture(3);
    this._Oe(true);
    this.QOg(true);
    this.aqe(true);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
  }
  OnBeforeDestroy() {
    this.q9g();
    super.OnBeforeDestroy();
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(13);
    super.ClearAllTweenAnim();
  }
  QOg(s = false) {
    if (this.C6g) {
      let t = 0;
      let i = false;
      if (this.adm && (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a) || this.tst(), this.bst)) {
        t = this.bst.GetRemainDuration() / this.bst.Duration;
        i = this.bst.GetRemainDuration() < this.sdm.ExtraFloatParams[0];
      }
      this.bMc(i);
      if (t !== this.hdm || !!s) {
        this.hdm = t;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "爱弥斯能量条 底部进度条百分比", ["", t]);
        }
        this.C6g.SetFillAmount(t);
      }
    }
  }
  bMc(t) {
    if (this.Nml !== t) {
      if (this.Nml = t) {
        this.PlayTweenAnim(13);
      } else {
        this.StopTweenAnim(13);
        this.PlayTweenAnim(14);
      }
    }
  }
  _Oe(t = 0) {
    this.adm = this.TagComponent?.HasTag(this.sdm.KeyEnableTagId) ?? false;
    this.uFg = this.TagComponent?.HasTag(modeTag) ?? false;
    this.p6g = this.TagComponent?.HasTag(burstTag) ?? false;
    this.WOg();
    this.dFg();
    this.v6g();
  }
  WOg() {
    this.bst = undefined;
    if (this.adm) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "爱弥斯能量条 进入一段大");
      }
      this.StopTweenAnim(12);
      this.StopTweenAnim(15);
      this.PlayTweenAnim(11);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "爱弥斯能量条 退出一段大");
      }
      this.StopTweenAnim(11);
      if (this.bIu) {
        this.bIu = false;
        this.StopTweenAnim(10);
        this.PlayTweenAnim(15);
      }
      this.PlayTweenAnim(12);
    }
  }
  dFg() {
    if (this.pMc) {
      if (this.uFg) {
        this.pMc.SetBarColor(0);
      } else {
        this.pMc.SetBarColor(1);
      }
    }
  }
  v6g() {
    if (this.p6g) {
      this.bIu = true;
      this.PlayTweenAnim(10);
    }
    this.GetItem(25)?.SetUIActive(this.p6g);
    this.pMc?.SetKeyVisible(!this.p6g);
  }
  aqe(t = false) {
    var i = Math.round(this.PercentMachine.GetTargetPercent() * 4);
    if (this.zlc !== i || t) {
      if (i <= 0) {
        if (t) {
          this.O9g();
        } else {
          if (this.zlc >= 4 && this.bIu) {
            this.PlayTweenAnim(5);
          } else {
            this.PlayTweenAnim(16);
          }
          this.B9g = true;
          this.G9g();
        }
      } else if (i > this.zlc) {
        if (this.B9g) {
          this.B9g = false;
          this.StopTweenAnim(16);
        }
        if (this.zlc <= 0) {
          this.O9g();
        }
        for (let t = this.zlc; t < i; t++) {
          this.PlayTweenAnim(6 + t);
        }
      } else {
        this.O9g();
        for (let t = 0; t < i; t++) {
          this.PlayTweenAnim(6 + t);
        }
      }
      this.zlc = i;
    }
  }
  G9g() {
    this.q9g();
    this.k9g = TimerSystem_1.TimerSystem.Delay(() => {
      this.F9g();
      this.k9g = undefined;
    }, 250);
  }
  q9g() {
    if (this.k9g) {
      if (TimerSystem_1.TimerSystem.Has(this.k9g)) {
        TimerSystem_1.TimerSystem.Remove(this.k9g);
      }
      this.k9g = undefined;
    }
  }
  O9g() {
    this.q9g();
    this.F9g();
  }
  F9g() {
    for (const t of this.tqt) {
      t.SetUIActive(false);
    }
    for (const i of this.x9g) {
      i.SetAlpha(1);
    }
  }
  OnBarPercentChanged() {
    this.aqe();
  }
  Tick(t) {
    super.Tick(t);
    this.pMc?.Tick(t);
    this.QOg();
  }
  tst() {
    if (this.sdm?.BuffId) {
      this.bst ||= this.BuffComponent?.GetBuffById(this.sdm.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
}
exports.SpecialEnergyBarAiMiSi = SpecialEnergyBarAiMiSi;
//# sourceMappingURL=SpecialEnergyBarAiMiSi.js.map