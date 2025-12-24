"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const RoleSkillBranchItem_1 = require("./RoleSkillBranchItem");
const RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem");
const RoleSkillInnerSkillAndOuterAttributeItem_1 = require("./RoleSkillInnerSkillAndOuterAttributeItem");
const RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
const RoleSkillOuterWeakBreakAttributeItem_1 = require("./RoleSkillOuterWeakBreakAttributeItem");
class RoleSkillTreeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.vdo = undefined;
    this.Mdo = undefined;
    this.Edo = undefined;
    this.Sdo = undefined;
    this.$pt = undefined;
    this.kIm = undefined;
    this.qIm = undefined;
    this.DFm = false;
    this.E4f = undefined;
    this.$Ff = false;
    this.ydo = () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
      UiManager_1.UiManager.OpenView("RoleSkillInputView", e);
    };
    this.UpdateRole = e => {
      this.dFe = e;
      this.Refresh();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [8, UE.UIItem], [7, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[6, this.ydo]];
  }
  async OnBeforeStartAsync() {
    await this.XWd();
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async XWd() {
    var e;
    var i;
    var t;
    var s;
    var r;
    var l;
    if (this.GetItem(7)) {
      this.vdo = new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem();
      this.vdo.SetSkillBranchEnable(this.$Ff);
      e = this.vdo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
      this.Edo = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
      this.Edo.SetSkillBranchEnable(this.$Ff);
      i = this.Edo.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
      this.kIm = new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem();
      this.kIm.SetSkillBranchEnable(this.$Ff);
      t = this.kIm.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
      this.qIm = new RoleSkillOuterWeakBreakAttributeItem_1.RoleSkillOuterWeakBreakAttributeItem();
      this.qIm.SetSkillBranchEnable(this.$Ff);
      s = this.qIm.CreateThenShowByActorAsync(this.GetItem(10).GetOwner());
      r = this.Bdo();
      l = this.I4f();
      await Promise.all([e, i, t, s, r, l]);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 43, "NormalSkillSlot未定义，无法初始化OuterPassiveSkillItem!");
    }
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe);
    this.RefreshRole(e.GetRoleSkillTreeConfig());
    this.VFf();
  }
  async Bdo() {
    var i = [1, 2, 3, 4];
    this.Mdo = new Array(i.length);
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var s = i[e];
      var r = new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
      r.SetSkillBranchEnable(this.$Ff);
      var s = r.CreateThenShowByActorAsync(this.GetItem(s).GetOwner());
      this.Mdo[e] = r;
      t.push(s);
    }
    await Promise.all(t);
  }
  async I4f() {
    this.E4f = new RoleSkillBranchItem_1.RoleSkillBranchItem();
    await this.E4f.CreateByActorAsync(this.GetItem(11).GetOwner());
  }
  SelectSkillItem(e, i = false) {
    if (e === this.Sdo) {
      this.Sdo.SetToggleState(1);
    } else {
      this.Sdo?.SetToggleState(0);
      this.Sdo = e;
      this.Sdo.SetToggleState(1, i);
    }
  }
  CancelToggleSelect() {
    this.Sdo?.SetToggleState(0);
    this.Sdo = undefined;
  }
  OnSkillNodeLevelUp(e) {
    this.Ddo(e);
  }
  OnAddCommonItemList() {
    this.Refresh();
  }
  Ddo(e) {
    this.vdo.OnNodeLevelChange(e);
    for (const i of this.Mdo) {
      i.OnNodeLevelChange(e);
    }
    this.Edo.OnNodeLevelChange(e);
    this.qIm?.OnNodeLevelChange(e);
  }
  OnAttributeNodeActive(e) {
    this.Ddo(e);
  }
  SetSkillInputButtonVisible(e) {
    this.GetButton(6).GetRootComponent().SetUIActive(e);
  }
  OIm(e) {
    for (const t of e) {
      if (t.SkillId > 0) {
        var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t.SkillId);
        if (i && i.SkillType === EditFormationDefine_1.FRAGILE_SKILL_TYPE) {
          return true;
        }
      }
    }
    return false;
  }
  GIm(e) {
    var i = this.GetItem(8);
    var t = this.GetItem(7);
    i?.SetUIActive(e);
    t?.SetUIActive(!e);
  }
  RefreshRole(e) {
    this.DFm = this.OIm(e);
    this.GIm(this.DFm);
    for (const i of e) {
      switch (i.NodeType) {
        case 1:
          this.vdo.Update(this.dFe, i.Id);
          break;
        case 2:
          if (i.Coordinate <= this.Mdo.length) {
            this.Mdo[i.Coordinate - 1]?.Update(this.dFe, i.Id);
          }
          break;
        case 4:
          break;
        case 3:
          if (i.ParentNodes === undefined || i.ParentNodes.length === 0) {
            this.GetOuterPassiveSkillItem()?.Update(this.dFe, i.Id);
          }
          break;
        case 5:
          if (this.DFm) {
            this.qIm?.Update(this.dFe, i.Id);
          }
      }
    }
  }
  GetOuterPassiveSkillItem() {
    if (this.DFm) {
      return this.kIm;
    } else {
      return this.Edo;
    }
  }
  PlayItemSequence(e) {
    this.$pt.PlayOrReplaySequenceByName(e);
  }
  async PlayItemSequenceAsync(e) {
    await this.$pt.PlaySequenceAsync(e, new CustomPromise_1.CustomPromise());
  }
  GetSkillItemByIndex(e) {
    if (this.DFm && this.qIm) {
      var i = this.qIm.GetSkillTreeNodeConfig();
      if (i && e === i.NodeIndex) {
        return this.qIm;
      }
    }
    i = this.GetOuterPassiveSkillItem();
    if (i) {
      var t = i.GetSkillTreeNodeConfig();
      if (t && e === t.NodeIndex) {
        return i;
      }
    }
    for (const l of this.Mdo) {
      for (const h of l.GetSkillNodeItems()) {
        if (h) {
          var s = h.GetSkillTreeNodeConfig();
          if (s && e === s.NodeIndex) {
            return h;
          }
        }
      }
    }
    for (const a of this.vdo.GetSkillNodeItems()) {
      if (a) {
        var r = a.GetSkillTreeNodeConfig();
        if (r && e === r.NodeIndex) {
          return a;
        }
      }
    }
  }
  GetCurrentSelectedSkillItem() {
    return this.Sdo;
  }
  VFf() {
    this.E4f.Refresh(this.dFe, this.$Ff);
  }
  OnRoleSkillBranchChanged() {
    this.VFf();
    this.vdo?.OnSkillBranchChanged();
    this.Edo?.OnSkillBranchChanged();
    this.kIm?.OnSkillBranchChanged();
    this.qIm?.OnSkillBranchChanged();
    if (this.Mdo) {
      for (const e of this.Mdo) {
        e.OnSkillBranchChanged();
      }
    }
  }
  SetEnableSwitchBranch(e) {
    this.$Ff = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "FirstDoubleTag") {
      let e = undefined;
      do {
        if (e = this.vdo?.FindDoubleTagSkillTog()) {
          break;
        }
        for (const i of this.Mdo) {
          if (e = i.FindDoubleTagSkillTog()) {
            break;
          }
        }
      } while (0);
      if (e) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.RoleSkillTreeItem = RoleSkillTreeItem;
//# sourceMappingURL=RoleSkillTreeItem.js.map