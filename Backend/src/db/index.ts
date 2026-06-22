import mongoose, { Connection, Model, PipelineStage } from "mongoose";

export class DB {
  private connection: Connection;
  private models = new Map<string, Model<any>>();
  constructor(uri: string, options: mongoose.ConnectOptions = {}) {
    this.connection = mongoose.createConnection(uri, options);
    // Freeze the instance to prevent external mutation of the API surface.
    // Internal state (like the Map of models) can still be mutated.
    Object.freeze(this);
  }

  registerModel<T>(name: string, schema: mongoose.Schema<T>) {
    const model = this.connection.model<T>(name, schema);
    this.models.set(name, model);
    return model;
  }

  model<T>(name: string): Model<T> {
    const model = this.models.get(name);
    if (!model) throw new Error(`Model not registered: ${name}`);
    return model as Model<T>;
  }

  async project<T>(modelName: string, filter: mongoose.FilterQuery<T>, projection: mongoose.ProjectionType<T>) {
    return this.model<T>(modelName).find(filter, projection).lean();
  }

  async aggregate<T = any>(modelName: string, pipeline: PipelineStage[]) {
    return this.model(modelName).aggregate(pipeline).exec();
  }

  async count<T>(modelName: string, filter: mongoose.FilterQuery<T> = {}) {
    return this.model<T>(modelName).countDocuments(filter).exec();
  }

  async transaction<R>(fn: (session: mongoose.ClientSession) => Promise<R>) {
    const session = await this.connection.startSession();
    try {
      let result: R;
      await session.withTransaction(async () => {
        result = await fn(session);
      });
      return result!;
    } finally {
      session.endSession();
    }
  }

  private  finalizeInitialization () {
    Object.defineProperties(this, {
      connection: { writable: false },
      registerModel: { writable: false },
      model: { writable: false },
      project: { writable: false },
      aggregate: { writable: false },
      count: { writable: false },
      transaction: { writable: false },
    });
    Object.freeze(this);
  }
}