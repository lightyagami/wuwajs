"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPanelFormationRoleDangoExtension = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const AbyssDangoCircleQulityItem_1 = require("../Dango/DangoAbyss/View/AbyssDangoCircleQulityItem");
const DangoAbyssSelectDangoView_1 = require("../Dango/DangoAbyss/View/DangoAbyssSelectDangoView");
const LguiUtil_1 = require("../Util/LguiUtil");
class UiPanelFormationRoleDangoExtension extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Lwc = undefined;
    this.nbc = (e, t) => {
      this.Lwc?.OnLevelUp(e, t);
    };
    this.wSc = () => {
      this.Lwc?.OnDangoInfoUpdate();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[26, UE.UIItem]];
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssDangoLevelUp, this.nbc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.wSc);
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssDangoLevelUp, this.nbc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.wSc);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(26);
    this.Lwc = new DangoItem();
    await this.Lwc.CreateByResourceIdAsync("UiItem_TuanziRoleItem", e);
    this.Lwc.SetActive(true);
  }
  OnStart() {
    this.LZs();
  }
  OnBeforeDestroy() {
    this.DZs();
  }
  SetRelativeUiActive(e) {
    this.GetItem(26).SetUIActive(e);
  }
  Refresh(e, t, i) {
    var s;
    if (i === undefined) {
      ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnDataAfterChange(ModelManager_1.ModelManager.PlayerInfoModel.GetId());
    } else {
      ModelManager_1.ModelManager.DangoAbyssModel.RefreshOwnDataAfterChange(i);
      (s = new DangoItemData()).Index = e;
      s.IfSelf = i === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetRoleOwnerData(i, t);
      s.DangoId = e?.DangoId ?? 0;
      s.RoleConfigId = t;
      s.Level = e?.DangoLevel ?? 0;
      s.DangoEquipIds = e?.DangoEquipIds ?? [];
      this.Lwc.Refresh(s);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && (e = this.Lwc?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.UiPanelFormationRoleDangoExtension = UiPanelFormationRoleDangoExtension;
class DangoItemData {
  constructor() {
    this.RoleConfigId = 0;
    this.DangoId = 0;
    this.Level = 0;
    this.IfSelf = true;
    this.Index = 0;
    this.DangoEquipIds = [];
  }
}
class DangoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.hUc = undefined;
    this.wCo = false;
    this.wwc = () => {
      if (this.$8i && this.$8i.IfSelf) {
        var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        var e = new DangoAbyssSelectDangoView_1.DangoSelectViewData();
        e.Index = this.$8i.Index;
        e.RoleConfigId = this.$8i.RoleConfigId;
        e.GroupIndex = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId ?? 0;
        var n = ModelManager_1.ModelManager.DangoAbyssModel.GetAllDangoList();
        e.CurrentSelectDangoId = n[0].GetId();
        if (this.$8i?.DangoId !== 0) {
          e.CurrentSelectDangoId = this.$8i.DangoId;
        } else {
          var a = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
          var t = n.length;
          var r = a.length;
          for (let i = 0; i < t; i++) {
            let t = false;
            for (let e = 0; e < r; e++) {
              if (a[e].GetRoleConfigId) {
                if (ModelManager_1.ModelManager.DangoAbyssModel.GetRoleOwnerData(s, a[e].GetRoleConfigId)?.DangoId === n[i].GetId()) {
                  t = true;
                  break;
                }
              }
            }
            if (!t) {
              e.CurrentSelectDangoId = n[i].GetId();
              break;
            }
          }
        }
        UiManager_1.UiManager.OpenView("DangoAbyssSelectDangoView", e, (e, t) => {
          UiModel_1.UiModel.NormalStack.Peek()?.AddChildViewById(t);
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[2, this.wwc]];
  }
  async OnBeforeStartAsync() {
    this.hUc = new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem();
    await this.hUc.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.Yk1();
  }
  Yk1() {
    if (this.wCo) {
      RedDotController_1.RedDotController.UnBindGivenUi("RedDotDangoFormation", this.GetItem(6));
      this.wCo = false;
    }
  }
  OnDangoInfoUpdate() {
    var e;
    if (this.$8i && (e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(this.$8i.DangoId))) {
      e = e.GetEquipItemConfigIdList();
      this.$8i.DangoEquipIds = e;
      this.BGt(this.$8i);
    }
  }
  OnLevelUp(e, t) {
    if (this.$8i && e === this.$8i.DangoId) {
      this.$8i.Level = t;
      this.pmt(this.$8i);
    }
  }
  Refresh(e) {
    if (this.$8i = e) {
      this.Rwc(e);
      this.Awc(e);
      this.BGt(e);
      this.Pwc(e);
      this.pmt(e);
      this.Yk1();
      if (e.IfSelf) {
        RedDotController_1.RedDotController.BindRedDot("RedDotDangoFormation", this.GetItem(6));
        this.wCo = true;
      } else {
        this.GetItem(6).SetUIActive(false);
      }
    }
  }
  Pwc(e) {
    if (e.DangoId === 0) {
      this.GetItem(1).SetUIActive(false);
    } else {
      this.GetItem(1).SetUIActive(true);
    }
  }
  Awc(e) {
    if (e.DangoId === 0) {
      this.GetTexture(3);
    } else {
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e.DangoId).GetFormationIcon();
      this.SetTextureByPath(e, this.GetTexture(3));
    }
  }
  BGt(e) {
    var t = new AbyssDangoCircleQulityItem_1.DangoCircleQualityData();
    var i = e.DangoEquipIds;
    var s = i.length;
    var n = new Map();
    for (let e = 0; e < s; e++) {
      n.set(e, i[e]);
    }
    t.PluginIdMap = n;
    this.hUc.RefreshData(t);
    this.hUc.SetActive(true);
  }
  pmt(e) {
    if (e.DangoId !== 0) {
      e = e.Level;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "AbyssDango_LV", e?.toString());
    }
  }
  Rwc(e) {
    e = e.DangoId === 0;
    this.GetItem(5).SetUIActive(e);
  }
}
//# sourceMappingURL=UiPanelFormationRoleDangoExtension.js.map