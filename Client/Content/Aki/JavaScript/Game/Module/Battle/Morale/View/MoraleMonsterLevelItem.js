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
    this.ieu = undefined;
    this.reu = undefined;
    this.oeu = undefined;
    this.yL1 = 1;
    this.ujc = undefined;
    this.SPe = undefined;
    this.Dfu = (e, t, s, i) => {
      this.seu(this.yL1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UITexture], [2, UE.UITexture]];
  }
  async OnCreateAsync() {
    await this.neu(LEVEL_DIFF_SPRITE_EASY, 0);
    await this.neu(LEVEL_DIFF_SPRITE_NORMAL, 1);
    await this.neu(LEVEL_DIFF_SPRITE_HARD, 2);
  }
  OnStart() {
    super.OnStart();
    this.reu = this.GetTexture(1);
    this.oeu = this.GetTexture(2);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.Dfu);
  }
  OnBeforeDestroy() {
    this.ieu?.clear();
    this.SPe?.Clear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.Dfu);
    super.OnBeforeDestroy();
  }
  SetMoraleLevel(e) {
    this.yL1 = e;
    this.GetArtText(0)?.SetText(e.toString());
    this.seu(e);
  }
  seu(e) {
    e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelDiffType(e);
    if (e !== this.ujc) {
      this.ujc = e;
      var t = this.ieu?.get(e);
      if (t) {
        this.reu?.SetTexture(t);
      }
      this.SPe?.StopCurrentSequence(false, true);
      switch (e) {
        case 0:
          this.oeu?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_EASY));
          this.SPe?.PlaySequencePurely("Start01");
          break;
        case 1:
          this.oeu?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_NORMAL));
          this.SPe?.PlaySequencePurely("Start03");
          break;
        case 2:
          this.oeu?.SetColor(UE.Color.FromHex(LEVEL_DIFF_COLOR_HARD));
          this.SPe?.PlaySequencePurely("Start02");
      }
    }
  }
  async neu(t, s) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, e => {
      if (e) {
        if (this.ieu === undefined) {
          this.ieu = new Map();
        }
        this.ieu.set(s, e);
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