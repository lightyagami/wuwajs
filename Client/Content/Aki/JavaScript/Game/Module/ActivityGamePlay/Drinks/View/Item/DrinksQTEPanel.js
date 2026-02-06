"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksQTEPanel = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const DrinksQTEItem_1 = require("./DrinksQTEItem");
const QTE_POINTER_RANGE_MIN = -45;
const QTE_POINTER_RANGE_MAX = 45;
class DrinksQTEPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MaxTime = 9;
    this.CurTime = 0;
    this.Speed = 0;
    this.CurRot = Rotator_1.Rotator.Create(0, QTE_POINTER_RANGE_MAX, 0);
    this.Button = undefined;
    this.QTEList = [];
    this.ThreePartList = [];
    this.ThreePart1 = undefined;
    this.ThreePart2 = undefined;
    this.ThreePart3 = undefined;
    this.TwoPartList = [];
    this.TwoPart1 = undefined;
    this.TwoPart2 = undefined;
    this.IsFront = true;
    this.bXf = () => {
      this.Button?.SetSelfActive(false);
      this.UpdateSectionItem();
      ModelManager_1.ModelManager.DrinksModel.GetProxy().SetNeedTick(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.Button = new DrinksQTEItem_1.DrinksQTEButton();
    this.Button.OnClickedCb = this.bXf;
    t.push(this.Button.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.ThreePart1 = new DrinksQTEItem_1.DrinksQTESectionItem();
    t.push(this.ThreePart1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.ThreePart2 = new DrinksQTEItem_1.DrinksQTESectionItem();
    t.push(this.ThreePart2.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.ThreePart3 = new DrinksQTEItem_1.DrinksQTESectionItem();
    t.push(this.ThreePart3.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.ThreePartList = [this.ThreePart1, this.ThreePart2, this.ThreePart3];
    this.TwoPart1 = new DrinksQTEItem_1.DrinksQTESectionItem();
    t.push(this.TwoPart1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.TwoPart2 = new DrinksQTEItem_1.DrinksQTESectionItem();
    t.push(this.TwoPart2.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.TwoPartList = [this.TwoPart1, this.TwoPart2];
    await Promise.all(t);
  }
  OnStart() {
    this.MaxTime = ConfigManager_1.ConfigManager.DrinksConfig.GetQTETimeLimit();
    this.Speed = ConfigManager_1.ConfigManager.DrinksConfig.GetQTESpeed();
    this.GetItem(6)?.SetUIRelativeRotation(this.CurRot.ToUeRotator());
  }
  StartQTE() {
    this.IsFront = true;
    var t = ModelManager_1.ModelManager.DrinksModel.GetProxy();
    t.HideClose();
    t.SetNeedTick(true);
    this.CurRot.Yaw = QTE_POINTER_RANGE_MAX;
    this.GetItem(6)?.SetUIRelativeRotation(this.CurRot.ToUeRotator());
    this.CurTime = 0;
    this.Button?.SetSelfActive(true);
    var t = ModelManager_1.ModelManager.DrinksModel;
    var i = t.GetCurStep();
    var s = t.GetCurrentPlayData();
    var i = i === 0 ? s.DrinkBase[0] : s.DrinkBase[1];
    var s = t.GetDrinksByBaseId(i);
    this.QTEList = s.GetAllBaseId();
    this.InitSectionItem();
    this.RootItem?.SetUIActive(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "MakeDrinkQTEShow");
  }
  InitSectionItem() {
    this.ThreePart1.SetUiActive(this.QTEList.length === 3);
    this.ThreePart2.SetUiActive(this.QTEList.length === 3);
    this.ThreePart3.SetUiActive(this.QTEList.length === 3);
    this.TwoPart1.SetUiActive(this.QTEList.length === 2);
    this.TwoPart2.SetUiActive(this.QTEList.length === 2);
    for (let t = 0; t < this.QTEList.length; t++) {
      (this.QTEList.length === 3 ? this.ThreePartList : this.TwoPartList)[t].ApplyDrinkData(this.QTEList[t]);
    }
  }
  UpdateSectionItem() {
    var i = this.GetEndSection();
    for (let t = 0; t < this.QTEList.length; t++) {
      (this.QTEList.length === 3 ? this.ThreePartList : this.TwoPartList)[t].SetIsSelected(t === i);
    }
  }
  OnProcessEnd() {
    var t = this.GetEndSection();
    ModelManager_1.ModelManager.DrinksModel?.OnDrinkBaseQTEEnd(this.QTEList[t]);
  }
  GetEndSection() {
    var t = this.CurRot.Yaw + 45;
    var i = (QTE_POINTER_RANGE_MAX - QTE_POINTER_RANGE_MIN) / this.QTEList.length;
    var t = Math.max(1, Math.ceil(t / i));
    return this.QTEList.length - t;
  }
  OnTick(t) {
    this.CurTime += t;
    t = (QTE_POINTER_RANGE_MAX - QTE_POINTER_RANGE_MIN) / this.Speed * t;
    let i = this.CurRot.Yaw + t * (this.IsFront ? -1 : 1);
    if (this.IsFront && i <= QTE_POINTER_RANGE_MIN) {
      i = QTE_POINTER_RANGE_MIN;
      this.IsFront = false;
    } else if (!this.IsFront && i >= QTE_POINTER_RANGE_MAX) {
      i = QTE_POINTER_RANGE_MAX;
      this.IsFront = true;
    }
    this.CurRot.Yaw = i;
    this.GetItem(6)?.SetUIRelativeRotation(this.CurRot.ToUeRotator());
    this.Button.OnTick(1 - this.CurTime / this.MaxTime);
    if (this.CurTime >= this.MaxTime) {
      this.Button?.OnClickedBtn();
    }
  }
  OnFadeSequenceEnd() {
    this.OnProcessEnd();
    this.RootItem?.SetUIActive(false);
  }
}
exports.DrinksQTEPanel = DrinksQTEPanel;
//# sourceMappingURL=DrinksQTEPanel.js.map