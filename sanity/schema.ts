import { type SchemaTypeDefinition } from "sanity";
import raccomandataCode from "./schemaTypes/raccomandataCode";
import raccomandataReport from "./schemaTypes/raccomandataReport";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [raccomandataCode, raccomandataReport],
};
