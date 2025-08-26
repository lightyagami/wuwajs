"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterHandBookItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
class MonsterHandBookItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
    this.Hod = undefined;
    this.$od = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async WZt() {
    this.Hod = new MonsterHandBookTitleItem();
    this.AddChild(this.Hod);
    this.$od = new MonsterHandBookLayoutItem();
    this.AddChild(this.$od);
    var e = this.GetItem(0);
    e.SetUIActive(false);
    var t = this.GetItem(1);
    t.SetUIActive(false);
    await Promise.all([this.Hod.CreateByActorAsync(e.GetOwner()), this.$od.CreateByActorAsync(t.GetOwner())]);
    this.$od.OnClickCallBack = this.OnClickCallBack;
  }
  GetUsingItem(e) {
    return (e.TitleId ? this.GetItem(0) : this.GetItem(1)).GetOwner();
  }
  ClearItem() {
    this.Destroy();
  }
  Update(e, t) {
    this.Hod?.SetUiActive(false);
    this.$od?.SetUiActive(false);
    if (e.TitleId) {
      this.Hod?.SetUiActive(true);
      this.Hod?.Update(e.TitleId);
    } else if (e.MonsterList) {
      this.$od?.SetUiActive(true);
      this.$od?.Update(e.MonsterList);
    }
  }
}
exports.MonsterHandBookItem = MonsterHandBookItem;
class MonsterHandBookTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Update(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
class MonsterHandBookLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
    this.Tei = undefined;
    this.sGe = () => {
      var e = new MonsterHandBookMonsterItem();
      e.OnClickCallBack = this.OnClickCallBack;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.sGe);
  }
  Update(e) {
    this.Tei?.RefreshByData(e, () => {
      for (const e of this.Tei?.GetLayoutItemList() ?? []) {
        if (e.HandBookId === ModelManager_1.ModelManager.HandBookModel.CurrentSelectMonsterHandBookId) {
          e.OnSelected(true);
          break;
        }
      }
    });
  }
}
class MonsterHandBookMonsterItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.HandBookId = 0;
    this.Rjt = true;
    this.OnClickCallBack = undefined;
    this.OnHandBookRead = (e, t) => {
      if (e === 0 && t === this.HandBookId) {
        this.SetNewVisible(false);
      }
    };
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
  }
  OnRefresh(e, t, i) {
    this.HandBookId = e;
    this.SetSelected(t);
    var s;
    var n;
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(this.HandBookId);
    if (e && (t = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(this.HandBookId), n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(0, this.HandBookId), s = t.OriginalFormInfoId > 0 ? t.OriginalFormInfoId : this.HandBookId, s = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(s), n = !(t.OriginalFormInfoId > 0) && !n?.IsRead, this.Rjt = !t?.DefaultUnlock && (s?.IsLock ?? true), t = {
      Type: 3,
      Data: this.HandBookId,
      MonsterId: e.Id,
      IsNewVisible: n,
      IsLockVisible: this.Rjt,
      BottomTextId: this.Rjt ? "Text_UnDiscovered_Text" : e.Name
    }, this.Apply(t), this.Rjt)) {
      this.SetIconSprite();
    }
  }
  OnSelected(e) {
    this.SetSelected(true);
    if (e) {
      this.OnExtendToggleClicked();
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, false);
  }
  OnExtendToggleClicked() {
    this.OnClickCallBack?.(this.GetItemGridExtendToggle(), this.HandBookId, this.Rjt);
  }
}
//# sourceMappingURL=MonsterHandBookItem.js.map