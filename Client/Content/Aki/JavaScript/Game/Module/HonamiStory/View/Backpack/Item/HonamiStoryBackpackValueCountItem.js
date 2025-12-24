"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackInsteadItem = exports.HonamiStoryBackpackValueCountItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
class HonamiStoryBackpackValueCountItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Vhm = false;
    this.jhm = () => {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.SetLogicState(0);
    };
    this.EXu = () => {
      var t = this.GetExtendToggle(3).GetToggleState() === 1;
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.DoSellToAll(t, 2);
    };
    this.X_f = () => {
      var t = this.GetExtendToggle(5).GetToggleState() === 1;
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.DoSellToAll(t, 1, 1);
    };
    this.Y_f = () => {
      var t = this.GetExtendToggle(6).GetToggleState() === 1;
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.DoSellToAll(t, 1, 2);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIExtendToggle], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jhm], [3, this.EXu], [5, this.X_f], [6, this.Y_f]];
  }
  OnStart() {
    this.Vhm = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    var t = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(t);
    var t = this.Vhm ? t.InnerItemId : t.OutCoinItemId;
    this.SetItemIcon(this.GetTexture(1), t);
    this.GetItem(7).SetUIActive(!this.Vhm);
    this.GetButton(0).RootUIComp.SetUIActive(!this.Vhm);
    var t = this.Vhm ? "HonamiStory_SellValue_Inner" : "HonamiStory_SellValue_Outer";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t);
  }
  SetVisible(t) {
    this.SetUiActive(t);
    if (!this.Vhm && t) {
      this.GetExtendToggle(3).SetToggleState(0);
      this.GetExtendToggle(5).SetToggleState(0);
      this.GetExtendToggle(6).SetToggleState(0);
    }
  }
  SetValue(t) {
    if (t < 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 77, "Controller value calculate Error");
    }
    this.GetText(2)?.SetText(HonamiStoryUtil_1.HonamiStoryUtil.GetPriceNumFormat(t));
  }
  RefreshInGame() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
    var t = "" + HonamiStoryUtil_1.HonamiStoryUtil.GetPriceNumFormat(t.GetTotalValue());
    this.GetText(2)?.SetText(t);
  }
}
exports.HonamiStoryBackpackValueCountItem = HonamiStoryBackpackValueCountItem;
class HonamiStoryBackpackInsteadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jhm = () => {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.SetLogicState(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.jhm]];
  }
  OnStart() {
    var t = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "HonamiStory_ChooseSlot");
  }
  SetVisible(t) {
    var e;
    this.SetUiActive(t);
    if (t) {
      e = (t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().GetInsteadItem()).GetQualityConfig();
      this.SetSpriteByPath(e.GridBg, this.GetSprite(1), false);
      this.SetTextureByPath(t.GetIconTexture(), this.GetTexture(2));
    }
  }
}
exports.HonamiStoryBackpackInsteadItem = HonamiStoryBackpackInsteadItem;
//# sourceMappingURL=HonamiStoryBackpackValueCountItem.js.map