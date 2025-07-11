"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayTypeFourNewView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InfoDisplayAudioPlayerWithProgress_1 = require("./InfoDisplayAudioPlayerWithProgress");
const NIAGARA_PARAM_WPO_KEY = "WPO";
const NIAGARA_PARAM_WPO_ACTIVE = 3;
const NIAGARA_PARAM_WPO_INACTIVE = 0;
const NIAGARA_PARAM_DISSOLVE_KEY = "Dissolve";
const NIAGARA_PARAM_DISSOLVE_ACTIVE = 1;
const NIAGARA_PARAM_DISSOLVE_INACTIVE = 0;
const NIAGARA_INTERP_TIME = 100;
class InfoDisplayTypeFourNewView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.sai = undefined;
    this.qrc = undefined;
    this.Grc = false;
    this.Frc = 0;
    this.Nrc = false;
    this.I5t = () => {
      this.Vrc();
    };
    this.wvo = () => {
      this.Vrc();
    };
    this.jrc = () => {
      this.Hrc(true);
    };
    this.FIr = () => {
      this.Hrc(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UINiagara], [6, UE.UINiagara]];
    this.BtnBindInfo = [[3, this.I5t]];
  }
  OnStart() {
    var A = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.sai = new InfoDisplayAudioPlayerWithProgress_1.InfoDisplayAudioPlayerWithProgress();
    this.qrc = this.GetUiNiagara(5);
    this.SHe(A);
    this.$rc(A);
  }
  OnTick(A) {
    this.sai?.Tick(A);
    this.Wrc(A);
  }
  async $rc(A) {
    A = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(A);
    await this.sai.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    await this.sai.InitAudioPlayer(A);
    this.Hrc(true);
    this.sai.SetOnAudioEnd(this.wvo);
    this.sai.SetOnPlay(this.jrc);
    this.sai.SetOnPause(this.FIr);
  }
  SHe(A) {
    var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(A);
    this.GetText(4).SetText(i);
    var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(A);
    this.GetText(0).SetText(i);
  }
  Vrc() {
    this.sai?.Stop();
    this.CloseMe();
  }
  Hrc(A) {
    this.Grc = true;
    this.Frc = 0;
    this.Nrc = !A;
  }
  Qrc(A, i) {
    var _;
    if (A) {
      _ = this.Nrc ? NIAGARA_PARAM_WPO_ACTIVE - i * (NIAGARA_PARAM_WPO_ACTIVE - NIAGARA_PARAM_WPO_INACTIVE) : NIAGARA_PARAM_WPO_INACTIVE + i * (NIAGARA_PARAM_WPO_ACTIVE - NIAGARA_PARAM_WPO_INACTIVE);
      A.SetNiagaraVarFloat(NIAGARA_PARAM_WPO_KEY, _);
      _ = this.Nrc ? NIAGARA_PARAM_DISSOLVE_ACTIVE - i * (NIAGARA_PARAM_DISSOLVE_ACTIVE - NIAGARA_PARAM_DISSOLVE_INACTIVE) : NIAGARA_PARAM_DISSOLVE_INACTIVE + i * (NIAGARA_PARAM_DISSOLVE_ACTIVE - NIAGARA_PARAM_DISSOLVE_INACTIVE);
      A.SetNiagaraVarFloat(NIAGARA_PARAM_DISSOLVE_KEY, _);
    }
  }
  Wrc(i) {
    if (this.Grc) {
      this.Frc += i;
      let A = this.Frc / NIAGARA_INTERP_TIME;
      if (A >= 1) {
        this.Grc = false;
        this.Frc = 0;
        A = 1;
      }
      this.Qrc(this.qrc, A);
    }
  }
}
exports.InfoDisplayTypeFourNewView = InfoDisplayTypeFourNewView;
//# sourceMappingURL=InfoDisplayTypeFourNewView.js.map