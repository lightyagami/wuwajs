"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaInfoFlagItem = void 0;
const UE = require("ue"),
  Macro_1 = require("../../../../Core/Preprocessor/Macro"),
  GlobalData_1 = require("../../../GlobalData"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class MoraleAreaInfoFlagItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.FlagData = void 0, this.ClickCallback = void 0, this.Sequence = void 0, this.rV_ = () => {
      this.ClickCallback?.(this.FlagData)
    }
  }
  async Init(e, t, s) {
    this.FlagData = s, await this.CreateThenShowByPathAsync(e, t), this.RootItem?.SetPivot(new UE.Vector2D(.5, 0)), this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.rV_]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync()
  }
  OnStart() {
    this.GetText(2)?.ShowTextNew(this.FlagData.Config.Index)
  }
  UpdateData() {
    this.UpdateSelectState();
    var e = this.FlagData.HasBoxCanGet(),
      e = (this.GetItem(5)?.SetUIActive(e), this.FlagData.IsActive),
      t = this.FlagData.TypeConfig.IconPathNormal,
      s = this.FlagData.TypeConfig.IconPathActive,
      i = this.GetTexture(1),
      i = (this.SetTextureByPath((e ? s : t)[0], i), this.GetSprite(4));
    this.SetSpriteByPath((e ? s : t)[1], i, !1)
  }
  UpdatePosition(e) {
    e = e.GetUIWorldPosition();
    this.RootItem?.SetUIWorldLocation(e)
  }
  UpdateSelectState() {
    var e = this.FlagData.IsSelect ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleStateForce(e)
  }
  PlayStartSequence() {
    this.Sequence?.PlaySequencePurely("Start"), this.FlagData.IsSelect && this.Sequence?.PlaySequencePurely("Select")
  }
}
exports.MoraleAreaInfoFlagItem = MoraleAreaInfoFlagItem;
//# sourceMappingURL=MoraleAreaInfoFlagItem.js.map