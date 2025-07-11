"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreFriendItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreFriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eZs = undefined;
    this.sMt = () => {
      var e = this.eZs.PlayerId;
      this.GetSprite(5).SetUIActive(true);
      this.GetTexture(6).SetUIActive(true);
      this.SetButtonUiActive(4, false);
      if (!this.eZs.IsMyFriend) {
        this.eZs.OnClickCallback(e);
      }
    };
    this.Jra = e => {
      if (e === this.eZs.PlayerId) {
        this.SetButtonUiActive(4, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UISprite], [6, UE.UITexture]];
    this.BtnBindInfo = [[4, this.sMt]];
  }
  OnAfterShow() {
    super.OnAfterShow();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ApplicationSent, this.Jra);
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ApplicationSent, this.Jra);
  }
  Refresh(e, t, i) {
    var s = (this.eZs = e).IsMyFriend;
    this.GetSprite(5).SetUIActive(s);
    this.GetTexture(6).SetUIActive(s);
    this.SetButtonUiActive(4, !s);
    this.SetTextureByPath(e.PlayerIconPath, this.GetTexture(0));
    this.SetTextureByPath(e.PlayerIndexPath, this.GetTexture(1));
    this.GetText(2).SetText(e.PlayerName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "TowerDefence_Rolename", e.PlayerLevel);
  }
}
exports.RewardExploreFriendItem = RewardExploreFriendItem;
//# sourceMappingURL=RewardExploreFriendItem.js.map