"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomReplaceView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
const PhantomSelectItem_1 = require("./PhantomSelectItem");
const PhantomSelectView_1 = require("./PhantomSelectView");
class PhantomReplaceView extends PhantomSelectView_1.PhantomSelectView {
  constructor() {
    super(...arguments);
    this.fho = undefined;
    this.ConfirmBtn = () => {
      var e = this.RoguelikeChooseData.RogueGainEntryList[0];
      if (e) {
        ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e;
        RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(1);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Roguelike", 8, "当前没有选中的声骸");
      }
    };
    this.GiveUpBtn = () => {
      RoguelikeController_1.RoguelikeController.RoguelikeGiveUpGainRequest(this.RoguelikeChooseData.Index);
    };
    this.RefreshBtnEnableClick = () => {};
    this.CreatePhantomSelectItem = () => {
      return new PhantomSelectItem_1.PhantomSelectItem(false);
    };
  }
  OnStart() {
    super.OnStart();
    this.IsShowChooseTips = true;
    this.fho = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.fho.SetFunction(this.GiveUpBtn);
  }
  RefreshTopPanel() {
    this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_1_TEXT);
    var e = this.pho();
    var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(e[0].ConfigId);
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(e[1].ConfigId);
    this.TopPanel.RefreshSelectTipsText(RoguelikeDefine_1.ROGUELIKEVIEW_2_TEXT, true, new LguiUtil_1.TableTextArgNew(t?.PokemonName), new LguiUtil_1.TableTextArgNew(e?.PokemonName), true);
  }
  RefreshPhantomSelectItemList() {
    var e = this.pho();
    this.PhantomSelectItemLayout.RefreshByData(e);
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_14_TEXT);
    this.fho.SetShowText("RoguelikeView_26_Text");
  }
  pho() {
    var e = new Array();
    var t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    if (t) {
      e.push(t);
    }
    if (this.RoguelikeChooseData.RogueGainEntryList.length > 0) {
      e.push(this.RoguelikeChooseData.RogueGainEntryList[0]);
    }
    return e;
  }
}
exports.PhantomReplaceView = PhantomReplaceView;
//# sourceMappingURL=PhantomReplaceView.js.map