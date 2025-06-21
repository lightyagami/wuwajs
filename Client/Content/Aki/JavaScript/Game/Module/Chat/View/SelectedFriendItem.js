"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SelectedFriendItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PlayerTitleItem_1 = require("../../Common/PlayerTitleItem"),
  FriendController_1 = require("../../Friend/FriendController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ChatDefine_1 = require("../ChatDefine");
class SelectedFriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.pSt = void 0, this.gLt = void 0, this.oft = void 0, this.xyt = () => {
      this.oft && this.oft(this.pSt.PlayerId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.xyt]
    ]
  }
  BindOnClicked(e) {
    this.oft = e
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem, await this.gLt?.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())
  }
  OnBeforeDestroy() {
    this.oft = void 0, this.gLt?.Destroy()
  }
  Refresh(e, t, i) {
    this.pSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(e), this.pSt && (this.Zke(), this.P5e(), this.pmt(), this.wyt(), this.Byt(), this.Gac())
  }
  Zke() {
    var e = this.pSt.PlayerHeadPhoto,
      t = this.GetTexture(1),
      e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e, !1);
    e && this.SetTextureShowUntilLoaded(e.GetRoleHeadIconLarge(), t)
  }
  P5e() {
    var e = this.GetText(2),
      t = (this.GetText(3)?.SetUIActive(!1), this.pSt.FriendRemark);
    t ? (e.SetText(this.pSt.FriendRemark), e?.SetColor(ChatDefine_1.playerMarkNameColor)) : (e.SetText(this.pSt.PlayerName), e?.SetColor(ChatDefine_1.playerRealNameColor))
  }
  pmt() {
    var e = this.pSt.PlayerLevel,
      t = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e)
  }
  wyt() {
    var e = this.pSt.PlayerIsOnline,
      t = this.GetText(4),
      i = e ? "00D67E" : "D64600",
      i = UE.Color.FromHex(i);
    t.SetColor(i), e ? LguiUtil_1.LguiUtil.SetLocalText(t, "FriendOnline") : 0 === this.pSt.PlayerLastOfflineTime ? t.SetText("") : (i = this.pSt.GetOfflineDay(), e = FriendController_1.FriendController.GetOfflineTimeString(i), LguiUtil_1.LguiUtil.SetLocalText(t, e, i))
  }
  Byt() {
    this.GetItem(6).SetUIActive(!1)
  }
  Gac() {
    this.gLt?.Refresh(this.pSt.PlayerTitleId, this.pSt.PlayerTitleStarLevel, this.pSt.PlayerSex)
  }
}
exports.SelectedFriendItem = SelectedFriendItem;
//# sourceMappingURL=SelectedFriendItem.js.map