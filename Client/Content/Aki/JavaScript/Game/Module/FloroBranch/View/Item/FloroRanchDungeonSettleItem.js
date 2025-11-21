"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonSettleItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const FloroRanchDungeonSettleRewardItem_1 = require("./FloroRanchDungeonSettleRewardItem");
class FloroRanchDungeonSettleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.vKu = undefined;
    this.Ucu = e => {
      if (e === "TagShow" && (this.vKu.q1u && new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4)).PlayLevelSequenceByName("Start"), this.vKu.G1u && new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(6)).PlayLevelSequenceByName("Start"), this.vKu.k1u)) {
        new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(9)).PlayLevelSequenceByName("Start");
      }
    };
    this.rOe = () => new FloroRanchDungeonSettleRewardItem_1.FloroRanchDungeonSettleRewardItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIHorizontalLayout]];
  }
  OnBeforeShow() {
    this.OnAddEventListener();
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.rOe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  async RefreshAsync(e) {
    this.vKu = e;
    this.GetItem(4).SetAlpha(0);
    this.GetItem(6).SetAlpha(0);
    this.GetItem(9).SetAlpha(0);
    this.GetText(3).SetText(e.O1u.toString());
    var t = Number(MathUtils_1.MathUtils.LongToBigInt(e.kru));
    this.GetText(5).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(t));
    var t = Number(MathUtils_1.MathUtils.LongToBigInt(e.F1u));
    this.GetText(7).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(t));
    this.GetText(8).SetText(e.B1u.toString());
    t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchCardData(e.N1u);
    await this.SetSpineAssetByPath(t.GetSpineAtlas(), t.GetSpineData(), this.GetSpine(0));
    this.GetSpine(0).SetAnimation(0, "idle", true);
    this.GetText(1).ShowTextNew(t.GetName());
    t = Number(MathUtils_1.MathUtils.LongToBigInt(e.V1u));
    this.GetText(2).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(t));
    this.GetItem(10).SetUIActive(e.DS_.length > 0);
    await this.H3e.RefreshByDataAsync(e.DS_);
    this.GetItem(4).SetUIActive(e.q1u);
    this.GetItem(6).SetUIActive(e.G1u);
    this.GetItem(9).SetUIActive(e.k1u);
    t = e.Jdd;
    if (t && t !== "") {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t);
    }
  }
}
exports.FloroRanchDungeonSettleItem = FloroRanchDungeonSettleItem;
//# sourceMappingURL=FloroRanchDungeonSettleItem.js.map