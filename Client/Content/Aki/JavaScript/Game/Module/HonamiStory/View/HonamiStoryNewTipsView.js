"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryNewTipsView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class HonamiStoryNewTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.rgi = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UITexture], [5, UE.UINiagara]];
  }
  OnStart() {
    var e = this.OpenParam;
    var i = e.GetItemId();
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Item", 8, "新物品提示错误, 没有物品id!");
      }
      this.CloseMe();
    } else {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
      if (t === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Item", 8, "新物品提示错误, 没有物品配置!", ["itemId", i]);
        }
        this.CloseMe();
      } else {
        var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityByConfig(t);
        const s = UE.Color.FromHex(r.TextColor);
        this.GetText(1).SetColor(s);
        this.rgi = (r?.Id ?? 0) >= 5;
        var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.rgi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other");
        ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.NiagaraSystem, e => {
          var i;
          if (e && UiManager_1.UiManager.IsViewOpen("NewItemTipsView") && this.RootItem) {
            (i = this.GetUiNiagara(5)).SetNiagaraSystem(e);
            if (!this.rgi) {
              i.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(s);
            }
          }
        }, 100, this.MemoryTag);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name);
        var o = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItem(i);
        if (o && o.ItemType === 1) {
          e = e.GetBuffTempIdList()[0].BuffId;
          e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryBuffTemp(e);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.DescSimple, ...e.DescSimpleArgs);
        } else if (o && o.ItemType === 2) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), o.AttributesDescription);
        }
        this.SetItemIcon(this.GetTexture(2), i);
        this.SetTextureByPath(r.AcquireNewItemQualityTexPath, this.GetTexture(4));
        this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
        this.SPe.BindSequenceCloseEvent(e => {
          if (e === "Golden" || e === "Start01") {
            this.CloseMe();
          }
        });
        var e = ConfigManager_1.ConfigManager.ItemConfig.GetMainTypeConfig(t.MainTypeId);
        if (e?.IconFirstAchieve) {
          this.SetTextureByPath(e.IconFirstAchieve, this.GetTexture(0));
        }
      }
    }
  }
  OnAfterShow() {
    this.SPe?.PlayLevelSequenceByName(this.rgi ? "Golden" : "Start01");
    AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_pick_up_normal");
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.HonamiStoryNewTipsView = HonamiStoryNewTipsView;
//# sourceMappingURL=HonamiStoryNewTipsView.js.map