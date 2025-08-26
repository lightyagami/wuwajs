"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardGridCardItem = exports.PhantomArenaCardsRewardView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CommonGridCardItem_1 = require("../CardItem/Item/CommonGridCardItem");
class PhantomArenaCardsRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kau = undefined;
    this.Vnu = undefined;
    this.Y5i = () => new RewardGridCardItem();
    this.dV1 = () => {
      this.CloseMe(this.Vnu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[1, this.dV1]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.Vnu = e.CallbackOnClose;
    var e = e.CardIdList;
    var e = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataListByIdList(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1089");
    this.GetItem(3).SetUIActive(false);
    this.GetHorizontalLayout(4).RootUIComp.SetUIActive(true);
    this.kau = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Y5i);
    this.kau.RefreshByData(e);
  }
}
exports.PhantomArenaCardsRewardView = PhantomArenaCardsRewardView;
class RewardGridCardItem extends CommonGridCardItem_1.CommonGridCardItem {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Bpt = () => false;
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
  }
  Refresh(e) {
    e = {
      CardId: (this.Data = e).CardId,
      Attack: e.Attack,
      Life: e.Life,
      Element: e.Element,
      CardFaceTexturePath: e.CardFaceTexturePath,
      ShowCardFaceTexture: e.CardFaceType === 0,
      Cost: e.Cost,
      CanToggleExecuteChange: this.Bpt,
      OutlookUnlocked: e.OutlookUnlocked
    };
    this.GetComponent(0)?.Refresh(e);
  }
  GetKey(e, t) {
    return e.CardId;
  }
}
exports.RewardGridCardItem = RewardGridCardItem;
//# sourceMappingURL=PhantomArenaCardsRewardView.js.map