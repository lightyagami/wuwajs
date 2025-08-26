"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossClawItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class LineCrossClawItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UISprite], [5, UE.UISprite]];
  }
  Refresh(s, e) {
    let i = "";
    let r = "";
    switch (e) {
      case 0:
        this.fed();
        i = "T_CrosslineCraw1";
        r = "T_CrosslineCraw";
        break;
      case 1:
        this.ged();
        i = "T_CrosslineCraw1";
        r = "T_CrosslineCraw";
        break;
      case 2:
        this.Rxt();
        i = "T_CrosslineCrawLine";
        r = "T_CrosslineCraw";
        break;
      default:
        this.fed();
        i = "T_CrosslineCraw1";
        r = "T_CrosslineCraw";
    }
    if (s) {
      i = "T_CrosslineCrawLineMystery";
      r = "T_CrosslineCrawLineMystery";
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
    this.SetTextureByPath(e, this.GetTexture(2));
    this.SetTextureByPath(s, this.GetTexture(3));
  }
  fed() {
    this.GetTexture(0).SetColor(UE.Color.FromHex("764372"));
    this.GetTexture(1).SetColor(UE.Color.FromHex("444dba"));
    this.GetTexture(2).SetColor(UE.Color.FromHex("c594ff"));
    this.GetTexture(3).SetColor(UE.Color.FromHex("c594ff"));
    this.GetSprite(4).SetColor(UE.Color.FromHex("582e8c"));
    this.GetSprite(5).SetColor(UE.Color.FromHex("582e8c"));
    this.GetSprite(4).SetUIActive(true);
    this.GetSprite(5).SetUIActive(true);
  }
  ged() {
    this.GetTexture(0).SetColor(UE.Color.FromHex("764372"));
    this.GetTexture(1).SetColor(UE.Color.FromHex("6dac75"));
    this.GetTexture(2).SetColor(UE.Color.FromHex("b2ffbf"));
    this.GetTexture(3).SetColor(UE.Color.FromHex("b2ffbf"));
    this.GetSprite(4).SetColor(UE.Color.FromHex("45945b"));
    this.GetSprite(5).SetColor(UE.Color.FromHex("45945b"));
    this.GetSprite(4).SetUIActive(true);
    this.GetSprite(5).SetUIActive(true);
  }
  Rxt() {
    this.GetTexture(0).SetColor(UE.Color.FromHex("4e4e4e"));
    this.GetTexture(1).SetColor(UE.Color.FromHex("5d6161"));
    this.GetTexture(2).SetColor(UE.Color.FromHex("c65959"));
    this.GetTexture(3).SetColor(UE.Color.FromHex("c65959"));
    this.GetSprite(4).SetUIActive(false);
    this.GetSprite(5).SetUIActive(false);
  }
}
exports.LineCrossClawItem = LineCrossClawItem;
//# sourceMappingURL=LineCrossClawItem.js.map