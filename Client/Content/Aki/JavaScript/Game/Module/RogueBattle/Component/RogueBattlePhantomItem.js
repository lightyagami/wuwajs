"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattlePhantomItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattlePhantomAffix_1 = require("./RogueBattlePhantomAffix");
class RogueBattlePhantomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SelectCallBack = undefined;
    this.Data = undefined;
    this.AffixLayout = undefined;
    this.eTt = () => {
      if (this.SelectCallBack) {
        if (this.GetExtendToggle(5).GetToggleState() === 1) {
          this.SelectCallBack(this.GridIndex);
        } else {
          this.SelectCallBack(undefined);
        }
      }
    };
    this.d5c = () => new RogueBattlePhantomAffix_1.RogueBattlePhantomAffix();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[5, this.eTt]];
  }
  async OnBeforeStartAsync() {
    this.AffixLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.d5c);
    await Promise.resolve();
  }
  Refresh(e, t, i) {
    var s;
    if (e.uIc) {
      this.Data = e;
      if (s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResPokemon(e.uIc.v9n)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.PokemonName);
        this.SetTextureByPath(s.PokemonIcon, this.GetTexture(0));
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s.PokemonSkillDesc);
        this.GetText(2).SetUIActive(ModelManager_1.ModelManager.RogueBattleModel.DescMode === 1);
        if (s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResQualityConfig(s.Quality)) {
          this.SetTextureByPath(s.PhantomBgA, this.GetTexture(6));
          this.SetTextureByPath(s.PhantomBgB, this.GetTexture(7));
        }
        s = new UiAsyncTask_1.UiAsyncTask("RogueBattlePhantomItem.Refresh", async () => {
          await this.AffixLayout.RefreshByDataAsync(e.uIc.e5c);
        });
        this.RunAsyncTask(s);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "不是声骸类型的数据", ["Type", e.hIc]);
    }
  }
  OnSelected(e) {
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.Data;
  }
  OnDeselected(e) {
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = undefined;
  }
}
exports.RogueBattlePhantomItem = RogueBattlePhantomItem;
//# sourceMappingURL=RogueBattlePhantomItem.js.map