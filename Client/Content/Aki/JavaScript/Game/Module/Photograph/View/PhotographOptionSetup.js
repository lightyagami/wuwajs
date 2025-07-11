"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographOptionSetup = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
class PhotographOptionSetup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RKi = 0;
    this.UKi = undefined;
    this.AKi = 0;
    this.PKi = false;
    this.MU_ = undefined;
    this.xKi = undefined;
    this.SPe = undefined;
    this.UFe = () => {
      this.EUt(!this.PKi);
      this.wKi(this.PKi);
      this.BKi();
      if (this.xKi) {
        this.xKi(this.AKi);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.UFe]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(1).RootUIComp);
    this.MU_ = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.MU_ = undefined;
  }
  OnBeforeShow() {
    this.MU_?.PlayLevelSequenceByName("Start02");
  }
  Initialize(t) {
    this.RKi = t;
    this.Refresh();
    this.SetEnable(true);
  }
  Mqt(t) {
    this.AKi = t;
    this.bKi(this.AKi);
    this.BKi();
  }
  Refresh() {
    var t;
    var e;
    this.UKi = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(this.RKi);
    if (this.UKi.Type === 0) {
      t = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(this.RKi);
      this.Mqt(t);
      t = this.UKi.Name;
      e = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    }
  }
  SetEnable(t) {
    this.RootItem.SetAlpha(t ? 1 : 0.5);
    this.GetButton(1).SetEnable(t);
  }
  BindOnIndexChanged(t) {
    this.xKi = t;
  }
  GetSetupId() {
    return this.RKi;
  }
  GetSetupConfig() {
    return this.UKi;
  }
  bKi(t) {
    var e = this.UKi.Options.length - 1;
    this.EUt(t === e, false);
  }
  wKi(t) {
    var e = this.UKi.Options.length - 1;
    this.AKi = t ? e : 0;
  }
  EUt(t, e = true) {
    t = (this.PKi = t) ? "ClickL" : "ClickR";
    this.SPe?.PlayLevelSequenceByName(t);
    if (!e) {
      this.SPe?.StopSequenceByKey(t, false, true);
    }
  }
  BKi() {
    PhotographController_1.PhotographController.SetPhotographOption(this.UKi.ValueType, this.AKi);
  }
}
exports.PhotographOptionSetup = PhotographOptionSetup;
//# sourceMappingURL=PhotographOptionSetup.js.map