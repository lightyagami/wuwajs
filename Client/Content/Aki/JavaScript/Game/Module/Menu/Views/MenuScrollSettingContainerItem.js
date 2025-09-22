"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingContainerItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController");
const MenuScrollSettingButtonItem_1 = require("./MenuScrollSettingButtonItem");
const MenuScrollSettingDropDown_1 = require("./MenuScrollSettingDropDown");
const MenuScrollSettingSliderItem_1 = require("./MenuScrollSettingSliderItem");
const MenuScrollSettingSwitchItem_1 = require("./MenuScrollSettingSwitchItem");
const MenuScrollSettingTitleItem_1 = require("./MenuScrollSettingTitleItem");
class MenuScrollSettingContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Type = undefined;
    this.Pe = undefined;
    this.MenuScrollItemData = undefined;
    this.IGe = undefined;
    this.YBi = undefined;
    this.SPe = undefined;
    this.mHa = undefined;
    this.Yai = e => {
      if (this.Pe && (e === 1 && this.dHa(), this.mHa)) {
        this.mHa(this, e);
      }
    };
    this.JBi = e => {
      if (this.Pe !== undefined && this.Pe.FunctionId === e) {
        this.bNe();
      }
    };
    this.tbi = e => {
      this.SPe.PlayLevelSequenceByName(e);
    };
    this.ibi = e => {
      if (this.Pe.FunctionId === GameSettingsDefine_1.EFunction.RayTracing) {
        this.yBc(e);
      } else if (this.Pe.FunctionId === GameSettingsDefine_1.EFunction.NVIDIADLSSFG) {
        this.SBc(e);
      } else if (this.Pe.FunctionId === GameSettingsDefine_1.EFunction.Vulkan) {
        this.E91(e);
      } else if (this.Pe.FunctionId === GameSettingsDefine_1.EFunction.HIGHESTFPS) {
        this.sku(e);
      } else {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, e);
      }
    };
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    if (this.SPe === undefined) {
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    }
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshMenuSetting, this.JBi);
    this.GetExtendToggle(0).OnStateChange.Add(this.Yai);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshMenuSetting, this.JBi);
    this.GetExtendToggle(0).OnStateChange.Clear();
  }
  BindOnToggleStateChangedCallback(e) {
    this.mHa = e;
  }
  dHa() {
    if (this.Pe) {
      var e = this.Pe.ClickedTips;
      if (e && !StringUtils_1.StringUtils.IsBlank(e)) {
        var t;
        var i;
        var r = ModelManager_1.ModelManager.MenuModel;
        for ([t, i] of this.Pe.ClickedTipsMap) {
          if (r.IsInMenuDataByFunctionId(t) && GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t) === i) {
            GenericPromptController_1.GenericPromptController.ShowPromptByCode(e);
            return;
          }
        }
      }
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
    this.SPe?.Clear();
    this.SPe = undefined;
    this.YBi?.ClearItem();
    this.YBi = undefined;
    this.mHa = undefined;
    this.gPe();
  }
  ClearItem() {
    this.gPe();
  }
  gPe() {
    this.IGe &&= undefined;
    this.Type &&= undefined;
    this.Pe &&= undefined;
    this.MenuScrollItemData = undefined;
  }
  GetUsingItem(e) {
    let t = undefined;
    if (e.Type === 0) {
      if ((t = this.GetItem(1)) !== undefined) {
        return t.GetOwner();
      } else {
        return undefined;
      }
    }
    switch (e.Data.SetType) {
      case 1:
        t = this.GetItem(4);
        break;
      case 2:
        t = this.GetItem(3);
        break;
      case 3:
      case 4:
        t = this.GetItem(2);
        break;
      case 5:
        t = this.GetItem(5);
    }
    if (t !== undefined) {
      return t.GetOwner();
    } else {
      return undefined;
    }
  }
  Update(e, t) {
    this.Type = e.Type;
    this.Pe = e.Data;
    this.MenuScrollItemData = e;
    this.obi();
    this.rbi(e);
  }
  async rbi(e) {
    if (this.YBi) {
      this.YBi.Clear();
      await this.YBi.ClearAsync();
    }
    this.YBi = this.nbi(e);
    if (this.YBi) {
      await this.YBi.Init();
      this.sbi(this.YBi, e);
    }
  }
  sbi(e, t) {
    var i;
    if (e) {
      i = t.Data;
      e.SetActive(true);
      e.ExecuteUpdate(i, false);
      if (t.Type !== 0) {
        this.ZBi(i.GetEnable());
      } else {
        this.ZBi(false);
      }
    }
  }
  nbi(e) {
    if (e.Type === 0) {
      return this.abi(1, MenuScrollSettingTitleItem_1.MenuScrollSettingTitleItem);
    }
    switch (e.Data.SetType) {
      case 1:
        return this.abi(4, MenuScrollSettingSliderItem_1.MenuScrollSettingSliderItem);
      case 2:
        return this.abi(3, MenuScrollSettingSwitchItem_1.MenuScrollSettingSwitchItem);
      case 4:
        return this.abi(2, MenuScrollSettingButtonItem_1.MenuScrollSettingButtonItem);
      case 5:
        return this.abi(5, MenuScrollSettingDropDown_1.MenuScrollSettingDropDown);
    }
  }
  abi(e, t) {
    t = new t();
    t.Initialize(this.GetItem(e), this.ibi, this.tbi);
    return t;
  }
  bNe() {
    if (this.YBi) {
      this.YBi.ExecuteUpdate(this.Pe, true);
      if (this.MenuScrollItemData?.Type !== 0) {
        this.ZBi(this.Pe.GetEnable());
      } else {
        this.ZBi(false);
      }
    }
  }
  obi() {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
  }
  ZBi(e) {
    var t = this.GetExtendToggle(0);
    if (e) {
      if (t.GetToggleState() === 1) {
        t.SetToggleState(1, false);
      } else {
        t.SetToggleState(0, false);
      }
    } else {
      t.SetToggleState(2, false);
    }
    t.SetSelfInteractive(e);
    if (this.Type !== 0 && this.YBi) {
      this.YBi.SetInteractionActive(e);
    }
  }
  LM1(e) {
    e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
    e.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, 0);
    });
    e.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, 0);
    });
    e.SetCloseFunction(() => {
      ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, 0);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  yBc(e) {
    var t;
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDxr1_1NotSupported() && e > 0) {
      this.LM1(301);
    } else if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDriverNeedUpdateForRayTracing() && e > 0) {
      this.LM1(273);
    } else {
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(this.Pe.FunctionId);
      ModelManager_1.ModelManager.MenuModel.NeedRayTracingSubChange = t + e === 1;
      if (t !== 0 || e !== 1 || ModelManager_1.ModelManager.MenuModel.IsRayTracingOpenChecked) {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, e);
      } else {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(248)).FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.MenuModel.IsRayTracingOpenChecked = true;
          ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, e);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    }
  }
  SBc(e) {
    var t;
    if (e > 0 && GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsDlss3HardwareSchedulingDisabled()) {
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(292)).FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, 0);
      });
      t.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, 0);
      });
      t.SetCloseFunction(() => {
        ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, 0);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    } else {
      ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, e);
    }
  }
  E91(e) {
    var t;
    if (e > 0 && !ModelManager_1.ModelManager.MenuModel.IsVulkanOpenChecked) {
      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(316);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      ModelManager_1.ModelManager.MenuModel.IsVulkanOpenChecked = true;
    }
    ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, e);
  }
  sku(e) {
    var t;
    if (ControllerHolder_1.ControllerHolder.MenuController.NeedRedMagicFpsConfirmBox(e)) {
      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(330);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    }
    ControllerHolder_1.ControllerHolder.MenuController.HandleFireSaveMenuChange(this.Pe, e);
  }
  SetDetailVisible(e) {
    if (this.YBi) {
      this.YBi.SetDetailVisible(e);
    }
  }
  GetMenuData() {
    return this.Pe;
  }
  SetSelected(e) {
    if (e) {
      this.GetExtendToggle(0)?.SetToggleState(1, false);
    } else {
      this.GetExtendToggle(0)?.SetToggleState(0, false);
    }
  }
}
exports.MenuScrollSettingContainerItem = MenuScrollSettingContainerItem;
//# sourceMappingURL=MenuScrollSettingContainerItem.js.map