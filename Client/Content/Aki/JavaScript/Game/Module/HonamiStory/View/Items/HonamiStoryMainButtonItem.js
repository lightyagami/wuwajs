"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMainButtonItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class HonamiStoryMainButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.awi = 0;
    this.rMt = undefined;
    this.M$m = undefined;
    this.lDm = undefined;
    this.aJd = undefined;
    this.SpecialParamName = undefined;
    this.SpecialSequenceName = undefined;
    this.SPe = undefined;
    this.eje = () => {
      if (this.rMt) {
        this.rMt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetConfigData(e) {
    if (e.FunctionId) {
      this.awi = e.FunctionId;
    }
    if (e.SetTextCallback) {
      this.lDm = e.SetTextCallback;
    }
    if (e.ShowRedDot) {
      this.aJd = e.ShowRedDot;
    }
    if (e.SpecialParamName) {
      this.SpecialParamName = e.SpecialParamName;
    }
    if (e.SpecialSequenceName) {
      this.SpecialSequenceName = e.SpecialSequenceName;
    }
  }
  SetClickCallback(e) {
    this.rMt = e;
  }
  CheckIsSpecialSet() {
    return (this.aJd && this.aJd() && this.SpecialSequenceName !== undefined) ?? false;
  }
  SetButtonState() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(this.awi);
    var t = !this.M$m || this.M$m();
    if (e && t) {
      this.SetUiActive(true);
      if (!(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMainButtonUnlockSet) ?? new Set()).has(this.awi)) {
        this.SPe.PlaySequencePurely("Start");
        e.add(this.awi);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMainButtonUnlockSet, e);
      }
    } else {
      this.SetUiActive(false);
    }
  }
  SetText() {
    if (this.lDm) {
      this.lDm(this.GetText(1));
    } else {
      this.GetText(1).SetText("");
    }
  }
  SetRedDot() {
    if (this.aJd) {
      this.GetItem(2).SetUIActive(this.aJd());
    } else {
      this.GetItem(2).SetUIActive(false);
    }
  }
  Clear() {
    this.rMt = undefined;
    this.lDm = undefined;
    this.aJd = undefined;
    this.SpecialParamName = undefined;
    this.SpecialSequenceName = undefined;
  }
}
exports.HonamiStoryMainButtonItem = HonamiStoryMainButtonItem;
//# sourceMappingURL=HonamiStoryMainButtonItem.js.map