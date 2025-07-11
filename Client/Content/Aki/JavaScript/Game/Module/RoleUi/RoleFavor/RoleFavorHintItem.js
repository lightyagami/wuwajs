"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorHintItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorHintItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super();
    this.x_o = undefined;
    this.SPe = undefined;
    this.w_o = e => {
      if (e === "Start") {
        this.PlayHalfway();
      } else if (e === "Move") {
        this.PlayEnd();
      } else if (e === "Close") {
        this.OnSequenceFinish();
      }
    };
    this.PlayStart = () => {
      this.SPe.PlayLevelSequenceByName("Start");
    };
    this.PlayHalfway = () => {
      this.SPe.PlayLevelSequenceByName("Move");
    };
    this.PlayEnd = () => {
      this.SPe.PlayLevelSequenceByName("Close");
    };
    this.OnSequenceFinish = () => {
      if (this.x_o) {
        this.x_o();
      }
    };
    this.SetSequenceFinishCallBack = e => {
      this.x_o = e;
    };
    this.B_o = e;
    this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [3, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    var e;
    var i;
    if (this.B_o) {
      e = this.B_o.Exp;
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_IconA80_hgd_UI");
      this.SetTextureByPath(i, this.GetTexture(0));
      i = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalText(i, "FavorExp");
      this.GetText(2).SetText(String(e));
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.SPe.BindSequenceCloseEvent(this.w_o);
      this.PlayStart();
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.x_o = undefined;
    this.B_o = undefined;
  }
}
exports.RoleFavorHintItem = RoleFavorHintItem;
//# sourceMappingURL=RoleFavorHintItem.js.map