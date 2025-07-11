"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsVisionComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ItemTipsAttribute_1 = require("./ItemTipsAttribute");
const ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
const ItemTipsGetWay_1 = require("./ItemTipsGetWay");
const ItemTipsLockButton_1 = require("./ItemTipsLockButton");
class TipsVisionComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(t) {
    super(t);
    this.Pe = undefined;
    this.wxt = undefined;
    this.Bxt = undefined;
    this.eGe = undefined;
    this.Axt = undefined;
    this.bxt = undefined;
    this.qxt = (t, i, e) => {
      const s = new VisionDetailDescItem(i);
      s.Init().finally(() => {
        s.Update(t);
        s.SetActive(true);
      });
      return {
        Key: e,
        Value: s
      };
    };
    this.mvt = (t, i, e) => {
      return {
        Key: e,
        Value: new ItemTipsAttribute_1.TipsAttributeItem(i, t)
      };
    };
    this.CreateThenShowByResourceIdAsync("UiItem_TipsVision", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIVerticalLayout]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(11));
    await this.bxt.Init();
  }
  OnStart() {
    var t = this.GetItem(2);
    this.wxt = new ItemTipsLockButton_1.TipsLockButton(t);
    this.Bxt = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(3), this.mvt);
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(12), this.qxt);
    var t = this.GetItem(5);
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(t);
  }
  OnBeforeDestroy() {
    if (this.Pe) {
      this.Pe = undefined;
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(undefined);
    }
  }
  Refresh(t) {
    var i = () => {
      var t = this.Pe;
      this.GetText(0).SetText(t.Cost.toString());
      this.GetText(1).SetUIActive(t.UpgradeLevel !== undefined);
      this.GetText(1).SetText(t.UpgradeLevel);
      if (t.IncId) {
        this.wxt.Refresh(t.IncId, t.CanClickLockButton);
        this.wxt.SetDeprecateToggleVisible(t.CanDeprecate());
      }
      this.wxt?.SetUiActive(t.IncId > 0);
      this.Bxt.RebuildLayoutByDataNew(t.AttributeData);
      var i = t.VisionDetailInfoComponentData.DataBase;
      if (i && i.GetFetterGroupId() > 0) {
        this.bxt.Update(i.GetFetterGroupConfig());
        this.bxt.SetUiActive(true);
      } else {
        this.bxt.SetUiActive(false);
      }
      this.Gxt(t.VisionDetailInfoComponentData);
      this.Pxt(t.GetWayData);
      this.xxt(t.LimitTimeTxt);
      this.Nxt(t);
    };
    this.Pe = t;
    ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(t);
    if (this.InAsyncLoading()) {
      this.OperationMap.set("Refresh", i);
    } else {
      i();
    }
  }
  Gxt(t) {
    this.eGe.RebuildLayoutByDataNew(t.DescData);
  }
  Pxt(t) {
    this.GetItem(5).SetUIActive(t !== undefined && t.length > 0);
    if (t) {
      this.Axt.Refresh(t);
    }
  }
  xxt(t) {
    this.GetItem(6).SetUIActive(t !== undefined);
    if (t) {
      this.GetText(7).ShowTextNew(t);
    }
  }
  Nxt(t) {
    var i = t.EquippedId;
    var e = t.IsEquip;
    let s = undefined;
    if (i && !(s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i))) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ItemHint", 27, "找不到装备角色但是认为被装备中", ["roleId", i], ["visionId", t.IncId], ["visionConfigId", t.ConfigId]);
      }
      this.GetItem(8).SetUIActive(false);
    } else {
      this.GetItem(8).SetUIActive(e);
      if (s && (i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(s.GetRoleSkinId()), e) && i) {
        this.SetRoleSkinIcon(i.GetRoleSkinConfig().RoleHeadIcon, this.GetTexture(9), i.GetItemId());
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "VisionEquipping", s.GetName());
      }
    }
  }
  SetLockButtonShow(t) {
    var i = () => {
      this.GetItem(2).SetUIActive(t);
    };
    if (this.InAsyncLoading()) {
      this.OperationMap.set("SetLockButtonShow", i);
    } else {
      i();
    }
  }
}
exports.TipsVisionComponent = TipsVisionComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.wqe = undefined;
    this.Data = undefined;
    this.bxt = undefined;
    this.wqe = t;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(10));
    await this.bxt.Init();
    this.bxt.SetActive(true);
  }
  Update(t) {
    this.Data = t;
    this.mGe(t);
    this.Dke(t);
    this.Oxt(t);
    this.kxt(t);
    this.Fxt(t);
    this.Vxt(t);
    this.Hxt(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t.Title);
  }
  Dke(t) {
    var i;
    var e;
    var s = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
    if (t.FetterId > 0) {
      i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(t.FetterId);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
      this.GetText(2).SetText(e ?? "");
      if (s) {
        if (StringUtils_1.StringUtils.IsEmpty(i.SimplyEffectDesc)) {
          this.GetText(3).SetText("");
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.SimplyEffectDesc);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.EffectDescription, ...i.EffectDescriptionParam);
      }
      this.GetItem(12).SetUIActive(true);
      this.GetText(2).SetUIActive(true);
      this.GetText(3).SetUIActive(true);
    } else if (t.SkillConfig) {
      if (s) {
        if (StringUtils_1.StringUtils.IsEmpty(t.SkillConfig.SimplyDescription)) {
          this.GetText(3).SetText("");
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.SkillConfig.SimplyDescription);
        }
      } else {
        e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(t.SkillConfig.Id, t.Quality);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.SkillConfig.DescriptionEx, ...e);
      }
      this.GetItem(12).SetUIActive(false);
      this.GetText(2).SetUIActive(false);
      this.GetText(3).SetUIActive(true);
    }
  }
  Hxt(t) {
    if (t.FetterId > 0) {
      this.GetItem(9).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t.FetterGroupId);
      this.bxt.Update(t);
      this.GetText(11).SetText("");
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  Oxt(t) {
    this.GetItem(4).SetUIActive(t.EmptyState);
  }
  Fxt(t) {
    this.GetText(6).SetText(t.EmptyText);
  }
  Vxt(t) {
    var i = !StringUtils_1.StringUtils.IsEmpty(t.EmptyContentText);
    this.GetItem(7).SetUIActive(i);
    this.GetText(8).SetText(t.EmptyContentText);
  }
  kxt(t) {
    this.GetItem(5).SetUIActive(t.TitleItemShowState);
  }
}
//# sourceMappingURL=ItemTipsVisionComponent.js.map