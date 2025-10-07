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
    this.nsd = undefined;
    this.ssd = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async WZt() {
    this.nsd = new MonsterHandBookTitleItem();
    this.AddChild(this.nsd);
    this.ssd = new MonsterHandBookLayoutItem();
    this.AddChild(this.ssd);
    var t = this.GetItem(0);
    t.SetUIActive(false);
    var e = this.GetItem(1);
    e.SetUIActive(false);
    await Promise.all([this.nsd.CreateByActorAsync(t.GetOwner()), this.ssd.CreateByActorAsync(e.GetOwner())]);
    this.ssd.OnClickCallBack = this.OnClickCallBack;
  }
  GetUsingItem(t) {
    return (t.TitleId ? this.GetItem(0) : this.GetItem(1)).GetOwner();
  }
  ClearItem() {
    this.Destroy();
  }
  Update(t, e) {
    this.nsd?.SetUiActive(false);
    this.ssd?.SetUiActive(false);
    if (t.TitleId) {
      this.nsd?.SetUiActive(true);
      this.nsd?.Update(t.TitleId);
    } else if (t.MonsterList) {
      this.ssd?.SetUiActive(true);
      this.ssd?.Update(t.MonsterList);
    }
  }
}
exports.MonsterHandBookItem = MonsterHandBookItem;
class MonsterHandBookTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Update(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
  }
}
class MonsterHandBookLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
    this.Tei = undefined;
    this.sGe = () => {
      var t = new MonsterHandBookMonsterItem();
      t.OnClickCallBack = this.OnClickCallBack;
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.sGe);
  }
  Update(t) {
    this.Tei?.RefreshByData(t, () => {
      for (const t of this.Tei?.GetLayoutItemList() ?? []) {
        if (t.HandBookId === ModelManager_1.ModelManager.HandBookModel.CurrentSelectMonsterHandBookId) {
          t.OnSelected(true);
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
    this.OnHandBookRead = (t, e) => {
      if (t === 0 && e === this.HandBookId) {
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
  OnRefresh(t, e, i) {
    this.HandBookId = t;
    this.SetSelected(e);
    t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(this.HandBookId);
    if (t) {
      e = ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigById(this.HandBookId);
      if (e?.DefaultUnlock) {
        this.Rjt = false;
        const o = {
          Type: 3,
          Data: this.HandBookId,
          MonsterId: t.Id,
          BottomTextId: t.Name
        };
        this.Apply(o);
      } else {
        var s = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(0, this.HandBookId);
        var n = e.OriginalFormInfoId > 0 ? e.OriginalFormInfoId : this.HandBookId;
        var n = ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(n);
        var e = !(e.OriginalFormInfoId > 0) && !s?.IsRead;
        this.Rjt = n?.IsLock ?? true;
        const o = {
          Type: 3,
          Data: this.HandBookId,
          MonsterId: this.Rjt ? undefined : t.Id,
          IsNewVisible: !this.Rjt && e,
          IsPhantomLock: this.Rjt,
          BottomTextId: this.Rjt ? "Text_UnDiscovered_Text" : t.Name
        };
        this.Apply(o);
      }
    }
  }
  OnSelected(t) {
    this.SetSelected(true);
    if (t) {
      this.OnExtendToggleStateChanged(1);
    }
  }
  OnDeselected(t) {
    this.SetSelected(false, false);
  }
  OnExtendToggleStateChanged(t) {
    if (t === 1) {
      this.OnClickCallBack?.(this.GetItemGridExtendToggle(), this.HandBookId, this.Rjt);
    }
  }
}
//# sourceMappingURL=MonsterHandBookItem.js.map