"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoFilterToggleItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhotoFilterToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PKi = true;
    this.y1_ = undefined;
    this.S1_ = undefined;
    this.SPe = undefined;
    this.UFe = () => {
      this.PKi = !this.PKi;
      ModelManager_1.ModelManager.PhotographModel.SetFilterToggleState(this.PKi);
      this.BKi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.UFe]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(1).RootUIComp);
  }
  OnBeforeShow() {
    this.PKi = ModelManager_1.ModelManager.PhotographModel.GetFilterToggleState();
    this.BKi(false);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
  }
  Initialize() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "CameraFlitercontroller");
  }
  BindSetSubOptionVisible(e) {
    this.y1_ = e;
  }
  BindDeselectOnFilterItem(e) {
    this.S1_ = e;
  }
  EUt(e, i = true) {
    e = e ? "ClickL" : "ClickR";
    this.SPe?.PlayLevelSequenceByName(e);
    if (!i) {
      this.SPe?.StopSequenceByKey(e, false, true);
    }
  }
  BKi(e = true) {
    this.EUt(this.PKi, false);
    if (this.y1_) {
      this.y1_(this.PKi, e);
    }
    if (!this.PKi) {
      if (this.S1_) {
        this.S1_();
      }
    }
  }
}
exports.PhotoFilterToggleItem = PhotoFilterToggleItem;
//# sourceMappingURL=PhotoFilterToggleItem.js.map