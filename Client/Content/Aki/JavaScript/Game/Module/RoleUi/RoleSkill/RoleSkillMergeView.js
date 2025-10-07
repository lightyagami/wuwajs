"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillMergeView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const RoleController_1 = require("../RoleController");
const RoleSkillTreeInfoItem_1 = require("./RoleSkillTreeInfoItem");
const RoleSkillTreeInfoItemData_1 = require("./RoleSkillTreeInfoItemData");
const RoleSkillTreeItem_1 = require("./RoleSkillTreeItem");
const RoleSkillTreeItemData_1 = require("./RoleSkillTreeItemData");
class RoleSkillMergeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.jVd = undefined;
    this.HVd = undefined;
    this.dqc = undefined;
    this.$Vd = new RoleSkillTreeItemData_1.RoleSkillTreeItemData();
    this.WVd = new RoleSkillTreeInfoItemData_1.RoleSkillTreeInfoItemData();
    this.QVd = false;
    this.Sdo = undefined;
    this.KVd = 0;
    this.Ido = e => {
      if (e === this.Sdo) {
        this.Sdo.SetToggleState(1);
      } else {
        this.Sdo?.SetToggleState(0);
        this.Sdo = e;
        this.Sdo.SetToggleState(1);
        this.Tdo();
      }
    };
    this.XVd = () => {
      var e;
      if (this.Sdo) {
        e = this.Sdo.GetSkillNodeId();
        this.WVd.SkillNodeId = e;
        this.YVd(e);
      }
    };
    this.Qco = () => {
      this.CloseMe();
    };
    this.Pdo = () => {
      this.jVd?.OnSelectRoleTabOutside();
      this.$co();
      this.zVd();
    };
    this.Udo = e => {
      this.jVd?.OnSkillNodeLevelUp(e);
    };
    this.TTt = () => {
      this.jVd?.OnAddCommonItemList();
    };
    this.Hmo = (e, t) => {
      this.WVd.RoleId = e;
      this.WVd.SkillNodeId = t;
      this.HVd?.OnUpdateSkillTreeInfoView(this.WVd);
    };
    this.qdi = () => {
      this.HVd?.OnCommonItemCountAnyChange();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectRoleTabOutside, this.Pdo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillTreeNodeActive, this.Udo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateSkillTreeInfoView, this.Hmo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillTreeNodeToggleClick, this.Ido);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleInternalViewQuit, this.Qco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectRoleTabOutside, this.Pdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeActive, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillTreeNodeLevelUp, this.Udo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateSkillTreeInfoView, this.Hmo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.khd(), this.JVd()]);
  }
  OnBeforeShow() {
    this.AU();
    this.ZVd();
    this.e5d();
    var e = this.$Vd.RoleId;
    this.jVd?.OnRoleChange(e);
  }
  async JVd() {
    this.jVd = new RoleSkillTreeItem_1.RoleSkillTreeItem();
    this.HVd = new RoleSkillTreeInfoItem_1.RoleSkillTreeInfoItem();
    await Promise.all([this.jVd.CreateByResourceIdAsync("UiItem_RoleSkillTree", this.GetItem(0), false), this.HVd.CreateByResourceIdAsync("UiItem_RoleSkillTreeDetail", this.GetItem(1), false)]);
  }
  async khd() {
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem();
    this.dqc.SetCloseCallBack(() => {
      this.xpt();
    });
    await this.dqc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.dqc.SetTitleByTextIdAndArgNew("RoleProject_Name");
  }
  xpt() {
    this.CloseMe();
  }
  AU() {
    var e = this.OpenParam;
    this.$Vd.RoleId = e.RoleId;
    this.WVd.RoleId = e.RoleId;
    this.KVd = e.SkillNodeIndex;
  }
  e5d() {
    var e;
    this.jVd?.SetUiActive(true);
    if (this.jVd && (e = this.jVd.GetSkillItemByIndex(this.KVd))) {
      this.Sdo = e;
      this.Sdo.SetToggleState(1);
      this.Tdo();
    }
  }
  ZVd() {
    this.jVd?.InitByData(this.$Vd.RoleId);
    this.bl();
  }
  bl() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.$Vd.RoleId);
    if (e) {
      this.jVd?.RefreshRole(e.GetRoleSkillTreeConfig());
    }
  }
  zVd() {
    if (this.QVd) {
      this.QVd = false;
      this.HVd?.OnHide();
      this.GetItem(1).SetUIActive(false);
      this.HVd?.SetUiActive(false);
      this.t5d();
    }
  }
  t5d() {
    if (this.jVd.UiLevelSequence) {
      this.jVd.UiLevelSequence.StopSequenceByKey("MoveLeft");
      this.jVd.UiLevelSequence.PlaySequence("MoveLeft");
    }
  }
  YVd(e) {
    if (this.QVd) {
      this.WVd.SkillNodeId = e;
      this.HVd?.Update(this.WVd);
    } else if (this.WVd.RoleId !== 0 && e !== 0 && this.HVd && (this.QVd = true, this.WVd.SkillNodeId = e, this.HVd.SetUiActive(true), this.HVd.Update(this.WVd), this.HVd.ShowLeftPanelByTabType(this.HVd.GetCurSkillTabShowType()), this.jVd.UiLevelSequence)) {
      this.jVd.UiLevelSequence.StopSequenceByKey("MoveRight");
      this.jVd.UiLevelSequence.PlaySequence("MoveRight");
    }
  }
  $co() {
    this.Sdo?.SetToggleState(0);
    this.Sdo = undefined;
  }
  Tdo() {
    var e;
    var t;
    this.dqc.SetUiActive(false);
    if (this.Sdo) {
      t = this.Sdo.GetSkillNodeId();
      if ((e = this.Sdo.GetType()) === 4 || e === 3) {
        this.WVd.SkillNodeId = t;
        this.YVd(t);
      } else {
        e = this.Sdo.GetRoleId();
        t = (t = this.Sdo.GetUpgradeSkillId()) > 0 ? t : this.Sdo.GetSkillId();
        RoleController_1.RoleController.SendRoleSkillViewRequest(e, t, this.XVd);
      }
    }
  }
}
exports.RoleSkillMergeView = RoleSkillMergeView;
//# sourceMappingURL=RoleSkillMergeView.js.map