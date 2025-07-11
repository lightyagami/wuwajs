"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteGridEquipItem = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteController_1 = require("../RouletteController");
const RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridEquipItem extends RouletteGridBase_1.RouletteGridBase {
  async Init() {
    var e;
    var t;
    var o;
    this.Data.ShowNum = false;
    if (this.IsDataValid()) {
      o = this.Data.Id;
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o);
      t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(o);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "[FuncMenuWheel]轮盘道具格子对应ItemId不存在", ["ItemId", o]);
        }
      }
      if (!t || !!t.NeedShowNum) {
        this.Data.ShowNum = true;
        t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o);
        this.Data.DataNum = t;
      }
      this.Data.Name = e.Name;
      this.IsIconTexture = true;
      await this.LoadIconByItemId(this.Data.Id);
    } else {
      this.Data.Name = "ExploreTools_10001_Name";
      this.IsIconTexture = false;
      o = CommonParamById_1.configCommonParamById.GetStringConfig("Roulette_EmptyItem_Sprite");
      await this.LoadSpriteIcon(o);
    }
  }
  OnSelect(e) {
    if (e && this.Data.State === 1) {
      if (this.Data.Id === 0) {
        RouletteController_1.RouletteController.OpenEmptyTips();
      } else if (this.IsDataValid()) {
        e = this.Data.Id;
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
        RouletteController_1.RouletteController.EquipItemSetRequest(e, e => {
          if (e) {
            AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_roulette_new_equip");
          }
        });
      }
    }
  }
}
exports.RouletteGridEquipItem = RouletteGridEquipItem;
//# sourceMappingURL=RouletteGridEquipItem.js.map