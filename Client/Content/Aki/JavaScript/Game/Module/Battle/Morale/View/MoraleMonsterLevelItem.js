"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleMonsterLevelItem = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LEVEL_DIFF_SPRITE_EASY = "/Game/Aki/UI/UIResources/UiFight/Image/Flag/T_EmenyMoraleLevelGray.T_EmenyMoraleLevelGray",
  LEVEL_DIFF_SPRITE_NORMAL = "/Game/Aki/UI/UIResources/UiFight/Image/Flag/T_EmenyMoraleLevelYellow.T_EmenyMoraleLevelYellow",
  LEVEL_DIFF_SPRITE_HARD = "/Game/Aki/UI/UIResources/UiFight/Image/Flag/T_EmenyMoraleLevelRed.T_EmenyMoraleLevelRed",
  LEVEL_DIFF_COLOR_EASY = "#000000cc",
  LEVEL_DIFF_COLOR_NORMAL = "#ff9517cc",
  LEVEL_DIFF_COLOR_HARD = "#ff1e18cc";
class MoraleMonsterLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.aZ1 = void 0, this.hZ1 = void 0, this.lZ1 = void 0, this.KR1 = 1, this.CCu = void 0, this.SPe = void 0, this.Nhu = (e, t, s, i) => {
      this.uZ1(this.KR1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UITexture],
      [2, UE.UITexture]
    ]
  }
  async OnCreateAsync() {
    await this._Z1(LEVEL_DIFF_SPRITE_EASY, 0), await this._Z1(LEVEL_DIFF_SPRITE_NORMAL, 1), await this._Z1(LEVEL_DIFF_SPRITE_HARD, 2)
  }
  OnStart() {
    super.OnStart(), this.hZ1 = this.GetTexture(1), this.lZ1 = this.GetTexture(2), this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.Nhu)
  }
  OnBeforeDestroy() {
    this.aZ1?.clear(), this.SPe?.Clear(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.Nhu), super.OnBeforeDestroy()
  }
  SetMoraleLevel(e) {
    this.KR1 = e, this.GetArtText(0)?.SetText(e.toString()), this.uZ1(e)
  }
  uZ1(e) {
    e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelDiffType(e);
    if (e !== this.CCu) {
      this.CCu = e;
      var t = this.aZ1?.get(e);
      switch (t && this.hZ1?.SetTexture(t), this.SPe?.StopCurrentSequence(!1, !0), e) {
        case 0:
          this.lZ1?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_EASY)), this.SPe?.PlaySequencePurely("Start01");
          break;
        case 1:
          this.lZ1?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_NORMAL)), this.SPe?.PlaySequencePurely("Start03");
          break;
        case 2:
          this.lZ1?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_HARD)), this.SPe?.PlaySequencePurely("Start02")
      }
    }
  }
  async _Z1(t, s) {
    const i = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, e => {
      e ? (void 0 === this.aZ1 && (this.aZ1 = new Map), this.aZ1.set(s, e)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "怪物士气等级差图标加载失败", ["path", t]), i.SetResult()
    }, 100), i.Promise
  }
}
exports.MoraleMonsterLevelItem = MoraleMonsterLevelItem;
//# sourceMappingURL=MoraleMonsterLevelItem.js.map