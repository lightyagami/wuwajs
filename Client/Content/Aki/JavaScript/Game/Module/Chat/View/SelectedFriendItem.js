"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedFriendItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const FriendController_1 = require("../../Friend/FriendController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatDefine_1 = require("../ChatDefine");
class SelectedFriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.pSt = undefined;
    this.gLt = undefined;
    this.oft = undefined;
    this.xyt = () => {
      if (this.oft) {
        this.oft(this.pSt.PlayerId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.xyt]];
  }
  BindOnClicked(e) {
    this.oft = e;
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt?.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
  }
  OnBeforeDestroy() {
    this.oft = undefined;
    this.gLt?.Destroy();
  }
  Refresh(e, t, i) {
    this.pSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(e);
    if (this.pSt) {
      this.Zke();
      this.P5e();
      this.pmt();
      this.wyt();
      this.Byt();
      this.Gac();
    }
  }
  Zke() {
    var e = this.pSt.PlayerHeadPhoto;
    var t = this.GetTexture(1);
    var e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e, false);
    if (e) {
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconLarge(), t);
    }
  }
  P5e() {
    var e = this.GetText(2);
    this.GetText(3)?.SetUIActive(false);
    var t = this.pSt.FriendRemark;
    if (t) {
      e.SetText(this.pSt.FriendRemark);
      e?.SetColor(ChatDefine_1.playerMarkNameColor);
    } else {
      e.SetText(this.pSt.PlayerName);
      e?.SetColor(ChatDefine_1.playerRealNameColor);
    }
  }
  pmt() {
    var e = this.pSt.PlayerLevel;
    var t = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e);
  }
  wyt() {
    var e = this.pSt.PlayerIsOnline;
    var t = this.GetText(4);
    var i = e ? "00D67E" : "D64600";
    var i = UE.Color.FromHex(i);
    t.SetColor(i);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalText(t, "FriendOnline");
    } else if (this.pSt.PlayerLastOfflineTime === 0) {
      t.SetText("");
    } else {
      i = this.pSt.GetOfflineDay();
      e = FriendController_1.FriendController.GetOfflineTimeString(i);
      LguiUtil_1.LguiUtil.SetLocalText(t, e, i);
    }
  }
  Byt() {
    this.GetItem(6).SetUIActive(false);
  }
  Gac() {
    this.gLt?.Refresh(this.pSt.PlayerTitleId, this.pSt.PlayerTitleStarLevel, this.pSt.PlayerSex);
  }
}
exports.SelectedFriendItem = SelectedFriendItem;
//# sourceMappingURL=SelectedFriendItem.js.map