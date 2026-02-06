"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeInfoPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MediaPlayer_1 = require("../../../Common/MediaPlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MotorcycleDevelopDefine_1 = require("../MotorcycleDevelopDefine");
const TAG_BG_ALPHA = 0.3;
class MotorcycleTechTreeInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PRr = undefined;
    this.ucc = undefined;
    this.uVd = undefined;
    this.wNo = undefined;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Hea = undefined;
    this.UDf = () => {
      if (this.PRr) {
        var t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(this.PRr.NodeId);
        if (t) {
          var i = [];
          for (let e = 0; e < t.TechLv.length; e++) {
            var r = {
              TargetLevel: e + 1,
              CurLevel: this.PRr.NodeLevel,
              Title: t.Title
            };
            var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(t.TechLv[e]);
            r.Desc = o.Desc;
            i.push(r);
          }
          UiManager_1.UiManager.OpenView("MotorcycleTechTreeLevelDetailView", i);
        }
      }
    };
    this.tWt = () => {
      if (this.PRr) {
        if (ModelManager_1.ModelManager.MotorcycleDevelopModel.CanUpgradeNode(this.PRr)) {
          if (!this.BAg) {
            ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.RequestMotorTechLevelUp(this.PRr.NodeId);
          }
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SelectMotorDevelopTab, "MotorcycleTaskTabView");
        }
      }
    };
    this.dpt = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_HELP_TECHTREE);
    };
  }
  get BAg() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.IsSwitchTechTreePlayerLocked();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [3, UE.UISprite], [2, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIExtendToggle]];
    this.BtnBindInfo = [[14, this.UDf]];
  }
  async OnBeforeStartAsync() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.ucc = new ButtonItem_1.ButtonItem();
    this.uVd = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    var e = [this.ucc.CreateThenShowByActorAsync(this.GetButton(6).GetOwner()), this.uVd.CreateThenShowByActorAsync(this.GetItem(12).GetOwner())];
    await Promise.all(e);
    this.ucc.SetFunction(this.tWt);
    this.uVd.ButtonCallBack = this.dpt;
    if (Info_1.Info.PlatformType === 2) {
      await this.pah();
    }
    this.wNo = new MediaPlayer_1.MediaPlayer(this.GetTexture(10));
  }
  OnBeforeDestroy() {
    this.wNo.Clear();
    this.wNo = undefined;
    this.X3i();
  }
  async RefreshAsync(e) {
    this.PRr = e;
    var t;
    var i;
    var r;
    var o;
    var n;
    var s;
    var a = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e.TreeType);
    var _ = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId);
    if (a && _ && (t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTagConfig(_.TagId))) {
      s = (o = e.Status) === -1;
      n = o === 1;
      o = o === 0;
      r = ModelManager_1.ModelManager.MotorcycleDevelopModel.IsPreNodeActivated(e);
      this.SetTextureByPath(_.Icon, this.GetTexture(0));
      this.GetItem(12).SetUIActive(s || !r);
      this.GetItem(11).SetUIActive(_.Type === 0);
      this.uVd.SetTextByTextId("MotorBike_TechTree_Locked_PreTech");
      if (s) {
        s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(_.UnlockConditionDesc);
        i = StringUtils_1.StringUtils.Format("({0}/{1})", e.CurrentValue.toString(), e.TargetValue.toString());
        this.uVd.SetTextByText(s + i);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Name);
      this.GetText(4).SetColor(UE.Color.FromHex(t.NameColor));
      this.GetSprite(2).SetColor(UE.Color.FromHex(t.NameColor));
      this.GetSprite(3).SetColor(UE.Color.FromHex(t.NameColor));
      this.GetSprite(3).SetAlpha(TAG_BG_ALPHA);
      this.GetItem(9).SetUIActive(!StringUtils_1.StringUtils.IsBlank(_.Video));
      s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? _.Video : _.VideoFemale;
      this.wNo.PlayVideo(_.VideoName, s, true);
      i = this.GetText(7);
      s = e.NodeLevel >= _.TechLv.length;
      this.GetItem(13).SetUIActive(s);
      this.ucc.SetUiActive(false);
      if (o) {
        this.ucc.SetUiActive(r);
      } else if (n) {
        this.ucc.SetUiActive(!s);
      }
      if (o || n) {
        r = ModelManager_1.ModelManager.MotorcycleDevelopModel.CanUpgradeNode(e);
        this.ucc.SetLocalTextNew(r ? "MotorBike_TechTree_Activate" : "MotorBike_TechTree_GetTechCube");
        i.SetChangeColor(!r, i.changeColor);
      }
      o = (s = e.NodeLevel) === 0 ? s + 1 : s;
      n = Math.min(s + 1, _.TechLv.length);
      r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(_.TechLv[o - 1]);
      e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(_.TechLv[n - 1]);
      n = StringUtils_1.StringUtils.Format("Lv.{0} {1}", o.toString(), MultiTextLang_1.configMultiTextLang.GetLocalTextNew(_.Title) ?? "");
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(_.Title) ?? "";
      _ = _.NotActivatedPreviewDesc;
      e = StringUtils_1.StringUtils.Format("x{0}", e.Consume.toString());
      o = s === 0 ? o : n;
      n = s === 0 ? _ : r.Desc;
      this.GetText(1).SetText(o);
      i.SetText(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), n);
      s = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.TpItemId).IconSmall;
      await Promise.all([this.SetTextureAsync(s, this.GetTexture(8)), this.SetSpriteAsync(t.Icon, this.GetSprite(2), false)]);
    }
  }
  PlayChangeTween() {
    this.Hea.StopSequenceByKey("Change");
    this.Hea.PlayLevelSequenceByName("Change");
  }
  async pah() {
    const t = new CustomPromise_1.CustomPromise();
    this.X3i();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("M_VideoTextureMat_RectClip");
    if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName().includes("Vulkan")) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TextLanguageSearch", 47, "[not] switch material to M_VideoTextureMat_RectClip_InvY", ["GetRHIName()", UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName()], ["SupportVulkan()", UE.KuroRenderingRuntimeBPPluginBPLibrary.SupportVulkan()]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TextLanguageSearch", 47, "switch material to M_VideoTextureMat_RectClip", ["GetRHIName()", UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName()], ["SupportVulkan()", UE.KuroRenderingRuntimeBPPluginBPLibrary.SupportVulkan()]);
      }
      this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialInterface, e => {
        this.GetTexture(10).SetCustomUIMaterial(e);
        t.SetResult();
      }, 102, "Ui.TrapDefenseUi");
      await t.Promise;
    }
  }
  X3i() {
    if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
}
exports.MotorcycleTechTreeInfoPanel = MotorcycleTechTreeInfoPanel;
//# sourceMappingURL=MotorcycleTechTreeInfoPanel.js.map