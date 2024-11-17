import type { AnyObjectSchema, InferType } from 'yup';

const getSubmitFunction =
  <Schema extends AnyObjectSchema>(
    schema: Schema,
    callback: (values: InferType<Schema>) => void,
  ) =>
  (values: Record<string, unknown>) =>
    callback(values);

export default getSubmitFunction;
