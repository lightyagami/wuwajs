"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineSearchView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const OnlineController_1 = require("../OnlineController");
const OnlineHallItem_1 = require("./OnlineHallItem");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
class OnlineSearchView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.s9t = undefined;
    this.a9t = undefined;
    this.sOi = () => {
      this.u8t();
    };
    this.oOi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name);
    this.aOi = () => {
      const t = this.GetInputText(0);
      if (t.GetText() === "") {
        if (Platform_1.Platform.IsCloudGame()) {
          let e;
          const i = (0, puerts_1.$ref)("");
          UE.KuroCloudGameWrapper.ClipBoardPaste();
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            UE.LGUIBPLibrary.ClipBoardPaste(i);
            e = (0, puerts_1.$unref)(i);
            t.SetText(e);
          }, 200);
        } else {
          var e = (0, puerts_1.$ref)("");
          UE.LGUIBPLibrary.ClipBoardPaste(e);
          e = (0, puerts_1.$unref)(e);
          t.SetText(e);
        }
      } else {
        t.SetText("");
      }
      this.h9t();
    };
    this.h9t = () => {
      if (this.GetInputText(0).GetText() === "") {
        this.a9t.RefreshSprite("SP_Paste");
      } else {
        this.a9t.RefreshSprite("SP_Clear");
      }
    };
    this.l9t = () => {
      var e = this.GetInputText(0).GetText();
      if (e.length > 0) {
        OnlineController_1.OnlineController.LobbyQueryPlayersRequest(Number(e));
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("OnlineInvalidUserId");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITextInputComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.l9t]];
  }
  OnStart() {
    this.a9t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(1));
    this.a9t.BindCallback(this.aOi);
    var e = this.GetItem(4);
    this.s9t = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), e.GetOwner(), this.oOi, true);
    this.GetInputText(0).OnTextChange.Bind(this.h9t);
    this.u8t();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.OnlineModel.CleanSearchResultList();
    this.GetInputText(0).OnTextChange.Unbind();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSearchWorld, this.sOi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSearchWorld, this.sOi);
  }
  u8t() {
    this.s9t.RefreshByData(ModelManager_1.ModelManager.OnlineModel.SearchResult, false, () => {
      var e = this.s9t.UnsafeGetGridProxy(0);
      if (e && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiComponent", 5, "OnlineSearchView_Item_Alpha:" + e.GetRootItem().GetAlpha());
      }
    }, true);
    this.d9t();
  }
  d9t() {
    this.h9t();
    this.GetItem(5).SetUIActive(ModelManager_1.ModelManager.OnlineModel.SearchResult.length <= 0);
  }
}
exports.OnlineSearchView = OnlineSearchView;
//# sourceMappingURL=OnlineSearchView.js.map