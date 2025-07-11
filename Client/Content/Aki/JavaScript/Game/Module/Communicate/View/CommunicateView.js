"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicateView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const CommunicateById_1 = require("../../../../Core/Define/ConfigQuery/CommunicateById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GuideCountDownItem_1 = require("../../Guide/Views/GuideCountDownItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CommunicateView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.iqt = undefined;
    this.oqt = 0;
    this.rqt = 0;
    this.nqt = false;
    this.sqt = 0;
    this.hqt = () => {
      this.$Oe(e => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommunicateFinished, this.sqt);
      });
    };
    this.$Oe = e => {
      this.CloseMe(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.hqt]];
  }
  OnStart() {
    var e;
    var i = this.GetText(4);
    i.SetRichText(true);
    i.SetHeight(100);
    LguiUtil_1.LguiUtil.SetLocalText(i, "QuestCommunicateConnect");
    this.oqt = CommonParamById_1.configCommonParamById.GetIntConfig("CommunicateViewCloseTime");
    this.rqt = this.oqt;
    this.iqt = new GuideCountDownItem_1.GuideCountDownItem(this.oqt);
    this.iqt.Init(this.GetItem(0));
    this.sqt = this.OpenParam;
    if (this.sqt) {
      if (i = CommunicateById_1.configCommunicateById.GetConfig(this.sqt)) {
        if (e = SpeakerById_1.configSpeakerById.GetConfig(i.Talker)) {
          this.uqt(e);
          this.cqt(e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "找不到通讯对话人配置", ["talkerId", i.Talker]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到通讯配置", ["communicateId", this.sqt]);
      }
    }
  }
  uqt(e) {
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestCommunicateRequest");
    var t = this.GetText(1);
    var e = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, e.Id);
    t.SetText(`【${e}】${i}`);
  }
  cqt(e) {
    var i = this.GetTexture(2);
    this.SetTextureByPath(e.HeadIconAsset, i);
  }
  OnTick(e) {
    if (this.RootItem.bIsUIActive) {
      if (this.rqt <= 0 && !this.nqt) {
        this.nqt = true;
        this.$Oe();
      } else {
        this.rqt -= e;
        this.iqt.OnDurationChange(this.rqt);
      }
    }
  }
}
exports.CommunicateView = CommunicateView;
//# sourceMappingURL=CommunicateView.js.map