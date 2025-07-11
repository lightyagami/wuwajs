"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementGroupSmallItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementGroupSmallItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gqe = undefined;
    this.eqe = undefined;
    this.rqe = e => {
      if (ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e).GetGroupId() === this.Gqe?.GetId()) {
        this.Nqe();
        this.Vbe(this.Gqe);
      }
    };
    this.Fbe = e => {
      if (this.Gqe?.GetId() === e) {
        this.Nqe();
        this.Vbe(this.Gqe);
      }
    };
    this.Iqe = () => {
      this.Oqe();
    };
    this.kqe = () => {
      ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup = this.Gqe;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAchievementGroupChange);
    };
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  ClearItem() {
    this.Destroy();
  }
  GetUsingItem(e) {
    return this.GetRootItem().GetOwner();
  }
  Update(e, t) {
    this.Gqe = e;
    this.Pqe(e);
    this.Vbe(e);
    this.Oqe();
    this.Nqe();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [4, UE.UIItem], [1, UE.UIExtendToggle], [3, UE.UIText], [2, UE.UITexture], [5, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  OnStart() {
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementGroupChange, this.Iqe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementGroupDataNotify, this.Fbe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAchievementDataWithIdNotify, this.rqe);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementGroupChange, this.Iqe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementGroupDataNotify, this.Fbe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAchievementDataWithIdNotify, this.rqe);
  }
  Oqe() {
    var e;
    if (this.Gqe !== undefined && this.GetRootItem() !== undefined && (e = ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup === this.Gqe ? 1 : 0, this.GetExtendToggle(1).ToggleState !== e)) {
      this.GetExtendToggle(1).SetToggleStateForce(e, false);
    }
  }
  Nqe() {
    var e = this.Gqe.GetAchievementGroupProgress();
    this.GetText(3).SetText(e);
  }
  Pqe(e) {
    this.GetText(0).SetText(e.GetTitle());
    var t = this.GetTexture(2);
    this.SetTextureByPath(e.GetSmallIcon(), t);
    this.GetItem(5)?.SetUIActive(e.GetRewards().length > 0);
  }
  Vbe(e) {
    this.GetItem(4).SetUIActive(e.SmallItemRedPoint());
  }
  OnBeforeDestroy() {
    this.Gqe &&= undefined;
    this.eqe &&= undefined;
    this.RemoveEventListener();
  }
}
exports.AchievementGroupSmallItem = AchievementGroupSmallItem;
//# sourceMappingURL=AchievementGroupSmallItem.js.map