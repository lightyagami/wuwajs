"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RewardGridCardItem = exports.PhantomArenaCardsRewardView = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CommonGridCardItem_1 = require("../CardItem/Item/CommonGridCardItem");
class PhantomArenaCardsRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Sru = void 0, this.eiu = void 0, this.Y5i = () => new RewardGridCardItem, this.k41 = () => {
      this.CloseMe(this.eiu)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout]
    ], this.BtnBindInfo = [
      [1, this.k41]
    ]
  }
  OnStart() {
    var e = this.OpenParam,
      e = (this.eiu = e.CallbackOnClose, e.CardIdList),
      e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataListByIdList(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1089"), this.GetItem(3).SetUIActive(!1), this.GetHorizontalLayout(4).RootUIComp.SetUIActive(!0), this.Sru = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Y5i), this.Sru.RefreshByData(e)
  }
}
exports.PhantomArenaCardsRewardView = PhantomArenaCardsRewardView;
class RewardGridCardItem extends CommonGridCardItem_1.CommonGridCardItem {
  constructor() {
    super(...arguments), this.Data = void 0, this.Bpt = () => !1
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetRootItem()]
    ]
  }
  Refresh(e) {
    e = {
      CardId: (this.Data = e).CardId,
      Attack: e.Attack,
      Life: e.Life,
      Element: e.Element,
      CardFaceTexturePath: e.CardFaceTexturePath,
      ShowCardFaceTexture: 0 === e.CardFaceType,
      Cost: e.Cost,
      CanToggleExecuteChange: this.Bpt,
      OutlookUnlocked: e.OutlookUnlocked
    };
    this.GetComponent(0)?.Refresh(e)
  }
  GetKey(e, t) {
    return e.CardId
  }
}
exports.RewardGridCardItem = RewardGridCardItem;
//# sourceMappingURL=PhantomArenaCardsRewardView.js.map