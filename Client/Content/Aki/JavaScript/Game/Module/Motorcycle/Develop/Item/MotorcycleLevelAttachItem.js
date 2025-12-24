"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelAttachItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MotorcycleDevelopDefine_1 = require("../MotorcycleDevelopDefine");
class MotorcycleLevelAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.OnClickAttachItem = undefined;
    this.OnSelectAttachItem = undefined;
    this.CheckToggleCanClick = undefined;
    this.GetSelectAnimEnable = undefined;
    this.Pe = undefined;
    this.Hea = undefined;
    this.Ypt = false;
    this.kqe = () => {
      this.OnClickAttachItem?.(this);
    };
    this.UHl = () => !!this.Pe && (!this.CheckToggleCanClick || this.CheckToggleCanClick(this.Pe));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIArtText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.UHl);
  }
  OnRefreshItem(t) {
    if (t) {
      this.Pe = t;
      this.AOn();
      var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurLevel();
      var s = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurExp();
      var h = i === ConfigManager_1.ConfigManager.MotorConfig.GetAllMotorLevelList().length;
      var o = t.Level === i;
      var i = t.Level < i;
      var i = h || i;
      let e = 0;
      var r = this.GetArtText(1);
      r.SetText(t.Level.toString());
      r.SetColor(i ? UE.Color.FromHex("9E8257") : UE.Color.FromHex("E1DACE"));
      this.GetItem(5).SetUIActive(o);
      this.GetItem(3).SetUIActive(!i);
      this.GetItem(4).SetUIActive(i);
      var r = MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_LEVEL_MIN_PROGRESS;
      var n = MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_LEVEL_MAX_PROGRESS;
      e = o && !h ? r + s / t.Exp * (n - r) : i ? n : r;
      this.GetSprite(2).SetUIActive(o);
      this.GetSprite(2).SetFillAmount(e);
    }
  }
  OnSelect() {
    if (!this.GetSelectAnimEnable || !!this.GetSelectAnimEnable()) {
      this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
      this.Hea?.StopCurrentSequence();
      this.Hea?.PlaySequencePurely("Select");
    }
    this.Ypt = true;
    this.OnSelectAttachItem?.(this);
  }
  PlaySelectTween() {
    this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
    this.Hea?.StopCurrentSequence();
    this.Hea?.PlaySequencePurely("Select");
  }
  OnUnSelect() {
    if (this.Ypt) {
      this.Hea?.StopCurrentSequence();
      this.Hea?.PlaySequencePurely("Unselect");
    }
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
    this.Ypt = false;
  }
  OnMoveItem() {
    if (this.Ypt) {
      this.Hea?.StopCurrentSequence();
      this.Hea?.PlaySequencePurely("Unselect");
    }
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
    this.Ypt = false;
  }
  AOn() {
    if (this.Hea === undefined) {
      this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.Hea?.StopCurrentSequence();
      this.Hea?.PlaySequencePurely("Unselect", true);
    }
  }
}
exports.MotorcycleLevelAttachItem = MotorcycleLevelAttachItem;
//# sourceMappingURL=MotorcycleLevelAttachItem.js.map