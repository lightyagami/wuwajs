"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaInfoFlagItem = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../GlobalData");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class MoraleAreaInfoFlagItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FlagData = undefined;
    this.ClickCallback = undefined;
    this.Sequence = undefined;
    this.rV_ = () => {
      this.ClickCallback?.(this.FlagData);
    };
  }
  async Init(e, t, s) {
    this.FlagData = s;
    await this.CreateThenShowByPathAsync(e, t);
    this.RootItem?.SetPivot(new UE.Vector2D(0.5, 0));
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rV_]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.GetText(2)?.ShowTextNew(this.FlagData.Config.Index);
  }
  UpdateData() {
    this.UpdateSelectState();
    var e = this.FlagData.HasBoxCanGet();
    this.GetItem(5)?.SetUIActive(e);
    var e = this.FlagData.IsActive;
    var t = this.FlagData.TypeConfig.IconPathNormal;
    var s = this.FlagData.TypeConfig.IconPathActive;
    var i = this.GetTexture(1);
    this.SetTextureByPath((e ? s : t)[0], i);
    var i = this.GetSprite(4);
    this.SetSpriteByPath((e ? s : t)[1], i, false);
  }
  UpdatePosition(e) {
    e = e.GetUIWorldPosition();
    this.RootItem?.SetUIWorldLocation(e);
  }
  UpdateSelectState() {
    var e = this.FlagData.IsSelect ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleStateForce(e);
  }
  PlayStartSequence() {
    this.Sequence?.PlaySequencePurely("Start");
    if (this.FlagData.IsSelect) {
      this.Sequence?.PlaySequencePurely("Select");
    }
  }
}
exports.MoraleAreaInfoFlagItem = MoraleAreaInfoFlagItem;
//# sourceMappingURL=MoraleAreaInfoFlagItem.js.map