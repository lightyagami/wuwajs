"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMainPhantomItem = exports.RolePhantomItem = exports.RolePhantomAttributeItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
class RolePhantomAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  ShowTemp(t) {
    var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.Id);
    if (e) {
      this.GetText(0).ShowTextNew(e.Name);
      this.SetTextureByPath(e.Icon, this.GetTexture(2));
      this.GetText(1).SetText(ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(t.Id, t.Value));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 58, "属性表中找不到对应的属性ID配置数据");
    }
  }
}
exports.RolePhantomAttributeItem = RolePhantomAttributeItem;
class RolePhantomItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, s) {
    super();
    this.Id = 0;
    this.OnClick = () => {
      if (this.ClickFunction) {
        this.ClickFunction(this.Index);
      }
    };
    this.OnClickSkillButton = () => {
      var t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance().GetPhantomData().GetDataByIndex(this.Index);
      var t = {
        SkillInfoData: 0,
        SkillId: this.Id,
        SkillLevel: t.GetPhantomLevel()
      };
      UiManager_1.UiManager.OpenView("PhantomBattleSkillInfoView", t);
    };
    this.CreateThenShowByActor(t.GetOwner());
    this.ClickFunction = e;
    this.Index = s;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClick]];
  }
  UpdateItem(t) {
    this.Id = t;
    this.Kbe();
    this.BGt();
    this.pmt();
  }
  UpdateTrialItem(t) {
    var e;
    this.GetSprite(2).SetUIActive(t !== 0);
    this.GetTexture(1).SetUIActive(t !== 0);
    this.GetItem(4).SetUIActive(t !== 0);
    if (t !== 0) {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
      e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId);
      this.SetSpriteByPath(e.BackgroundSprite, this.GetSprite(2), false);
      this.SetItemIcon(this.GetTexture(1), t);
      this.eCo();
    }
  }
  Kbe() {
    var t;
    this.GetTexture(1).SetUIActive(this.Id !== 0);
    if (this.Id !== 0 && (t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.Id))) {
      this.SetItemIcon(this.GetTexture(1), t.GetConfigId());
    }
  }
  BGt() {
    var t;
    this.GetSprite(2).SetUIActive(this.Id !== 0);
    if (this.Id !== 0) {
      t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.Id);
      t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t.GetQuality());
      this.SetSpriteByPath(t.BackgroundSprite, this.GetSprite(2), false);
    }
  }
  pmt() {
    this.GetItem(4).SetUIActive(this.Id !== 0);
    if (this.Id !== 0) {
      this.eCo();
    }
  }
  eCo() {
    var t = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    if (t) {
      if (t = t.GetPhantomData().GetDataByIndex(this.Index)) {
        this.GetText(5).SetText(t.GetPhantomLevel().toString());
      } else {
        this.GetItem(4).SetUIActive(false);
      }
    }
  }
}
class RoleMainPhantomItem extends (exports.RolePhantomItem = RolePhantomItem) {
  constructor() {
    super(...arguments);
    this.tCo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClick]];
  }
  OnStart() {
    this.tCo = new SkillButtonCompose(this.GetItem(3), this.OnClickSkillButton);
  }
  UpdateItem(t) {
    super.UpdateItem(t);
    this.tCo.Update(t);
  }
}
exports.RoleMainPhantomItem = RoleMainPhantomItem;
class SkillButtonCompose extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.xe = 0;
    this.eTt = () => {
      if (this.Tbt) {
        this.Tbt();
      }
    };
    this.Tbt = e;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UITexture]];
    this.BtnBindInfo = [[1, this.eTt]];
  }
  Update(t) {
    this.xe = t;
    if (this.xe !== 0 && ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsMain(this.xe)) {
      this.SetActive(true);
      this.RefreshTexture();
    } else {
      this.SetActive(false);
    }
  }
  RefreshTexture() {
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.xe);
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(t.GetConfigId());
    this.SetTextureByPath(t.GetPhantomSkillInfoByLevel().BattleViewIcon, this.GetTexture(0));
  }
}
//# sourceMappingURL=RolePhantomTabItemView.js.map