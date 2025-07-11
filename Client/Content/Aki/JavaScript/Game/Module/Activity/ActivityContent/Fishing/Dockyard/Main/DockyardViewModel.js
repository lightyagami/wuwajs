"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardViewModel = undefined;
const DockyardViewModelBase_1 = require("../Base/DockyardViewModelBase");
const DockyardTrawlBackpackPanelModel_1 = require("../Trawl/DockyardTrawlBackpackPanelModel");
const DockyardTrawlListPanelModel_1 = require("../Trawl/DockyardTrawlListPanelModel");
class DockyardViewModel extends DockyardViewModelBase_1.DockyardViewModelBase {
  constructor() {
    super(...arguments);
    this.BackpackPanelModel = new DockyardTrawlBackpackPanelModel_1.DockyardTrawlBackpackPanelModel();
    this.ListPanelModel = new DockyardTrawlListPanelModel_1.DockyardTrawlListPanelModel();
  }
}
exports.DockyardViewModel = DockyardViewModel;
//# sourceMappingURL=DockyardViewModel.js.map