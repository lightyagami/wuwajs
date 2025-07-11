"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowTimeUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 300;
class SlowTimeUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Pst = undefined;
    this.Gca = undefined;
    this.CTu = undefined;
    this.kG = new UE.Vector(1, 1, 1);
    this.$9c = false;
    this.uat = undefined;
    this.j3 = undefined;
    this.Nml = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Pst = this.GetSprite(2);
    this.Gca = this.GetItem(5);
    this.CTu = this.GetItem(1);
    this.SetTranslucence(this.$9c);
    this.InitTweenAnim(6);
  }
  OnBeforeDestroy() {
    this.StopTweenAnim(6);
    super.OnBeforeDestroy();
    this.SPe?.Clear();
    this.SPe = undefined;
    this.Pst = undefined;
    this.CTu = undefined;
    this._Hc();
    this.BCe();
  }
  OnBeforeShow() {
    this.SPe.PlaySequencePurely("Start");
  }
  async OnBeforeHideAsync() {
    this.SPe.StopCurrentSequence();
    this.SPe.PlaySequencePurely("Close");
    this._Hc();
    this.BCe();
    this.uat = new CustomPromise_1.CustomPromise();
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.j3 = undefined;
      this._Hc();
    }, CLOSE_ANIM_TIME);
    await this.uat.Promise;
  }
  _Hc() {
    if (this.uat) {
      this.uat.SetResult();
      this.uat = undefined;
    }
  }
  BCe() {
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
  SetTranslucence(i) {
    this.$9c = i;
    if (this.CTu) {
      if (i) {
        this.bMc(false);
      }
      this.P$c();
      this.Pst?.SetUIActive(i);
    }
  }
  P$c() {
    this.CTu?.SetAlpha(this.$9c ? 0.5 : 1);
  }
  UpdateProgress(i, s) {
    if (this.Pst) {
      this.kG.X = i = s > 0 ? i / s : 0;
      this.Pst.SetUIItemScale(this.kG);
      this.Gca.SetUIItemScale(this.kG);
      this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", i);
      this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", i);
      s = i != 0 && i != 1 && !this.$9c;
      this.Gca.SetUIActive(s);
      this.bMc(i < 0.3 && !this.$9c);
    }
  }
  bMc(i) {
    if (this.Nml !== i) {
      if (this.Nml = i) {
        this.PlayTweenAnim(6);
      } else {
        this.StopTweenAnim(6);
        this.P$c();
      }
    }
  }
}
exports.SlowTimeUnit = SlowTimeUnit;
//# sourceMappingURL=SlowTimeUnit.js.map