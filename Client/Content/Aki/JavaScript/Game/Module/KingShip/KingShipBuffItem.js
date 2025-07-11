"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipBuffItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
class KingShipBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eHr = 0;
    this.JWc = 0;
    this.SPe = undefined;
    this.OnClickTipsCallBack = undefined;
    this.nqe = () => {
      var i;
      if (this.eHr) {
        this.GetItem(2).SetUIActive(true);
        this.OnClickTipsCallBack?.(true);
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlayOrReplaySequenceByName("InfoIn");
        i = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(this.eHr);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.DesText);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.NameText);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(i => {
      if (i === "Close") {
        this.SetUiActive(false);
      }
    });
  }
  RefreshItem() {
    this.JWc--;
    if (this.JWc <= 0) {
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayOrReplaySequenceByName("Close");
    }
  }
  ShowBuffItem(i, e) {
    this.eHr = i;
    this.JWc = e;
    this.SetUiActive(true);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayOrReplaySequenceByName("Start");
    e = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
    this.SetSpriteByPath(e.Icon, this.GetSprite(1), false);
  }
  CloseTipsItem() {
    this.GetItem(2).SetUIActive(false);
    this.OnClickTipsCallBack?.(false);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayOrReplaySequenceByName("InfoOut");
  }
  GetIsShowingRoundsBuff() {
    return this.JWc > 0;
  }
}
exports.KingShipBuffItem = KingShipBuffItem;
//# sourceMappingURL=KingShipBuffItem.js.map