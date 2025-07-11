"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewItemTipsView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class NewItemTipsView extends UiTickViewBase_1.UiTickViewBase {
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
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Item", 8, "新物品提示错误, 没有物品id!");
      }
      this.CloseMe();
    } else {
      var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      if (i === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Item", 8, "新物品提示错误, 没有物品配置!", ["itemId", e]);
        }
        this.CloseMe();
      } else {
        var t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.QualityId);
        const s = UE.Color.FromHex(t.TextColor);
        this.GetText(1).SetColor(s);
        this.rgi = t?.Id === 5;
        var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.rgi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other");
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.NiagaraSystem, e => {
          var i;
          if (e && UiManager_1.UiManager.IsViewOpen("NewItemTipsView") && this.RootItem) {
            (i = this.GetUiNiagara(5)).SetNiagaraSystem(e);
            if (!this.rgi) {
              i.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(s);
            }
          }
        });
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.ObtainedShowDescription);
        this.SetItemIcon(this.GetTexture(2), e);
        this.SetTextureByPath(t.AcquireNewItemQualityTexPath, this.GetTexture(4));
        this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
        this.SPe.BindSequenceCloseEvent(e => {
          if (e === "Golden" || e === "Start01") {
            this.CloseMe();
          }
        });
        var r = ConfigManager_1.ConfigManager.ItemConfig.GetMainTypeConfig(i.MainTypeId);
        if (r?.IconFirstAchieve) {
          this.SetTextureByPath(r.IconFirstAchieve, this.GetTexture(0));
        }
      }
    }
  }
  OnAfterShow() {
    this.SPe?.PlayLevelSequenceByName(this.rgi ? "Golden" : "Start01");
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.NewItemTipsView = NewItemTipsView;
//# sourceMappingURL=NewItemTipsView.js.map