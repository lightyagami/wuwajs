"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleMonsterLevelItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LEVEL_DIFF_SPRITE_EASY = "/Game/Aki/UI/UIResources/UiFight/Image/Flag/T_EmenyMoraleLevelGray.T_EmenyMoraleLevelGray";
const LEVEL_DIFF_SPRITE_NORMAL = "/Game/Aki/UI/UIResources/UiFight/Image/Flag/T_EmenyMoraleLevelYellow.T_EmenyMoraleLevelYellow";
const LEVEL_DIFF_SPRITE_HARD = "/Game/Aki/UI/UIResources/UiFight/Image/Flag/T_EmenyMoraleLevelRed.T_EmenyMoraleLevelRed";
const LEVEL_DIFF_COLOR_EASY = "#000000cc";
const LEVEL_DIFF_COLOR_NORMAL = "#ff9517cc";
const LEVEL_DIFF_COLOR_HARD = "#ff1e18cc";
class MoraleMonsterLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Leu = undefined;
    this.weu = undefined;
    this.Aeu = undefined;
    this.yL1 = 1;
    this.j8u = undefined;
    this.SPe = undefined;
    this.wgu = (e, t, s, i) => {
      this.xeu(this.yL1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UITexture], [2, UE.UITexture]];
  }
  async OnCreateAsync() {
    await this.Peu(LEVEL_DIFF_SPRITE_EASY, 0);
    await this.Peu(LEVEL_DIFF_SPRITE_NORMAL, 1);
    await this.Peu(LEVEL_DIFF_SPRITE_HARD, 2);
  }
  OnStart() {
    super.OnStart();
    this.weu = this.GetTexture(1);
    this.Aeu = this.GetTexture(2);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.wgu);
  }
  OnBeforeDestroy() {
    this.Leu?.clear();
    this.SPe?.Clear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.wgu);
    super.OnBeforeDestroy();
  }
  SetMoraleLevel(e) {
    this.yL1 = e;
    this.GetArtText(0)?.SetText(e.toString());
    this.xeu(e);
  }
  xeu(e) {
    e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelDiffType(e);
    if (e !== this.j8u) {
      this.j8u = e;
      var t = this.Leu?.get(e);
      if (t) {
        this.weu?.SetTexture(t);
      }
      this.SPe?.StopCurrentSequence(false, true);
      switch (e) {
        case 0:
          this.Aeu?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_EASY));
          this.SPe?.PlaySequencePurely("Start01");
          break;
        case 1:
          this.Aeu?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_NORMAL));
          this.SPe?.PlaySequencePurely("Start03");
          break;
        case 2:
          this.Aeu?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_HARD));
          this.SPe?.PlaySequencePurely("Start02");
      }
    }
  }
  async Peu(t, s) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, e => {
      if (e) {
        if (this.Leu === undefined) {
          this.Leu = new Map();
        }
        this.Leu.set(s, e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "怪物士气等级差图标加载失败", ["path", t]);
      }
      i.SetResult();
    }, 100);
    return i.Promise;
  }
}
exports.MoraleMonsterLevelItem = MoraleMonsterLevelItem;
//# sourceMappingURL=MoraleMonsterLevelItem.js.map