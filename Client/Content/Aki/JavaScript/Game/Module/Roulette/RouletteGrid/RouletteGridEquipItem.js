"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteGridEquipItem = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridEquipItem extends RouletteGridBase_1.RouletteGridBase {
  async Init() {
    var e;
    var o;
    var t;
    this.Data.ShowNum = false;
    if (this.IsDataValid()) {
      t = this.Data.Id;
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
      o = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "[FuncMenuWheel]轮盘道具格子对应ItemId不存在", ["ItemId", t]);
        }
      }
      if (!o || !!o.NeedShowNum) {
        this.Data.ShowNum = true;
        o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
        this.Data.DataNum = o;
      }
      this.Data.Name = e.Name;
      this.IsIconTexture = true;
      await this.LoadIconByItemId(this.Data.Id);
    } else {
      this.Data.Name = "ExploreTools_10001_Name";
      this.IsIconTexture = false;
      t = CommonParamById_1.configCommonParamById.GetStringConfig("Roulette_EmptyItem_Sprite");
      await this.LoadSpriteIcon(t);
    }
  }
  OnSelect(e) {
    if (e && this.Data.State === 1) {
      if (this.Data.Id === 0) {
        ControllerHolder_1.ControllerHolder.RouletteController.OpenEmptyTips();
      } else if (this.IsDataValid()) {
        e = this.Data.Id;
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
        ControllerHolder_1.ControllerHolder.RouletteController.EquipItemSetRequest(e, e => {
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