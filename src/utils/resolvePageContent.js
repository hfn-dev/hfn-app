// import { pageSchemas } from '@/schemas/pageSchemas';

// export function resolvePageContent(page) {
//   const pageType = page.page_type; 
//   const schema = pageSchemas[pageType];

//   if (!schema) {
//     console.warn(`No schema found for page type: ${pageType}`);
//     return {};
//   }

//   const sections = page.sections || {};
//   const resolved = {};

//   for (const key in schema) {
//     resolved[key] = {
//       ...schema[key],
//       ...(sections[key] || {}),
//     };
//   }

//   return resolved; 
// }
