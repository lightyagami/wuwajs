"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgTipViewA = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PhoneMsgTipViewA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Fsf = undefined;
    this.Hea = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    if (e) {
      this.OnRefreshByData(e);
    }
  }
  OnRefreshByData(e) {
    this.Fsf = e;
    var s;
    var e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(this.Fsf.WhichChat);
    if (this.Fsf && e) {
      (s = this.GetText(6)).bGameRichText = true;
      s.richText = true;
      s = e.Icon;
      this.SetTextureByPath(s, this.GetTexture(1));
    }
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
    this.RootActor.OnSequencePlayEvent.Unbind();
  }
  GetMessageDataId() {
    return this.Fsf?.Id;
  }
}
exports.PhoneMsgTipViewA = PhoneMsgTipViewA;
//# sourceMappingURL=PhoneMsgTipViewA.js.map