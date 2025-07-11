"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteGridExplore = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteController_1 = require("../RouletteController");
const RouletteGridBase_1 = require("./RouletteGridBase");
const RouletteGridForbiddenSettings_1 = require("./RouletteGridForbiddenSettings");
class RouletteGridExplore extends RouletteGridBase_1.RouletteGridBase {
  async Init() {
    var e;
    var t;
    this.IsIconTexture = false;
    this.Data.ShowNum = false;
    if (this.IsDataValid()) {
      if (e = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(this.Data.Id)) {
        this.Data.Name = e.Name;
        if ((t = e.Cost) && t.size > 0) {
          this.Data.ShowNum = true;
          [t] = t.keys();
          t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
          this.Data.DataNum = t;
        }
        await this.LoadSpriteIcon(e.Icon);
      } else {
        this.Data.Name = "Fishing_SkillUnlock";
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_RouletteGridLock");
        await this.LoadSpriteIcon(t);
      }
    }
  }
  OnSelect(e) {
    if (e && this.IsDataValid()) {
      if (this.Data.State === 0) {
        RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsForbiddenState(this.Data.GridType, this.Data.Id);
      } else if (this.Data.State === 5) {
        RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsLockState(this.Data.GridType, this.Data.Id);
      } else {
        e = this.Data.Id;
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e, e => {
          if (e) {
            AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_roulette_new_equip");
          }
        });
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.Data.Id);
      }
    }
  }
}
exports.RouletteGridExplore = RouletteGridExplore;
//# sourceMappingURL=RouletteGridExplore.js.map