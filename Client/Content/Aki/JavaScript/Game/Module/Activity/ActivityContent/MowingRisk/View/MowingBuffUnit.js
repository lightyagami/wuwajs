"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingBuffUnit = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GRAY_ALPHA = 0.85;
class MowingBuffUnit extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._9a = undefined;
    this.ujr = undefined;
    this.p9a = () => {
      ModelManager_1.ModelManager.MowingRiskModel.CurrentChosenProgressIndex = this._9a.Index;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingSuperBuffGridItemClick);
    };
    this.$$a = () => !this._9a.IsChosen;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIExtendToggle], [7, UE.UIItem]];
    this.BtnBindInfo = [[6, this.p9a]];
  }
  OnStart() {
    this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.GetExtendToggle(6).CanExecuteChange.Bind(this.$$a);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(6).CanExecuteChange.Unbind();
  }
  RefreshByCustomData(e) {
    this._9a = e;
    var t = this.GetTexture(3);
    t?.SetUIActive(e.IconPath !== undefined);
    if (e.IconPath) {
      this.SetTextureByPath(e.IconPath, t);
    }
    this.UpdateUnlockState(e.IsActive);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NameTextId);
    this.GetText(5).SetText(e.ThresholdCount.toString());
    this.GetExtendToggle(6).SetToggleStateForce(e.IsChosen ? 1 : 0);
    this.GetItem(7).SetUIActive(false);
  }
  UpdateUnlockState(e) {
    this.GetSprite(0).SetUIActive(e);
    this.GetItem(1).SetUIActive(e);
    this.GetItem(2).SetUIActive(!e);
    var t = this.GetTexture(3);
    t?.SetIsGray(!e);
    t?.SetAlpha(e ? 1 : GRAY_ALPHA);
  }
  PlayUnlockSequence() {
    this.GetItem(7).SetUIActive(true);
    this.UpdateUnlockState(true);
    this.ujr.LitePlayAsync("Unlock", true);
  }
}
exports.MowingBuffUnit = MowingBuffUnit;
//# sourceMappingURL=MowingBuffUnit.js.map