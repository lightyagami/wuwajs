"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassRewardView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const BattlePassBackgroundPanel_1 = require("./BattlePassBackgroundPanel");
const BattlePassRewardGridItem_1 = require("./BattlePassRewardGridItem");
class BattlePassRewardView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.p2i = false;
    this.v2i = false;
    this.M2i = undefined;
    this.E2i = undefined;
    this.vVt = undefined;
    this.S2i = () => {
      UiManager_1.UiManager.OpenView("BattlePassPayView", this.ExtraParams);
    };
    this.y2i = () => {
      var e = {
        WeaponDataList: ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
        SelectedIndex: 0,
        WeaponObservers: this.ExtraParams
      };
      UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
    };
    this.I2i = () => {
      return new BattlePassRewardGridItem_1.BattlePassRewardGridItem();
    };
    this.T2i = () => {
      this.GetItem(2).SetUIActive(ModelManager_1.ModelManager.BattlePassModel.PayType === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid);
    };
    this.L2i = () => {
      var e;
      if (this.p2i) {
        this.p2i = false;
        e = ModelManager_1.ModelManager.BattlePassModel.GetCurrentShowLevel();
        this.vVt.ScrollToGridIndex(e - 1);
      }
    };
    this.D2i = e => {
      if (e) {
        this.vVt.RefreshGridProxy(e);
      } else {
        this.vVt.RefreshAllGridProxies();
      }
      this.R2i();
    };
    this.Esi = () => {
      this.p2i = true;
      this.vVt.RefreshByData(ModelManager_1.ModelManager.BattlePassModel.RewardDataList);
      this.R2i();
    };
    this.R2i = () => {
      var e = this.vVt.NCi;
      var e = this.vVt.TryGetCachedData(e);
      if (e && (e = e.Level - 1, (e = ModelManager_1.ModelManager.BattlePassModel.GetNextStageLevel(e)) !== 0)) {
        this.E2i.Refresh(ModelManager_1.ModelManager.BattlePassModel.GetRewardData(e), false, 0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.S2i], [6, this.y2i]];
  }
  async OnBeforeStartAsync() {
    this.E2i = new BattlePassRewardGridItem_1.BattlePassRewardGridItem();
    this.M2i = new BattlePassBackgroundPanel_1.BattlePassBackgroundPanel();
    var e = {
      IsRewardPanel: true,
      WeaponObservers: this.ExtraParams
    };
    await Promise.all([this.E2i.OnlyCreateByActorAsync(this.GetItem(4).GetOwner()), this.M2i.OnlyCreateByActorAsync(this.GetItem(0).GetOwner(), e)]);
    this.AddChild(this.E2i);
    this.AddChild(this.M2i);
  }
  OnStart() {
    this.v2i = true;
    this.GetItem(2).SetUIActive(ModelManager_1.ModelManager.BattlePassModel.PayType === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid);
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(5).GetOwner(), this.I2i);
    this.vVt.BindOnScrollValueChanged(this.R2i);
    this.vVt.BindLateUpdate(this.L2i);
  }
  OnBeforeShow() {
    this.Esi();
  }
  OnAfterShow() {
    this.UiViewSequence?.PlaySequence(this.v2i ? "Start" : "Switch");
    this.v2i = false;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GetBattlePassRewardEvent, this.D2i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReceiveBattlePassDataEvent, this.Esi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattlePassFirstUnlockAnime, this.T2i);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GetBattlePassRewardEvent, this.D2i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReceiveBattlePassDataEvent, this.Esi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattlePassFirstUnlockAnime, this.T2i);
  }
  OnBeforeDestroy() {
    if (this.vVt) {
      this.vVt.ClearGridProxies();
      this.vVt = undefined;
    }
  }
}
exports.BattlePassRewardView = BattlePassRewardView;
//# sourceMappingURL=BattlePassRewardView.js.map