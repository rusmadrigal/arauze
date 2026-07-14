import { type SchemaTypeDefinition } from "sanity";
import raccomandataCode from "./schemaTypes/raccomandataCode";
import raccomandataReport from "./schemaTypes/raccomandataReport";
import { codiceTributoPage } from "./schemaTypes/codiceTributoPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [raccomandataCode, raccomandataReport, codiceTributoPage],
};
