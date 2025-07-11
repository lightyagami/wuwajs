"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonInputViewController = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const CdKeyInputController_1 = require("../../../CdKey/CdKeyInputController");
const FriendController_1 = require("../../../Friend/FriendController");
const PersonalController_1 = require("../../../Personal/Controller/PersonalController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CommonInputViewController extends UiControllerBase_1.UiControllerBase {
  static OpenSetRoleNameInputView() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("SetName");
    var t = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew(t),
      ConfirmFunc: PersonalController_1.PersonalController.RequestModifyName,
      InputText: e,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PrefabTextItem_3848209236_Text"),
      IsCheckNone: true,
      NeedFunctionButton: false,
      BottomTipsText: "",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("CommonModifyNameInputView", t);
  }
  static OpenSetPlayerRemarkNameInputView() {
    let e = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()?.FriendRemark;
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      e = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()?.PlayerName;
    }
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("SetRemark");
    var t = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew(t),
      ConfirmFunc: async e => FriendController_1.FriendController.RequestFriendRemarkChange(ModelManager_1.ModelManager.FriendModel.GetCurrentOperationPlayerId(), e),
      InputText: e,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PrefabTextItem_3848209236_Text"),
      IsCheckNone: false,
      NeedFunctionButton: false,
      BottomTipsText: "",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("CommonSingleInputView", t);
  }
  static OpenPersonalSignInputView() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetSignature();
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("SetSign");
    var t = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew(t),
      ConfirmFunc: PersonalController_1.PersonalController.RequestModifySignature,
      DefaultText: ConfigManager_1.ConfigManager.TextConfig.GetTextById("ComplianceWithTheLaw"),
      InputText: e,
      IsCheckNone: false,
      NeedFunctionButton: false,
      BottomTipsText: "",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("CommonMultiInputView", t);
  }
  static OpenCdKeyInputView() {
    var e = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew("PrefabTextItem_CDKey_Title"),
      ConfirmFunc: CdKeyInputController_1.CdKeyInputController.RequestCdKey,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CDKey_InputEmpty") ?? "",
      InputText: "",
      IsCheckNone: true,
      NeedFunctionButton: true,
      BottomTipsText: "",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("CdKeyInputView", e);
  }
  static OpenSetVisionEquipGroupName(e, t, n = "") {
    n = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew("VisionAssembleSaveTips"),
      ConfirmFunc: async e => {
        return await t(e);
      },
      InputText: n,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionAssembleInputTips"),
      IsCheckNone: true,
      NeedFunctionButton: false,
      BottomTipsText: e,
      BottomTipsColor: "000000",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("VisionAssembleInputView", n);
  }
  static OpenChangeVisionEquipGroupName(e, t) {
    e = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew("VisionAssembleChangeNameTips"),
      ConfirmFunc: async e => {
        return await t(e);
      },
      InputText: "",
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("VisionAssembleInputTips"),
      IsCheckNone: false,
      NeedFunctionButton: false,
      BottomTipsText: e,
      BottomTipsColor: "000000"
    };
    UiManager_1.UiManager.OpenView("CommonSingleInputView", e);
  }
  static OpenSetPhantomArenaDeckName(e, t, n = "") {
    n = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew("PhantomBattle_1076"),
      ConfirmFunc: async e => {
        return await t(e);
      },
      InputText: n,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1077"),
      IsCheckNone: true,
      NeedFunctionButton: false,
      BottomTipsText: e,
      BottomTipsColor: "000000",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("DeckRenameInputView", n);
  }
  static OpenSetPhantomManageConfigName(e, t, n = "") {
    e = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew("PhantomProject_Name"),
      ConfirmFunc: async e => {
        e = await t(e);
        UiManager_1.UiManager.CloseView("PhantomManageConfigRenameInputView");
        return e;
      },
      InputText: e,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomProject_Tips01"),
      IsCheckNone: true,
      NeedFunctionButton: false,
      BottomTipsText: n,
      BottomTipsColor: "000000",
      NeedCheckBlank: true
    };
    UiManager_1.UiManager.OpenView("PhantomManageConfigRenameInputView", e);
  }
}
exports.CommonInputViewController = CommonInputViewController;
//# sourceMappingURL=CommonInputViewController.js.map