import { offlineOptions, onlineOptions, totalOptions } from '../../../constants/report-data';
import { GenerateDateFields } from '../generate-date-felds';
import { GenerateProfitabFields } from '../generate-profitab-fields';
import { GenerateGrowthFields } from '../generate-growth-fields';
import { GenerateCategoryFields } from '../generate-category-fields';
import { GenerateCustomersFields } from '../generate-customers-fields';
import { BooleanFields } from '../boolean-fields';

export const GenerateFields = ({ analyticName, label }) => {
  let component = null;

  switch (analyticName) {
    case onlineOptions[0].value:
    case onlineOptions[1].value:
    case onlineOptions[2].value:
    case offlineOptions[0].value:
    case offlineOptions[1].value:
    case offlineOptions[2].value:
    case totalOptions[0].value:
    case totalOptions[1].value:
    case totalOptions[2].value:
      component = <GenerateDateFields analyticName={analyticName} label={label} />;
      break;
    case onlineOptions[3].value:
    case offlineOptions[3].value:
    case totalOptions[3].value:
      component = <GenerateProfitabFields analyticName={analyticName} label={label} />;
      break;
    case onlineOptions[4].value:
    case offlineOptions[4].value:
    case totalOptions[4].value:
      component = <GenerateGrowthFields analyticName={analyticName} label={label} />;
      break;
    case onlineOptions[5].value:
    case offlineOptions[5].value:
    case totalOptions[5].value:
      component = <GenerateCategoryFields analyticName={analyticName} label={label} />;
      break;
    case onlineOptions[7].value:
      component = <GenerateCustomersFields analyticName={analyticName} label={label} />;
      break;
    default:
      component = <BooleanFields label={label} />
      break;
  }

  return component;
};